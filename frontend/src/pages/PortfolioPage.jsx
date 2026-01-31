import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects } from '../services/projectService'; 
import { getCurrentUser, logoutUser } from '../services/authService'; 
import { 
  Sparkles, 
  Folder, 
  Download, 
  Mail, 
  Link, 
  Eye,
  Home,
  BarChart,
  FolderOpen,
  Grid,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Languages,
  Check,
  Plus,
  Target,
  FileText,
  Globe,
  Server,
  Database,
  Code,
  Clock,
  TrendingUp,
  CheckCircle,
  RefreshCw,
  Briefcase,
  Award,
  Users as UsersIcon,
  Shield,
  Bell,
  HelpCircle,
  ExternalLink,
  Star,
  BarChart3,
  FileCode,
  Layers,
  GitBranch,
  ShieldCheck,
  Zap,
  Cpu,
  Smartphone,
  Monitor,
  Terminal,
  Coffee,
  Diamond
} from 'lucide-react';

const PortfolioPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [activeLanguage, setActiveLanguage] = useState("en");
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const translations = {
        en: {
            portfolioTitle: "Portfolio",
            portfolioSubtitle: "Showcase your completed projects",
            
            projects: "Projects",
            viewDetails: "View Details",
            completed: "Completed",
            inProgress: "In Progress",
            planning: "Planning",
            portfolioStats: "Portfolio Stats",
            totalProjects: "Total Projects",
            avgRating: "Avg. Rating",
            publicProjects: "Public Projects",
            privateProjects: "Private Projects",
             exportPortfolio: "Export Portfolio",
            exportDescription: "Share your portfolio with potential employers or clients",
            exportPDF: "Export as PDF",
            generateLink: "Generate Shareable Link",
            emailPortfolio: "Email Portfolio",
            dashboard: "Dashboard",
            generateProject: "Generate Project",
            viewPortfolio: "View Portfolio",
            browseTemplates: "Browse Templates",
            analytics: "Analytics",
            editProfile: "Edit Profile",
            settings: "Settings",
            logout: "Logout",
            newProject: "New Project",
            
            
            demoNotice: "Demo Version - May contain some errors",
            developerNotice: "Independent AI Developer - Built from scratch",
            
            loading: "Loading portfolio..."
        },
        ar: {
            portfolioTitle: "المحفظة",
            portfolioSubtitle: "اعرض مشاريعك المكتملة",
            
            projects: "المشاريع",
            viewDetails: "عرض التفاصيل",
            completed: "مكتمل",
            inProgress: "قيد التنفيذ",
            planning: "قيد التخطيط",
            
            portfolioStats: "إحصائيات المحفظة",
            totalProjects: "إجمالي المشاريع",
            avgRating: "متوسط التقييم",
            publicProjects: "مشاريع عامة",
            privateProjects: "مشاريع خاصة",
            
            exportPortfolio: "تصدير المحفظة",
            exportDescription: "شارك محفظتك مع أصحاب العمل أو العملاء المحتملين",
            exportPDF: "تصدير كـ PDF",
            generateLink: "إنشاء رابط قابل للمشاركة",
            emailPortfolio: "إرسال المحفظة بالبريد",
            
            dashboard: "لوحة التحكم",
            generateProject: "إنشاء مشروع",
            viewPortfolio: "عرض المحفظة",
            browseTemplates: "تصفح القوالب",
            analytics: "التحليلات",
            
            editProfile: "تعديل الملف الشخصي",
            settings: "الإعدادات",
            logout: "تسجيل الخروج",
            
            newProject: "مشروع جديد",
            
            demoNotice: "نسخة تجريبية - قد تحتوي على بعض الأخطاء",
            developerNotice: "مطور ذكاء اصطناعي مستقل - مبني من الصفر",
            
            loading: "جاري تحميل المحفظة..."
        },
        fr: {
            portfolioTitle: "Portfolio",
            portfolioSubtitle: "Présentez vos projets terminés",
            
            projects: "Projets",
            viewDetails: "Voir les détails",
            completed: "Terminé",
            inProgress: "En cours",
            planning: "Planification",
            
            portfolioStats: "Statistiques du portfolio",
            totalProjects: "Projets totaux",
            avgRating: "Note moyenne",
            publicProjects: "Projets publics",
            privateProjects: "Projets privés",
            
            exportPortfolio: "Exporter le portfolio",
            exportDescription: "Partagez votre portfolio avec des employeurs ou clients potentiels",
            exportPDF: "Exporter en PDF",
            generateLink: "Générer un lien partageable",
            emailPortfolio: "Envoyer par email",
            
            dashboard: "Tableau de bord",
            generateProject: "Générer un projet",
            viewPortfolio: "Voir le portfolio",
            browseTemplates: "Parcourir les modèles",
            analytics: "Analytiques",
            
            editProfile: "Modifier le profil",
            settings: "Paramètres",
            logout: "Déconnexion",
            
            newProject: "Nouveau projet",
            
            demoNotice: "Version de démonstration - Peut contenir des erreurs",
            developerNotice: "Développeur IA indépendant - Construit à partir de zéro",
            
            loading: "Chargement du portfolio..."
        },
        es: {
            portfolioTitle: "Portafolio",
            portfolioSubtitle: "Muestra tus proyectos completados",
            
            projects: "Proyectos",
            viewDetails: "Ver detalles",
            completed: "Completado",
            inProgress: "En progreso",
            planning: "Planificación",
            
            portfolioStats: "Estadísticas del portafolio",
            totalProjects: "Proyectos totales",
            avgRating: "Calificación promedio",
            publicProjects: "Proyectos públicos",
            privateProjects: "Proyectos privados",
            
            exportPortfolio: "Exportar portafolio",
            exportDescription: "Comparte tu portafolio con empleadores o clientes potenciales",
            exportPDF: "Exportar como PDF",
            generateLink: "Generar enlace compartible",
            emailPortfolio: "Enviar por correo",
            
            dashboard: "Panel de control",
            generateProject: "Generar proyecto",
            viewPortfolio: "Ver portafolio",
            browseTemplates: "Explorar plantillas",
            analytics: "Analíticas",
            
            editProfile: "Editar perfil",
            settings: "Configuración",
            logout: "Cerrar sesión",
            
            newProject: "Nuevo proyecto",
            
            demoNotice: "Versión de demostración - Puede contener errores",
            developerNotice: "Desarrollador de IA independiente - Construido desde cero",
            
            loading: "Cargando portafolio..."
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
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const userData = getCurrentUser();
            if (!userData) { navigate('/login'); return; }
            setUser(userData);
            
            const projectsData = await getProjects();            const projectsArray = Array.isArray(projectsData) 
                ? projectsData 
                : (projectsData.projects || []);
            setProjects(projectsArray);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
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
        "Python": <Terminal size={16} />,
        "PHP": <Server size={16} />,
        "Java": <Coffee size={16} />,
        "C#": <Code size={16} />,
        "Ruby": <Diamond size={16} />,
        "Go": <Zap size={16} />,
        "Swift": <Smartphone size={16} />
    };

    const portfolioStats = [
        { 
            label: t.totalProjects, 
            value: projects.length.toString(), 
            color: "#4F46E5", 
            icon: <Folder size={20} /> 
        },
        { 
            label: t.completed, 
            value: projects.filter(p => {
                const progress = p.completion_percentage || 0;
                return progress === 100;
            }).length.toString(), 
            color: "#10b981", 
            icon: <CheckCircle size={20} /> 
        },
        { 
            label: t.inProgress, 
            value: projects.filter(p => {
                const progress = p.completion_percentage || 0;
                return progress > 0 && progress < 100;
            }).length.toString(), 
            color: "#f59e0b", 
            icon: <RefreshCw size={20} /> 
        },
        { 
            label: t.avgRating, 
            value: projects.length > 0 ? 
                (projects.reduce((acc, p) => acc + (p.rating || 0), 0) / projects.length).toFixed(1) 
                : "0.0", 
            color: "#8b5cf6", 
            icon: <Star size={20} /> 
        },
        { 
            label: t.publicProjects, 
            value: projects.filter(p => p.is_public !== false).length.toString(), 
            color: "#3b82f6", 
            icon: <Globe size={20} /> 
        },
        { 
            label: t.privateProjects, 
            value: projects.filter(p => p.is_public === false).length.toString(), 
            color: "#ef4444", 
            icon: <Shield size={20} /> 
        }
    ];

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
                                {t.portfolioTitle}
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ flex: 1, padding: "0 20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
                            <Home size={18} />
                            {t.dashboard}
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
                        marginBottom: "30px",
                        paddingBottom: "20px",
                        borderBottom: "1px solid #e2e8f0",
                        flexDirection: isRTL ? "row-reverse" : "row"
                    }}>
                        <div>
                            <h1 style={{ 
                                fontSize: "32px", 
                                color: "#1f2937", 
                                margin: 0,
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                flexDirection: isRTL ? "row-reverse" : "row"
                            }}>
                                <Briefcase size={32} color="#4F46E5" />
                                {t.portfolioTitle}
                            </h1>
                            <p style={{ 
                                color: "#6b7280", 
                                marginTop: "8px",
                                fontSize: "16px"
                            }}>
                                {t.portfolioSubtitle}
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

                    {/* Portfolio Stats */}
                    <div style={{
                        backgroundColor: "white",
                        padding: "30px",
                        borderRadius: "12px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        marginBottom: "40px",
                        border: "1px solid #e5e7eb"
                    }}>
                        <h2 style={{ 
                            marginTop: 0, 
                            marginBottom: "25px",
                            color: "#1f2937",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            flexDirection: isRTL ? "row-reverse" : "row"
                        }}>
                            <BarChart3 size={24} color="#4F46E5" />
                            {t.portfolioStats}
                        </h2>
                        
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                            gap: "20px"
                        }}>
                            {portfolioStats.map((stat, index) => (
                                <div key={index} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "15px",
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}>
                                    <div style={{
                                        width: "50px",
                                        height: "50px",
                                        backgroundColor: stat.color + "20",
                                        borderRadius: "12px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: stat.color
                                    }}>
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <div style={{ 
                                            fontSize: "14px", 
                                            color: "#6b7280",
                                            marginBottom: "4px"
                                        }}>
                                            {stat.label}
                                        </div>
                                        <div style={{
                                            fontSize: "24px",
                                            fontWeight: "700",
                                            color: stat.color
                                        }}>
                                            {stat.value}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                        gap: "25px",
                        marginBottom: "40px"
                    }}>
                        {loading ? (
                            <div style={{ 
                                gridColumn: "1 / -1", 
                                textAlign: "center", 
                                padding: "50px",
                                color: "#64748b"
                            }}>
                                <div style={{
                                    width: "60px",
                                    height: "60px",
                                    border: "4px solid #e2e8f0",
                                    borderTop: "4px solid #4F46E5",
                                    borderRadius: "50%",
                                    animation: "spin 1s linear infinite",
                                    margin: "0 auto 20px"
                                }}></div>
                                <div style={{ fontSize: "16px", fontWeight: "500" }}>
                                    {t.loading}
                                </div>
                            </div>
                        ) : projects.length === 0 ? (
                            <div style={{ 
                                gridColumn: "1 / -1", 
                                textAlign: "center", 
                                padding: "50px",
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
                                    No projects in portfolio yet
                                </h3>
                                <p style={{ marginBottom: "30px" }}>
                                    Create your first project to build your portfolio!
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
                                    Create Your First Project
                                </button>
                            </div>
                        ) : (
                            projects.map((project, index) => {
                                const progress = project.completion_percentage || 0;
                                const techStack = project.tech_stack || project.tech || [];
                                const status = project.status || 
                                    (progress === 100 ? 'completed' : 
                                     progress > 0 ? 'in-progress' : 'planning');
                                
                                return (
                                    <div key={project.id || index} style={{
                                        backgroundColor: "white",
                                        padding: "25px",
                                        borderRadius: "12px",
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                        transition: "transform 0.3s, box-shadow 0.3s",
                                        cursor: "pointer",
                                        border: "1px solid #e5e7eb"
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = "translateY(-5px)";
                                        e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)";
                                        e.currentTarget.style.borderColor = "#4F46E5";
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                                        e.currentTarget.style.borderColor = "#e5e7eb";
                                    }}
                                    onClick={() => navigate(`/project/${project.id}`)}>
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginBottom: "15px",
                                            flexDirection: isRTL ? "row-reverse" : "row"
                                        }}>
                                            <div style={{
                                                width: "50px",
                                                height: "50px",
                                                backgroundColor: "#e0e7ff",
                                                borderRadius: "10px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#4F46E5"
                                            }}>
                                                <Folder size={24} />
                                            </div>
                                            
                                            <div style={{
                                                padding: "5px 15px",
                                                backgroundColor: status === "completed" ? "#d1fae5" : 
                                                               status === "in-progress" ? "#fef3c7" : "#f3f4f6",
                                                color: status === "completed" ? "#065f46" : 
                                                      status === "in-progress" ? "#92400e" : "#4b5563",
                                                borderRadius: "20px",
                                                fontSize: "12px",
                                                fontWeight: "500",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "5px",
                                                flexDirection: isRTL ? "row-reverse" : "row"
                                            }}>
                                                {status === "completed" ? (
                                                    <>
                                                        <CheckCircle size={12} />
                                                        {t.completed}
                                                    </>
                                                ) : status === "in-progress" ? (
                                                    <>
                                                        <RefreshCw size={12} />
                                                        {t.inProgress}
                                                    </>
                                                ) : (
                                                    t.planning
                                                )}
                                            </div>
                                        </div>
                                        
                                        <h3 style={{ 
                                            margin: "0 0 10px 0", 
                                            color: "#1f2937",
                                            fontSize: "18px",
                                            fontWeight: "600"
                                        }}>
                                            {project.project_name || project.title || "Untitled Project"}
                                        </h3>
                                        
                                        <p style={{ 
                                            color: "#6b7280", 
                                            marginBottom: "15px", 
                                            fontSize: "14px",
                                            lineHeight: "1.5"
                                        }}>
                                            {project.description || "No description available"}
                                        </p>
                                        
                                        {techStack.length > 0 && (
                                            <div style={{ 
                                                display: "flex", 
                                                gap: "8px", 
                                                flexWrap: "wrap", 
                                                marginBottom: "15px",
                                                flexDirection: isRTL ? "row-reverse" : "row"
                                            }}>
                                                {techStack.slice(0, 5).map((tech, techIndex) => (
                                                    <span key={techIndex} style={{
                                                        padding: "5px 12px",
                                                        backgroundColor: "#f3f4f6",
                                                        color: "#4b5563",
                                                        borderRadius: "20px",
                                                        fontSize: "12px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "6px",
                                                        flexDirection: isRTL ? "row-reverse" : "row"
                                                    }}>
                                                        {techIcons[tech] || <Code size={12} />}
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            flexDirection: isRTL ? "row-reverse" : "row"
                                        }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <span style={{
                                                    fontSize: "12px",
                                                    color: "#9ca3af",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "4px",
                                                    flexDirection: isRTL ? "row-reverse" : "row"
                                                }}>
                                                    <Clock size={12} />
                                                    {new Date(project.created_at || project.date).toLocaleDateString()}
                                                </span>
                                                
                                                {progress > 0 && (
                                                    <span style={{
                                                        fontSize: "12px",
                                                        color: "#4F46E5",
                                                        backgroundColor: "#e0e7ff",
                                                        padding: "2px 8px",
                                                        borderRadius: "10px"
                                                    }}>
                                                        {progress}% complete
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <button style={{
                                                padding: "8px 16px",
                                                backgroundColor: "#4F46E5",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "6px",
                                                fontSize: "14px",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "6px",
                                                transition: "all 0.2s",
                                                flexDirection: isRTL ? "row-reverse" : "row"
                                            }}
                                            onMouseOver={(e) => e.target.style.backgroundColor = "#4338CA"}
                                            onMouseOut={(e) => e.target.style.backgroundColor = "#4F46E5"}>
                                                <Eye size={14} />
                                                {t.viewDetails}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Export Portfolio Section */}
                    <div style={{
                        backgroundColor: "white",
                        padding: "30px",
                        borderRadius: "12px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        marginBottom: "40px",
                        border: "1px solid #e5e7eb"
                    }}>
                        <h2 style={{ 
                            marginTop: 0, 
                            marginBottom: "15px",
                            color: "#1f2937",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            flexDirection: isRTL ? "row-reverse" : "row"
                        }}>
                            <Download size={24} color="#4F46E5" />
                            {t.exportPortfolio}
                        </h2>
                        <p style={{ 
                            color: "#6b7280", 
                            marginBottom: "25px",
                            fontSize: "15px"
                        }}>
                            {t.exportDescription}
                        </p>
                        
                        <div style={{
                            display: "flex",
                            gap: "15px",
                            flexWrap: "wrap",
                            flexDirection: isRTL ? "row-reverse" : "row"
                        }}>
                            <button style={{
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
                                transition: "all 0.2s",
                                flex: "1 1 200px",
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
                            }}>
                                <FileText size={20} />
                                {t.exportPDF}
                            </button>
                            
                            <button style={{
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
                                transition: "all 0.2s",
                                flex: "1 1 200px",
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
                            }}>
                                <Link size={20} />
                                {t.generateLink}
                            </button>
                            
                            <button style={{
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
                                transition: "all 0.2s",
                                flex: "1 1 200px",
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
                            }}>
                                <Mail size={20} />
                                {t.emailPortfolio}
                            </button>
                        </div>
                    </div>
                </div>
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
                
                /* Animation for loading spinner */
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default PortfolioPage;