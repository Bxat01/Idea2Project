import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from '../services/authService';
import { 
  Home,
  Plus,
  FolderOpen,
  BarChart,
  Grid,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Languages,
  Check,
  Mail,
  Sparkles,
  Briefcase,
  Target,
  TrendingUp,
  PieChart,
  LineChart,
  BarChart3,
  Activity,
  Eye,
  Download,
  Calendar,
  Users,
  Clock,
  Zap,
  DollarSign,
  Target as TargetIcon,
  Filter,
  Search,
  AlertCircle,
  Info,
  Bell
} from 'lucide-react';

const AnalyticsPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [activeLanguage, setActiveLanguage] = useState("en");
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [timeRange, setTimeRange] = useState("month");

    // دعم متعدد اللغات
    const translations = {
        en: {
            // العنوان الرئيسي
            pageTitle: "Analytics Dashboard",
            comingSoon: "Coming Soon",
            description: "Advanced analytics and insights for your projects",
            
            // القوائم
            dashboardTitle: "Dashboard",
            generateProject: "Generate Project",
            viewPortfolio: "View Portfolio",
            browseTemplates: "Browse Templates",
            analytics: "Analytics",
            
            // الوقت
            timeRange: "Time Range",
            last7Days: "Last 7 Days",
            last30Days: "Last 30 Days",
            last90Days: "Last 90 Days",
            thisYear: "This Year",
            allTime: "All Time",
            
            // الإحصائيات
            totalProjects: "Total Projects",
            activeProjects: "Active Projects",
            completionRate: "Completion Rate",
            avgTime: "Avg. Time",
            successRate: "Success Rate",
            productivity: "Productivity",
            
            // المخططات
            projectTrends: "Project Trends",
            techDistribution: "Tech Distribution",
            performanceMetrics: "Performance Metrics",
            trafficSources: "Traffic Sources",
            
            // حالات المشاريع
            projectStatus: "Project Status",
            planning: "Planning",
            inProgress: "In Progress",
            completed: "Completed",
            onHold: "On Hold",
            
            // تفاصيل
            topTechnologies: "Top Technologies",
            recentActivity: "Recent Activity",
            recommendations: "Recommendations",
            
            // الأزرار
            exportData: "Export Data",
            generateReport: "Generate Report",
            viewDetails: "View Details",
            
            // إشعارات
            featureStatus: "Advanced analytics dashboard is under development",
            launchDate: "Launching in Q3 2027",
            notifyMe: "Notify Me When Ready",
            
            demoNotice: "Demo Version - May contain some errors",
            developerNotice: "Independent AI Developer - Built from scratch"
        },
        ar: {
            pageTitle: "لوحة التحليلات",
            comingSoon: "قريباً",
            description: "تحليلات متقدمة ورؤى لمشاريعك",
            
            dashboardTitle: "لوحة التحكم",
            generateProject: "إنشاء مشروع",
            viewPortfolio: "عرض المحفظة",
            browseTemplates: "تصفح القوالب",
            analytics: "التحليلات",
            
            timeRange: "الفترة الزمنية",
            last7Days: "آخر 7 أيام",
            last30Days: "آخر 30 يوم",
            last90Days: "آخر 90 يوم",
            thisYear: "هذه السنة",
            allTime: "كل الوقت",
            
            totalProjects: "إجمالي المشاريع",
            activeProjects: "المشاريع النشطة",
            completionRate: "معدل الإكمال",
            avgTime: "متوسط الوقت",
            successRate: "معدل النجاح",
            productivity: "الإنتاجية",
            
            projectTrends: "اتجاهات المشاريع",
            techDistribution: "توزيع التقنيات",
            performanceMetrics: "مقاييس الأداء",
            trafficSources: "مصادر الزيارات",
            
            projectStatus: "حالة المشاريع",
            planning: "قيد التخطيط",
            inProgress: "قيد التنفيذ",
            completed: "مكتمل",
            onHold: "معلق",
            
            topTechnologies: "أهم التقنيات",
            recentActivity: "النشاط الأخير",
            recommendations: "التوصيات",
            
            exportData: "تصدير البيانات",
            generateReport: "إنشاء تقرير",
            viewDetails: "عرض التفاصيل",
            
            featureStatus: "لوحة التحليلات المتقدمة قيد التطوير",
            launchDate: "سيتم الإطلاق في الربع الثالث 2027",
            notifyMe: "أعلمني عند الجاهزية",
            
            demoNotice: "نسخة تجريبية - قد تحتوي على بعض الأخطاء",
            developerNotice: "مطور ذكاء اصطناعي مستقل - مبني من الصفر"
        },
        fr: {
            pageTitle: "Tableau de bord analytique",
            comingSoon: "Bientôt disponible",
            description: "Analyses avancées et insights pour vos projets",
            
            dashboardTitle: "Tableau de bord",
            generateProject: "Générer un projet",
            viewPortfolio: "Voir le portfolio",
            browseTemplates: "Parcourir les modèles",
            analytics: "Analytiques",
            
            timeRange: "Période",
            last7Days: "7 derniers jours",
            last30Days: "30 derniers jours",
            last90Days: "90 derniers jours",
            thisYear: "Cette année",
            allTime: "Tout le temps",
            
            totalProjects: "Projets totaux",
            activeProjects: "Projets actifs",
            completionRate: "Taux d'achèvement",
            avgTime: "Temps moyen",
            successRate: "Taux de réussite",
            productivity: "Productivité",
            
            projectTrends: "Tendances des projets",
            techDistribution: "Distribution des technologies",
            performanceMetrics: "Métriques de performance",
            trafficSources: "Sources de trafic",
            
            projectStatus: "Statut des projets",
            planning: "Planification",
            inProgress: "En cours",
            completed: "Terminé",
            onHold: "En attente",
            
            topTechnologies: "Top technologies",
            recentActivity: "Activité récente",
            recommendations: "Recommandations",
            
            exportData: "Exporter les données",
            generateReport: "Générer un rapport",
            viewDetails: "Voir les détails",
            
            featureStatus: "Le tableau de bord analytique avancé est en développement",
            launchDate: "Lancement au Q3 2027",
            notifyMe: "Notifiez-moi quand prêt",
            
            demoNotice: "Version de démonstration - Peut contenir des erreurs",
            developerNotice: "Développeur IA indépendant - Construit à partir de zéro"
        },
        es: {
            pageTitle: "Panel de analíticas",
            comingSoon: "Próximamente",
            description: "Analíticas avanzadas y perspectivas para tus proyectos",
            
            dashboardTitle: "Panel de control",
            generateProject: "Generar proyecto",
            viewPortfolio: "Ver portafolio",
            browseTemplates: "Explorar plantillas",
            analytics: "Analíticas",
            
            timeRange: "Rango de tiempo",
            last7Days: "Últimos 7 días",
            last30Days: "Últimos 30 días",
            last90Days: "Últimos 90 días",
            thisYear: "Este año",
            allTime: "Todo el tiempo",
            
            totalProjects: "Proyectos totales",
            activeProjects: "Proyectos activos",
            completionRate: "Tasa de finalización",
            avgTime: "Tiempo promedio",
            successRate: "Tasa de éxito",
            productivity: "Productividad",
            
            projectTrends: "Tendencias de proyectos",
            techDistribution: "Distribución de tecnologías",
            performanceMetrics: "Métricas de rendimiento",
            trafficSources: "Fuentes de tráfico",
            
            projectStatus: "Estado de proyectos",
            planning: "Planificación",
            inProgress: "En progreso",
            completed: "Completado",
            onHold: "En espera",
            
            topTechnologies: "Tecnologías principales",
            recentActivity: "Actividad reciente",
            recommendations: "Recomendaciones",
            
            exportData: "Exportar datos",
            generateReport: "Generar informe",
            viewDetails: "Ver detalles",
            
            featureStatus: "El panel de analíticas avanzadas está en desarrollo",
            launchDate: "Lanzamiento en Q3 2027",
            notifyMe: "Notificarme cuando esté listo",
            
            demoNotice: "Versión de demostración - Puede contener errores",
            developerNotice: "Desarrollador de IA independiente - Construido desde cero"
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

    const timeRanges = [
        { value: "week", label: t.last7Days },
        { value: "month", label: t.last30Days },
        { value: "quarter", label: t.last90Days },
        { value: "year", label: t.thisYear },
        { value: "all", label: t.allTime }
    ];

    const stats = [
        { 
            title: t.totalProjects, 
            value: "42", 
            change: "+12%", 
            icon: <FolderOpen size={24} />, 
            color: "#4F46E5" 
        },
        { 
            title: t.activeProjects, 
            value: "18", 
            change: "+5%", 
            icon: <Activity size={24} />, 
            color: "#10b981" 
        },
        { 
            title: t.completionRate, 
            value: "78%", 
            change: "+8%", 
            icon: <TargetIcon size={24} />, 
            color: "#f59e0b" 
        },
        { 
            title: t.avgTime, 
            value: "14d", 
            change: "-2d", 
            icon: <Clock size={24} />, 
            color: "#ef4444" 
        },
        { 
            title: t.successRate, 
            value: "92%", 
            change: "+3%", 
            icon: <TrendingUp size={24} />, 
            color: "#8b5cf6" 
        },
        { 
            title: t.productivity, 
            value: "4.8", 
            change: "+0.5", 
            icon: <Zap size={24} />, 
            color: "#06b6d4" 
        }
    ];

    const projectStatusData = [
        { status: t.planning, count: 8, color: "#4F46E5" },
        { status: t.inProgress, count: 18, color: "#f59e0b" },
        { status: t.completed, count: 12, color: "#10b981" },
        { status: t.onHold, count: 4, color: "#ef4444" }
    ];

    const topTechnologies = [
        { name: "React", usage: 42, color: "#61DAFB" },
        { name: "Node.js", usage: 38, color: "#68A063" },
        { name: "MongoDB", usage: 32, color: "#47A248" },
        { name: "Tailwind CSS", usage: 28, color: "#38B2AC" },
        { name: "TypeScript", usage: 24, color: "#3178C6" }
    ];

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

    const loadData = async () => {
        setLoading(true);
        try {
            const userData = getCurrentUser();
            if (!userData) { navigate('/login'); return; }
            setUser(userData);
        } catch (error) {
            console.error("Error loading user data:", error);
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
                    Loading Analytics...
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
                                {t.pageTitle}
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
                <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
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
                                <BarChart size={28} color="#4F46E5" />
                                {t.pageTitle}
                            </h1>
                            <p style={{ 
                                color: "#64748b", 
                                marginTop: "5px"
                            }}>
                                {t.description}
                            </p>
                        </div>
                        
                        <div style={{ display: "flex", alignItems: "center", gap: "15px", flexDirection: isRTL ? "row-reverse" : "row" }}>
                            {/* Time Range Selector */}
                            <div style={{ 
                                display: "flex", 
                                backgroundColor: "#f8fafc", 
                                borderRadius: "8px", 
                                border: "1px solid #e2e8f0",
                                overflow: "hidden",
                                flexDirection: isRTL ? "row-reverse" : "row"
                            }}>
                                {timeRanges.map((range) => (
                                    <button
                                        key={range.value}
                                        onClick={() => setTimeRange(range.value)}
                                        style={{
                                            padding: "8px 16px",
                                            backgroundColor: timeRange === range.value ? "#4F46E5" : "transparent",
                                            color: timeRange === range.value ? "white" : "#64748b",
                                            border: "none",
                                            cursor: "pointer",
                                            fontSize: "14px",
                                            transition: "all 0.2s"
                                        }}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                            
                            <button
                                onClick={() => alert("Export feature coming soon!")}
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "#f8fafc",
                                    color: "#4F46E5",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                    transition: "all 0.2s",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = "#4F46E5";
                                    e.target.style.color = "white";
                                    e.target.style.borderColor = "#4F46E5";
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = "#f8fafc";
                                    e.target.style.color = "#4F46E5";
                                    e.target.style.borderColor = "#e2e8f0";
                                }}
                            >
                                <Download size={18} />
                                {t.exportData}
                            </button>
                            
                            {/* Profile Menu */}
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

                    {/* Coming Soon Banner */}
                    <div style={{
                        backgroundColor: "#4F46E5",
                        color: "white",
                        padding: "40px",
                        borderRadius: "10px",
                        marginBottom: "40px",
                        textAlign: "center",
                        boxShadow: "0 10px 30px rgba(79, 70, 229, 0.2)",
                        background: "linear-gradient(135deg, #4F46E5 0%, #7c3aed 100%)"
                    }}>
                        <div style={{
                            width: "80px",
                            height: "80px",
                            backgroundColor: "rgba(255,255,255,0.2)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 20px",
                            color: "white",
                            fontSize: "40px",
                            fontWeight: "bold"
                        }}>
                            {t.comingSoon}
                        </div>
                        
                        <h1 style={{ 
                            fontSize: "48px", 
                            margin: "0 0 20px 0", 
                            color: "white"
                        }}>
                            {t.comingSoon}
                        </h1>
                        
                        <p style={{
                            fontSize: "20px",
                            color: "rgba(255,255,255,0.9)",
                            maxWidth: "600px",
                            margin: "0 auto 30px",
                            lineHeight: "1.6"
                        }}>
                            {t.featureStatus}
                        </p>
                        
                        <div style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            backgroundColor: "rgba(255,255,255,0.2)",
                            padding: "12px 24px",
                            borderRadius: "50px",
                            marginBottom: "40px",
                            flexDirection: isRTL ? "row-reverse" : "row"
                        }}>
                            <Calendar size={20} color="white" />
                            <span style={{ color: "white", fontWeight: "600" }}>
                                {t.launchDate}
                            </span>
                        </div>
                        
                        <button
                            onClick={() => alert("You'll be notified when analytics dashboard is available!")}
                            style={{
                                padding: "16px 40px",
                                backgroundColor: "white",
                                color: "#4F46E5",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "18px",
                                fontWeight: "600",
                                transition: "all 0.2s",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "12px",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                flexDirection: isRTL ? "row-reverse" : "row"
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 6px 25px rgba(0,0,0,0.2)";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
                            }}
                        >
                            <Bell size={20} />
                            {t.notifyMe}
                        </button>
                    </div>

                    {/* Stats Preview */}
                    <div style={{ marginBottom: "40px" }}>
                        <h2 style={{ 
                            marginBottom: "20px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            flexDirection: isRTL ? "row-reverse" : "row"
                        }}>
                            <TrendingUp size={24} color="#4F46E5" />
                            Preview Statistics
                        </h2>
                        
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                            gap: "20px"
                        }}>
                            {stats.map((stat, index) => (
                                <div key={index} style={{
                                    backgroundColor: "white",
                                    padding: "25px",
                                    borderRadius: "10px",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                                    transition: "transform 0.2s",
                                    textAlign: isRTL ? "right" : "left",
                                    opacity: "0.7"
                                }}
                                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                                    <div style={{ 
                                        display: "flex", 
                                        alignItems: "center", 
                                        justifyContent: "space-between",
                                        marginBottom: "15px",
                                        flexDirection: isRTL ? "row-reverse" : "row" 
                                    }}>
                                        <div style={{ 
                                            display: "flex", 
                                            alignItems: "center", 
                                            gap: "15px",
                                            flexDirection: isRTL ? "row-reverse" : "row" 
                                        }}>
                                            <div style={{
                                                width: "50px",
                                                height: "50px",
                                                backgroundColor: `${stat.color}15`,
                                                borderRadius: "10px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: stat.color
                                            }}>
                                                {stat.icon}
                                            </div>
                                            <div style={{ color: "#64748b", fontSize: "14px" }}>
                                                {stat.title}
                                            </div>
                                        </div>
                                        <div style={{
                                            backgroundColor: stat.change.startsWith('+') ? "#10b98115" : "#ef444415",
                                            color: stat.change.startsWith('+') ? "#10b981" : "#ef4444",
                                            padding: "4px 10px",
                                            borderRadius: "12px",
                                            fontSize: "14px",
                                            fontWeight: "600"
                                        }}>
                                            {stat.change}
                                        </div>
                                    </div>
                                    <div style={{
                                        fontSize: "32px",
                                        fontWeight: "bold",
                                        color: stat.color
                                    }}>
                                        {stat.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Charts Preview */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                        gap: "20px",
                        marginBottom: "40px"
                    }}>
                        {/* Project Status Chart */}
                        <div style={{
                            backgroundColor: "white",
                            padding: "30px",
                            borderRadius: "10px",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                            opacity: "0.7"
                        }}>
                            <h3 style={{ 
                                marginTop: 0, 
                                marginBottom: "20px",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                flexDirection: isRTL ? "row-reverse" : "row"
                            }}>
                                <PieChart size={20} color="#4F46E5" />
                                {t.projectStatus}
                            </h3>
                            <div style={{ padding: "20px 0" }}>
                                {projectStatusData.map((item, index) => (
                                    <div key={index} style={{ 
                                        marginBottom: "15px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        flexDirection: isRTL ? "row-reverse" : "row"
                                    }}>
                                        <div style={{ 
                                            display: "flex", 
                                            alignItems: "center", 
                                            gap: "10px",
                                            flexDirection: isRTL ? "row-reverse" : "row"
                                        }}>
                                            <div style={{
                                                width: "12px",
                                                height: "12px",
                                                backgroundColor: item.color,
                                                borderRadius: "50%"
                                            }}></div>
                                            <span style={{ color: "#64748b" }}>{item.status}</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <span style={{ fontWeight: "600" }}>{item.count}</span>
                                            <div style={{ 
                                                width: "100px", 
                                                height: "6px", 
                                                backgroundColor: "#e2e8f0",
                                                borderRadius: "3px",
                                                overflow: "hidden"
                                            }}>
                                                <div style={{
                                                    width: `${(item.count / 42) * 100}%`,
                                                    height: "100%",
                                                    backgroundColor: item.color
                                                }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Technologies */}
                        <div style={{
                            backgroundColor: "white",
                            padding: "30px",
                            borderRadius: "10px",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                            opacity: "0.7"
                        }}>
                            <h3 style={{ 
                                marginTop: 0, 
                                marginBottom: "20px",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                flexDirection: isRTL ? "row-reverse" : "row"
                            }}>
                                <BarChart3 size={20} color="#4F46E5" />
                                {t.topTechnologies}
                            </h3>
                            <div style={{ padding: "20px 0" }}>
                                {topTechnologies.map((tech, index) => (
                                    <div key={index} style={{ 
                                        marginBottom: "15px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        flexDirection: isRTL ? "row-reverse" : "row"
                                    }}>
                                        <div style={{ 
                                            display: "flex", 
                                            alignItems: "center", 
                                            gap: "10px",
                                            flexDirection: isRTL ? "row-reverse" : "row"
                                        }}>
                                            <div style={{
                                                width: "30px",
                                                height: "30px",
                                                backgroundColor: tech.color,
                                                borderRadius: "6px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "white",
                                                fontSize: "12px",
                                                fontWeight: "bold"
                                            }}>
                                                {tech.name[0]}
                                            </div>
                                            <span style={{ color: "#1e293b", fontWeight: "500" }}>{tech.name}</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                            <span style={{ color: "#64748b", fontSize: "14px" }}>{tech.usage}%</span>
                                            <div style={{ 
                                                width: "100px", 
                                                height: "8px", 
                                                backgroundColor: "#e2e8f0",
                                                borderRadius: "4px",
                                                overflow: "hidden"
                                            }}>
                                                <div style={{
                                                    width: `${tech.usage}%`,
                                                    height: "100%",
                                                    backgroundColor: tech.color
                                                }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Coming Soon Message */}
                    <div style={{
                        backgroundColor: "#fef3c7",
                        border: "1px solid #f59e0b",
                        padding: "30px",
                        borderRadius: "10px",
                        textAlign: "center",
                        marginBottom: "40px"
                    }}>
                        <div style={{ 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center",
                            gap: "15px",
                            marginBottom: "15px",
                            flexDirection: isRTL ? "row-reverse" : "row"
                        }}>
                            <Info size={32} color="#f59e0b" />
                            <h3 style={{ margin: 0, color: "#92400e" }}>
                                Advanced Analytics Coming Soon
                            </h3>
                        </div>
                        <p style={{ 
                            color: "#92400e", 
                            fontSize: "16px", 
                            maxWidth: "800px", 
                            margin: "0 auto",
                            lineHeight: "1.6"
                        }}>
                            We're building powerful analytics features including interactive charts, 
                            real-time data visualization, performance metrics, trend analysis, and 
                            personalized insights to help you make data-driven decisions for your projects.
                        </p>
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

export default AnalyticsPage;