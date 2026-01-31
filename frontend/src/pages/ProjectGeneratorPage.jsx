import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateProject } from '../services/projectService';
import { getCurrentUser } from '../services/authService';
import projectAI from '../ai/ProjectGeneratorAI';
import {
  ArrowLeft,
  Sparkles,
  Code,
  Cpu,
  Smartphone,
  Monitor,
  Gamepad2,
  Brain,
  Target,
  BookOpen,
  Briefcase,
  Rocket,
  DollarSign,
  Check,
  Globe,
  Server,
  Database,
  Layout,
  CreditCard,
  Zap,
  Users,
  Upload,
  Award,
  Home,
  BarChart,
  FolderOpen,
  Grid,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Languages,
  Plus,
  Mail,
  FileText,
  Link,
  Eye,
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
  Terminal,
  Coffee,
  Diamond
} from 'lucide-react';

const ProjectGeneratorPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        languages: [],
        level: "intermediate",
        projectType: "web",
        goal: "learn",
        features: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [aiReady, setAiReady] = useState(false);
    const [activeLanguage, setActiveLanguage] = useState("en");
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [user, setUser] = useState(null);

    const translations = {
        en: {
            pageTitle: "Generate New Project",
            pageSubtitle: "AI-powered project generation",
            aiReadyBadge: "🤖 AI Ready",
            
            languagesTitle: "Languages & Technologies",
            languagesDesc: "Select all languages and frameworks you know or want to learn",
            
            experienceTitle: "Experience Level",
            
            projectTypeTitle: "Project Type",
            
            featuresTitle: "Desired Features",
            featuresDesc: "Select features you want to include in your project",
            
            projectGoalTitle: "Project Goal",
            beginner: "Beginner",
            beginnerDesc: "Just starting out",
            intermediate: "Intermediate",
            intermediateDesc: "Some experience",
            advanced: "Advanced",
            advancedDesc: "Advanced skills",
            web: "Web App",
            webDesc: "Full-stack web application",
            mobile: "Mobile App",
            mobileDesc: "iOS/Android application",
            desktop: "Desktop App",
            desktopDesc: "Windows/Mac/Linux software",
            api: "API Service",
            apiDesc: "Backend API development",
            game: "Game",
            gameDesc: "Game development",
            ai: "AI/ML",
            aiDesc: "Artificial Intelligence project",
            learn: "Learn New Tech",
            learnDesc: "Focus on learning and skill development",
            portfolio: "Portfolio Piece",
            portfolioDesc: "Build something impressive for your portfolio",
            startup: "Startup Idea",
            startupDesc: "Develop a viable product or service",
            freelance: "Freelance Project",
            freelanceDesc: "Client project or freelance work",
            authentication: "Authentication",
            database: "Database",
            api: "API",
            responsive: "Responsive Design",
            payment: "Payment Integration",
            realtime: "Real-time",
            adminPanel: "Admin Panel",
            fileUpload: "File Upload",
            selected: "Selected",
            featuresCount: "feature(s)",
            generateButton: "Generate with AI",
            generatingButton: "AI is Generating...",
            fallbackButton: "Generate Project Idea",
            fallbackGenerating: "Generating...",
            aiActiveText: "🤖 AI-Powered Generation Active",
            aiActiveDesc: "Our AI analyzes your preferences to create the perfect project",
            
            projectSummary: "📋 Project Summary:",
            languagesLabel: "Languages",
            levelLabel: "Level",
            typeLabel: "Type",
            goalLabel: "Goal",
            featuresLabel: "Features",
            
            backButton: "Back to Dashboard",
            dashboard: "Dashboard",
            generateProject: "Generate Project",
            viewPortfolio: "View Portfolio",
            browseTemplates: "Browse Templates",
            analytics: "Analytics",
            
            editProfile: "Edit Profile",
            settings: "Settings",
            logout: "Logout",
            
            newProject: "New Project",
            
            loginRequired: "Please login to generate a project",
            selectLanguage: "Please select at least one programming language",
            generationFailed: "Failed to generate project",
            errorOccurred: "An error occurred while generating the project",
            
            demoNotice: "Demo Version - May contain some errors",
            developerNotice: "Independent AI Developer - Built from scratch",
            successMessage: "🎉 AI Generated Project Successfully!",
            fallbackSuccess: "🎉 Project Generated Successfully!",
            
            loadingAI: "Loading AI..."
        },
        ar: {
            pageTitle: "إنشاء مشروع جديد",
            pageSubtitle: "توليد مشروع مدعوم بالذكاء الاصطناعي",
            aiReadyBadge: "🤖 الذكاء الاصطناعي جاهز",
            
            languagesTitle: "اللغات والتقنيات",
            languagesDesc: "اختر جميع اللغات والإطارات التي تعرفها أو تريد تعلمها",
            
            experienceTitle: "مستوى الخبرة",
            
            projectTypeTitle: "نوع المشروع",
            
            featuresTitle: "الميزات المطلوبة",
            featuresDesc: "اختر الميزات التي تريد تضمينها في مشروعك",
            
            projectGoalTitle: "هدف المشروع",
            
            beginner: "مبتدئ",
            beginnerDesc: "مبتدئ للتو",
            intermediate: "متوسط",
            intermediateDesc: "بعض الخبرة",
            advanced: "متقدم",
            advancedDesc: "مهارات متقدمة",
            
            web: "تطبيق ويب",
            webDesc: "تطبيق ويب كامل",
            mobile: "تطبيق جوال",
            mobileDesc: "تطبيق iOS/Android",
            desktop: "تطبيق سطح مكتب",
            desktopDesc: "برنامج Windows/Mac/Linux",
            api: "خدمة API",
            apiDesc: "تطوير API للواجهة الخلفية",
            game: "لعبة",
            gameDesc: "تطوير ألعاب",
            ai: "ذكاء اصطناعي",
            aiDesc: "مشروع ذكاء اصطناعي",
            
            learn: "تعلم تقنية جديدة",
            learnDesc: "التركيز على التعلم وتطوير المهارات",
            portfolio: "قطعة للمحفظة",
            portfolioDesc: "بناء شيء مثير للإعجاب لمحفظتك",
            startup: "فكرة شركة ناشئة",
            startupDesc: "تطوير منتج أو خدمة قابلة للتطبيق",
            freelance: "مشروع مستقل",
            freelanceDesc: "مشروع عميل أو عمل حر",
            
            authentication: "المصادقة",
            database: "قاعدة بيانات",
            api: "API",
            responsive: "تصميم متجاوب",
            payment: "دمج الدفع",
            realtime: "وقت حقيقي",
            adminPanel: "لوحة إدارة",
            fileUpload: "رفع الملفات",
            
            selected: "تم الاختيار",
            featuresCount: "ميزة(ات)",
            
            generateButton: "توليد بالذكاء الاصطناعي",
            generatingButton: "الذكاء الاصطناعي يقوم بالتوليد...",
            fallbackButton: "توليد فكرة مشروع",
            fallbackGenerating: "جارٍ التوليد...",
            aiActiveText: "🤖 توليد مدعوم بالذكاء الاصطناعي نشط",
            aiActiveDesc: "يحلل ذكائنا الاصطناعي تفضيلاتك لإنشاء المشروع المثالي",
            
            projectSummary: "📋 ملخص المشروع:",
            languagesLabel: "اللغات",
            levelLabel: "المستوى",
            typeLabel: "النوع",
            goalLabel: "الهدف",
            featuresLabel: "الميزات",
            
            backButton: "العودة إلى لوحة التحكم",
            dashboard: "لوحة التحكم",
            generateProject: "إنشاء مشروع",
            viewPortfolio: "عرض المحفظة",
            browseTemplates: "تصفح القوالب",
            analytics: "التحليلات",
            
            editProfile: "تعديل الملف الشخصي",
            settings: "الإعدادات",
            logout: "تسجيل الخروج",
            
            newProject: "مشروع جديد",
            
            loginRequired: "يرجى تسجيل الدخول لإنشاء مشروع",
            selectLanguage: "يرجى اختيار لغة برمجة واحدة على الأقل",
            generationFailed: "فشل في إنشاء المشروع",
            errorOccurred: "حدث خطأ أثناء إنشاء المشروع",
            
            demoNotice: "نسخة تجريبية - قد تحتوي على بعض الأخطاء",
            developerNotice: "مطور ذكاء اصطناعي مستقل - مبني من الصفر",
            successMessage: "🎉 تم إنشاء المشروع بالذكاء الاصطناعي بنجاح!",
            fallbackSuccess: "🎉 تم إنشاء المشروع بنجاح!",
            
            loadingAI: "جاري تحميل الذكاء الاصطناعي..."
        },
        fr: {
            pageTitle: "Générer un nouveau projet",
            pageSubtitle: "Génération de projet alimentée par l'IA",
            aiReadyBadge: "🤖 IA Prête",
            
            languagesTitle: "Langages et technologies",
            languagesDesc: "Sélectionnez tous les langages et frameworks que vous connaissez ou souhaitez apprendre",
            
            experienceTitle: "Niveau d'expérience",
            
            projectTypeTitle: "Type de projet",
            
            featuresTitle: "Fonctionnalités souhaitées",
            featuresDesc: "Sélectionnez les fonctionnalités que vous souhaitez inclure dans votre projet",
            
            projectGoalTitle: "Objectif du projet",
            
            beginner: "Débutant",
            beginnerDesc: "Je viens de commencer",
            intermediate: "Intermédiaire",
            intermediateDesc: "Quelques expériences",
            advanced: "Avancé",
            advancedDesc: "Compétences avancées",
            
            web: "Application Web",
            webDesc: "Application web complète",
            mobile: "Application mobile",
            mobileDesc: "Application iOS/Android",
            desktop: "Application de bureau",
            desktopDesc: "Logiciel Windows/Mac/Linux",
            api: "Service API",
            apiDesc: "Développement d'API backend",
            game: "Jeu",
            gameDesc: "Développement de jeu",
            ai: "IA/ML",
            aiDesc: "Projet d'intelligence artificielle",
            
            learn: "Apprendre une nouvelle technologie",
            learnDesc: "Se concentrer sur l'apprentissage et le développement des compétences",
            portfolio: "Pièce de portfolio",
            portfolioDesc: "Créez quelque chose d'impressionnant pour votre portfolio",
            startup: "Idée de startup",
            startupDesc: "Développer un produit ou service viable",
            freelance: "Projet freelance",
            freelanceDesc: "Projet client ou travail indépendant",
            
            authentication: "Authentification",
            database: "Base de données",
            api: "API",
            responsive: "Conception réactive",
            payment: "Intégration de paiement",
            realtime: "Temps réel",
            adminPanel: "Panneau d'administration",
            fileUpload: "Téléchargement de fichiers",
            
            selected: "Sélectionné",
            featuresCount: "fonctionnalité(s)",
            
            generateButton: "Générer avec l'IA",
            generatingButton: "L'IA génère...",
            fallbackButton: "Générer une idée de projet",
            fallbackGenerating: "Génération en cours...",
            aiActiveText: "🤖 Génération alimentée par l'IA active",
            aiActiveDesc: "Notre IA analyse vos préférences pour créer le projet parfait",
            
            projectSummary: "📋 Résumé du projet:",
            languagesLabel: "Langages",
            levelLabel: "Niveau",
            typeLabel: "Type",
            goalLabel: "Objectif",
            featuresLabel: "Fonctionnalités",
            
            backButton: "Retour au tableau de bord",
            dashboard: "Tableau de bord",
            generateProject: "Générer un projet",
            viewPortfolio: "Voir le portfolio",
            browseTemplates: "Parcourir les modèles",
            analytics: "Analytiques",
            
            editProfile: "Modifier le profil",
            settings: "Paramètres",
            logout: "Déconnexion",
            
            newProject: "Nouveau projet",
            
            loginRequired: "Veuillez vous connecter pour générer un projet",
            selectLanguage: "Veuillez sélectionner au moins un langage de programmation",
            generationFailed: "Échec de la génération du projet",
            errorOccurred: "Une erreur s'est produite lors de la génération du projet",
            
            demoNotice: "Version de démonstration - Peut contenir des erreurs",
            developerNotice: "Développeur IA indépendant - Construit à partir de zéro",
            successMessage: "🎉 Projet généré par l'IA avec succès!",
            fallbackSuccess: "🎉 Projet généré avec succès!",
            
            loadingAI: "Chargement de l'IA..."
        },
        es: {
            pageTitle: "Generar nuevo proyecto",
            pageSubtitle: "Generación de proyectos con IA",
            aiReadyBadge: "🤖 IA Lista",
            
            languagesTitle: "Lenguajes y tecnologías",
            languagesDesc: "Selecciona todos los lenguajes y frameworks que conoces o quieres aprender",
            
            experienceTitle: "Nivel de experiencia",
            
            projectTypeTitle: "Tipo de proyecto",
            
            featuresTitle: "Características deseadas",
            featuresDesc: "Selecciona las características que deseas incluir en tu proyecto",
            
            projectGoalTitle: "Objetivo del proyecto",
            
            beginner: "Principiante",
            beginnerDesc: "Recién empiezo",
            intermediate: "Intermedio",
            intermediateDesc: "Alguna experiencia",
            advanced: "Avanzado",
            advancedDesc: "Habilidades avanzadas",
            
            web: "Aplicación Web",
            webDesc: "Aplicación web completa",
            mobile: "Aplicación móvil",
            mobileDesc: "Aplicación iOS/Android",
            desktop: "Aplicación de escritorio",
            desktopDesc: "Software Windows/Mac/Linux",
            api: "Servicio API",
            apiDesc: "Desarrollo de API backend",
            game: "Juego",
            gameDesc: "Desarrollo de juegos",
            ai: "IA/ML",
            aiDesc: "Proyecto de inteligencia artificial",
            
            learn: "Aprender nueva tecnología",
            learnDesc: "Enfocarse en el aprendizaje y desarrollo de habilidades",
            portfolio: "Proyecto para portafolio",
            portfolioDesc: "Construye algo impresionante para tu portafolio",
            startup: "Idea de startup",
            startupDesc: "Desarrollar un producto o servicio viable",
            freelance: "Proyecto freelance",
            freelanceDesc: "Proyecto para cliente o trabajo independiente",
            
            authentication: "Autenticación",
            database: "Base de datos",
            api: "API",
            responsive: "Diseño responsivo",
            payment: "Integración de pagos",
            realtime: "Tiempo real",
            adminPanel: "Panel de administración",
            fileUpload: "Subida de archivos",
            
            selected: "Seleccionado",
            featuresCount: "característica(s)",
            
            generateButton: "Generar con IA",
            generatingButton: "IA generando...",
            fallbackButton: "Generar idea de proyecto",
            fallbackGenerating: "Generando...",
            aiActiveText: "🤖 Generación con IA activa",
            aiActiveDesc: "Nuestra IA analiza tus preferencias para crear el proyecto perfecto",
            
            projectSummary: "📋 Resumen del proyecto:",
            languagesLabel: "Lenguajes",
            levelLabel: "Nivel",
            typeLabel: "Tipo",
            goalLabel: "Objetivo",
            featuresLabel: "Características",
            
            backButton: "Volver al panel de control",
            dashboard: "Panel de control",
            generateProject: "Generar proyecto",
            viewPortfolio: "Ver portafolio",
            browseTemplates: "Explorar plantillas",
            analytics: "Analíticas",
            
            editProfile: "Editar perfil",
            settings: "Configuración",
            logout: "Cerrar sesión",
            
            newProject: "Nuevo proyecto",
            
            loginRequired: "Por favor inicia sesión para generar un proyecto",
            selectLanguage: "Por favor selecciona al menos un lenguaje de programación",
            generationFailed: "Error al generar el proyecto",
            errorOccurred: "Ocurrió un error al generar el proyecto",
            
            demoNotice: "Versión de demostración - Puede contener errores",
            developerNotice: "Desarrollador de IA independiente - Construido desde cero",
            successMessage: "🎉 ¡Proyecto generado con IA exitosamente!",
            fallbackSuccess: "🎉 ¡Proyecto generado exitosamente!",
            
            loadingAI: "Cargando IA..."
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
        const userData = getCurrentUser();
        if (userData) {
            setUser(userData);
        }

        const initAI = async () => {
            try {
                await projectAI.initialize();
                setAiReady(true);
                console.log("AI is ready to generate projects!");
            } catch (error) {
                console.error("AI initialization failed:", error);
                setAiReady(true); 
            }
        };
        
        initAI();
    }, []);

    const allLanguages = [
        { name: "React", icon: <Globe size={16} /> },
        { name: "JavaScript", icon: <Code size={16} /> },
        { name: "Python", icon: <Terminal size={16} /> },
        { name: "PHP", icon: <Server size={16} /> },
        { name: "Java", icon: <Coffee size={16} /> },
        { name: "C#", icon: <Code size={16} /> },
        { name: "TypeScript", icon: <Code size={16} /> },
        { name: "Ruby", icon: <Diamond size={16} /> },
        { name: "Go", icon: <Zap size={16} /> },
        { name: "Swift", icon: <Smartphone size={16} /> }
    ];

    const allFeatures = [
        { name: t.authentication, icon: <Users size={16} /> },
        { name: t.database, icon: <Database size={16} /> },
        { name: t.api, icon: <Server size={16} /> },
        { name: t.responsive, icon: <Layout size={16} /> },
        { name: t.payment, icon: <CreditCard size={16} /> },
        { name: t.realtime, icon: <Zap size={16} /> },
        { name: t.adminPanel, icon: <UsersIcon size={16} /> },
        { name: t.fileUpload, icon: <Upload size={16} /> }
    ];

    const handleLanguageToggle = (language) => {
        setFormData(prev => ({
            ...prev,
            languages: prev.languages.includes(language)
                ? prev.languages.filter(l => l !== language)
                : [...prev.languages, language]
        }));
    };

    const handleFeatureToggle = (feature) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature]
        }));
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        const currentUser = getCurrentUser();
        if (!currentUser) {
            setError(t.loginRequired);
            setTimeout(() => navigate('/login'), 2000);
            setLoading(false);
            return;
        }
        
        if (formData.languages.length === 0) {
            setError(t.selectLanguage);
            setLoading(false);
            return;
        }
        
        try {
            let generatedProject;
            
            if (aiReady) {
                console.log("Generating project with AI...");
                generatedProject = await projectAI.generateProject({
                    languages: formData.languages,
                    level: formData.level,
                    type: formData.projectType,
                    goal: formData.goal,
                    features: formData.features
                });
                
                console.log("AI Generated Project:", generatedProject);
            } else {
                generatedProject = await generateProjectFallback({
                    languages: formData.languages,
                    level: formData.level,
                    type: formData.projectType,
                    goal: formData.goal,
                    features: formData.features
                });
            }
            
            const result = await generateProject({
                languages: formData.languages,
                level: formData.level,
                type: formData.projectType,
                goal: formData.goal,
                features: formData.features,
                ai_generated: aiReady,
                project_details: generatedProject
            });
            
            if (result.success) {
                alert(aiReady ? t.successMessage : t.fallbackSuccess);
                navigate(`/project/${result.project.id}`);
            } else {
                setError(t.generationFailed + ": " + result.message);
            }
            
        } catch (error) {
            console.error('Error generating project:', error);
            setError(t.errorOccurred);
        } finally {
            setLoading(false);
        }
    };

    const generateProjectFallback = async (projectData) => {
        return {
            project_name: `${projectData.type.charAt(0).toUpperCase() + projectData.type.slice(1)} Project - ${projectData.languages?.join(', ') || 'Custom'}`,
            description: `A ${projectData.level} level ${projectData.type} project for ${projectData.goal}`,
            implementation_steps: [
                { step: 1, title: "Project Setup", description: "Initialize project structure and install dependencies", completed: false },
                { step: 2, title: "Database Design", description: "Design and implement database schema", completed: false },
                { step: 3, title: "Backend Development", description: "Create API endpoints and business logic", completed: false },
                { step: 4, title: "Frontend Development", description: "Build user interface components", completed: false },
                { step: 5, title: "Testing", description: "Write and run tests for all features", completed: false },
                { step: 6, title: "Deployment", description: "Deploy application to production", completed: false }
            ],
            future_enhancements: [
                "Add user authentication",
                "Implement real-time features",
                "Add admin dashboard",
                "Improve UI/UX design",
                "Add analytics"
            ]
        };
    };

    const projectTypes = [
        { value: "web", label: t.web, desc: t.webDesc, icon: <Globe size={24} /> },
        { value: "mobile", label: t.mobile, desc: t.mobileDesc, icon: <Smartphone size={24} /> },
        { value: "desktop", label: t.desktop, desc: t.desktopDesc, icon: <Monitor size={24} /> },
        { value: "api", label: t.api, desc: t.apiDesc, icon: <Server size={24} /> },
        { value: "game", label: t.game, desc: t.gameDesc, icon: <Gamepad2 size={24} /> },
        { value: "ai", label: t.ai, desc: t.aiDesc, icon: <Brain size={24} /> }
    ];

    const goals = [
        { value: "learn", label: t.learn, desc: t.learnDesc, icon: <BookOpen size={24} /> },
        { value: "portfolio", label: t.portfolio, desc: t.portfolioDesc, icon: <Briefcase size={24} /> },
        { value: "startup", label: t.startup, desc: t.startupDesc, icon: <Rocket size={24} /> },
        { value: "freelance", label: t.freelance, desc: t.freelanceDesc, icon: <DollarSign size={24} /> }
    ];

    const experienceLevels = [
        { value: "beginner", label: t.beginner, desc: t.beginnerDesc, number: "1" },
        { value: "intermediate", label: t.intermediate, desc: t.intermediateDesc, number: "2" },
        { value: "advanced", label: t.advanced, desc: t.advancedDesc, number: "3" }
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
                                {t.generateProject}
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
                            {t.dashboard}
                        </button>
                        
                        <button
                            onClick={() => navigate("/generate")}
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
                <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
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
                        <div style={{ flex: 1 }}>
                            <button
                                onClick={() => navigate("/dashboard")}
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "transparent",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    marginBottom: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    transition: "all 0.2s",
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = "#f3f4f6";
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = "transparent";
                                }}
                            >
                                <ArrowLeft size={18} />
                                {t.backButton}
                            </button>
                            
                            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "10px" }}>
                                <div style={{
                                    width: "60px",
                                    height: "60px",
                                    backgroundColor: "#EEF2FF",
                                    borderRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#4F46E5"
                                }}>
                                    <Sparkles size={30} />
                                </div>
                                <div>
                                    <h1 style={{ fontSize: "2rem", color: "#1f2937", margin: 0 }}>
                                        {t.pageTitle}
                                        {aiReady && <span style={{
                                            fontSize: "14px",
                                            backgroundColor: "#10b981",
                                            color: "white",
                                            padding: "4px 12px",
                                            borderRadius: "20px",
                                            marginLeft: "15px",
                                            verticalAlign: "middle"
                                        }}>
                                            {t.aiReadyBadge}
                                        </span>}
                                    </h1>
                                    <p style={{ color: "#6b7280", marginTop: "5px" }}>
                                        {aiReady ? t.pageSubtitle : t.pageSubtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div style={{ display: "flex", alignItems: "center", gap: "15px", flexDirection: isRTL ? "row-reverse" : "row" }}>
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

                    {error && (
                        <div style={{
                            backgroundColor: "#fef2f2",
                            border: "1px solid #fecaca",
                            color: "#dc2626",
                            padding: "15px",
                            borderRadius: "8px",
                            marginBottom: "20px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            flexDirection: isRTL ? "row-reverse" : "row"
                        }}>
                            <span>❌</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: "30px"
                        }}>
                            {/* Languages & Technologies */}
                            <div style={{
                                backgroundColor: "white",
                                padding: "30px",
                                borderRadius: "12px",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                textAlign: isRTL ? "right" : "left"
                            }}>
                                <h2 style={{ 
                                    marginTop: 0, 
                                    marginBottom: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}>
                                    <Code size={24} color="#4F46E5" />
                                    {t.languagesTitle}
                                </h2>
                                <p style={{ color: "#6b7280", marginBottom: "20px" }}>
                                    {t.languagesDesc}
                                </p>
                                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                    {allLanguages.map(lang => (
                                        <button
                                            type="button"
                                            key={lang.name}
                                            onClick={() => handleLanguageToggle(lang.name)}
                                            style={{
                                                padding: "12px 20px",
                                                backgroundColor: formData.languages.includes(lang.name) ? "#4F46E5" : "#f3f4f6",
                                                color: formData.languages.includes(lang.name) ? "white" : "#374151",
                                                border: "none",
                                                borderRadius: "8px",
                                                cursor: "pointer",
                                                fontWeight: "500",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                                transition: "all 0.2s",
                                                flexDirection: isRTL ? "row-reverse" : "row"
                                            }}
                                            onMouseOver={(e) => {
                                                if (!formData.languages.includes(lang.name)) {
                                                    e.target.style.backgroundColor = "#e5e7eb";
                                                }
                                            }}
                                            onMouseOut={(e) => {
                                                if (!formData.languages.includes(lang.name)) {
                                                    e.target.style.backgroundColor = "#f3f4f6";
                                                }
                                            }}
                                        >
                                            {lang.icon}
                                            {lang.name}
                                            {formData.languages.includes(lang.name) && <Check size={14} />}
                                        </button>
                                    ))}
                                </div>
                                {formData.languages.length > 0 && (
                                    <p style={{ marginTop: "15px", color: "#10b981", fontSize: "14px" }}>
                                        {t.selected}: {formData.languages.join(', ')}
                                    </p>
                                )}
                            </div>

                            {/* Experience Level */}
                            <div style={{
                                backgroundColor: "white",
                                padding: "30px",
                                borderRadius: "12px",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                textAlign: isRTL ? "right" : "left"
                            }}>
                                <h2 style={{ 
                                    marginTop: 0, 
                                    marginBottom: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}>
                                    <Award size={24} color="#4F46E5" />
                                    {t.experienceTitle}
                                </h2>
                                <div style={{ display: "flex", gap: "15px", flexDirection: isRTL ? "row-reverse" : "row" }}>
                                    {experienceLevels.map(level => (
                                        <label key={level.value} style={{
                                            flex: 1,
                                            padding: "20px",
                                            backgroundColor: formData.level === level.value ? "#e0e7ff" : "#f3f4f6",
                                            borderRadius: "10px",
                                            cursor: "pointer",
                                            textAlign: "center",
                                            transition: "all 0.2s",
                                            border: formData.level === level.value ? "2px solid #4F46E5" : "2px solid transparent"
                                        }}>
                                            <input
                                                type="radio"
                                                name="level"
                                                value={level.value}
                                                checked={formData.level === level.value}
                                                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                                style={{ display: "none" }}
                                            />
                                            <div style={{ 
                                                width: "40px", 
                                                height: "40px", 
                                                backgroundColor: formData.level === level.value ? "#4F46E5" : "#9ca3af",
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                margin: "0 auto 15px",
                                                color: "white"
                                            }}>
                                                {level.number}
                                            </div>
                                            <div style={{ fontWeight: "600", marginBottom: "5px", fontSize: "18px" }}>
                                                {level.label}
                                            </div>
                                            <div style={{ fontSize: "14px", color: "#6b7280" }}>
                                                {level.desc}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Project Type */}
                            <div style={{
                                backgroundColor: "white",
                                padding: "30px",
                                borderRadius: "12px",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                textAlign: isRTL ? "right" : "left"
                            }}>
                                <h2 style={{ 
                                    marginTop: 0, 
                                    marginBottom: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}>
                                    <Target size={24} color="#4F46E5" />
                                    {t.projectTypeTitle}
                                </h2>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
                                    {projectTypes.map(type => (
                                        <label key={type.value} style={{
                                            padding: "20px",
                                            backgroundColor: formData.projectType === type.value ? "#e0e7ff" : "#f3f4f6",
                                            borderRadius: "10px",
                                            cursor: "pointer",
                                            textAlign: "center",
                                            transition: "all 0.2s",
                                            border: formData.projectType === type.value ? "2px solid #4F46E5" : "2px solid transparent"
                                        }}>
                                            <input
                                                type="radio"
                                                name="projectType"
                                                value={type.value}
                                                checked={formData.projectType === type.value}
                                                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                                style={{ display: "none" }}
                                            />
                                            <div style={{ 
                                                color: formData.projectType === type.value ? "#4F46E5" : "#6b7280",
                                                marginBottom: "10px",
                                                display: "flex",
                                                justifyContent: "center"
                                            }}>
                                                {type.icon}
                                            </div>
                                            <div style={{ fontWeight: "600", marginBottom: "5px", fontSize: "16px" }}>
                                                {type.label}
                                            </div>
                                            <div style={{ fontSize: "12px", color: "#6b7280" }}>
                                                {type.desc}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Desired Features */}
                            <div style={{
                                backgroundColor: "white",
                                padding: "30px",
                                borderRadius: "12px",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                textAlign: isRTL ? "right" : "left"
                            }}>
                                <h2 style={{ 
                                    marginTop: 0, 
                                    marginBottom: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}>
                                    <Check size={24} color="#4F46E5" />
                                    {t.featuresTitle}
                                </h2>
                                <p style={{ color: "#6b7280", marginBottom: "20px" }}>
                                    {t.featuresDesc}
                                </p>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "15px" }}>
                                    {allFeatures.map(feature => (
                                        <label key={feature.name} style={{
                                            padding: "15px",
                                            backgroundColor: formData.features.includes(feature.name) ? "#d1fae5" : "#f3f4f6",
                                            border: formData.features.includes(feature.name) ? "2px solid #10b981" : "1px solid #e5e7eb",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            transition: "all 0.2s",
                                            flexDirection: isRTL ? "row-reverse" : "row"
                                        }}>
                                            <input
                                                type="checkbox"
                                                checked={formData.features.includes(feature.name)}
                                                onChange={() => handleFeatureToggle(feature.name)}
                                                style={{ width: "18px", height: "18px" }}
                                            />
                                            <div style={{ 
                                                color: formData.features.includes(feature.name) ? "#10b981" : "#6b7280"
                                            }}>
                                                {feature.icon}
                                            </div>
                                            <span style={{ 
                                                color: formData.features.includes(feature.name) ? "#065f46" : "#374151",
                                                fontWeight: formData.features.includes(feature.name) ? "500" : "normal"
                                            }}>
                                                {feature.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                {formData.features.length > 0 && (
                                    <p style={{ marginTop: "15px", color: "#10b981", fontSize: "14px" }}>
                                        {t.selected} {formData.features.length} {t.featuresCount}
                                    </p>
                                )}
                            </div>

                            {/* Project Goal */}
                            <div style={{
                                backgroundColor: "white",
                                padding: "30px",
                                borderRadius: "12px",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                textAlign: isRTL ? "right" : "left"
                            }}>
                                <h2 style={{ 
                                    marginTop: 0, 
                                    marginBottom: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}>
                                    <Target size={24} color="#4F46E5" />
                                    {t.projectGoalTitle}
                                </h2>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
                                    {goals.map(goal => (
                                        <label key={goal.value} style={{
                                            padding: "20px",
                                            backgroundColor: formData.goal === goal.value ? "#e0e7ff" : "#f3f4f6",
                                            borderRadius: "10px",
                                            cursor: "pointer",
                                            textAlign: "center",
                                            transition: "all 0.2s",
                                            border: formData.goal === goal.value ? "2px solid #4F46E5" : "2px solid transparent"
                                        }}>
                                            <input
                                                type="radio"
                                                name="goal"
                                                value={goal.value}
                                                checked={formData.goal === goal.value}
                                                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                                                style={{ display: "none" }}
                                            />
                                            <div style={{ 
                                                color: formData.goal === goal.value ? "#4F46E5" : "#6b7280",
                                                marginBottom: "10px",
                                                display: "flex",
                                                justifyContent: "center"
                                            }}>
                                                {goal.icon}
                                            </div>
                                            <div style={{ fontWeight: "600", marginBottom: "5px", fontSize: "16px" }}>
                                                {goal.label}
                                            </div>
                                            <div style={{ fontSize: "12px", color: "#6b7280" }}>
                                                {goal.desc}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Generate Button */}
                            <div style={{
                                backgroundColor: "white",
                                padding: "30px",
                                borderRadius: "12px",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                textAlign: "center"
                            }}>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{
                                        padding: "18px 40px",
                                        backgroundColor: loading ? "#9ca3af" : "#4F46E5",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "10px",
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        cursor: loading ? "not-allowed" : "pointer",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "15px",
                                        transition: "all 0.2s",
                                        flexDirection: isRTL ? "row-reverse" : "row"
                                    }}
                                    onMouseOver={(e) => {
                                        if (!loading) {
                                            e.target.style.backgroundColor = "#4338CA";
                                        }
                                    }}
                                    onMouseOut={(e) => {
                                        if (!loading) {
                                            e.target.style.backgroundColor = "#4F46E5";
                                        }
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <div style={{
                                                width: "20px",
                                                height: "20px",
                                                border: "2px solid white",
                                                borderTop: "2px solid transparent",
                                                borderRadius: "50%",
                                                animation: "spin 1s linear infinite"
                                            }}></div>
                                            {aiReady ? t.generatingButton : t.fallbackGenerating}
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={24} />
                                            {aiReady ? t.generateButton : t.fallbackButton}
                                        </>
                                    )}
                                </button>
                                
                                <p style={{ color: "#6b7280", marginTop: "15px", fontSize: "14px" }}>
                                    {aiReady 
                                        ? t.aiActiveDesc
                                        : t.aiActiveDesc
                                    }
                                </p>
                                
                                {aiReady && (
                                    <div style={{
                                        backgroundColor: "#f0f9ff",
                                        border: "1px solid #bae6fd",
                                        borderRadius: "8px",
                                        padding: "15px",
                                        marginTop: "20px",
                                        textAlign: "center"
                                    }}>
                                        <p style={{ margin: "0 0 10px 0", color: "#0369a1", fontWeight: "500" }}>
                                            {t.aiActiveText}
                                        </p>
                                        <p style={{ margin: 0, fontSize: "14px", color: "#0c4a6e" }}>
                                            {t.aiActiveDesc}
                                        </p>
                                    </div>
                                )}
                                
                                {formData.languages.length > 0 && (
                                    <div style={{
                                        backgroundColor: "#f0f9ff",
                                        border: "1px solid #bae6fd",
                                        borderRadius: "8px",
                                        padding: "15px",
                                        marginTop: "20px",
                                        textAlign: isRTL ? "right" : "left"
                                    }}>
                                        <p style={{ margin: "0 0 10px 0", color: "#0369a1", fontWeight: "500" }}>
                                            {t.projectSummary}
                                        </p>
                                        <ul style={{ margin: 0, paddingLeft: isRTL ? "0" : "20px", paddingRight: isRTL ? "20px" : "0", color: "#0c4a6e", listStylePosition: "inside" }}>
                                            <li><strong>{t.languagesLabel}:</strong> {formData.languages.join(', ')}</li>
                                            <li><strong>{t.levelLabel}:</strong> {formData.level}</li>
                                            <li><strong>{t.typeLabel}:</strong> {formData.projectType}</li>
                                            <li><strong>{t.goalLabel}:</strong> {formData.goal}</li>
                                            <li><strong>{t.featuresLabel}:</strong> {formData.features.length > 0 ? formData.features.join(', ') : 'None selected'}</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
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
                
                /* Remove button focus outline */
                button:focus {
                    outline: none;
                }
                
                /* Radio button label hover effect */
                label:hover {
                    transform: translateY(-2px);
                }
            `}</style>
        </div>
    );
};

export default ProjectGeneratorPage;