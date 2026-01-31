import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects } from '../services/projectService';
import { getCurrentUser, logoutUser } from '../services/authService';
import { 
  User, 
  Settings, 
  LogOut, 
  Plus, 
  Folder, 
  RefreshCw, 
  CheckCircle,
  TrendingUp,
  Target,
  FileText,
  Download,
  Eye,
  Grid,
  Database,
  Server,
  Code,
  Globe,
  Clock,
  Mail,
  Sparkles,
  Zap,
  Briefcase,
  Award,
  ChevronDown,
  Languages,
  Check,
  Home,
  BarChart,
  FolderOpen,
  Archive,
  Calendar,
  Users as UsersIcon,
  Shield,
  Bell,
  HelpCircle
} from 'lucide-react';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [activeLanguage, setActiveLanguage] = useState("en");
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

    const translations = {
        en: {
            welcome: "Welcome",
            dashboardTitle: "Dashboard",
            
            totalProjects: "Total Projects",
            inProgress: "In Progress",
            completedStat: "Completed",
            successRate: "Success Rate",
            
            quickActions: "Quick Actions",
            generateProject: "Generate Project",
            viewPortfolio: "View Portfolio",
            browseTemplates: "Browse Templates",
            exportProjects: "Export Projects",
            
            yourRecentProjects: "Your Recent Projects",
            viewAllProjects: "View All Projects",
            total: "total",
            noProjectsYet: "No projects yet",
            startByCreating: "Start by creating your first project!",
            createFirstProject: "Create Your First Project",
            
            completedStatus: "Completed",
            inProgressStatus: "In Progress",
            planning: "Planning",
            
            created: "Created",
            progress: "Progress",
            noDescription: "No description provided",
            
            editProfile: "Edit Profile",
            settings: "Settings",
            logout: "Logout",
            
            newProject: "New Project",
            
            templatesComingSoon: "Templates feature coming soon!",
            exportComingSoon: "Export feature coming soon!",
            
            demoNotice: "Demo Version - May contain some errors",
            developerNotice: "Independent AI Developer - Built from scratch",
            
            upcomingFeatures: "Upcoming Full Version Features",
            uploadDescription: "Upload your project files and let AI optimize the code for you.",
            shareDescription: "Publish and share your projects with other developers instantly.",
            comingSoon: "Coming Soon"
        },
        ar: {
            welcome: "مرحباً",
            dashboardTitle: "لوحة التحكم",
            
            totalProjects: "إجمالي المشاريع",
            inProgress: "قيد التنفيذ",
            completedStat: "مكتمل",
            successRate: "معدل النجاح",
            
            quickActions: "إجراءات سريعة",
            generateProject: "إنشاء مشروع",
            viewPortfolio: "عرض المحفظة",
            browseTemplates: "تصفح القوالب",
            exportProjects: "تصدير المشاريع",
            
            yourRecentProjects: "مشاريعك الأخيرة",
            viewAllProjects: "عرض كل المشاريع",
            total: "الإجمالي",
            noProjectsYet: "لا توجد مشاريع بعد",
            startByCreating: "ابدأ بإنشاء أول مشروع لك!",
            createFirstProject: "أنشئ مشروعك الأول",
            
            completedStatus: "مكتمل",
            inProgressStatus: "قيد التنفيذ",
            planning: "قيد التخطيط",
            
            created: "تم الإنشاء",
            progress: "التقدم",
            noDescription: "لا يوجد وصف",
            
            editProfile: "تعديل الملف الشخصي",
            settings: "الإعدادات",
            logout: "تسجيل الخروج",
            
            newProject: "مشروع جديد",
            
            templatesComingSoon: "ميزة القوالب قريباً!",
            exportComingSoon: "ميزة التصدير قريباً!",
            
            demoNotice: "نسخة تجريبية - قد تحتوي على بعض الأخطاء",
            developerNotice: "مطور ذكاء اصطناعي مستقل - مبني من الصفر",
            
            upcomingFeatures: "المميزات القادمة في النسخة الكاملة",
            uploadDescription: "ارفع ملفات مشروعك وسيقوم الذكاء الاصطناعي بتحسين الكود لك تلقائياً.",
            shareDescription: "انشر مشاريعك وشاركها مع المطورين الآخرين بضغطة زر.",
            comingSoon: "قريباً"
        },
        fr: {
            welcome: "Bienvenue",
            dashboardTitle: "Tableau de bord",
            
            totalProjects: "Projets totaux",
            inProgress: "En cours",
            completedStat: "Terminé",
            successRate: "Taux de réussite",
            
            quickActions: "Actions rapides",
            generateProject: "Générer un projet",
            viewPortfolio: "Voir le portfolio",
            browseTemplates: "Parcourir les modèles",
            exportProjects: "Exporter les projets",
            
            yourRecentProjects: "Vos projets récents",
            viewAllProjects: "Voir tous les projets",
            total: "total",
            noProjectsYet: "Aucun projet pour l'instant",
            startByCreating: "Commencez par créer votre premier projet!",
            createFirstProject: "Créez votre premier projet",
            
            completedStatus: "Terminé",
            inProgressStatus: "En cours",
            planning: "Planification",
            
            created: "Créé",
            progress: "Progression",
            noDescription: "Aucune description fournie",
            
            editProfile: "Modifier le profil",
            settings: "Paramètres",
            logout: "Déconnexion",
            
            newProject: "Nouveau projet",
            
            templatesComingSoon: "Fonctionnalité des modèles bientôt disponible!",
            exportComingSoon: "Fonctionnalité d'exportation bientôt disponible!",
            
            demoNotice: "Version de démonstration - Peut contenir des erreurs",
            developerNotice: "Développeur IA indépendant - Construit à partir de zéro",
            
            upcomingFeatures: "Fonctionnalités à venir dans la version complète",
            uploadDescription: "Téléchargez vos fichiers de projet et laissez l'IA optimiser le code pour vous.",
            shareDescription: "Publiez et partagez vos projets avec d'autres développeurs instantanément.",
            comingSoon: "Bientôt disponible"
        },
        es: {
            welcome: "Bienvenido",
            dashboardTitle: "Panel de control",
            
            totalProjects: "Proyectos totales",
            inProgress: "En progreso",
            completedStat: "Completado",
            successRate: "Tasa de éxito",
            
            quickActions: "Acciones rápidas",
            generateProject: "Generar proyecto",
            viewPortfolio: "Ver portafolio",
            browseTemplates: "Explorar plantillas",
            exportProjects: "Exportar proyectos",
            
            yourRecentProjects: "Tus proyectos recientes",
            viewAllProjects: "Ver todos los proyectos",
            total: "total",
            noProjectsYet: "Aún no hay proyectos",
            startByCreating: "¡Comienza creando tu primer proyecto!",
            createFirstProject: "Crea tu primer proyecto",
            
            completedStatus: "Completado",
            inProgressStatus: "En progreso",
            planning: "Planificación",
            
            created: "Creado",
            progress: "Progreso",
            noDescription: "No hay descripción disponible",
            
            editProfile: "Editar perfil",
            settings: "Configuración",
            logout: "Cerrar sesión",
            
            newProject: "Nuevo proyecto",
            
            templatesComingSoon: "¡Funcionalidad de plantillas próximamente!",
            exportComingSoon: "¡Funcionalidad de exportación próximamente!",
            
            demoNotice: "Versión de demostración - Puede contener errores",
            developerNotice: "Desarrollador de IA independiente - Construido desde cero",
            
            upcomingFeatures: "Próximas características en la versión completa",
            uploadDescription: "Sube tus archivos de proyecto y deja que la IA optimice el código por ti.",
            shareDescription: "Publica y comparte tus proyectos con otros desarrolladores al instante.",
            comingSoon: "Próximamente"
        }
    };

    const t = translations[activeLanguage] || translations.en;
    const isRTL = ["ar"].includes(activeLanguage);

    const languages = [
        { code: "en", name: "English", dir: "ltr" },
        { code: "ar", name: "العربية", dir: "rtl" },
        { code: "fr", name: "Français", dir: "ltr" },
        { code: "es", name: "Español", dir: "ltr" }
    ];

const loadData = useCallback(async () => {
    setLoading(true);
    try {
        const userData = getCurrentUser();
        if (!userData) { 
            navigate('/login'); 
            return; 
        }
        setUser(userData);

        let finalProjects = [];

        if (userData.email === "demo@idea2project.com") {
            const localData = localStorage.getItem("demo_projects");
            const localProjects = localData ? JSON.parse(localData) : [];

            const serverData = await getProjects();
            const serverProjects = Array.isArray(serverData) ? serverData : (serverData?.projects || []);

            finalProjects = [...localProjects, ...serverProjects];
        } else {
            const projectsData = await getProjects();
            finalProjects = Array.isArray(projectsData) ? projectsData : (projectsData?.projects || []);
        }

        setProjects(finalProjects);

    } catch (error) {
        console.error("Error loading dashboard data:", error);
        setProjects([]);
    } finally {
        setLoading(false);
    }
}, [navigate]);

    useEffect(() => {
    const fetchRealStats = async () => {
        try {
            const response = await fetch(`${API_URL}/api/projects/stats`); 
            const data = await response.json();
        } catch (error) {
            console.log("Using demo data because server is not responding");
        }
    };
    
    loadData();
    fetchRealStats();
}, []);

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    const getAvatarInitials = useCallback((name, email) => {
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
    }, []);

    const getAvatarColor = useCallback((name) => {
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
    }, []);

    const calculateStats = () => {
        const total = projects.length;

        const inProgress = projects.filter(p => {
            const status = String(p.status || "").toLowerCase();
            const percentage = Number(p.completion_percentage || 0);
            
            return status.includes('progress') || (percentage > 0 && percentage < 100);
        }).length;

        const completed = projects.filter(p => {
            const status = String(p.status || "").toLowerCase();
            const percentage = Number(p.completion_percentage || 0);
            
            return status === 'completed' || percentage === 100;
        }).length;

        const successRate = total > 0 ? Math.round((completed / total) * 100) : 0;

        return [
            { 
                title: t.totalProjects, 
                value: total, 
                color: "#4F46E5", 
                icon: <Folder size={24} />,
                bgColor: "#EEF2FF"
            },
            { 
                title: t.inProgress, 
                value: inProgress, 
                color: "#f59e0b", 
                icon: <RefreshCw size={24} />,
                bgColor: "#FEF3C7"
            },
            { 
                title: t.completedStat, 
                value: completed, 
                color: "#10b981", 
                icon: <CheckCircle size={24} />,
                bgColor: "#D1FAE5"
            },
            { 
                title: t.successRate, 
                value: `${successRate}%`, 
                color: "#8b5cf6", 
                icon: <TrendingUp size={24} />,
                bgColor: "#EDE9FE"
            }
        ];
    };

    const quickActions = [
        { 
            label: t.generateProject, 
            icon: <Sparkles size={20} />, 
            onClick: () => navigate("/generate") 
        },
        { 
            label: t.viewPortfolio, 
            icon: <Briefcase size={20} />, 
            onClick: () => navigate("/portfolio") 
        },
        { 
            label: t.browseTemplates, 
            icon: <Grid size={20} />, 
            onClick: () => navigate("/templates")  
        },
        { 
            label: t.exportProjects, 
            icon: <Download size={20} />, 
            onClick: () => alert(t.exportComingSoon) 
        }
    ];

    const techIcons = {
        "React": <Globe size={16} />,
        "Node.js": <Server size={16} />,
        "MongoDB": <Database size={16} />,
        "Vue.js": <Code size={16} />,
        "Express": <Server size={16} />,
        "PostgreSQL": <Database size={16} />,
        "Next.js": <Code size={16} />,
        "Tailwind CSS": <Code size={16} />,
        "JavaScript": <Code size={16} />,
        "TypeScript": <Code size={16} />,
        "Python": <Code size={16} />,
        "PHP": <Code size={16} />,
        "Java": <Code size={16} />,
        "C#": <Code size={16} />,
        "Ruby": <Code size={16} />,
        "Go": <Code size={16} />,
        "Swift": <Code size={16} />
    };

    if (loading) {
        return (
            <div style={{
                minHeight: "100vh",
                backgroundColor: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "20px"
            }}>
                <div style={{
                    width: "60px",
                    height: "60px",
                    border: "4px solid #e2e8f0",
                    borderTop: "4px solid #4F46E5",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                }}></div>
                <div style={{
                    color: "#64748b",
                    fontSize: "16px",
                    fontWeight: "500"
                }}>
                    Loading Dashboard...
                </div>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    const stats = calculateStats();
    const recentProjects = projects.slice(0, 3);

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#f8fafc",
            fontFamily: isRTL ? "'Noto Sans Arabic', 'Inter', sans-serif" : "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            direction: isRTL ? "rtl" : "ltr"
        }}>
            {/* Demo Notice Banner */}
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
                {t.demoNotice} • {t.developerNotice}
            </div>

            {/* Sidebar Navigation */}
            <div style={{
                position: "fixed",
                left: isRTL ? "auto" : 0,
                right: isRTL ? 0 : "auto",
                top: "40px",
                width: "250px",
                height: "calc(100vh - 40px)",
                backgroundColor: "white",
                borderRight: isRTL ? "none" : "1px solid #e2e8f0",
                borderLeft: isRTL ? "1px solid #e2e8f0" : "none",
                padding: "20px 0",
                display: "flex",
                flexDirection: "column",
                zIndex: 900,
                boxShadow: "2px 0 10px rgba(0,0,0,0.05)"
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
                    }} onClick={() => navigate("/")}>
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
                                {t.dashboardTitle}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <div style={{ flex: 1, padding: "0 20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <button
                            onClick={() => navigate("/dashboard")}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "12px 16px",
                                backgroundColor: "#4F46E5",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "15px",
                                fontWeight: "500",
                                transition: "all 0.2s",
                                textAlign: isRTL ? "right" : "left",
                                flexDirection: isRTL ? "row-reverse" : "row"
                            }}
                        >
                            <Home size={18} />
                            {t.dashboardTitle}
                        </button>
                        
                        <button
                            onClick={() => navigate("/generate")}
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
                            <Plus size={18} />
                            {t.generateProject}
                        </button>
                        
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
                            <BarChart size={18} />
                            Analytics
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
                                        {activeLanguage === lang.code && <Check size={16} color="#4F46E5" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{
                marginLeft: isRTL ? "0" : "250px",
                marginRight: isRTL ? "250px" : "0",
                padding: "40px"
            }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    {/* Header */}
                    <header style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "40px",
                        paddingBottom: "20px",
                        borderBottom: "1px solid #e2e8f0",
                        flexDirection: isRTL ? "row-reverse" : "row"
                    }}>
                        <div>
                            <h1 style={{ 
                                fontSize: "28px", 
                                color: "#1e293b", 
                                margin: 0,
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                flexDirection: isRTL ? "row-reverse" : "row"
                            }}>
                                <Target size={28} color="#4F46E5" />
                                {t.welcome}, {user?.name || "User"}!
                            </h1>
                            <p style={{ 
                                color: "#64748b", 
                                marginTop: "5px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                flexDirection: isRTL ? "row-reverse" : "row"
                            }}>
                                <Mail size={14} />
                                {user?.email || "No email"}
                            </p>
                        </div>
                        
                        <div style={{ display: "flex", alignItems: "center", gap: "15px", flexDirection: isRTL ? "row-reverse" : "row" }}>
                            <button
                                onClick={() => navigate("/generate")}
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "#4F46E5",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                    transition: "all 0.2s",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = "#4338CA"}
                                onMouseOut={(e) => e.target.style.backgroundColor = "#4F46E5"}
                            >
                                <Plus size={18} />
                                {t.newProject}
                            </button>
                            
                            <div style={{ position: "relative" }}>
                                <div 
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    style={{
                                        width: "48px",
                                        height: "48px",
                                        backgroundColor: getAvatarColor(user?.name || user?.email || ''),
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: "18px",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                        border: "3px solid white"
                                    }}
                                >
                                    {getAvatarInitials(user?.name || '', user?.email || '')}
                                </div>
                                
                                <div style={{
                                    position: "absolute",
                                    bottom: "2px",
                                    [isRTL ? "left" : "right"]: "2px",
                                    width: "12px",
                                    height: "12px",
                                    backgroundColor: "#10b981",
                                    borderRadius: "50%",
                                    border: "2px solid white"
                                }}></div>
                                
                                {showProfileMenu && (
                                    <>
                                        <div style={{
                                            position: "absolute",
                                            top: "60px",
                                            [isRTL ? "left" : "right"]: "0",
                                            backgroundColor: "white",
                                            borderRadius: "10px",
                                            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                                            width: "280px",
                                            zIndex: "1000",
                                            border: "1px solid #e5e7eb",
                                            overflow: "hidden"
                                        }}>
                                            <div style={{
                                                padding: "20px",
                                                backgroundColor: "#f8fafc",
                                                borderBottom: "1px solid #e5e7eb",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "15px",
                                                flexDirection: isRTL ? "row-reverse" : "row"
                                            }}>
                                                <div style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    backgroundColor: getAvatarColor(user?.name || user?.email || ''),
                                                    borderRadius: "50%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    fontSize: "24px"
                                                }}>
                                                    {getAvatarInitials(user?.name || '', user?.email || '')}
                                                </div>
                                                <div style={{ textAlign: isRTL ? "right" : "left" }}>
                                                    <h4 style={{ margin: "0 0 5px 0", color: "#1f2937" }}>
                                                        {user?.name || "User"}
                                                    </h4>
                                                    <p style={{ 
                                                        margin: "0", 
                                                        color: "#6b7280", 
                                                        fontSize: "14px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "6px",
                                                        flexDirection: isRTL ? "row-reverse" : "row"
                                                    }}>
                                                        <Mail size={12} />
                                                        {user?.email || "No email"}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div style={{ padding: "10px 0" }}>
                                                <button
                                                    onClick={() => {
                                                        navigate("/profile");
                                                        setShowProfileMenu(false);
                                                    }}
                                                    style={{
                                                        width: "100%",
                                                        padding: "12px 20px",
                                                        background: "none",
                                                        border: "none",
                                                        textAlign: isRTL ? "right" : "left",
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "10px",
                                                        color: "#4b5563",
                                                        transition: "all 0.2s",
                                                        fontSize: "14px",
                                                        flexDirection: isRTL ? "row-reverse" : "row"
                                                    }}
                                                    onMouseOver={(e) => e.target.style.backgroundColor = "#f3f4f6"}
                                                    onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                                                >
                                                    <User size={18} />
                                                    {t.editProfile}
                                                </button>
                                                
                                                <button
                                                    onClick={() => {
                                                        navigate("/settings");
                                                        setShowProfileMenu(false);
                                                    }}
                                                    style={{
                                                        width: "100%",
                                                        padding: "12px 20px",
                                                        background: "none",
                                                        border: "none",
                                                        textAlign: isRTL ? "right" : "left",
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "10px",
                                                        color: "#4b5563",
                                                        transition: "all 0.2s",
                                                        fontSize: "14px",
                                                        flexDirection: isRTL ? "row-reverse" : "row"
                                                    }}
                                                    onMouseOver={(e) => e.target.style.backgroundColor = "#f3f4f6"}
                                                    onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                                                >
                                                    <Settings size={18} />
                                                    {t.settings}
                                                </button>
                                                
                                                <button
                                                    onClick={handleLogout}
                                                    style={{
                                                        width: "100%",
                                                        padding: "12px 20px",
                                                        background: "none",
                                                        border: "none",
                                                        textAlign: isRTL ? "right" : "left",
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "10px",
                                                        color: "#ef4444",
                                                        transition: "all 0.2s",
                                                        borderTop: "1px solid #e5e7eb",
                                                        marginTop: "10px",
                                                        fontSize: "14px",
                                                        flexDirection: isRTL ? "row-reverse" : "row"
                                                    }}
                                                    onMouseOver={(e) => e.target.style.backgroundColor = "#fef2f2"}
                                                    onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                                                >
                                                    <LogOut size={18} />
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
                        </div>
                    </header>

                    {/* Stats Cards */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "20px",
                        marginBottom: "40px"
                    }}>
                        {stats.map((stat, index) => (
                            <div key={index} style={{
                                backgroundColor: "white",
                                padding: "25px",
                                borderRadius: "10px",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                                transition: "transform 0.2s",
                                textAlign: isRTL ? "right" : "left"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                                <div style={{ 
                                    display: "flex", 
                                    alignItems: "center", 
                                    gap: "15px",
                                    flexDirection: isRTL ? "row-reverse" : "row" 
                                }}>
                                    <div style={{
                                        width: "50px",
                                        height: "50px",
                                        backgroundColor: stat.bgColor,
                                        borderRadius: "10px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: stat.color
                                    }}>
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <div style={{ color: "#64748b", fontSize: "14px" }}>
                                            {stat.title}
                                        </div>
                                        <div style={{
                                            fontSize: "32px",
                                            fontWeight: "bold",
                                            color: stat.color
                                        }}>
                                            {stat.value}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Upcoming Features Section */}
                    <div style={{
                        background: "linear-gradient(135deg, #4F46E5 0%, #7c3aed 100%)",
                        borderRadius: "16px",
                        padding: "24px",
                        marginBottom: "40px",
                        color: "white",
                        boxShadow: "0 10px 20px rgba(79, 70, 229, 0.15)",
                        position: "relative",
                        overflow: "hidden"
                    }}>
                        <Sparkles size={120} style={{ 
                            position: "absolute", 
                            right: isRTL ? "auto" : "-20px", 
                            left: isRTL ? "-20px" : "auto", 
                            top: "-20px", 
                            opacity: 0.1 
                        }} />

                        <h2 style={{ 
                            fontSize: "20px", 
                            marginBottom: "20px", 
                            display: "flex", 
                            alignItems: "center", 
                            gap: "10px",
                            flexDirection: isRTL ? "row-reverse" : "row" 
                        }}>
                            <Zap size={24} /> {t.upcomingFeatures}
                        </h2>

                        <div style={{ 
                            display: "grid", 
                            gridTemplateColumns: "1fr 1fr", 
                            gap: "20px",
                            textAlign: isRTL ? "right" : "left"
                        }}>
                            {/* Feature 1: Upload & Optimize */}
                            <div style={{ 
                                backgroundColor: "rgba(255,255,255,0.1)", 
                                padding: "15px", 
                                borderRadius: "12px", 
                                border: "1px solid rgba(255,255,255,0.2)" 
                            }}>
                                <div style={{ 
                                    display: "flex", 
                                    alignItems: "center", 
                                    gap: "10px", 
                                    marginBottom: "10px", 
                                    flexDirection: isRTL ? "row-reverse" : "row" 
                                }}>
                                    <Database size={20} />
                                    <strong style={{ fontSize: "16px" }}>
                                        {activeLanguage === "ar" ? "رفع وتحسين الملفات" : 
                                         activeLanguage === "fr" ? "Téléchargement & Optimisation" :
                                         activeLanguage === "es" ? "Subir & Optimizar" :
                                         "Upload & Optimize Files"}
                                    </strong>
                                    <span style={{ 
                                        fontSize: "10px", 
                                        backgroundColor: "#ef4444", 
                                        padding: "2px 8px", 
                                        borderRadius: "10px" 
                                    }}>
                                        {t.comingSoon}
                                    </span>
                                </div>
                                <p style={{ fontSize: "14px", opacity: 0.9, margin: 0 }}>
                                    {t.uploadDescription}
                                </p>
                            </div>

                            {/* Feature 2: Publish & Share */}
                            <div style={{ 
                                backgroundColor: "rgba(255,255,255,0.1)", 
                                padding: "15px", 
                                borderRadius: "12px", 
                                border: "1px solid rgba(255,255,255,0.2)" 
                            }}>
                                <div style={{ 
                                    display: "flex", 
                                    alignItems: "center", 
                                    gap: "10px", 
                                    marginBottom: "10px", 
                                    flexDirection: isRTL ? "row-reverse" : "row" 
                                }}>
                                    <Globe size={20} />
                                    <strong style={{ fontSize: "16px" }}>
                                        {activeLanguage === "ar" ? "نشر المشاريع" : 
                                         activeLanguage === "fr" ? "Publication & Partage" :
                                         activeLanguage === "es" ? "Publicar & Compartir" :
                                         "Publish Projects"}
                                    </strong>
                                    <span style={{ 
                                        fontSize: "10px", 
                                        backgroundColor: "#ef4444", 
                                        padding: "2px 8px", 
                                        borderRadius: "10px" 
                                    }}>
                                        {t.comingSoon}
                                    </span>
                                </div>
                                <p style={{ fontSize: "14px", opacity: 0.9, margin: 0 }}>
                                    {t.shareDescription}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div style={{
                        backgroundColor: "white",
                        padding: "30px",
                        borderRadius: "10px",
                        marginBottom: "40px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
                    }}>
                        <h2 style={{ 
                            marginTop: 0, 
                            marginBottom: "20px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            flexDirection: isRTL ? "row-reverse" : "row"
                        }}>
                            <Zap size={24} color="#4F46E5" />
                            {t.quickActions}
                        </h2>
                        <div style={{ 
                            display: "flex", 
                            gap: "15px", 
                            flexWrap: "wrap",
                            flexDirection: isRTL ? "row-reverse" : "row" 
                        }}>
                            {quickActions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={action.onClick}
                                    style={{
                                        padding: "15px 20px",
                                        backgroundColor: "#f8fafc",
                                        color: "#374151",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        fontSize: "16px",
                                        flex: "1 1 200px",
                                        transition: "all 0.2s",
                                        flexDirection: isRTL ? "row-reverse" : "row"
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.backgroundColor = "#4F46E5";
                                        e.target.style.color = "white";
                                        e.target.style.borderColor = "#4F46E5";
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.backgroundColor = "#f8fafc";
                                        e.target.style.color = "#374151";
                                        e.target.style.borderColor = "#e2e8f0";
                                    }}
                                >
                                    <span>{action.icon}</span>
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Recent Projects */}
                    <div style={{
                        backgroundColor: "white",
                        padding: "30px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
                    }}>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "20px",
                            flexDirection: isRTL ? "row-reverse" : "row"
                        }}>
                            <h2 style={{ 
                                margin: 0,
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                flexDirection: isRTL ? "row-reverse" : "row"
                            }}>
                                <Folder size={24} color="#4F46E5" />
                                {t.yourRecentProjects}
                                <span style={{
                                    backgroundColor: "#EEF2FF",
                                    color: "#4F46E5",
                                    padding: "4px 12px",
                                    borderRadius: "20px",
                                    fontSize: "14px",
                                    fontWeight: "normal"
                                }}>
                                    {projects.length} {t.total}
                                </span>
                            </h2>
                            <button
                                onClick={() => navigate("/portfolio")}
                                style={{
                                    padding: "8px 16px",
                                    backgroundColor: "transparent",
                                    color: "#4F46E5",
                                    border: "1px solid #4F46E5",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    transition: "all 0.2s",
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = "#4F46E5";
                                    e.target.style.color = "white";
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = "transparent";
                                    e.target.style.color = "#4F46E5";
                                }}
                            >
                                <Eye size={16} />
                                {t.viewAllProjects}
                            </button>
                        </div>

                        {recentProjects.length === 0 ? (
                            <div style={{
                                textAlign: "center",
                                padding: "60px 20px",
                                color: "#6b7280"
                            }}>
                                <div style={{
                                    width: "80px",
                                    height: "80px",
                                    backgroundColor: "#f3f4f6",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 20px",
                                    color: "#9ca3af"
                                }}>
                                    <Folder size={32} />
                                </div>
                                <h3 style={{ marginBottom: "10px", color: "#4b5563" }}>
                                    {t.noProjectsYet}
                                </h3>
                                <p style={{ marginBottom: "30px" }}>
                                    {t.startByCreating}
                                </p>
                                <button
                                    onClick={() => navigate("/generate")}
                                    style={{
                                        padding: "12px 24px",
                                        backgroundColor: "#4F46E5",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        fontWeight: "600",
                                        flexDirection: isRTL ? "row-reverse" : "row"
                                    }}
                                >
                                    <Sparkles size={18} />
                                    {t.createFirstProject}
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: "grid", gap: "20px" }}>
                                {recentProjects.map((project, index) => {
                                    const progress = project.completion_percentage || project.progress || 0;
                                    const techStack = project.tech_stack || project.tech || [];
                                    
                                    return (
                                        <div key={project.id || index} style={{
                                            padding: "20px",
                                            border: "1px solid #e2e8f0",
                                            borderRadius: "8px",
                                            transition: "all 0.3s",
                                            cursor: "pointer",
                                            textAlign: isRTL ? "right" : "left"
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.transform = "translateY(-2px)";
                                            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.transform = "translateY(0)";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                        onClick={() => navigate(`/project/${project.id}`)}>
                                            <div style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                marginBottom: "10px",
                                                flexDirection: isRTL ? "row-reverse" : "row"
                                            }}>
                                                <div style={{ 
                                                    display: "flex", 
                                                    alignItems: "center", 
                                                    gap: "10px",
                                                    flexDirection: isRTL ? "row-reverse" : "row" 
                                                }}>
                                                    <div style={{
                                                        width: "40px",
                                                        height: "40px",
                                                        backgroundColor: "#EEF2FF",
                                                        borderRadius: "8px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        color: "#4F46E5"
                                                    }}>
                                                        <Folder size={20} />
                                                    </div>
                                                    <div>
                                                        <h3 style={{ margin: 0 }}>{project.project_name || project.name}</h3>
                                                        <p style={{ 
                                                            margin: "5px 0 0 0", 
                                                            color: "#6b7280", 
                                                            fontSize: "14px",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "5px",
                                                            flexDirection: isRTL ? "row-reverse" : "row"
                                                        }}>
                                                            <Clock size={12} />
                                                            {t.created}: {new Date(project.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div style={{
                                                    padding: "5px 15px",
                                                    backgroundColor: progress === 100 ? "#10b98115" : 
                                                                   progress > 50 ? "#f59e0b15" : "#ef444415",
                                                    color: progress === 100 ? "#10b981" : 
                                                          progress > 50 ? "#f59e0b" : "#ef4444",
                                                    borderRadius: "20px",
                                                    fontSize: "14px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "5px",
                                                    flexDirection: isRTL ? "row-reverse" : "row"
                                                }}>
                                                    {progress === 100 ? (
                                                        <>
                                                            <CheckCircle size={14} />
                                                            {t.completedStatus}
                                                        </>
                                                    ) : progress > 50 ? (
                                                        <>
                                                            <RefreshCw size={14} />
                                                            {t.inProgressStatus}
                                                        </>
                                                    ) : (
                                                        t.planning
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <p style={{ color: "#64748b", marginBottom: "15px" }}>
                                                {project.description || t.noDescription}
                                            </p>
                                            
                                            {techStack.length > 0 && (
                                                <div style={{ marginBottom: "15px" }}>
                                                    <div style={{
                                                        display: "flex",
                                                        gap: "10px",
                                                        flexWrap: "wrap",
                                                        flexDirection: isRTL ? "row-reverse" : "row"
                                                    }}>
                                                        {techStack.slice(0, 5).map((tech, techIndex) => (
                                                            <span key={techIndex} style={{
                                                                padding: "5px 12px",
                                                                backgroundColor: "#f1f5f9",
                                                                color: "#475569",
                                                                borderRadius: "20px",
                                                                fontSize: "14px",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: "6px",
                                                                flexDirection: isRTL ? "row-reverse" : "row"
                                                            }}>
                                                                {techIcons[tech] || <Code size={14} />}
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            
                                            <div>
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    marginBottom: "5px",
                                                    flexDirection: isRTL ? "row-reverse" : "row"
                                                }}>
                                                    <span style={{ 
                                                        fontSize: "14px", 
                                                        color: "#64748b",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "6px",
                                                        flexDirection: isRTL ? "row-reverse" : "row"
                                                    }}>
                                                        <TrendingUp size={14} />
                                                        {t.progress}
                                                    </span>
                                                    <span style={{ fontSize: "14px", color: "#475569" }}>
                                                        {progress}%
                                                    </span>
                                                </div>
                                                <div style={{
                                                    height: "6px",
                                                    backgroundColor: "#e2e8f0",
                                                    borderRadius: "3px",
                                                    overflow: "hidden",
                                                    direction: "ltr"
                                                }}>
                                                    <div style={{
                                                        width: `${progress}%`,
                                                        height: "100%",
                                                        backgroundColor: progress === 100 ? "#10b981" : 
                                                                       progress > 50 ? "#f59e0b" : "#4F46E5",
                                                        borderRadius: "3px",
                                                        transition: "width 0.3s"
                                                    }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

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
            `}</style>
        </div>
    );
};

export default DashboardPage;