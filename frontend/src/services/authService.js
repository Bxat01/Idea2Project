import { neon } from '@neondatabase/serverless'
const sql = neon(import.meta.env.VITE_DATABASE_URL, { 
    disableWarningInBrowsers: true 
});

export const initializeDemoUser = () => {
};
const ensureUsersTable = async () => {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
    } catch (error) {
        console.error("Error creating table:", error);
    }
};
export const registerUser = async (userData) => {
    try {
        await ensureUsersTable();
        const { name, email, password } = userData;
        
        const result = await sql`
            INSERT INTO users (name, email, password)
            VALUES (${name}, ${email}, ${password})
            RETURNING id, name, email
        `;

        const newUser = { ...result[0], isDemo: false };
        localStorage.setItem('current_user', JSON.stringify(newUser));
        return { success: true, user: newUser };
    } catch (error) {
        console.error("Reg error:", error);
        if (error.message.includes('column "password"')) {
            return { success: false, message: "Database structure mismatch. Please drop the 'users' table in Neon Console." };
        }
        return { success: false, message: "Registration failed." };
    }
};

export const loginUser = async (credentials) => {
    try {
        const { email, password } = credentials;
        const users = await sql`
            SELECT id, name, email FROM users 
            WHERE email = ${email} AND password = ${password}
        `;

        if (users.length > 0) {
            const user = { ...users[0], isDemo: false };
            localStorage.setItem('current_user', JSON.stringify(user));
            return { success: true, user };
        }
        return { success: false, message: "Invalid email or password." };
    } catch (error) {
        return { success: false, message: "Login failed." };
    }
};

export const getCurrentUser = () => JSON.parse(localStorage.getItem('current_user'));
export const logoutUser = () => { localStorage.removeItem('current_user'); return { success: true }; };