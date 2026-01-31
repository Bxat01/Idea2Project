import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from '../services/authService';
import { 
  Home,
  Plus,
  FolderOpen,
  BarChart,
  Grid,
  Users as UsersIcon,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Languages,
  Check,
  Mail,
  Sparkles,
  Briefcase,
  Download,
  Target,
  Clock,
  FileText,
  Eye,
  Search,
  Filter,
  Calendar,
  Star,
  TrendingUp,
  Zap,
  BookOpen,
  Layers,
  Palette,
  Code,
  Globe,
  Smartphone,
  ShoppingBag,
  Music,
  Camera,
  CreditCard,
  Heart,
  Bell, 
  Database,
  Server
} from 'lucide-react';

const BrowseTemplatesPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [activeLanguage, setActiveLanguage] = useState("en");
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [activeCategory, setActiveCategory] = useState("all");

    // دعم متعدد اللغات
    const translations = {
        en: {
            // العنوان الرئيسي
            pageTitle: "Browse Templates",
            comingSoon: "Coming Soon",
            description: "Explore our library of professionally designed templates for your next project",
            
            // الفئات
            categories: "Categories",
            allTemplates: "All Templates",
            webDevelopment: "Web Development",
            mobileApps: "Mobile Apps",
            eCommerce: "E-Commerce",
            portfolio: "Portfolio",
            dashboard: "Dashboard",
            blog: "Blog",
            landingPage: "Landing Page",
            saas: "SaaS",
            
            featureStatus: "We're working on an amazing template library",
            launchDate: "Launching in Q2 2027",
            notifyMe: "Notify Me When Ready",
            
            dashboardTitle: "Dashboard",
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
            
            templatesCount: "0+ Templates",
            categoriesCount: "0 Categories",
            ratings: "0 Ratings",
            
            featuresTitle: "What to Expect",
            feature1: "Professionally designed templates",
            feature2: "Easy customization",
            feature3: "Mobile responsive",
            feature4: "Clean code structure",
            feature5: "Detailed documentation",
            feature6: "Regular updates"
        },
        ar: {
            pageTitle: "تصفح القوالب",
            comingSoon: "قريباً",
            description: "استكشف مكتبتنا للقوالب المصممة باحترافية لمشروعك القادم",
            
            categories: "الفئات",
            allTemplates: "جميع القوالب",
            webDevelopment: "تطوير الويب",
            mobileApps: "تطبيقات الجوال",
            eCommerce: "التجارة الإلكترونية",
            portfolio: "المحفظة",
            dashboard: "لوحة التحكم",
            blog: "المدونة",
            landingPage: "الصفحة المقصودة",
            saas: "برمجيات كخدمة",
            
            featureStatus: "نعمل على مكتبة قوالب رائعة",
            launchDate: "سيتم الإطلاق في الربع الثاني 2027",
            notifyMe: "أعلمني عند الجاهزية",
            
            dashboardTitle: "لوحة التحكم",
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
            
            templatesCount: "٥٠+ قالب",
            categoriesCount: "١٢ فئة",
            ratings: "٤.٨/٥ تقييمات",
            
            featuresTitle: "ماذا تتوقع",
            feature1: "قوالب مصممة باحترافية",
            feature2: "تخصيص سهل",
            feature3: "متجاوبة مع الجوال",
            feature4: "هيكل كود نظيف",
            feature5: "توثيق مفصل",
            feature6: "تحديثات منتظمة"
        },
        fr: {
            pageTitle: "Parcourir les modèles",
            comingSoon: "Bientôt disponible",
            description: "Explorez notre bibliothèque de modèles professionnellement conçus pour votre prochain projet",
            
            categories: "Catégories",
            allTemplates: "Tous les modèles",
            webDevelopment: "Développement Web",
            mobileApps: "Applications Mobiles",
            eCommerce: "Commerce Électronique",
            portfolio: "Portfolio",
            dashboard: "Tableau de bord",
            blog: "Blog",
            landingPage: "Page de destination",
            saas: "Logiciel en tant que service",
            
            featureStatus: "Nous travaillons sur une incroyable bibliothèque de modèles",
            launchDate: "Lancement au Q2 2027",
            notifyMe: "Notifiez-moi quand prêt",
            
            dashboardTitle: "Tableau de bord",
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
            
            templatesCount: "50+ Modèles",
            categoriesCount: "12 Catégories",
            ratings: "4.8/5 Notes",
            
            featuresTitle: "À quoi s'attendre",
            feature1: "Modèles conçus professionnellement",
            feature2: "Personnalisation facile",
            feature3: "Responsive mobile",
            feature4: "Structure de code propre",
            feature5: "Documentation détaillée",
            feature6: "Mises à jour régulières"
        },
        es: {
            pageTitle: "Explorar plantillas",
            comingSoon: "Próximamente",
            description: "Explora nuestra biblioteca de plantillas diseñadas profesionalmente para tu próximo proyecto",
            
            categories: "Categorías",
            allTemplates: "Todas las plantillas",
            webDevelopment: "Desarrollo Web",
            mobileApps: "Aplicaciones Móviles",
            eCommerce: "Comercio Electrónico",
            portfolio: "Portafolio",
            dashboard: "Panel de control",
            blog: "Blog",
            landingPage: "Página de destino",
            saas: "Software como servicio",
            
            featureStatus: "Estamos trabajando en una increíble biblioteca de plantillas",
            launchDate: "Lanzamiento en Q2 2027",
            notifyMe: "Notificarme cuando esté listo",
            
            dashboardTitle: "Panel de control",
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
            
            templatesCount: "50+ Plantillas",
            categoriesCount: "12 Categorías",
            ratings: "4.8/5 Calificaciones",
            
            featuresTitle: "Qué esperar",
            feature1: "Plantillas diseñadas profesionalmente",
            feature2: "Personalización fácil",
            feature3: "Responsive móvil",
            feature4: "Estructura de código limpia",
            feature5: "Documentación detallada",
            feature6: "Actualizaciones regulares"
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

    const categories = [
        { id: "all", name: t.allTemplates, icon: <Grid size={18} />, count: 0 },
        { id: "web", name: t.webDevelopment, icon: <Globe size={18} />, count: 0 },
        { id: "mobile", name: t.mobileApps, icon: <Smartphone size={18} />, count: 0 },
        { id: "ecommerce", name: t.eCommerce, icon: <ShoppingBag size={18} />, count: 0 },
        { id: "portfolio", name: t.portfolio, icon: <Briefcase size={18} />, count: 0 },
        { id: "dashboard", name: t.dashboard, icon: <BarChart size={18} />, count: 0 },
        { id: "blog", name: t.blog, icon: <FileText size={18} />, count: 0 },
        { id: "landing", name: t.landingPage, icon: <Target size={18} />, count: 0 }
    ];

    const features = [
        { icon: <Palette size={20} />, title: t.feature1 },
        { icon: <Layers size={20} />, title: t.feature2 },
        { icon: <Smartphone size={20} />, title: t.feature3 },
        { icon: <Code size={20} />, title: t.feature4 },
        { icon: <BookOpen size={20} />, title: t.feature5 },
        { icon: <Zap size={20} />, title: t.feature6 }
    ];

    const stats = [
        { value: t.templatesCount, icon: <Grid size={24} />, color: "#4F46E5" },
        { value: t.categoriesCount, icon: <Layers size={24} />, color: "#10b981" },
        { value: t.ratings, icon: <Star size={24} />, color: "#f59e0b" }
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
                    Loading Templates Page...
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
                                <Grid size={28} color="#4F46E5" />
                                {t.pageTitle}
                            </h1>
                            <p style={{ 
                                color: "#64748b", 
                                marginTop: "5px",
                                fontSize: "16px"
                            }}>
                                {t.description}
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
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
                                textAlign: isRTL ? "right" : "left",
                                display: "flex",
                                alignItems: "center",
                                gap: "15px",
                                flexDirection: isRTL ? "row-reverse" : "row"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                                <div style={{
                                    width: "50px",
                                    height: "50px",
                                    backgroundColor: stat.color + "15",
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: stat.color
                                }}>
                                    {stat.icon}
                                </div>
                                <div style={{ fontSize: "18px", fontWeight: "bold", color: "#1e293b" }}>
                                    {stat.value}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Categories */}
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
                            <Layers size={24} color="#4F46E5" />
                            {t.categories}
                        </h2>
                        <div style={{ 
                            display: "flex", 
                            gap: "10px", 
                            flexWrap: "wrap",
                            flexDirection: isRTL ? "row-reverse" : "row" 
                        }}>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    style={{
                                        padding: "12px 20px",
                                        backgroundColor: activeCategory === category.id ? "#4F46E5" : "#f8fafc",
                                        color: activeCategory === category.id ? "white" : "#374151",
                                        border: activeCategory === category.id ? "none" : "1px solid #e2e8f0",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        fontSize: "15px",
                                        transition: "all 0.2s",
                                        flexDirection: isRTL ? "row-reverse" : "row"
                                    }}
                                    onMouseOver={(e) => {
                                        if (activeCategory !== category.id) {
                                            e.target.style.backgroundColor = "#f1f5f9";
                                        }
                                    }}
                                    onMouseOut={(e) => {
                                        if (activeCategory !== category.id) {
                                            e.target.style.backgroundColor = "#f8fafc";
                                        }
                                    }}
                                >
                                    <span>{category.icon}</span>
                                    {category.name}
                                    <span style={{
                                        backgroundColor: activeCategory === category.id ? "rgba(255,255,255,0.2)" : "#e2e8f0",
                                        color: activeCategory === category.id ? "white" : "#64748b",
                                        padding: "2px 8px",
                                        borderRadius: "10px",
                                        fontSize: "12px",
                                        marginLeft: isRTL ? "0" : "8px",
                                        marginRight: isRTL ? "8px" : "0"
                                    }}>
                                        {category.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Coming Soon Section */}
                    <div style={{
                        backgroundColor: "white",
                        padding: "60px 40px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                        textAlign: "center",
                        marginBottom: "40px"
                    }}>
                        <div style={{
                            width: "100px",
                            height: "100px",
                            background: "linear-gradient(135deg, #4F46E5 0%, #7c3aed 100%)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 30px",
                            color: "white",
                            fontSize: "40px",
                            fontWeight: "bold"
                        }}>
                            {t.comingSoon}
                        </div>
                        
                        <h1 style={{ 
                            fontSize: "48px", 
                            margin: "0 0 20px 0", 
                            color: "#1e293b",
                            background: "linear-gradient(135deg, #4F46E5 0%, #7c3aed 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            display: "inline-block"
                        }}>
                            {t.comingSoon}
                        </h1>
                        
                        <p style={{
                            fontSize: "20px",
                            color: "#64748b",
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
                            backgroundColor: "#f8fafc",
                            padding: "12px 24px",
                            borderRadius: "50px",
                            marginBottom: "40px",
                            flexDirection: isRTL ? "row-reverse" : "row"
                        }}>
                            <Calendar size={20} color="#4F46E5" />
                            <span style={{ color: "#4F46E5", fontWeight: "600" }}>
                                {t.launchDate}
                            </span>
                        </div>
                        
                        <button
                            onClick={() => alert("You'll be notified when templates are available!")}
                            style={{
                                padding: "16px 40px",
                                backgroundColor: "#4F46E5",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "18px",
                                fontWeight: "600",
                                transition: "all 0.2s",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "12px",
                                boxShadow: "0 4px 15px rgba(79, 70, 229, 0.3)",
                                flexDirection: isRTL ? "row-reverse" : "row"
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#4338CA";
                                e.target.style.transform = "translateY(-2px)";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "#4F46E5";
                                e.target.style.transform = "translateY(0)";
                            }}
                        >
                            <Bell size={20} />
                            {t.notifyMe}
                        </button>
                    </div>

                    {/* Features */}
                    <div style={{
                        backgroundColor: "white",
                        padding: "30px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
                    }}>
                        <h2 style={{ 
                            marginTop: 0, 
                            marginBottom: "30px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            flexDirection: isRTL ? "row-reverse" : "row",
                            textAlign: "center",
                            justifyContent: "center"
                        }}>
                            <Star size={24} color="#4F46E5" />
                            {t.featuresTitle}
                        </h2>
                        
                        <div style={{ 
                            display: "grid", 
                            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
                            gap: "20px" 
                        }}>
                            {features.map((feature, index) => (
                                <div key={index} style={{
                                    padding: "20px",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "10px",
                                    transition: "all 0.3s",
                                    textAlign: isRTL ? "right" : "left",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "15px",
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                    e.currentTarget.style.borderColor = "#4F46E5";
                                    e.currentTarget.style.boxShadow = "0 10px 20px rgba(79, 70, 229, 0.1)";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.borderColor = "#e2e8f0";
                                    e.currentTarget.style.boxShadow = "none";
                                }}>
                                    <div style={{
                                        width: "50px",
                                        height: "50px",
                                        backgroundColor: "#EEF2FF",
                                        borderRadius: "10px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#4F46E5",
                                        flexShrink: 0
                                    }}>
                                        {feature.icon}
                                    </div>
                                    <div style={{ fontSize: "16px", fontWeight: "500", color: "#1e293b" }}>
                                        {feature.title}
                                    </div>
                                </div>
                            ))}
                        </div>
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
                
                /* RTL specific adjustments */
                [dir="rtl"] .progress-bar {
                    direction: ltr !important;
                }
            `}</style>
        </div>
    );
};

export default BrowseTemplatesPage;