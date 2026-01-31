import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectGeneratorPage from "./pages/ProjectGeneratorPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import BrowseTemplatesPage from './pages/BrowseTemplatesPage'; 
import PortfolioPage from "./pages/PortfolioPage";
import PrivateRoute from "./components/common/PrivateRoute"; 
import AnalyticsPage from './pages/AnalyticsPage'
import { initializeDemoUser } from "./services/authService";
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://idea2project.onrender.com';

function App() {
    useEffect(() => {
        initializeDemoUser();

        fetch(`${API_BASE_URL}/api/health`)
            .then(() => console.log("✅ Visit tracked successfully at:", API_BASE_URL))
            .catch(err => console.error("❌ Tracking failed. API URL:", API_BASE_URL, err));
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                
                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <DashboardPage />
                    </PrivateRoute>
                } />
                
                <Route path="/generate" element={
                    <PrivateRoute>
                        <ProjectGeneratorPage />
                    </PrivateRoute>
                } />
                
                <Route path="/project/:id" element={
                    <PrivateRoute>
                        <ProjectDetailsPage />
                    </PrivateRoute>
                } />
                
                <Route path="/portfolio" element={
                    <PrivateRoute>
                        <PortfolioPage />
                    </PrivateRoute>
                } />
                                <Route path="/templates" element={
                    <PrivateRoute>
                        <BrowseTemplatesPage />
                    </PrivateRoute>
                } />

                 <Route path="/analytics" element={
                 <PrivateRoute>
                         <AnalyticsPage />
                </PrivateRoute>
                } />
                
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}


export default App;
