import { neon } from '@neondatabase/serverless';

const sql = neon(import.meta.env.VITE_DATABASE_URL, { 
    disableWarningInBrowsers: true 
});

const getCurrentUser = () => {
    const userStr = localStorage.getItem('current_user');
    return userStr ? JSON.parse(userStr) : null;
};

const ensureProjectsTable = async () => {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                project_name TEXT NOT NULL,
                description TEXT,
                detailed_description TEXT,
                tech_stack TEXT,
                features TEXT,
                status TEXT DEFAULT 'generated',
                roadmap JSONB DEFAULT '[]',
                future_enhancements JSONB DEFAULT '[]',
                completion_percentage INTEGER DEFAULT 0,
                user_input JSONB DEFAULT '{}',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
    } catch (e) {}
};


const formatProjectForFrontend = (p) => {
    if (!p) return null;
    return {
        ...p,
        id: p.id,
        userId: p.user_id, 
        project_name: p.project_name,
        implementation_steps: Array.isArray(p.roadmap) ? p.roadmap : [],
        roadmap: Array.isArray(p.roadmap) ? p.roadmap : [],
        tech_stack: typeof p.tech_stack === 'string' ? p.tech_stack.split(', ') : [],
        features: typeof p.features === 'string' ? p.features.split(', ') : [],
        user_input: p.user_input || {}
    };
};


export const generateProject = async (projectData) => {
    try {
        const currentUser = getCurrentUser();
        if (!currentUser) throw new Error("User not authenticated");

        await ensureProjectsTable();

        const ai = projectData.project_details || projectData;
        const userInput = {
            level: projectData.level || "Intermediate",
            type: projectData.projectType || projectData.type || "Web",
            goal: projectData.goal || "Learning"
        };

        // إرسال البيانات لـ Neon
        const result = await sql`
            INSERT INTO projects (
                user_id, project_name, description, detailed_description, 
                tech_stack, features, roadmap, future_enhancements, user_input
            ) VALUES (
                ${currentUser.id}, 
                ${ai.project_name || "New AI Project"}, 
                ${ai.description || ""}, 
                ${ai.detailed_description || ""}, 
                ${Array.isArray(projectData.languages) ? projectData.languages.join(', ') : ""}, 
                ${Array.isArray(projectData.features) ? projectData.features.join(', ') : ""},
                ${JSON.stringify(ai.implementation_steps || [])}, 
                ${JSON.stringify(ai.future_enhancements || [])},
                ${JSON.stringify(userInput)}
            ) RETURNING *;
        `;

        const newProject = formatProjectForFrontend(result[0]);

        let localDB = JSON.parse(localStorage.getItem('idea2project_projects') || '[]');
        localDB.unshift(newProject);
        localStorage.setItem('idea2project_projects', JSON.stringify(localDB));

        return { success: true, project: newProject };
    } catch (error) {
        console.error('❌ Database Error:', error);
        return { success: false, error: error.message };
    }
};

export const getProjects = async () => {
    try {
        const currentUser = getCurrentUser();
        if (!currentUser) return { success: true, projects: [] };

        const data = await sql`SELECT * FROM projects WHERE user_id = ${currentUser.id} ORDER BY created_at DESC`;
        const formatted = data.map(formatProjectForFrontend);
        
        localStorage.setItem('idea2project_projects', JSON.stringify(formatted));
        
        return { success: true, projects: formatted };
    } catch (error) {
        const local = JSON.parse(localStorage.getItem('idea2project_projects') || '[]');
        return { success: true, projects: local };
    }
};

export const getProject = async (id) => {
    try {
        const currentUser = getCurrentUser();
        const result = await sql`SELECT * FROM projects WHERE id = ${parseInt(id)} AND user_id = ${currentUser?.id}`;
        
        if (result.length > 0) {
            return formatProjectForFrontend(result[0]);
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const deleteProject = async (id) => {
    try {
        const currentUser = getCurrentUser();
        await sql`DELETE FROM projects WHERE id = ${parseInt(id)} AND user_id = ${currentUser?.id}`;
        
        let localDB = JSON.parse(localStorage.getItem('idea2project_projects') || '[]');
        localDB = localDB.filter(p => p.id !== parseInt(id));
        localStorage.setItem('idea2project_projects', JSON.stringify(localDB));

        return { success: true };
    } catch (error) {
        return { success: false };
    }
};
export const updateProjectProgress = async (projectId, completionPercentage) => {
    try {
        const currentUser = getCurrentUser();
        if (!currentUser) throw new Error("User not authenticated");

        console.log(`Updating project ${projectId} progress to ${completionPercentage}%`);

        const result = await sql`
            UPDATE projects 
            SET completion_percentage = ${parseInt(completionPercentage)},
                status = ${completionPercentage === 100 ? 'completed' : 'progress'}
            WHERE id = ${parseInt(projectId)} AND user_id = ${currentUser.id}
            RETURNING *;
        `;

        let localDB = JSON.parse(localStorage.getItem('idea2project_projects') || '[]');
        localDB = localDB.map(p => 
            p.id === parseInt(projectId) 
            ? { ...p, completion_percentage: completionPercentage, status: completionPercentage === 100 ? 'completed' : 'progress' } 
            : p
        );
        localStorage.setItem('idea2project_projects', JSON.stringify(localDB));

        return { 
            success: true, 
            project: formatProjectForFrontend(result[0]) 
        };
    } catch (error) {
        console.error('Error updating project progress:', error);
        return { success: false, error: error.message };
    }
};
export const getAdminStats = async () => {
    try {
        const projectsCount = await sql`SELECT COUNT(*) FROM projects`;

        const usersCount = await sql`SELECT COUNT(*) FROM users`;
        
        const visitsCount = await sql`SELECT COUNT(*) FROM site_stats`;

        return {
            success: true,
            stats: {
                projects: projectsCount[0].count,
                users: usersCount[0].count,
                visits: visitsCount[0].count,
                successRate: 96, 
                techCount: 22    
            }
        };
    } catch (error) {
        console.error("Stats Error:", error);
        return { success: false };
    }
};