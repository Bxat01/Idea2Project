## 🚀  Idea2Project Platform - v0.1.0 – Initial Demo
🌐 Live Demo: https://idea2projectdemo.onrender.com
Welcome Team! This project is a comprehensive platform designed to help developers generate project ideas, track their progress, and monitor platform analytics geographically.

📋 System Overview
The system follows a Client-Server architecture:

Frontend: React (Vite) + Tailwind CSS.

Backend: Node.js + Express.js.

Database: PostgreSQL (Hosted on Neon DB).

Core Features: Real-time GeoIP visitor tracking, project lifecycle management, and an Admin Analytics dashboard.

🛠 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v18.0.0 or higher)

npm or yarn

A Neon.tech account (or any PostgreSQL instance) for database hosting.

⚙️ Environment Setup
1. Clone the Repository
Bash
git clone https://github.com/Bxat01/Idea2ProjectDmoHste.git
cd Idea2ProjectDmoHste
2. Backend Configuration
Navigate to the root directory and install dependencies:

Bash
npm install
Create a .env file in the root directory and add your credentials:


PORT=5000
VITE_DATABASE_URL=your_postgres_connection_string
3. Frontend Configuration
Ensure the frontend dependencies are installed:

Bash
# If frontend is in a specific folder, cd into it first
npm install
Create a .env file in the frontend directory:


VITE_API_URL=http://localhost:5000
🚀 Execution
Start the Backend:
Bash
node server.js
# Or using nodemon for development
npm run dev 
Start the Frontend:
Bash
npm run dev
The application will be available at http://localhost:3000.
```bash
📂 Project Structure
Plaintext
├── server.js            # Main Express server and API routes
├── package.json         # Backend dependencies (Express, PG, GeoIP-lite)
├── src/                 # React Frontend source files
│   ├── pages/           # Application views (Analytics, Dashboard, etc.)
│   ├── services/        # API communication logic (api.js)
│   └── components/      # Reusable UI components
└── .env                 # Environment variables (Git-ignored)
```
🔐 Test Credentials
For rapid testing of the authentication and private routes, use:

```bash

Email: demo@idea2project.com
------------------------------
Password: demo123
```
📝 Technical Notes for the Team
CORS: Currently configured to origin: '*'. This should be restricted to specific domains in the production environment.

Geo-Tracking: The middleware automatically logs visits to the visitor_logs table. It uses geoip-lite for IP-to-location mapping.

Data Persistence: Ensure the PostgreSQL schema includes visitor_logs and site_stats tables before running the tracking middleware.

API Endpoint: The primary endpoint for analytics is /api/admin/analytics.

Happy Coding! 💻 Idea2Project Dev Team
## 🖼️ Screenshots

![Dashboard](https://res.cloudinary.com/ddqedxovk/image/upload/v1769904620/fat4b4kidoddrmzcyvfr.png)
![Analytics](https://res.cloudinary.com/ddqedxovk/image/upload/v1769904620/imfghll44f7lumir15bz.png)

