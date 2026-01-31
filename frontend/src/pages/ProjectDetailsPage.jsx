import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, Share2, Download, Edit, Trash2, 
    Layout, Rocket, Code, CheckCircle2, Clock, 
    ExternalLink, Globe, Database, ListOrdered, 
    Calendar, Users, CheckCircle, Circle, 
    ChevronRight, Sparkles, Cpu, Layers, 
    Zap, BarChart3, Shield, Mail, Home,
    BarChart, FolderOpen, Grid, User,
    Settings, LogOut, ChevronDown, Languages,
    Check as CheckIcon, Plus, Briefcase,
    ChevronUp, Folder, FileText
} from 'lucide-react';

import { getProject, deleteProject, getProjects, updateProjectProgress } from '../services/projectService.js';
import { getCurrentUser, logoutUser } from '../services/authService.js';
import '../styles/project-details.css';
import ProjectChat from '../components/ChatComponent.jsx';

const ProjectDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [checkedSteps, setCheckedSteps] = useState({});
    const [activeLanguage, setActiveLanguage] = useState("en");
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showGenerateProjects, setShowGenerateProjects] = useState(true);
    const [user, setUser] = useState(null);
    const [userProjects, setUserProjects] = useState([]);
    const [syncStatus, setSyncStatus] = useState(null);

    // دعم متعدد اللغات
    const translations = {
        en: {
            dashboard: "Dashboard",
            generateProject: "Generate Project",
            viewPortfolio: "View Portfolio",
            browseTemplates: "Browse Templates",
            analytics: "Analytics",
            editProfile: "Edit Profile",
            settings: "Settings",
            logout: "Logout",
            myProjects: "My Projects",
            recentProjects: "Recent Projects",
            allProjects: "All Projects",
            newProject: "New Project",
            currentProject: "Current Project",
            completed: "Completed",
            inProgress: "In Progress"
        },
        ar: {
            dashboard: "لوحة التحكم",
            generateProject: "إنشاء مشروع",
            viewPortfolio: "عرض المحفظة",
            browseTemplates: "تصفح القوالب",
            analytics: "التحليلات",
            editProfile: "تعديل الملف الشخصي",
            settings: "الإعدادات",
            logout: "تسجيل الخروج",
            myProjects: "مشاريعي",
            recentProjects: "المشاريع الأخيرة",
            allProjects: "جميع المشاريع",
            newProject: "مشروع جديد",
            currentProject: "المشروع الحالي",
            completed: "مكتمل",
            inProgress: "قيد التنفيذ"
        },
        fr: {
            dashboard: "Tableau de bord",
            generateProject: "Générer un projet",
            viewPortfolio: "Voir le portfolio",
            browseTemplates: "Parcourir les modèles",
            analytics: "Analytiques",
            editProfile: "Modifier le profil",
            settings: "Paramètres",
            logout: "Déconnexion",
            myProjects: "Mes projets",
            recentProjects: "Projets récents",
            allProjects: "Tous les projets",
            newProject: "Nouveau projet",
            currentProject: "Projet actuel",
            completed: "Terminé",
            inProgress: "En cours"
        },
        es: {
            dashboard: "Panel de control",
            generateProject: "Generar proyecto",
            viewPortfolio: "Ver portafolio",
            browseTemplates: "Explorar plantillas",
            analytics: "Analíticas",
            editProfile: "Editar perfil",
            settings: "Configuración",
            logout: "Cerrar sesión",
            myProjects: "Mis proyectos",
            recentProjects: "Proyectos recientes",
            allProjects: "Todos los proyectos",
            newProject: "Nuevo proyecto",
            currentProject: "Proyecto actual",
            completed: "Completado",
            inProgress: "En progreso"
        }
    };

    const t = translations[activeLanguage];
    const isRTL = ["ar"].includes(activeLanguage);

    const languages = [
        { code: "en", name: "English", dir: "ltr" },
        { code: "ar", name: "العربية", dir: "rtl" },
        { code: "fr", name: "Français", dir: "ltr" },
        { code: "es", name: "Español", dir: "ltr" }
    ];

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        setLoading(true);
        try {
            const userData = getCurrentUser();
            if (!userData) { 
                navigate('/login'); 
                return; 
            }
            setUser(userData);

            const projectData = await getProject(id);
            setProject(projectData);
            
            const savedChecks = JSON.parse(localStorage.getItem(`project-${id}-checks`) || '{}');
            setCheckedSteps(savedChecks);

            const projectsData = await getProjects();
            setUserProjects(projectsData.projects || []);
            
        } catch (error) {
            console.error('Error loading data:', error);
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            try {
                await deleteProject(id);
                navigate('/dashboard');
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        }
    };

const toggleStepCheck = async (stepIndex) => {
    const newStatus = !checkedSteps[stepIndex];
    const newChecks = { ...checkedSteps, [stepIndex]: newStatus };
    setCheckedSteps(newChecks);
    localStorage.setItem(`project-${id}-checks`, JSON.stringify(newChecks));
    const totalStepsCount = project.roadmap?.length || project.implementation_steps?.length || 0;
    const completedStepsCount = Object.values(newChecks).filter(Boolean).length;
    const newPercentage = totalStepsCount === 0 ? 0 : Math.round((completedStepsCount / totalStepsCount) * 100);

    setSyncStatus('saving');

    try {
        await updateProjectProgress(id, newPercentage); 
        setProject(prev => ({ ...prev, completion_percentage: newPercentage }));
        setSyncStatus('saved');
        setTimeout(() => setSyncStatus(null), 3000); 

    } catch (error) {
        console.error("Sync failed:", error);
        setSyncStatus('error');
        setTimeout(() => setSyncStatus(null), 3000);
    }
};

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    const getAvatarInitials = (name, email) => {
        if (name && name.trim()) {
            const nameParts = name.split(' ');
            if (nameParts.length > 1) {
                return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
            }
            return name.substring(0, 2).toUpperCase();
        } else if (email && email.trim()) {
            return email[0].toUpperCase();
        }
        return 'U';
    };

    const getAvatarColor = (name) => {
        if (!name) return '#4F46E5';
        
        const colors = [
            '#4F46E5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
            '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
        ];
        
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        return colors[Math.abs(hash) % colors.length];
    };

    const getStatusColor = (status) => {
        const colors = {
            'completed': 'bg-green-100 text-green-800 border-green-200',
            'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
            'planned': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'on-hold': 'bg-gray-100 text-gray-800 border-gray-200',
            'cancelled': 'bg-red-100 text-red-800 border-red-200'
        };
        return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
    };

    const getTechCategory = (tech) => {
        const frontend = ['react', 'vue', 'angular', 'nextjs', 'svelte', 'tailwind', 'bootstrap'];
        const backend = ['node', 'express', 'django', 'spring', 'laravel', 'fastapi'];
        const database = ['mongodb', 'postgresql', 'mysql', 'redis', 'firebase', 'supabase'];
        const devops = ['docker', 'kubernetes', 'aws', 'azure', 'github actions'];
        
        const techLower = tech.toLowerCase();
        if (frontend.some(f => techLower.includes(f))) return 'frontend';
        if (backend.some(b => techLower.includes(b))) return 'backend';
        if (database.some(d => techLower.includes(d))) return 'database';
        if (devops.some(d => techLower.includes(d))) return 'devops';
        return 'other';
    };

    const getTechColor = (category) => {
        const colors = {
            'frontend': 'bg-indigo-100 text-indigo-800 border-indigo-200',
            'backend': 'bg-emerald-100 text-emerald-800 border-emerald-200',
            'database': 'bg-amber-100 text-amber-800 border-amber-200',
            'devops': 'bg-purple-100 text-purple-800 border-purple-200',
            'other': 'bg-gray-100 text-gray-800 border-gray-200'
        };
        return colors[category];
    };

    const getProjectStatus = (projectItem) => {
        const progress = projectItem.completion_percentage || projectItem.progress || 0;
        if (progress === 100) return 'completed';
        if (progress > 0) return 'in-progress';
        return 'planned';
    };

    const getProjectStatusText = (projectItem) => {
        const status = getProjectStatus(projectItem);
        return t[status] || status;
    };

    const getProjectStatusColor = (projectItem) => {
        const status = getProjectStatus(projectItem);
        switch(status) {
            case 'completed': return '#10b981';
            case 'in-progress': return '#f59e0b';
            default: return '#94a3b8';
        }
    };

    const TabButton = ({ name, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(name)}
            className={`px-4 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:-translate-y-0.5 ${
                activeTab === name 
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:shadow'
            }`}
        >
            <Icon className="h-5 w-5" />
            {label}
            {activeTab === name && (
                <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            )}
        </button>
    );

    const SkeletonLoader = () => (
        <div className="min-h-screen bg-gray-50 animate-pulse">
            <div className="bg-white border-b p-6">
                <div className="max-w-7xl mx-auto flex justify-between">
                    <div className="h-10 w-64 bg-gray-200 rounded"></div>
                    <div className="h-10 w-32 bg-gray-200 rounded"></div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {[...Array(3)].map((_, i) => <div key={i} className="h-40 bg-white rounded-xl border"></div>)}
                </div>
                <div className="space-y-4">
                    {[...Array(2)].map((_, i) => <div key={i} className="h-40 bg-white rounded-xl border"></div>)}
                </div>
            </div>
        </div>
    );

    if (loading) return <SkeletonLoader />;
    if (!project) return null;
    
    const totalSteps = project.roadmap?.length || project.implementation_steps?.length || 0;
    const completedSteps = Object.values(checkedSteps).filter(Boolean).length;
    const calculatedProgress = totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100);

    const otherProjects = userProjects.filter(p => p.id !== id).slice(0, 5);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30" style={{
            fontFamily: isRTL ? "'Noto Sans Arabic', 'Inter', sans-serif" : "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            direction: isRTL ? "rtl" : "ltr"
        }}>
            <div style={{
                backgroundColor: "#4F46E5",
                color: "white",
                padding: "10px 0",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "500",
                position: "sticky",
                top: 0,
                zIndex: 1000,
                boxShadow: "0 2px 10px rgba(79, 70, 229, 0.2)"
            }}>
                Demo Version - May contain some errors • Independent AI Developer - Built from scratch
                
            </div>

            <div style={{
                position: "fixed",
                left: isRTL ? "auto" : 0,
                right: isRTL ? 0 : "auto",
                top: "40px",
                width: "280px",
                height: "calc(100vh - 40px)",
                backgroundColor: "white",
                borderRight: isRTL ? "none" : "1px solid #e2e8f0",
                borderLeft: isRTL ? "1px solid #e2e8f0" : "none",
                padding: "20px 0",
                display: "flex",
                flexDirection: "column",
                zIndex: 900,
                boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
                overflowY: "auto"
            }}>
                {/* Logo */}
                <div style={{
                    padding: "0 20px 30px",
                    borderBottom: "1px solid #e2e8f0",
                    marginBottom: "20px"
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        cursor: "pointer"
                    }} onClick={() => navigate("/dashboard")}>
                        <div style={{
                            width: "40px",
                            height: "40px",
                            background: "linear-gradient(135deg, #4F46E5 0%, #7c3aed 100%)",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white"
                        }}>
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <div style={{
                                fontSize: "20px",
                                fontWeight: "800",
                                background: "linear-gradient(135deg, #4F46E5 0%, #7c3aed 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}>
                                RyderAI
                            </div>
                            <div style={{
                                fontSize: "12px",
                                color: "#94a3b8",
                                fontWeight: "500"
                            }}>
                                Project Details
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <div style={{ flex: 1, padding: "0 20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <button
                            onClick={() => navigate("/dashboard")}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "12px 16px",
                                backgroundColor: "transparent",
                                color: "#64748b",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "15px",
                                fontWeight: "500",
                                transition: "all 0.2s",
                                textAlign: isRTL ? "right" : "left",
                                borderRadius: "6px",
                                flexDirection: isRTL ? "row-reverse" : "row",
                                marginBottom: "10px"
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#f1f5f9";
                                e.target.style.color = "#4F46E5";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "transparent";
                                e.target.style.color = "#64748b";
                            }}
                        >
                            <Home size={18} />
                            {t.dashboard}
                        </button>
                        
                        <div style={{ marginBottom: "15px" }}>
                            <button
                                onClick={() => setShowGenerateProjects(!showGenerateProjects)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    padding: "12px 16px",
                                    backgroundColor: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f1f5f9"}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                            >
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}>
                                    <Plus size={18} color="#4F46E5" />
                                    <span style={{
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        color: "#4F46E5"
                                    }}>
                                        {t.generateProject}
                                    </span>
                                </div>
                                <ChevronUp 
                                    size={18} 
                                    color="#4F46E5" 
                                    style={{
                                        transform: showGenerateProjects ? 'rotate(0deg)' : 'rotate(180deg)',
                                        transition: 'transform 0.3s'
                                    }}
                                />
                            </button>
                            
                            {showGenerateProjects && (
                                <div style={{
                                    marginTop: "5px",
                                    padding: "0 12px",
                                    maxHeight: "300px",
                                    overflowY: "auto"
                                }}>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        padding: "10px 12px",
                                        backgroundColor: "#EEF2FF",
                                        border: "2px solid #4F46E5",
                                        borderRadius: "8px",
                                        marginBottom: "8px",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                        flexDirection: isRTL ? "row-reverse" : "row"
                                    }}>
                                        <div style={{
                                            width: "8px",
                                            height: "8px",
                                            backgroundColor: "#4F46E5",
                                            borderRadius: "50%"
                                        }}></div>
                                        <Folder size={16} color="#4F46E5" />
                                        <div style={{ 
                                            flex: 1, 
                                            textAlign: isRTL ? "right" : "left",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap"
                                        }}>
                                            <div style={{
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                color: "#4F46E5"
                                            }}>
                                                {project.project_name}
                                            </div>
                                            <div style={{
                                                fontSize: "12px",
                                                color: "#7c3aed",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "4px",
                                                flexDirection: isRTL ? "row-reverse" : "row"
                                            }}>
                                                <div style={{
                                                    width: "6px",
                                                    height: "6px",
                                                    backgroundColor: getProjectStatusColor(project),
                                                    borderRadius: "50%"
                                                }}></div>
                                                {t.currentProject}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button
                                        onClick={() => navigate("/generate")}
                                        style={{
                                            width: "100%",
                                            padding: "10px 12px",
                                            backgroundColor: "transparent",
                                            border: "1px dashed #cbd5e1",
                                            borderRadius: "8px",
                                            color: "#64748b",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            justifyContent: "center",
                                            fontSize: "13px",
                                            fontWeight: "500",
                                            marginTop: "8px",
                                            transition: "all 0.2s",
                                            flexDirection: isRTL ? "row-reverse" : "row"
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.backgroundColor = "#f1f5f9";
                                            e.target.style.borderColor = "#4F46E5";
                                            e.target.style.color = "#4F46E5";
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.backgroundColor = "transparent";
                                            e.target.style.borderColor = "#cbd5e1";
                                            e.target.style.color = "#64748b";
                                        }}
                                    >
                                        <Plus size={14} />
                                        {t.newProject}
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        <button
                            onClick={() => navigate("/portfolio")}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "12px 16px",
                                backgroundColor: "transparent",
                                color: "#64748b",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "15px",
                                fontWeight: "500",
                                transition: "all 0.2s",
                                textAlign: isRTL ? "right" : "left",
                                borderRadius: "6px",
                                flexDirection: isRTL ? "row-reverse" : "row",
                                marginBottom: "10px"
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#f1f5f9";
                                e.target.style.color = "#4F46E5";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "transparent";
                                e.target.style.color = "#64748b";
                            }}
                        >
                            <FolderOpen size={18} />
                            {t.viewPortfolio}
                        </button>
                        
                        <button
                            onClick={() => navigate("/analytics")}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "12px 16px",
                                backgroundColor: "transparent",
                                color: "#64748b",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "15px",
                                fontWeight: "500",
                                transition: "all 0.2s",
                                textAlign: isRTL ? "right" : "left",
                                borderRadius: "6px",
                                flexDirection: isRTL ? "row-reverse" : "row",
                                marginBottom: "10px"
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#f1f5f9";
                                e.target.style.color = "#4F46E5";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "transparent";
                                e.target.style.color = "#64748b";
                            }}
                        >
                            <BarChart size={18} />
                            {t.analytics}
                        </button>
                        
                        <button
                            onClick={() => navigate("/templates")}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "12px 16px",
                                backgroundColor: "transparent",
                                color: "#64748b",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "15px",
                                fontWeight: "500",
                                transition: "all 0.2s",
                                textAlign: isRTL ? "right" : "left",
                                borderRadius: "6px",
                                flexDirection: isRTL ? "row-reverse" : "row"
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#f1f5f9";
                                e.target.style.color = "#4F46E5";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "transparent";
                                e.target.style.color = "#64748b";
                            }}
                        >
                            <Grid size={18} />
                            {t.browseTemplates}
                        </button>
                    </div>
                </div>

                {/* Language Selector in Sidebar */}
                <div style={{ padding: "20px", borderTop: "1px solid #e2e8f0" }}>
                    <div style={{ position: "relative" }}>
                        <button
                            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "10px 14px",
                                backgroundColor: "#f8fafc",
                                border: "1px solid #e2e8f0",
                                borderRadius: "8px",
                                cursor: "pointer",
                                color: "#64748b",
                                fontSize: "14px",
                                fontWeight: "500",
                                transition: "all 0.2s",
                                width: "100%",
                                flexDirection: isRTL ? "row-reverse" : "row"
                            }}
                            onMouseOver={(e) => e.target.style.borderColor = "#4F46E5"}
                            onMouseOut={(e) => e.target.style.borderColor = "#e2e8f0"}
                        >
                            <Languages size={16} />
                            <span style={{ flex: 1, textAlign: isRTL ? "right" : "left" }}>
                                {languages.find(l => l.code === activeLanguage)?.name}
                            </span>
                            <ChevronDown size={16} />
                        </button>

                        {showLanguageDropdown && (
                            <div style={{
                                position: "absolute",
                                bottom: "100%",
                                [isRTL ? "right" : "left"]: 0,
                                backgroundColor: "white",
                                borderRadius: "8px",
                                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                                minWidth: "160px",
                                zIndex: 1000,
                                marginBottom: "5px",
                                border: "1px solid #e5e7eb",
                                overflow: "hidden"
                            }}>
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setActiveLanguage(lang.code);
                                            setShowLanguageDropdown(false);
                                        }}
                                        style={{
                                            width: "100%",
                                            padding: "10px 14px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            backgroundColor: activeLanguage === lang.code ? "#f3f4f6" : "transparent",
                                            border: "none",
                                            cursor: "pointer",
                                            fontSize: "14px",
                                            color: "#4b5563",
                                            transition: "all 0.2s",
                                            textAlign: isRTL ? "right" : "left",
                                            flexDirection: isRTL ? "row-reverse" : "row"
                                        }}
                                        onMouseOver={(e) => e.target.style.backgroundColor = "#f3f4f6"}
                                        onMouseOut={(e) => e.target.style.backgroundColor = activeLanguage === lang.code ? "#f3f4f6" : "transparent"}
                                    >
                                        <span>{lang.name}</span>
                                        {activeLanguage === lang.code && <CheckIcon size={16} color="#4F46E5" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{
                marginLeft: isRTL ? "0" : "280px",
                marginRight: isRTL ? "280px" : "0",
            }}>
                <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div className="flex items-start gap-4">
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
                                >
                                    <ArrowLeft className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
                                </button>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                                            {project.project_name}
                                        </h1>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                                            {project.status?.charAt(0).toUpperCase() + project.status?.slice(1)}
                                        </span>
                                    </div>
                                    <p className="text-gray-600">{project.description}</p>
                                </div>
                                <div className="bg-indigo-900/5 border-y border-indigo-100 px-4 py-2 flex items-center gap-3 overflow-hidden">
                                    <div className="flex h-2 w-2 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                    </div>
                                    <span className="text-[11px] font-bold text-indigo-700 tracking-widest uppercase animate-pulse">
                                        Ryder AI Engine: Analyzing project architecture for {project.project_name}...
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <div style={{ position: "relative" }}>
                                    <div 
                                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            backgroundColor: getAvatarColor(user?.name || user?.email || ''),
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: "16px",
                                            cursor: "pointer",
                                            transition: "all 0.2s",
                                            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                            border: "2px solid white"
                                        }}
                                    >
                                        {getAvatarInitials(user?.name || '', user?.email || '')}
                                    </div>
                                    
                                    <div style={{
                                        position: "absolute",
                                        bottom: "2px",
                                        [isRTL ? "left" : "right"]: "2px",
                                        width: "10px",
                                        height: "10px",
                                        backgroundColor: "#10b981",
                                        borderRadius: "50%",
                                        border: "2px solid white"
                                    }}></div>
                                    
                                    {showProfileMenu && (
                                        <>
                                            <div style={{
                                                position: "absolute",
                                                top: "50px",
                                                [isRTL ? "left" : "right"]: "0",
                                                backgroundColor: "white",
                                                borderRadius: "10px",
                                                boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                                                width: "240px",
                                                zIndex: "1000",
                                                border: "1px solid #e5e7eb",
                                                overflow: "hidden"
                                            }}>
                                                <div style={{
                                                    padding: "15px",
                                                    backgroundColor: "#f8fafc",
                                                    borderBottom: "1px solid #e5e7eb",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "12px",
                                                    flexDirection: isRTL ? "row-reverse" : "row"
                                                }}>
                                                    <div style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        backgroundColor: getAvatarColor(user?.name || user?.email || ''),
                                                        borderRadius: "50%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        color: "white",
                                                        fontWeight: "bold",
                                                        fontSize: "20px"
                                                    }}>
                                                        {getAvatarInitials(user?.name || '', user?.email || '')}
                                                    </div>
                                                    <div style={{ textAlign: isRTL ? "right" : "left" }}>
                                                        <h4 style={{ margin: "0 0 5px 0", color: "#1f2937", fontSize: "14px" }}>
                                                            {user?.name || "User"}
                                                        </h4>
                                                        <p style={{ 
                                                            margin: "0", 
                                                            color: "#6b7280", 
                                                            fontSize: "12px",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "4px",
                                                            flexDirection: isRTL ? "row-reverse" : "row"
                                                        }}>
                                                            <Mail size={10} />
                                                            {user?.email || "No email"}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div style={{ padding: "8px 0" }}>
                                                    <button
                                                        onClick={() => {
                                                            navigate("/profile");
                                                            setShowProfileMenu(false);
                                                        }}
                                                        style={{
                                                            width: "100%",
                                                            padding: "10px 15px",
                                                            background: "none",
                                                            border: "none",
                                                            textAlign: isRTL ? "right" : "left",
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "8px",
                                                            color: "#4b5563",
                                                            transition: "all 0.2s",
                                                            fontSize: "13px",
                                                            flexDirection: isRTL ? "row-reverse" : "row"
                                                        }}
                                                        onMouseOver={(e) => e.target.style.backgroundColor = "#f3f4f6"}
                                                        onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                                                    >
                                                        <User size={16} />
                                                        {t.editProfile}
                                                    </button>
                                                    
                                                    <button
                                                        onClick={() => {
                                                            navigate("/settings");
                                                            setShowProfileMenu(false);
                                                        }}
                                                        style={{
                                                            width: "100%",
                                                            padding: "10px 15px",
                                                            background: "none",
                                                            border: "none",
                                                            textAlign: isRTL ? "right" : "left",
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "8px",
                                                            color: "#4b5563",
                                                            transition: "all 0.2s",
                                                            fontSize: "13px",
                                                            flexDirection: isRTL ? "row-reverse" : "row"
                                                        }}
                                                        onMouseOver={(e) => e.target.style.backgroundColor = "#f3f4f6"}
                                                        onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                                                    >
                                                        <Settings size={16} />
                                                        {t.settings}
                                                    </button>
                                                    
                                                    <button
                                                        onClick={handleLogout}
                                                        style={{
                                                            width: "100%",
                                                            padding: "10px 15px",
                                                            background: "none",
                                                            border: "none",
                                                            textAlign: isRTL ? "right" : "left",
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "8px",
                                                            color: "#ef4444",
                                                            transition: "all 0.2s",
                                                            borderTop: "1px solid #e5e7eb",
                                                            marginTop: "5px",
                                                            fontSize: "13px",
                                                            flexDirection: isRTL ? "row-reverse" : "row"
                                                        }}
                                                        onMouseOver={(e) => e.target.style.backgroundColor = "#fef2f2"}
                                                        onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                                                    >
                                                        <LogOut size={16} />
                                                        {t.logout}
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div 
                                                style={{
                                                    position: "fixed",
                                                    top: "0",
                                                    left: "0",
                                                    right: "0",
                                                    bottom: "0",
                                                    zIndex: "999"
                                                }}
                                                onClick={() => setShowProfileMenu(false)}
                                            />
                                        </>
                                    )}
                                </div>
                                
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-all duration-200 hover:shadow">
                                    <Share2 className="h-4 w-4" />
                                    <span className="hidden sm:inline">Share</span>
                                </button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-all duration-200 hover:shadow">
                                    <Download className="h-4 w-4" />
                                    <span className="hidden sm:inline">Export</span>
                                </button>
                                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow">
                                    <Edit className="h-4 w-4" />
                                    <span className="hidden sm:inline">Edit</span>
                                </button>
                                <button onClick={handleDelete} className="p-2 text-red-500 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-all">
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
<div className={`status-indicator ${syncStatus ? 'show' : 'hide'} ${syncStatus}`}>
    {syncStatus === 'saving' && <span>⏳ Syncing changes...</span>}
    {syncStatus === 'saved' && <span style={{color: '#10b981'}}>✅ Changes saved</span>}
    {syncStatus === 'error' && <span style={{color: '#ef4444'}}>❌ Sync failed</span>}
</div>
                        </div>
                    </div>
                </div>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                        <TabButton name="overview" label="Overview" icon={Layout} />
                        <TabButton name="roadmap" label="Roadmap" icon={Rocket} />
                        <TabButton name="stack" label="Tech Stack" icon={Code} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            {activeTab === 'overview' && (
                                <>
                                    <div className="relative overflow-hidden bg-white border border-indigo-100 rounded-2xl p-6 shadow-xl group hover:border-indigo-300 transition-all">
                                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl group-hover:bg-blue-50 transition-colors"></div>
                                        <div className="flex items-start gap-6 relative z-10">
                                            <div className="flex-shrink-0">
                                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-3 transition-transform">
                                                    <Cpu className="h-8 w-8 text-white animate-pulse" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <h3 className="text-xl font-black text-gray-900 tracking-tight">AI Strategic Analysis</h3>
                                                    <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full shadow-sm">CORE BY RYDER</span>
                                                </div>
                                                <p className="text-gray-700 text-lg leading-relaxed font-medium italic mb-4">
                                                    "Based on your {calculatedProgress}% progress, Ryder recommends focusing on {project.tech_stack?.[0]} optimization to maintain scalability."
                                                </p>
                                                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-semibold uppercase tracking-wider">
                                                    <span className="flex items-center gap-2 text-indigo-600"><Zap className="h-4 w-4" /> Optimized</span>
                                                    <span className="flex items-center gap-2 text-blue-600"><BarChart3 className="h-4 w-4" /> Scalability</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                        <h2 className="text-lg font-bold text-gray-900 mb-4">Project Description</h2>
                                        <p className="text-gray-600 leading-relaxed">{project.description}</p>
                                    </div>
                                </>
                            )}

                            {activeTab === 'roadmap' && (
                                <div className="space-y-4">
                                    {project.roadmap?.map((step, index) => (
                                        <div key={index} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${checkedSteps[index] ? 'bg-gray-50 border-gray-200' : 'bg-white border-blue-100 shadow-sm'}`}>
                                            <div className="flex items-center gap-4">
                                                <button onClick={() => toggleStepCheck(index)}>
                                                    <CheckCircle2 className={`h-6 w-6 ${checkedSteps[index] ? 'text-green-500' : 'text-gray-300'}`} />
                                                </button>
                                                <div>
                                                    <h3 className={`font-semibold ${checkedSteps[index] ? 'line-through text-gray-400' : 'text-gray-900'}`}>{step.title}</h3>
                                                    <p className="text-sm text-gray-500">{step.description || step.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'stack' && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {project.tech_stack?.map((tech, idx) => {
                                        const category = getTechCategory(tech);
                                        return (
                                            <div key={idx} className={`p-4 rounded-xl border text-center ${getTechColor(category)}`}>
                                                <p className="font-bold text-sm">{tech}</p>
                                                <p className="text-[10px] uppercase font-bold opacity-60 tracking-wider">{category}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-blue-500" /> Progress Stats
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-500">Completion</span>
                                            <span className="font-bold text-blue-600">{calculatedProgress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                                                style={{ width: `${calculatedProgress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Globe className="h-5 w-5 text-indigo-500" /> Links
                                </h3>
                                <button className="w-full py-2 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                                    View Live <ExternalLink className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* باقي الكود الأصلي */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex flex-wrap gap-2 mb-8 border-b pb-2">
                            <TabButton name="overview" label="Overview" icon={Rocket} />
                            <TabButton name="features" label="Features" icon={ListOrdered} />
                            <TabButton name="tech-stack" label="Tech Stack" icon={Code} />
                            <TabButton name="database" label="Database" icon={Database} />
                            <TabButton name="timeline" label="Timeline" icon={Calendar} />
                        </div>

                        <div className="mb-8">
                            <div className="relative bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-200/50 rounded-2xl p-6 backdrop-blur-sm">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-t-2xl"></div>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden border border-gray-100">
                                            <img 
                                                src="https://avatars.githubusercontent.com/u/193575606?v=4" 
                                                alt="Logo" 
                                                className="w-full h-full object-contain p-1" 
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h3 className="text-xl font-black text-gray-900 tracking-tight">AI Strategic Analysis</h3>
                                            <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold rounded-full shadow-sm uppercase tracking-wider">
                                                Powered by Ryder
                                            </span>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">
                                            {project.description}
                                        </p>
                                        <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <Cpu className="h-4 w-4" />
                                                Strategic Planning
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Zap className="h-4 w-4" />
                                                Optimized Architecture
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <BarChart3 className="h-4 w-4" />
                                                Scalability Focused
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                {activeTab === 'overview' && (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow transition-shadow duration-200">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-gray-600">Status</span>
                                                    <div className={`w-3 h-3 rounded-full ${project.status === 'completed' ? 'bg-green-500' : project.status === 'in-progress' ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
                                                </div>
                                                <p className="font-bold text-lg capitalize">{project.status}</p>
                                            </div>
                                            <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow transition-shadow duration-200">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-gray-600">Completion</span>
                                                    <Clock className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="font-bold text-lg">{calculatedProgress}%</p>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div 
                                                                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                                                            style={{ width: `${project.completion_percentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow transition-shadow duration-200">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-gray-600">Created</span>
                                                    <Calendar className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <p className="font-bold text-lg">
                                                    {new Date(project.created_at).toLocaleDateString('en-US', { 
                                                        month: 'short', 
                                                        day: 'numeric', 
                                                        year: 'numeric' 
                                                    })}
                                                </p>
                                            </div>
                                            <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow transition-shadow duration-200">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-gray-600">Last Updated</span>
                                                    <Calendar className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <p className="font-bold text-lg">
                                                    {new Date(project.updated_at).toLocaleDateString('en-US', { 
                                                        month: 'short', 
                                                        day: 'numeric', 
                                                        year: 'numeric' 
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                                            <div className="border-b p-6">
                                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                                    <ListOrdered className="h-5 w-5 text-blue-600" />
                                                    Implementation Timeline
                                                    <span className="text-sm font-normal text-gray-500 ml-auto">
                                                        {Object.values(checkedSteps).filter(Boolean).length} of {project.implementation_steps?.length} completed
                                                    </span>
                                                </h2>
                                            </div>
                                            <div className="p-6">
                                                <div className="relative">
                                                    <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                                                    
                                                    {project.implementation_steps?.map((step, index) => (
                                                        <div key={index} className="relative flex items-start gap-4 mb-8 last:mb-0 group">
                                                            <div className={`relative z-10 flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                                                checkedSteps[index] 
                                                                    ? 'bg-green-100 border-green-400 shadow-md shadow-green-100' 
                                                                    : 'bg-white border-gray-300 group-hover:border-blue-400'
                                                            }`}>
                                                                <button
                                                                    onClick={() => toggleStepCheck(index)}
                                                                    className="w-full h-full flex items-center justify-center"
                                                                >
                                                                    {checkedSteps[index] ? (
                                                                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                                                                    ) : (
                                                                        <Circle className="h-6 w-6 text-gray-400 group-hover:text-blue-400" />
                                                                    )}
                                                                </button>
                                                                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500">
                                                                    Step {step.step}
                                                                </span>
                                                            </div>
                                                            
                                                            <div className={`flex-1 p-4 rounded-xl border transition-all duration-300 ${
                                                                checkedSteps[index] 
                                                                    ? 'bg-green-50/50 border-green-200' 
                                                                    : 'bg-gray-50 border-gray-200 group-hover:bg-blue-50/30 group-hover:border-blue-200'
                                                            }`}>
                                                                <div className="flex items-start justify-between mb-2">
                                                                    <h3 className={`font-bold text-lg ${
                                                                        checkedSteps[index] ? 'text-green-800' : 'text-gray-900'
                                                                    }`}>
                                                                        {step.title}
                                                                    </h3>
                                                                    {checkedSteps[index] && (
                                                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                                                                            Completed
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className={`mb-3 ${
                                                                    checkedSteps[index] ? 'text-green-700' : 'text-gray-600'
                                                                }`}>
                                                                    {step.description}
                                                                </p>
                                                                    {!checkedSteps[index] && (
        <div className="flex items-center gap-2 mt-2 py-1 px-3 bg-amber-50 rounded-lg w-fit border border-amber-100">
            <Zap className="h-3 w-3 text-amber-500" />
            <span className="text-[10px] font-bold text-amber-700 uppercase">
                AI Complexity: {index % 2 === 0 ? 'High' : 'Medium'}
            </span>
        </div>
    )}
                                                                <div className="flex items-center gap-2 text-sm">
                                                                    <Clock className="h-4 w-4 text-gray-400" />
                                                                    <span className="text-gray-500">Estimated: 2-4 hours</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>

                            <div className="space-y-6">
                                <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                                    <div className="border-b p-4">
                                        <h3 className="font-bold text-gray-900">Actions</h3>
                                    </div>
                                    <div className="p-4 space-y-3">
                                        <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow">
                                            <Edit className="h-4 w-4" />
                                            Edit Project
                                        </button>
                                        <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-all duration-200 hover:shadow">
                                            <Download className="h-4 w-4" />
                                            Export as PDF
                                        </button>
                                        <button 
                                            onClick={handleDelete}
                                            className="w-full px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2 transition-all duration-200 hover:shadow"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Delete Project
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
                
                /* Arabic font */
                @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap');
                
                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                
                ::-webkit-scrollbar-track {
                    background: #f1f5f9;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 4px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
                
                /* Smooth transitions */
                * {
                    transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
                }
                
                /* Remove button focus outline */
                button:focus {
                    outline: none;
                }
            `}</style>
        </div>
    );
};

export default ProjectDetailsPage;