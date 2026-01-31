require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const countries = require('i18n-iso-countries');
const geoip = require('geoip-lite');
const app = express();
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const pool = new Pool({
    connectionString: process.env.VITE_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

const monitor = {
    totalVisits: 0,
    demoLogins: 0,
    uniqueIPs: new Set()
};

app.use(async (req, res, next) => {
    if (req.path.startsWith('/api/admin')) return next();

    try {
        let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        if (ip && ip.includes('::ffff:')) ip = ip.split(':').pop();

        const checkIp = (ip === '::1' || ip === '127.0.0.1') ? '104.28.194.242' : ip; 
        const geo = geoip.lookup(checkIp);
        
        let locationDetail = 'Unknown';
        if (geo) {
            const countryName = countries.getName(geo.country, "en") || geo.country;
            const region = geo.region || '';
            const city = geo.city || '';
            locationDetail = `${countryName}${region ? ', ' + region : ''}${city ? ', ' + city : ''}`;
        }

        monitor.uniqueIPs.add(ip);

        await pool.query(
            "INSERT INTO visitor_logs (ip_address, country) VALUES ($1, $2)",
            [ip, locationDetail]
        );

        await pool.query(`
            INSERT INTO site_stats (stat_name, stat_value) 
            VALUES ('total_visits', 1) 
            ON CONFLICT (stat_name) 
            DO UPDATE SET stat_value = site_stats.stat_value + 1
        `);

    } catch (err) {
        // Silenced
    }
    next();
});

const users = [
    {
        id: 1,
        name: "Demo User",
        email: "demo@idea2project.com",
        password: "demo123",
        skills: ["React", "Node.js", "JavaScript"],
        experience: "intermediate"
    }
];

const projects = [
    {
        id: 1,
        userId: 1,
        name: "Task Manager",
        description: "A simple task management application",
        techStack: ["React", "Node.js", "MongoDB"],
        status: "in-progress",
        progress: 65
    }
];

app.get('/', async (req, res) => {
    try {
        const stats = await pool.query("SELECT stat_value FROM site_stats WHERE stat_name = 'total_visits'");
        const dbVisits = stats.rows[0]?.stat_value || 0;
        
        res.send(`
            <!DOCTYPE html>
            <html>
            <head><title>Idea2Project API</title></head>
            <body style="font-family: sans-serif; padding: 20px; background: #0f172a; color: white;">
                <h1>🚀 Idea2Project Backend API</h1>
                <p>Status: Connected to Neon DB</p>
                <hr>
                <h2>Real-time Stats:</h2>
                <ul>
                    <li>Total DB Visits: ${dbVisits}</li>
                    <li>Live Unique IPs: ${monitor.uniqueIPs.size}</li>
                </ul>
            </body>
            </html>
        `);
    } catch (e) {
        res.status(500).send("DB Connection Error");
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            if (email === "demo@idea2project.com") {
                await pool.query(`
                    INSERT INTO site_stats (stat_name, stat_value) 
                    VALUES ('demo_logins', 1) 
                    ON CONFLICT (stat_name) 
                    DO UPDATE SET stat_value = site_stats.stat_value + 1
                `);
            }
            const { password: _, ...userWithoutPassword } = user;
            res.json({ success: true, user: userWithoutPassword, token: 'jwt-' + Date.now() });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = users.find(u => u.email === email);
    if (existingUser) return res.status(400).json({ success: false, message: "User already exists" });
    const newUser = { id: users.length + 1, name, email, password, skills: [], experience: "beginner" };
    users.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    res.json({ success: true, user: userWithoutPassword, token: 'jwt-' + Date.now() });
});

app.post('/api/projects/generate', (req, res) => {
    const { languages = [], level = 'intermediate', type = 'web', goal = 'learn', email } = req.body;
    const newProject = {
        id: Date.now(),
        userId: email === "demo@idea2project.com" ? 1 : Date.now(), 
        name: "Generated Project",
        description: `Level ${level} ${type} for ${goal}`,
        techStack: languages,
        status: "generated",
        progress: 0,
        createdAt: new Date().toISOString()
    };
    projects.push(newProject);
    res.json({ success: true, project: newProject });
});

app.get('/api/admin/analytics', async (req, res) => {
    try {
        const statsRes = await pool.query("SELECT stat_name, stat_value FROM site_stats");
        const statsMap = {};
        statsRes.rows.forEach(row => {
            const key = row.stat_name.trim();
            statsMap[key] = parseInt(row.stat_value) || 0;
        });
        res.json({
            success: true,
            data: {
                totalVisits: statsMap['total_visits'] || 0,
                demoLogins: statsMap['demo_logins'] || 0,
                uniqueVisitors: monitor.uniqueIPs.size,
                allUsersCount: users.length,
                realProjectsCount: projects.length,
                serverTime: new Date().toLocaleTimeString()
            }
        });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

app.get('/api/projects', (req, res) => {
    res.json({ success: true, projects });
});

app.delete('/api/projects/:id', (req, res) => {
    const index = projects.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        projects.splice(index, 1);
        res.json({ success: true, message: "Deleted" });
    } else {
        res.status(404).json({ success: false });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/api/admin/visitors', async (req, res) => {
    try {
        const result = await pool.query("SELECT ip_address, country, visit_time FROM visitor_logs ORDER BY visit_time DESC LIMIT 10");
        res.json({ success: true, visitors: result.rows });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server: ${PORT}`);
});

