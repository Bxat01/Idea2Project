import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from '../services/authService'; 
import { 
  Sparkles, 
  Code, 
  Rocket, 
  Users, 
  Award, 
  Zap, 
  ChevronRight,
  Globe,
  Database,
  Shield,
  TrendingUp,
  CheckCircle,
  Star,
  ArrowRight,
  Menu,
  X,
  LogIn,
  UserPlus,
  User,
  Terminal,
  Server,
  Smartphone,
  Brain,
  Cloud,
  Lock,
  BarChart,
  MessageSquare,
  Palette,
  Coffee,
  Diamond,
  Monitor,
  GamepadIcon,
  ChevronDown,
  Languages,
  Check,
  Github,
  Linkedin,
  Twitter,
  HelpCircle,
  BookOpen,
  Cpu,
  Wifi,
  ShieldCheck,
  Infinity,
  Target,
  BarChart3,
  FileCode,
  Layers,
  GitBranch,
  Cpu as Processor,
  Zap as Lightning,
  Mail,       
  Settings,   
  LogOut, 
  Home       
} from 'lucide-react';

const HomePage = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const dropdownRef = useRef(null); 
    const [scrollPosition, setScrollPosition] = useState(0);
    const [activeLanguage, setActiveLanguage] = useState("en");
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const movingTechRef = useRef(null);
    const [techStackPosition, setTechStackPosition] = useState(0);

    // Multi-language support
    const translations = {
        en: {
            // Navigation
            navFeatures: "Features",
            navTechnologies: "Technologies",
            navExamples: "Examples",
            navTestimonials: "Testimonials",
            navDashboard: "Dashboard",
            navSignIn: "Sign In",
            navGetStarted: "Get Started",
            
            // Hero section
            heroTagline: "Powered by Advanced AI",
            heroTitle1: "Generate Complete Projects",
            heroTitle2: "Based on Your Tech Stack",
            heroDescription: "Choose from React, JavaScript, Python, PHP, Java, C#, TypeScript, Ruby, Go, Swift and more. Our AI creates tailored project ideas with detailed implementation steps.",
            heroButton1: "Start Free",
            heroButton2: "View Examples",
            
            // Stats
            statsProjects: "Projects Generated",
            statsDevelopers: "Active Developers",
            statsSuccess: "Success Rate",
            statsTechnologies: "Technologies",
            
            // Technologies
            techTitle: "Supported Technologies",
            techDescription: "Choose from our curated list of 22+ technologies and frameworks",
            techFrontend: "Frontend",
            techBackend: "Backend",
            techDatabase: "Database",
            techMobile: "Mobile",
            techDesktop: "Desktop",
            techAI: "AI/ML",
            techDevOps: "DevOps",
            techGame: "Game Dev",
            
            // Combinations
            combosTitle: "Popular Tech Combinations",
            combosDescription: "Based on real projects from our training data",
            comboLevelBeginner: "Beginner",
            comboLevelIntermediate: "Intermediate",
            comboLevelAdvanced: "Advanced",
            
            // Features
            featuresTitle: "How RyderAI Works",
            featuresDescription: "Turn your chosen technologies into complete, production-ready projects",
            
            // Testimonials
            testimonialsTitle: "What Developers Say",
            
            // CTA
            ctaTitle: "Start Building With Your Tech Stack",
            ctaDescription: "Choose from React, JavaScript, Python, PHP, Java, C#, TypeScript, Ruby, Go, Swift and more",
            ctaButton: "Choose Your Tech Stack",
            
            // Footer
            footerDescription: "AI-powered platform for generating complete software projects based on your chosen technologies.",
            footerTechnologies: "Technologies",
            footerQuickLinks: "Quick Links",
            footerSupport: "Support",
            footerDocs: "Documentation",
            footerHelp: "Help Center",
            footerContact: "Contact Us",
            footerRights: "All rights reserved",
            
            // Demo notice
            demoNotice: "Demo Version - May contain some errors",
            developerNotice: "Independent AI Developer - Built from scratch",
            metricsNotice: "Metrics shown are demo data for product preview purposes."
        },
        ar: {
            navFeatures: "المميزات",
            navTechnologies: "التقنيات",
            navExamples: "أمثلة",
            navTestimonials: "آراء المستخدمين",
            navDashboard: "لوحة التحكم",
            navSignIn: "تسجيل الدخول",
            navGetStarted: "ابدأ الآن",
            
            heroTagline: "مدعوم بالذكاء الاصطناعي المتقدم",
            heroTitle1: "أنشئ مشاريع كاملة",
            heroTitle2: "بناءً على تقنياتك المفضلة",
            heroDescription: "اختر من React, JavaScript, Python, PHP, Java, C#, TypeScript, Ruby, Go, Swift والمزيد. ذكائنا الاصطناعي يصمم أفكار مشاريع مخصصة مع خطوات تنفيذ مفصلة.",
            heroButton1: "ابدأ مجاناً",
            heroButton2: "عرض الأمثلة",
            
            statsProjects: "مشروع تم إنشاؤه",
            statsDevelopers: "مطور نشط",
            statsSuccess: "معدل النجاح",
            statsTechnologies: "تقنية",
            
            techTitle: "التقنيات المدعومة",
            techDescription: "اختر من قائمتنا المختارة من 22+ تقنية وإطار عمل",
            techFrontend: "واجهة أمامية",
            techBackend: "واجهة خلفية",
            techDatabase: "قاعدة بيانات",
            techMobile: "جوال",
            techDesktop: "سطح مكتب",
            techAI: "ذكاء اصطناعي",
            techDevOps: "DevOps",
            techGame: "تطوير ألعاب",
            
            combosTitle: "مجموعات تقنية شائعة",
            combosDescription: "بناءً على مشاريع حقيقية من بيانات التدريب",
            comboLevelBeginner: "مبتدئ",
            comboLevelIntermediate: "متوسط",
            comboLevelAdvanced: "متقدم",
            
            featuresTitle: "كيف يعمل RyderAI",
            featuresDescription: "حول تقنياتك المختارة إلى مشاريع كاملة وجاهزة للإنتاج",
            
            testimonialsTitle: "آراء المطورين",
            
            ctaTitle: "ابدأ البناء باستخدام تقنياتك",
            ctaDescription: "اختر من React, JavaScript, Python, PHP, Java, C#, TypeScript, Ruby, Go, Swift والمزيد",
            ctaButton: "اختر تقنياتك",
            
            footerDescription: "منصة مدعومة بالذكاء الاصطناعي لإنشاء مشاريع برمجية كاملة بناءً على التقنيات التي تختارها.",
            footerTechnologies: "التقنيات",
            footerQuickLinks: "روابط سريعة",
            footerSupport: "الدعم",
            footerDocs: "التوثيق",
            footerHelp: "مركز المساعدة",
            footerContact: "اتصل بنا",
            footerRights: "جميع الحقوق محفوظة",
            
            demoNotice: "نسخة تجريبية - قد تحتوي على بعض الأخطاء",
            developerNotice: "مطور ذكاء اصطناعي مستقل - مبني من الصفر"
        },
        fr: {
            navFeatures: "Fonctionnalités",
            navTechnologies: "Technologies",
            navExamples: "Exemples",
            navTestimonials: "Témoignages",
            navDashboard: "Tableau de bord",
            navSignIn: "Connexion",
            navGetStarted: "Commencer",
            
            heroTagline: "Propulsé par l'IA avancée",
            heroTitle1: "Générez des projets complets",
            heroTitle2: "Basé sur votre pile technologique",
            heroDescription: "Choisissez parmi React, JavaScript, Python, PHP, Java, C#, TypeScript, Ruby, Go, Swift et plus. Notre IA crée des idées de projets sur mesure avec des étapes de mise en œuvre détaillées.",
            heroButton1: "Commencer gratuitement",
            heroButton2: "Voir les exemples",
            
            statsProjects: "Projets générés",
            statsDevelopers: "Développeurs actifs",
            statsSuccess: "Taux de réussite",
            statsTechnologies: "Technologies",
            
            techTitle: "Technologies prises en charge",
            techDescription: "Choisissez parmi notre liste organisée de 22+ technologies et frameworks",
            techFrontend: "Frontend",
            techBackend: "Backend",
            techDatabase: "Base de données",
            techMobile: "Mobile",
            techDesktop: "Bureau",
            techAI: "IA/ML",
            techDevOps: "DevOps",
            techGame: "Développement de jeux",
            
            combosTitle: "Combinaisons technologiques populaires",
            combosDescription: "Basé sur des projets réels de nos données d'entraînement",
            comboLevelBeginner: "Débutant",
            comboLevelIntermediate: "Intermédiaire",
            comboLevelAdvanced: "Avancé",
            
            featuresTitle: "Comment fonctionne RyderAI",
            featuresDescription: "Transformez vos technologies choisies en projets complets et prêts pour la production",
            
            testimonialsTitle: "Ce que disent les développeurs",
            
            ctaTitle: "Commencez à construire avec votre pile technologique",
            ctaDescription: "Choisissez parmi React, JavaScript, Python, PHP, Java, C#, TypeScript, Ruby, Go, Swift et plus",
            ctaButton: "Choisissez votre pile technologique",
            
            footerDescription: "Plateforme alimentée par l'IA pour générer des projets logiciels complets basés sur vos technologies choisies.",
            footerTechnologies: "Technologies",
            footerQuickLinks: "Liens rapides",
            footerSupport: "Support",
            footerDocs: "Documentation",
            footerHelp: "Centre d'aide",
            footerContact: "Contactez-nous",
            footerRights: "Tous droits réservés",
            
            demoNotice: "Version de démonstration - Peut contenir des erreurs",
            developerNotice: "Développeur IA indépendant - Construit à partir de zéro"
        },
        es: {
            navFeatures: "Características",
            navTechnologies: "Tecnologías",
            navExamples: "Ejemplos",
            navTestimonials: "Testimonios",
            navDashboard: "Panel de control",
            navSignIn: "Iniciar sesión",
            navGetStarted: "Comenzar",
            
            heroTagline: "Impulsado por IA avanzada",
            heroTitle1: "Genera proyectos completos",
            heroTitle2: "Basado en tu stack tecnológico",
            heroDescription: "Elige entre React, JavaScript, Python, PHP, Java, C#, TypeScript, Ruby, Go, Swift y más. Nuestra IA crea ideas de proyectos personalizadas con pasos de implementación detallados.",
            heroButton1: "Comenzar gratis",
            heroButton2: "Ver ejemplos",
            
            statsProjects: "Proyectos generados",
            statsDevelopers: "Desarrolladores activos",
            statsSuccess: "Tasa de éxito",
            statsTechnologies: "Tecnologías",
            
            techTitle: "Tecnologías soportadas",
            techDescription: "Elige de nuestra lista seleccionada de 22+ tecnologías y frameworks",
            techFrontend: "Frontend",
            techBackend: "Backend",
            techDatabase: "Base de datos",
            techMobile: "Móvil",
            techDesktop: "Escritorio",
            techAI: "IA/ML",
            techDevOps: "DevOps",
            techGame: "Desarrollo de juegos",
            
            combosTitle: "Combinaciones tecnológicas populares",
            combosDescription: "Basado en proyectos reales de nuestros datos de entrenamiento",
            comboLevelBeginner: "Principiante",
            comboLevelIntermediate: "Intermedio",
            comboLevelAdvanced: "Avanzado",
            
            featuresTitle: "Cómo funciona RyderAI",
            featuresDescription: "Convierte tus tecnologías elegidas en proyectos completos y listos para producción",
            
            testimonialsTitle: "Lo que dicen los desarrolladores",
            
            ctaTitle: "Comienza a construir con tu stack tecnológico",
            ctaDescription: "Elige entre React, JavaScript, Python, PHP, Java, C#, TypeScript, Ruby, Go, Swift y más",
            ctaButton: "Elige tu stack tecnológico",
            
            footerDescription: "Plataforma impulsada por IA para generar proyectos de software completos basados en tus tecnologías elegidas.",
            footerTechnologies: "Tecnologías",
            footerQuickLinks: "Enlaces rápidos",
            footerSupport: "Soporte",
            footerDocs: "Documentación",
            footerHelp: "Centro de ayuda",
            footerContact: "Contáctanos",
            footerRights: "Todos los derechos reservados",
            
            demoNotice: "Versión de demostración - Puede contener errores",
            developerNotice: "Desarrollador de IA independiente - Construido desde cero"
        }
    };

    const t = translations[activeLanguage];
    const isRTL = ["ar"].includes(activeLanguage);

    useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('current_user'));    
    if (userData) {
        setUser(userData);
    }

    const handleScroll = () => {
        setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    
    const animateTechStack = () => {
        setTechStackPosition(prev => {
            const newPos = prev - 1;
            const containerWidth = movingTechRef.current?.scrollWidth || 0;
            
            return newPos < -containerWidth ? 0 : newPos;
        });
    };
    
    const intervalId = setInterval(animateTechStack, 20);
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
        clearInterval(intervalId);
    };
}, []);
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
    if (!name) return '#4F46E5'; // غير من #6366f1 إلى #4F46E5
    
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

const handleLogout = () => {
    localStorage.removeItem('current_user');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
};



    const mainLanguages = [
        { 
            name: "React", 
            icon: <Globe size={28} />, 
            color: "#61dafb", 
            category: t.techFrontend
        },
        { 
            name: "JavaScript", 
            icon: <Code size={28} />, 
            color: "#f7df1e", 
            category: t.techFrontend
        },
        { 
            name: "Python", 
            icon: <Terminal size={28} />, 
            color: "#3776ab", 
            category: t.techBackend
        },
        { 
            name: "PHP", 
            icon: <Server size={28} />, 
            color: "#777bb4", 
            category: t.techBackend
        },
        { 
            name: "Java", 
            icon: <Coffee size={28} />, 
            color: "#007396", 
            category: t.techBackend
        },
        { 
            name: "C#", 
            icon: <Code size={28} />, 
            color: "#239120", 
            category: t.techDesktop
        },
        { 
            name: "TypeScript", 
            icon: <Shield size={28} />, 
            color: "#3178c6", 
            category: t.techFrontend
        },
        { 
            name: "Ruby", 
            icon: <Diamond size={28} />, 
            color: "#cc342d", 
            category: t.techBackend
        },
        { 
            name: "Go", 
            icon: <Zap size={28} />, 
            color: "#00add8", 
            category: t.techBackend
        },
        { 
            name: "Swift", 
            icon: <Smartphone size={28} />, 
            color: "#f05138", 
            category: t.techMobile
        },
    ];

    const additionalTech = [
        { name: "Node.js", icon: <Server size={28} />, color: "#68a063", category: t.techBackend },
        { name: "MongoDB", icon: <Database size={28} />, color: "#47a248", category: t.techDatabase },
        { name: "Express", icon: <Server size={28} />, color: "#000000", category: t.techBackend },
        { name: "Firebase", icon: <Cloud size={28} />, color: "#ffca28", category: t.techBackend },
        { name: "Django", icon: <Terminal size={28} />, color: "#092e20", category: t.techBackend },
        { name: ".NET", icon: <Code size={28} />, color: "#512bd4", category: t.techDesktop },
        { name: "TensorFlow", icon: <Brain size={28} />, color: "#ff6f00", category: t.techAI },
        { name: "Unity", icon: <GamepadIcon size={28} />, color: "#000000", category: t.techGame },
        { name: "Kubernetes", icon: <Database size={28} />, color: "#326ce5", category: t.techDevOps },
        { name: "PostgreSQL", icon: <Database size={28} />, color: "#336791", category: t.techDatabase },
        { name: "Redis", icon: <Database size={28} />, color: "#dc382d", category: t.techDatabase },
        { name: "Docker", icon: <Cloud size={28} />, color: "#2496ed", category: t.techDevOps },
    ];

    const features = [
        {
            icon: <Sparkles size={28} />,
            title: "AI-Powered Generation",
            description: "Generate complete project ideas with advanced AI algorithms based on your selected tech stack",
            color: "#8b5cf6"
        },
        {
            icon: <FileCode size={28} />,
            title: "Production-Ready Code",
            description: "Get clean, well-structured code following industry best practices and design patterns",
            color: "#3b82f6"
        },
        {
            icon: <Layers size={28} />,
            title: "Architecture Design",
            description: "Complete system architecture with database schemas, API design, and deployment strategies",
            color: "#ef4444"
        },
        {
            icon: <GitBranch size={28} />,
            title: "Version Control Setup",
            description: "Pre-configured Git repository with commit history and branching strategy",
            color: "#10b981"
        },
        {
            icon: <ShieldCheck size={28} />,
            title: "Security Best Practices",
            description: "Built-in authentication, authorization, and security measures for your projects",
            color: "#f59e0b"
        },
        {
            icon: <BarChart3 size={28} />,
            title: "Performance Optimization",
            description: "Performance guidelines and optimization techniques specific to your chosen stack",
            color: "#8b5cf6"
        }
    ];

    const popularCombinations = [
        {
            name: "Full Stack Web Application",
            languages: ["React", "Node.js", "MongoDB"],
            level: "intermediate",
            type: "Web App",
            description: "Modern MERN stack application with JWT authentication, REST API, and real-time features"
        },
        {
            name: "Machine Learning Platform",
            languages: ["Python", "TensorFlow", "React"],
            level: "advanced",
            type: "AI Platform",
            description: "End-to-end ML platform with model training, inference API, and visualization dashboard"
        },
        {
            name: "Mobile Application",
            languages: ["Swift", "Firebase", "UIKit"],
            level: "intermediate",
            type: "iOS App",
            description: "Native iOS application with cloud database, push notifications, and offline support"
        },
        {
            name: "Enterprise Desktop Software",
            languages: ["C#", ".NET", "SQL Server"],
            level: "advanced",
            type: "Desktop App",
            description: "Windows desktop application with database integration, reporting, and multi-user support"
        }
    ];

    const testimonials = [
        {
            name: "Alex Johnson",
            role: "Senior Full Stack Developer",
            text: "RyderAI transformed how we approach new projects. The React + Node.js + MongoDB template saved us weeks of setup time and provided excellent architecture patterns.",
            avatar: "AJ",
            tech: ["React", "Node.js", "MongoDB"],
            company: "Tech Solutions Inc."
        },
        {
            name: "Maria Garcia",
            role: "Machine Learning Engineer",
            text: "The Python + TensorFlow project structure helped our team implement best practices from day one. The documentation and setup guides are exceptional.",
            avatar: "MG",
            tech: ["Python", "TensorFlow", "FastAPI"],
            company: "AI Research Lab"
        },
        {
            name: "David Chen",
            role: "Mobile Development Lead",
            text: "As a startup with limited resources, RyderAI gave us production-ready Swift and Kotlin templates that accelerated our mobile app development by 40%.",
            avatar: "DC",
            tech: ["Swift", "Firebase", "UIKit"],
            company: "Startup Ventures"
        }
    ];

    const stats = [
        { value: "2,500+", label: t.statsProjects, icon: <Sparkles size={20} /> },
        { value: "1,800+", label: t.statsDevelopers, icon: <Users size={20} /> },
        { value: "96%", label: t.statsSuccess, icon: <TrendingUp size={20} /> },
        { value: "22+", label: t.statsTechnologies, icon: <Code size={20} /> }
    ];

    const languages = [
        { code: "en", name: "English", dir: "ltr" },
        { code: "ar", name: "العربية", dir: "rtl" },
        { code: "fr", name: "Français", dir: "ltr" },
        { code: "es", name: "Español", dir: "ltr" }
    ];

    const techStack = [...mainLanguages, ...additionalTech];
    const halfLength = Math.ceil(techStack.length / 2);
    const firstHalf = techStack.slice(0, halfLength);
    const secondHalf = techStack.slice(halfLength);

    const MovingTechStack = () => (
        <div style={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: "80px",
            backgroundColor: "#0f172a",
            borderTop: "1px solid #1e293b",
            borderBottom: "1px solid #1e293b",
            margin: 0,
            padding: 0
        }}>
            <div 
                ref={movingTechRef}
                style={{
                    display: "flex",
                    position: "absolute",
                    left: `${techStackPosition}px`,
                    transition: "left 0.1s linear",
                    gap: "40px",
                    alignItems: "center",
                    padding: "0 20px",
                    height: "100%"
                }}
            >
                {[...firstHalf, ...firstHalf].map((tech, index) => (
                    <div 
                        key={index}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "8px 20px",
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            borderRadius: "8px",
                            border: `1px solid ${tech.color}30`,
                            transition: "all 0.3s",
                            minWidth: "180px",
                            height: "50px"
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                            e.currentTarget.style.borderColor = tech.color;
                            e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                            e.currentTarget.style.borderColor = `${tech.color}30`;
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        <div style={{
                            color: tech.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            {tech.icon}
                        </div>
                        <div style={{ textAlign: isRTL ? "right" : "left" }}>
                            <div style={{
                                fontWeight: "600",
                                color: tech.color,
                                fontSize: "14px",
                                marginBottom: "2px"
                            }}>
                                {tech.name}
                            </div>
                            <div style={{
                                fontSize: "11px",
                                color: "#94a3b8",
                                backgroundColor: `${tech.color}15`,
                                padding: "1px 6px",
                                borderRadius: "8px",
                                display: "inline-block"
                            }}>
                                {tech.category}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div style={{ 
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            direction: isRTL ? "rtl" : "ltr",
            backgroundColor: "#0f172a",
            color: "#ffffff",
            margin: 0,
            padding: 0,
            minHeight: "100vh"
        }}>
            {/* Demo Notice - FIXED AT TOP */}
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: "#1e293b",
                color: "#94a3b8",
                padding: "8px 0",
                textAlign: "center",
                fontSize: "13px",
                fontWeight: "500",
                borderBottom: "1px solid #334155",
                zIndex: 1100,
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", width: "100%" }}>
                    {t.demoNotice} • {t.developerNotice} • {t.metricsNotice}

                </div>
            </div>

            {/* Header - POSITIONED BELOW DEMO NOTICE */}
            <header style={{
                position: "fixed",
                top: "36px", // Below demo notice
                left: 0,
                right: 0,
                backgroundColor: scrollPosition > 50 ? "rgba(15, 23, 42, 0.95)" : "rgba(15, 23, 42, 0.98)",
                backdropFilter: scrollPosition > 50 ? "blur(10px)" : "none",
                zIndex: 1000,
                borderBottom: "1px solid rgba(30, 41, 59, 0.5)",
                transition: "all 0.3s ease",
                height: "72px",
                display: "flex",
                alignItems: "center"
            }}>
                <div style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    padding: "0 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: isRTL ? "row-reverse" : "row",
                    width: "100%",
                    height: "100%"
                }}>
                    {/* Logo */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        cursor: "pointer",
                        height: "100%"
                    }} onClick={() => navigate("/")}>
                        <div style={{
                            width: "40px",
                            height: "40px",
                            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
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
                                fontSize: "24px",
                                fontWeight: "800",
                                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                lineHeight: "1"
                            }}>
                                RyderAI
                            </div>
                            <div style={{
                                fontSize: "11px",
                                color: "#94a3b8",
                                fontWeight: "500",
                                marginTop: "2px"
                            }}>
                                AI Project Generator
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "24px",
                        flexDirection: isRTL ? "row-reverse" : "row",
                        height: "100%"
                    }}>
                        <a href="#features" style={{
                            color: "#cbd5e1",
                            textDecoration: "none",
                            fontWeight: "500",
                            fontSize: "14px",
                            transition: "all 0.2s",
                            padding: "8px 12px",
                            borderRadius: "6px"
                        }} 
                        onMouseOver={(e) => {
                            e.target.style.color = "#6366f1";
                            e.target.style.backgroundColor = "rgba(99, 102, 241, 0.1)";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.color = "#cbd5e1";
                            e.target.style.backgroundColor = "transparent";
                        }}>
                            {t.navFeatures}
                        </a>
                        <a href="#technologies" style={{
                            color: "#cbd5e1",
                            textDecoration: "none",
                            fontWeight: "500",
                            fontSize: "14px",
                            transition: "all 0.2s",
                            padding: "8px 12px",
                            borderRadius: "6px"
                        }} 
                        onMouseOver={(e) => {
                            e.target.style.color = "#6366f1";
                            e.target.style.backgroundColor = "rgba(99, 102, 241, 0.1)";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.color = "#cbd5e1";
                            e.target.style.backgroundColor = "transparent";
                        }}>
                            {t.navTechnologies}
                        </a>
                        <a href="#combinations" style={{
                            color: "#cbd5e1",
                            textDecoration: "none",
                            fontWeight: "500",
                            fontSize: "14px",
                            transition: "all 0.2s",
                            padding: "8px 12px",
                            borderRadius: "6px"
                        }} 
                        onMouseOver={(e) => {
                            e.target.style.color = "#6366f1";
                            e.target.style.backgroundColor = "rgba(99, 102, 241, 0.1)";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.color = "#cbd5e1";
                            e.target.style.backgroundColor = "transparent";
                        }}>
                            {t.navExamples}
                        </a>
                        <a href="#testimonials" style={{
                            color: "#cbd5e1",
                            textDecoration: "none",
                            fontWeight: "500",
                            fontSize: "14px",
                            transition: "all 0.2s",
                            padding: "8px 12px",
                            borderRadius: "6px"
                        }} 
                        onMouseOver={(e) => {
                            e.target.style.color = "#6366f1";
                            e.target.style.backgroundColor = "rgba(99, 102, 241, 0.1)";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.color = "#cbd5e1";
                            e.target.style.backgroundColor = "transparent";
                        }}>
                            {t.navTestimonials}
                        </a>

                        {/* Language Selector */}
                        <div style={{ position: "relative", margin: "0 12px" }}>
                            <button
                                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "6px 12px",
                                    backgroundColor: "rgba(30, 41, 59, 0.5)",
                                    border: "1px solid #334155",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    color: "#cbd5e1",
                                    fontSize: "13px",
                                    transition: "all 0.2s",
                                    height: "36px"
                                }}
                                onMouseOver={(e) => e.target.style.borderColor = "#6366f1"}
                                onMouseOut={(e) => e.target.style.borderColor = "#334155"}
                            >
                                <Languages size={14} />
                                <span style={{ minWidth: "50px", textAlign: "left" }}>
                                    {languages.find(l => l.code === activeLanguage)?.name}
                                </span>
                                <ChevronDown size={14} />
                            </button>

                            {showLanguageDropdown && (
                                <div style={{
                                    position: "absolute",
                                    top: "100%",
                                    [isRTL ? "left" : "right"]: 0,
                                    backgroundColor: "#1e293b",
                                    borderRadius: "8px",
                                    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                                    minWidth: "140px",
                                    zIndex: 1000,
                                    marginTop: "5px",
                                    border: "1px solid #334155",
                                    overflow: "hidden"
                                }}>
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                logoutUser();
                                                setUser(null);
                                                  navigate('/login');
                                                 setShowProfileMenu(false);
                                                setActiveLanguage(lang.code);
                                                setShowLanguageDropdown(false);
                                            }}
                                            style={{
                                                width: "100%",
                                                padding: "10px 14px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                backgroundColor: activeLanguage === lang.code ? "#334155" : "transparent",
                                                border: "none",
                                                cursor: "pointer",
                                                fontSize: "13px",
                                                color: "#cbd5e1",
                                                transition: "all 0.2s",
                                                textAlign: isRTL ? "right" : "left"
                                            }}
                                            onMouseOver={(e) => e.target.style.backgroundColor = "#334155"}
                                            onMouseOut={(e) => e.target.style.backgroundColor = activeLanguage === lang.code ? "#334155" : "transparent"}
                                        >
                                            <span>{lang.name}</span>
                                            {activeLanguage === lang.code && <Check size={14} color="#6366f1" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Auth Buttons */}
                        {/* Auth Buttons */}
<div style={{ display: "flex", gap: "10px", alignItems: "center", flexDirection: isRTL ? "row-reverse" : "row" }}>
    {user ? (
        <div style={{ position: "relative" }}>
            {/* Avatar Button */}
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
                    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    border: "2px solid #1e293b",
                    marginLeft: isRTL ? "0" : "10px",
                    marginRight: isRTL ? "10px" : "0"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
                {getAvatarInitials(user?.name || '', user?.email || '')}
            </div>
            
            {/* Online Indicator */}
            <div style={{
                position: "absolute",
                bottom: "0",
                right: isRTL ? "auto" : "0",
                left: isRTL ? "0" : "auto",
                width: "10px",
                height: "10px",
                backgroundColor: "#10b981",
                borderRadius: "50%",
                border: "2px solid #1e293b"
            }}></div>
            
            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
                <>
                    <div style={{
                        position: "absolute",
                        top: "50px",
                        right: isRTL ? "auto" : "0",
                        left: isRTL ? "0" : "auto",
                        backgroundColor: "#1e293b",
                        borderRadius: "10px",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                        width: "250px",
                        zIndex: 1000,
                        border: "1px solid #334155",
                        overflow: "hidden"
                    }}>
                        {/* User Info */}
                        <div style={{
                            padding: "20px",
                            backgroundColor: "rgba(30, 41, 59, 0.8)",
                            borderBottom: "1px solid #334155",
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
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
                                <h4 style={{ margin: "0 0 5px 0", color: "#f8fafc", fontSize: "16px" }}>
                                    {user?.name || "User"}
                                </h4>
                                <p style={{ 
                                    margin: "0", 
                                    color: "#94a3b8", 
                                    fontSize: "12px",
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
                        
                        {/* Menu Items */}
                        <div style={{ padding: "10px 0" }}>
                            <button
                                onClick={() => {
                                    navigate("/dashboard");
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
                                    color: "#cbd5e1",
                                    transition: "all 0.2s",
                                    fontSize: "14px",
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = "rgba(99, 102, 241, 0.1)"}
                                onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                            >
                                <Home size={16} />
                                Dashboard
                            </button>
                            
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
                                    color: "#cbd5e1",
                                    transition: "all 0.2s",
                                    fontSize: "14px",
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = "rgba(99, 102, 241, 0.1)"}
                                onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                            >
                                <User size={16} />
                                Edit Profile
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
                                    color: "#cbd5e1",
                                    transition: "all 0.2s",
                                    fontSize: "14px",
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = "rgba(99, 102, 241, 0.1)"}
                                onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                            >
                                <Settings size={16} />
                                Settings
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
                                    borderTop: "1px solid #334155",
                                    marginTop: "10px",
                                    fontSize: "14px",
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = "rgba(239, 68, 68, 0.1)"}
                                onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    </div>
                    
                    {/* Backdrop */}
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
    ) : (
        <>
            <button
                onClick={() => navigate("/login")}
                style={{
                    padding: "8px 16px",
                    backgroundColor: "transparent",
                    color: "#6366f1",
                    border: "2px solid #6366f1",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s",
                    flexDirection: isRTL ? "row-reverse" : "row",
                    fontSize: "13px",
                    height: "36px"
                }}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#6366f1";
                    e.target.style.color = "white";
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#6366f1";
                }}
            >
                <LogIn size={14} />
                {t.navSignIn}
            </button>
            <button
                onClick={() => navigate("/login?register=true")}
                style={{
                    padding: "8px 16px",
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s",
                    flexDirection: isRTL ? "row-reverse" : "row",
                    fontSize: "13px",
                    height: "36px"
                }}
                onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 8px 20px rgba(99, 102, 241, 0.3)";
                }}
                onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                }}
            >
                <UserPlus size={14} />
                {t.navGetStarted}
            </button>
        </>
    )}
</div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={{
                            display: "none",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "8px",
                            color: "#cbd5e1"
                        }}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Main Content - STARTING BELOW HEADER */}
            <main style={{
                marginTop: "108px", // 36px (demo) + 72px (header) = 108px
                minHeight: "calc(100vh - 108px)"
            }}>
                {/* Moving Tech Stack - POSITIONED IMMEDIATELY AFTER HEADER */}
                <div style={{
                    width: "100%",
                    overflow: "hidden",
                    backgroundColor: "#0f172a",
                    borderBottom: "1px solid #1e293b",
                    margin: 0,
                    padding: 0
                }}>
                    <MovingTechStack />
                </div>

                {/* Hero Section */}
                <section style={{
                    padding: "40px 24px 80px",
                    position: "relative",
                    overflow: "hidden",
                    background: "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
                    minHeight: "calc(100vh - 188px)" // Adjusted for header + moving tech
                }}>
                    <div style={{
                        maxWidth: "1280px",
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: isRTL ? "row-reverse" : "row",
                        alignItems: "center",
                        gap: "80px"
                    }}>
                        {/* Left Content */}
                        <div style={{ flex: 1 }}>
                            <div style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "10px",
                                backgroundColor: "rgba(99, 102, 241, 0.1)",
                                padding: "10px 20px",
                                borderRadius: "12px",
                                marginBottom: "24px",
                                border: "1px solid rgba(99, 102, 241, 0.2)",
                                flexDirection: isRTL ? "row-reverse" : "row"
                            }}>
                                <Processor size={16} color="#6366f1" />
                                <span style={{ color: "#6366f1", fontWeight: "600", fontSize: "14px" }}>
                                    {t.heroTagline}
                                </span>
                            </div>

                            <h1 style={{
                                fontSize: "3.5rem",
                                fontWeight: "800",
                                marginBottom: "24px",
                                lineHeight: "1.1",
                                color: "#f8fafc",
                                letterSpacing: "-0.02em",
                                textAlign: isRTL ? "right" : "left"
                            }}>
                                {t.heroTitle1}
                                <br />
                                <span style={{
                                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent"
                                }}>
                                    {t.heroTitle2}
                                </span>
                            </h1>

                            <p style={{
                                fontSize: "1.25rem",
                                color: "#94a3b8",
                                marginBottom: "40px",
                                maxWidth: "600px",
                                lineHeight: "1.6",
                                textAlign: isRTL ? "right" : "left"
                            }}>
                                {t.heroDescription}
                            </p>

                            <div style={{ 
                                display: "flex", 
                                gap: "20px", 
                                alignItems: "center", 
                                flexWrap: "wrap",
                                flexDirection: isRTL ? "row-reverse" : "row" 
                            }}>
                                <button
                                    onClick={() => navigate(user ? "/generate" : "/login")}
                                    style={{
                                        padding: "16px 32px",
                                        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "12px",
                                        fontSize: "18px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        transition: "all 0.3s",
                                        flexDirection: isRTL ? "row-reverse" : "row"
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.transform = "translateY(-3px)";
                                        e.target.style.boxShadow = "0 15px 35px rgba(99, 102, 241, 0.3)";
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.transform = "translateY(0)";
                                        e.target.style.boxShadow = "none";
                                    }}
                                >
                                    {t.heroButton1}
                                    <ArrowRight size={20} style={{ transform: isRTL ? "rotate(180deg)" : "none" }} />
                                </button>

                                <button
                                    onClick={() => document.getElementById('combinations').scrollIntoView({ behavior: 'smooth' })}
                                    style={{
                                        padding: "16px 32px",
                                        backgroundColor: "transparent",
                                        color: "#cbd5e1",
                                        border: "2px solid #334155",
                                        borderRadius: "12px",
                                        fontSize: "18px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        transition: "all 0.2s"
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.borderColor = "#6366f1";
                                        e.target.style.color = "#6366f1";
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.borderColor = "#334155";
                                        e.target.style.color = "#cbd5e1";
                                    }}
                                >
                                    {t.heroButton2}
                                </button>
                            </div>

                            {/* Stats */}
                            <div style={{
                                display: "flex",
                                gap: "48px",
                                marginTop: "60px",
                                flexWrap: "wrap",
                                flexDirection: isRTL ? "row-reverse" : "row"
                            }}>
                                {stats.map((stat, index) => (
                                    <div key={index} style={{ textAlign: isRTL ? "right" : "left" }}>
                                        <div style={{
                                            fontSize: "32px",
                                            fontWeight: "700",
                                            color: "#f8fafc",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            flexDirection: isRTL ? "row-reverse" : "row"
                                        }}>
                                            {stat.icon}
                                            {stat.value}
                                        </div>
                                        <div style={{ color: "#94a3b8", fontSize: "14px", marginTop: "4px" }}>
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right - Tech Visualization */}
                        <div style={{
                            flex: 1,
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                            minHeight: "400px"
                        }}>
                            <div style={{
                                width: "400px",
                                height: "400px",
                                position: "relative"
                            }}>
                                {/* Main Orb */}
                                <div style={{
                                    width: "300px",
                                    height: "300px",
                                    background: "radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.2) 0%, transparent 70%)",
                                    borderRadius: "50%",
                                    position: "absolute",
                                    top: "50px",
                                    left: "50px",
                                    animation: "pulse 4s ease-in-out infinite"
                                }}></div>
                                
                                {/* Orbiting Technologies */}
                                {mainLanguages.slice(0, 6).map((tech, index) => {
                                    const angle = (index * 60) * Math.PI / 180;
                                    const radius = 140;
                                    const x = 150 + radius * Math.cos(angle);
                                    const y = 150 + radius * Math.sin(angle);
                                    
                                    return (
                                        <div key={index} style={{
                                            position: "absolute",
                                            left: `${x}px`,
                                            top: `${y}px`,
                                            transform: "translate(-50%, -50%)",
                                            width: "80px",
                                            height: "80px",
                                            backgroundColor: "rgba(30, 41, 59, 0.8)",
                                            borderRadius: "16px",
                                            border: `2px solid ${tech.color}`,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: "12px",
                                            transition: "all 0.3s",
                                            animation: `orbit ${20 + index * 2}s linear infinite`,
                                            animationDelay: `${index * 0.5}s`
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.1)";
                                            e.currentTarget.style.boxShadow = `0 10px 30px ${tech.color}40`;
                                        }}>
                                            <div style={{ color: tech.color, marginBottom: "8px" }}>
                                                {tech.icon}
                                            </div>
                                            <div style={{
                                                fontSize: "12px",
                                                fontWeight: "600",
                                                color: tech.color,
                                                textAlign: "center"
                                            }}>
                                                {tech.name}
                                            </div>
                                        </div>
                                    );
                                })}
                                
                                {/* Center Text */}
                                <div style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    textAlign: "center",
                                    zIndex: 2
                                }}>
                                    <div style={{
                                        fontSize: "32px",
                                        color: "#6366f1",
                                        fontWeight: "700",
                                        marginBottom: "8px"
                                    }}>
                                        RyderAI
                                    </div>
                                    <div style={{
                                        fontSize: "14px",
                                        color: "#94a3b8"
                                    }}>
                                        Project Generator
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technologies Section */}
                <section id="technologies" style={{
                    padding: "80px 24px",
                    backgroundColor: "#1e293b",
                    borderTop: "1px solid #334155",
                    borderBottom: "1px solid #334155"
                }}>
                    <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                        <div style={{ textAlign: "center", marginBottom: "60px" }}>
                            <h2 style={{
                                fontSize: "2.5rem",
                                fontWeight: "700",
                                marginBottom: "16px",
                                color: "#f8fafc",
                                letterSpacing: "-0.01em"
                            }}>
                                {t.techTitle}
                            </h2>
                            <p style={{
                                fontSize: "1.125rem",
                                color: "#94a3b8",
                                maxWidth: "700px",
                                margin: "0 auto"
                            }}>
                                {t.techDescription}
                            </p>
                        </div>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                            gap: "24px",
                            marginBottom: "40px"
                        }}>
                            {mainLanguages.map((tech, index) => (
                                <div key={index} style={{
                                    backgroundColor: "rgba(30, 41, 59, 0.5)",
                                    padding: "24px",
                                    borderRadius: "16px",
                                    textAlign: "center",
                                    border: "1px solid #334155",
                                    transition: "all 0.3s",
                                    cursor: "pointer"
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = "translateY(-8px)";
                                    e.currentTarget.style.borderColor = tech.color;
                                    e.currentTarget.style.boxShadow = `0 20px 40px ${tech.color}20`;
                                    e.currentTarget.style.backgroundColor = "rgba(30, 41, 59, 0.8)";
                                }}>
                                    <div style={{
                                        color: tech.color,
                                        marginBottom: "16px",
                                        display: "flex",
                                        justifyContent: "center"
                                    }}>
                                        {tech.icon}
                                    </div>
                                    <div style={{
                                        fontWeight: "600",
                                        color: tech.color,
                                        fontSize: "18px",
                                        marginBottom: "8px"
                                    }}>
                                        {tech.name}
                                    </div>
                                    <div style={{
                                        fontSize: "12px",
                                        color: "#94a3b8",
                                        backgroundColor: "rgba(30, 41, 59, 0.8)",
                                        padding: "4px 12px",
                                        borderRadius: "12px",
                                        display: "inline-block",
                                        border: `1px solid ${tech.color}30`
                                    }}>
                                        {tech.category}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Additional Tech */}
                        <div style={{ textAlign: "center", marginTop: "60px" }}>
                            <h3 style={{
                                fontSize: "1.5rem",
                                fontWeight: "600",
                                marginBottom: "30px",
                                color: "#cbd5e1"
                            }}>
                                Additional Technologies & Frameworks
                            </h3>
                            <div style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "12px",
                                justifyContent: "center"
                            }}>
                                {additionalTech.map((tech, index) => (
                                    <span key={index} style={{
                                        padding: "8px 16px",
                                        backgroundColor: "rgba(30, 41, 59, 0.5)",
                                        color: tech.color,
                                        borderRadius: "20px",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        border: `1px solid ${tech.color}30`,
                                        transition: "all 0.2s"
                                    }}
                                    onMouseOver={(e) => e.target.style.borderColor = tech.color}
                                    onMouseOut={(e) => e.target.style.borderColor = `${tech.color}30`}>
                                        {tech.name}
                                    </span>
                                ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" style={{
                padding: "80px 24px",
                backgroundColor: "#0f172a"
            }}>
                <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "60px" }}>
                        <h2 style={{
                            fontSize: "2.5rem",
                            fontWeight: "700",
                            marginBottom: "20px",
                            color: "#f8fafc"
                        }}>
                            {t.featuresTitle}
                        </h2>
                        <p style={{
                            fontSize: "1.125rem",
                            color: "#94a3b8",
                            maxWidth: "700px",
                            margin: "0 auto"
                        }}>
                            {t.featuresDescription}
                        </p>
                    </div>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "30px"
                    }}>
                        {features.map((feature, index) => (
                            <div key={index} style={{
                                backgroundColor: "rgba(30, 41, 59, 0.5)",
                                padding: "32px",
                                borderRadius: "16px",
                                transition: "all 0.3s",
                                border: "1px solid #334155",
                                textAlign: isRTL ? "right" : "left"
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = "translateY(-8px)";
                                e.currentTarget.style.borderColor = feature.color;
                                e.currentTarget.style.boxShadow = `0 20px 40px ${feature.color}20`;
                            }}>
                                <div style={{
                                    width: "64px",
                                    height: "64px",
                                    backgroundColor: `${feature.color}15`,
                                    borderRadius: "16px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "24px",
                                    color: feature.color,
                                    border: `1px solid ${feature.color}30`,
                                    marginInlineStart: isRTL ? "auto" : "0"
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "600",
                                    marginBottom: "12px",
                                    color: "#f8fafc"
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{ color: "#94a3b8", lineHeight: "1.6" }}>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Combinations */}
            <section id="combinations" style={{
                padding: "80px 24px",
                backgroundColor: "#1e293b",
                borderTop: "1px solid #334155",
                borderBottom: "1px solid #334155"
            }}>
                <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "60px" }}>
                        <h2 style={{
                            fontSize: "2.5rem",
                            fontWeight: "700",
                            marginBottom: "20px",
                            color: "#f8fafc"
                        }}>
                            {t.combosTitle}
                        </h2>
                        <p style={{
                            fontSize: "1.125rem",
                            color: "#94a3b8",
                            maxWidth: "700px",
                            margin: "0 auto"
                        }}>
                            {t.combosDescription}
                        </p>
                    </div>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "30px"
                    }}>
                        {popularCombinations.map((combo, index) => (
                            <div key={index} style={{
                                backgroundColor: "rgba(30, 41, 59, 0.5)",
                                padding: "32px",
                                borderRadius: "16px",
                                transition: "all 0.3s",
                                border: "1px solid #334155",
                                textAlign: isRTL ? "right" : "left"
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = "translateY(-8px)";
                                e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.3)";
                                e.currentTarget.style.borderColor = "#6366f1";
                            }}>
                                <div style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "8px",
                                    marginBottom: "20px",
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}>
                                    {combo.languages.map((lang, idx) => {
                                        const tech = [...mainLanguages, ...additionalTech].find(t => t.name === lang);
                                        return (
                                            <span key={idx} style={{
                                                padding: "6px 12px",
                                                backgroundColor: tech ? `${tech.color}15` : "rgba(30, 41, 59, 0.8)",
                                                color: tech ? tech.color : "#cbd5e1",
                                                borderRadius: "20px",
                                                fontSize: "14px",
                                                fontWeight: "500",
                                                border: `1px solid ${tech ? `${tech.color}30` : "#334155"}`
                                            }}>
                                                {lang}
                                            </span>
                                        );
                                    })}
                                </div>
                                <h3 style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "600",
                                    marginBottom: "12px",
                                    color: "#f8fafc"
                                }}>
                                    {combo.name}
                                </h3>
                                <p style={{ color: "#94a3b8", lineHeight: "1.6", marginBottom: "20px" }}>
                                    {combo.description}
                                </p>
                                <div style={{
                                    display: "flex",
                                    gap: "16px",
                                    alignItems: "center",
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}>
                                    <span style={{
                                        padding: "4px 12px",
                                        backgroundColor: combo.level === 'beginner' ? "#064e3b" : 
                                                       combo.level === 'intermediate' ? "#78350f" : "#7f1d1d",
                                        color: combo.level === 'beginner' ? "#a7f3d0" : 
                                               combo.level === 'intermediate' ? "#fde68a" : "#fca5a5",
                                        borderRadius: "12px",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        border: "1px solid currentColor"
                                    }}>
                                        {combo.level.charAt(0).toUpperCase() + combo.level.slice(1)}
                                    </span>
                                    <span style={{
                                        padding: "4px 12px",
                                        backgroundColor: "rgba(99, 102, 241, 0.1)",
                                        color: "#6366f1",
                                        borderRadius: "12px",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        border: "1px solid #6366f1"
                                    }}>
                                        {combo.type}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" style={{
                padding: "80px 24px",
                backgroundColor: "#0f172a"
            }}>
                <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                    <h2 style={{
                        textAlign: "center",
                        fontSize: "2.5rem",
                        fontWeight: "700",
                        marginBottom: "60px",
                        color: "#f8fafc"
                    }}>
                        {t.testimonialsTitle}
                    </h2>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "30px"
                    }}>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} style={{
                                backgroundColor: "rgba(30, 41, 59, 0.5)",
                                padding: "32px",
                                borderRadius: "16px",
                                border: "1px solid #334155",
                                textAlign: isRTL ? "right" : "left"
                            }}>
                                <div style={{ 
                                    display: "flex", 
                                    alignItems: "center", 
                                    gap: "16px", 
                                    marginBottom: "20px",
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}>
                                    <div style={{
                                        width: "56px",
                                        height: "56px",
                                        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "white",
                                        fontWeight: "600",
                                        fontSize: "18px",
                                        border: "2px solid #6366f1"
                                    }}>
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <h4 style={{ margin: "0 0 4px 0", color: "#f8fafc", fontWeight: "600" }}>
                                            {testimonial.name}
                                        </h4>
                                        <p style={{ margin: 0, color: "#94a3b8", fontSize: "14px" }}>
                                            {testimonial.role}
                                        </p>
                                        <p style={{ margin: "4px 0 0 0", color: "#6366f1", fontSize: "12px", fontWeight: "500" }}>
                                            {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                                
                                <p style={{ 
                                    color: "#cbd5e1", 
                                    lineHeight: "1.7", 
                                    fontSize: "16px", 
                                    marginBottom: "20px",
                                    fontStyle: "italic"
                                }}>
                                    "{testimonial.text}"
                                </p>
                                
                                <div style={{ 
                                    display: "flex", 
                                    gap: "8px", 
                                    flexWrap: "wrap",
                                    flexDirection: isRTL ? "row-reverse" : "row",
                                    marginBottom: "20px"
                                }}>
                                    {testimonial.tech.map((tech, idx) => {
                                        const techData = [...mainLanguages, ...additionalTech].find(t => t.name === tech);
                                        return (
                                            <span key={idx} style={{
                                                padding: "4px 12px",
                                                backgroundColor: techData ? `${techData.color}15` : "rgba(30, 41, 59, 0.8)",
                                                color: techData ? techData.color : "#cbd5e1",
                                                borderRadius: "12px",
                                                fontSize: "12px",
                                                fontWeight: "500",
                                                border: `1px solid ${techData ? `${techData.color}30` : "#334155"}`
                                            }}>
                                                {tech}
                                            </span>
                                        );
                                    })}
                                </div>
                                
                                <div style={{ 
                                    display: "flex", 
                                    gap: "2px", 
                                    flexDirection: isRTL ? "row-reverse" : "row"
                                }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} size={16} color="#fbbf24" fill="#fbbf24" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: "80px 24px",
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                textAlign: "center",
                borderTop: "1px solid #334155"
            }}>
                <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                    <h2 style={{
                        fontSize: "2.5rem",
                        fontWeight: "700",
                        marginBottom: "20px",
                        color: "#f8fafc"
                    }}>
                        {t.ctaTitle}
                    </h2>
                    <p style={{
                        fontSize: "1.125rem",
                        marginBottom: "40px",
                        color: "#94a3b8"
                    }}>
                        {t.ctaDescription}
                    </p>
                    <button
                        onClick={() => navigate(user ? "/generate" : "/login")}
                        style={{
                            padding: "18px 45px",
                            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                            color: "white",
                            border: "none",
                            borderRadius: "12px",
                            fontSize: "18px",
                            fontWeight: "600",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "12px",
                            transition: "all 0.3s",
                            flexDirection: isRTL ? "row-reverse" : "row"
                        }}
                        onMouseOver={(e) => {
                            e.target.style.transform = "translateY(-3px)";
                            e.target.style.boxShadow = "0 15px 35px rgba(99, 102, 241, 0.3)";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow = "none";
                        }}
                    >
                        {t.ctaButton}
                        <ArrowRight size={20} style={{ transform: isRTL ? "rotate(180deg)" : "none" }} />
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                backgroundColor: "#0f172a",
                color: "#94a3b8",
                padding: "60px 24px 30px",
                borderTop: "1px solid #334155"
            }}>
                <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "40px",
                        marginBottom: "40px",
                        direction: isRTL ? "rtl" : "ltr"
                    }}>
                        <div>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                marginBottom: "20px",
                                flexDirection: isRTL ? "row-reverse" : "row"
                            }}>
                                <Sparkles size={24} color="#6366f1" />
                                <div>
                                    <div style={{ fontSize: "20px", fontWeight: "700", color: "#f8fafc" }}>
                                        RyderAI
                                    </div>
                                    <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                                        AI Project Generator
                                    </div>
                                </div>
                            </div>
                            <p style={{ color: "#94a3b8", lineHeight: "1.6", fontSize: "15px", marginBottom: "20px" }}>
                                {t.footerDescription}
                            </p>
                            <div style={{ display: "flex", gap: "16px", flexDirection: isRTL ? "row-reverse" : "row" }}>
                                <Github size={20} color="#94a3b8" style={{ cursor: "pointer", transition: "color 0.2s" }} 
                                    onMouseOver={(e) => e.target.style.color = "#f8fafc"}
                                    onMouseOut={(e) => e.target.style.color = "#94a3b8"} />
                                <Twitter size={20} color="#94a3b8" style={{ cursor: "pointer", transition: "color 0.2s" }}
                                    onMouseOver={(e) => e.target.style.color = "#f8fafc"}
                                    onMouseOut={(e) => e.target.style.color = "#94a3b8"} />
                                <Linkedin size={20} color="#94a3b8" style={{ cursor: "pointer", transition: "color 0.2s" }}
                                    onMouseOver={(e) => e.target.style.color = "#f8fafc"}
                                    onMouseOut={(e) => e.target.style.color = "#94a3b8"} />
                            </div>
                        </div>

                        <div>
                            <h4 style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "600", color: "#f8fafc" }}>
                                {t.footerTechnologies}
                            </h4>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {mainLanguages.slice(0, 6).map((tech, idx) => (
                                    <span key={idx} style={{
                                        color: tech.color,
                                        fontSize: "14px",
                                        padding: "4px 8px",
                                        backgroundColor: "rgba(30, 41, 59, 0.5)",
                                        borderRadius: "6px",
                                        border: `1px solid ${tech.color}30`
                                    }}>
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "600", color: "#f8fafc" }}>
                                {t.footerQuickLinks}
                            </h4>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                <li style={{ marginBottom: "10px" }}>
                                    <a href="#features" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "15px", transition: "color 0.2s" }}
                                        onMouseOver={(e) => e.target.style.color = "#f8fafc"}>
                                        {t.navFeatures}
                                    </a>
                                </li>
                                <li style={{ marginBottom: "10px" }}>
                                    <a href="#technologies" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "15px", transition: "color 0.2s" }}
                                        onMouseOver={(e) => e.target.style.color = "#f8fafc"}>
                                        {t.navTechnologies}
                                    </a>
                                </li>
                                <li style={{ marginBottom: "10px" }}>
                                    <a href="#combinations" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "15px", transition: "color 0.2s" }}
                                        onMouseOver={(e) => e.target.style.color = "#f8fafc"}>
                                        {t.navExamples}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "600", color: "#f8fafc" }}>
                                {t.footerSupport}
                            </h4>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                <li style={{ marginBottom: "10px" }}>
                                    <a href="#" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "15px", transition: "color 0.2s" }}
                                        onMouseOver={(e) => e.target.style.color = "#f8fafc"}>
                                        {t.footerDocs}
                                    </a>
                                </li>
                                <li style={{ marginBottom: "10px" }}>
                                    <a href="#" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "15px", transition: "color 0.2s" }}
                                        onMouseOver={(e) => e.target.style.color = "#f8fafc"}>
                                        {t.footerHelp}
                                    </a>
                                </li>
                                <li style={{ marginBottom: "10px" }}>
                                    <a href="#" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "15px", transition: "color 0.2s" }}
                                        onMouseOver={(e) => e.target.style.color = "#f8fafc"}>
                                        {t.footerContact}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div style={{
                        borderTop: "1px solid #334155",
                        paddingTop: "30px",
                        textAlign: "center",
                        fontSize: "14px",
                        color: "#64748b"
                    }}>
                        © {new Date().getFullYear()} RyderAI. {t.footerRights}
                    </div>
                </div>
            </footer>
        </main>

        <style>{`
            @keyframes pulse {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 0.6; }
            }

            @keyframes orbit {
                from { transform: translate(-50%, -50%) rotate(0deg) translateX(140px) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(360deg) translateX(140px) rotate(-360deg); }
            }

            a {
                transition: color 0.2s ease;
            }

            a:hover {
                color: #6366f1 !important;
            }

            @media (max-width: 768px) {
                header nav:not(.mobile) {
                    display: none !important;
                }

                header button[style*="display: none"] {
                    display: flex !important;
                }

                section {
                    padding: 60px 20px !important;
                }

                h1 {
                    font-size: 2.5rem !important;
                }

                h2 {
                    font-size: 2rem !important;
                }

                .hero-content {
                    flex-direction: column !important;
                    gap: 40px !important;
                }

                .tech-visualization {
                    display: none !important;
                }

                /* Adjust main content margin for mobile */
                main {
                    margin-top: 100px !important;
                }

                /* Adjust header height for mobile */
                header {
                    height: 64px !important;
                }
            }

            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
            
            /* Arabic font */
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap');
            
            [dir="rtl"] {
                font-family: 'Noto Sans Arabic', 'Inter', sans-serif;
            }
            
            /* Custom scrollbar */
            ::-webkit-scrollbar {
                width: 10px;
            }
            
            ::-webkit-scrollbar-track {
                background: #0f172a;
            }
            
            ::-webkit-scrollbar-thumb {
                background: #334155;
                border-radius: 5px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
                background: #475569;
            }

            /* Remove any extra margins/padding */
            body {
                margin: 0;
                padding: 0;
                overflow-x: hidden;
            }

            /* Ensure smooth transitions */
            * {
                box-sizing: border-box;
            }
        `}</style>
    </div>
    );
};

export default HomePage;
