
export function encodeInput(data) {
    const encoding = {};
    
    // لغات الترميز
    const allLanguages = ['JavaScript', 'HTML', 'CSS', 'React', 'Node.js', 'Python', 
                         'TensorFlow', 'Canvas', 'Express', 'MongoDB', 'C#', '.NET', 'WPF'];
    
    allLanguages.forEach((lang, index) => {
        encoding[`lang_${lang}`] = data.languages.includes(lang) ? 1 : 0;
    });
    
    // مستوى الخبرة
    encoding.level_beginner = data.level === 'beginner' ? 1 : 0;
    encoding.level_intermediate = data.level === 'intermediate' ? 1 : 0;
    encoding.level_advanced = data.level === 'advanced' ? 1 : 0;
    
    // نوع المشروع
    encoding.type_web = data.type === 'web' ? 1 : 0;
    encoding.type_mobile = data.type === 'mobile' ? 1 : 0;
    encoding.type_desktop = data.type === 'desktop' ? 1 : 0;
    encoding.type_api = data.type === 'api' ? 1 : 0;
    encoding.type_game = data.type === 'game' ? 1 : 0;
    encoding.type_ai = data.type === 'ai' ? 1 : 0;
    
    // الهدف
    encoding.goal_learn = data.goal === 'learn' ? 1 : 0;
    encoding.goal_portfolio = data.goal === 'portfolio' ? 1 : 0;
    encoding.goal_startup = data.goal === 'startup' ? 1 : 0;
    encoding.goal_freelance = data.goal === 'freelance' ? 1 : 0;
    
    // الميزات
    const allFeatures = ['Authentication', 'Database', 'API', 'Responsive Design', 
                        'Payment Integration', 'Real-time', 'Admin Panel', 'File Upload'];
    
    allFeatures.forEach((feature, index) => {
        encoding[`feature_${feature}`] = data.features.includes(feature) ? 1 : 0;
    });
    
    // تحويل إلى مصفوفة
    return Object.values(encoding);
}

export function decodeOutput(outputArray) {
    // تحويل مخرجات النموذج إلى بيانات قابلة للقراءة
    const templates = [
        // Template 0: Beginner Web Learn
        {
            project_name: "Interactive Learning Website",
            description: "A beginner-friendly website to practice web development basics",
            implementation_steps: [
                { title: "HTML Structure", description: "Create semantic HTML layout" },
                { title: "CSS Styling", description: "Add responsive CSS design" },
                { title: "JavaScript Interactivity", description: "Implement basic JavaScript functions" },
                { title: "Project Deployment", description: "Deploy to free hosting service" }
            ],
            future_enhancements: [
                "Add more interactive examples",
                "Implement user progress tracking",
                "Add code editor integration"
            ]
        },
        // Template 1: Intermediate Mobile Portfolio
        {
            project_name: "Portfolio Mobile App",
            description: "A React Native mobile application showcasing your projects and skills",
            implementation_steps: [
                { title: "App Setup", description: "Initialize React Native project" },
                { title: "Navigation Setup", description: "Implement React Navigation" },
                { title: "Project Gallery", description: "Create project showcase screens" },
                { title: "Contact Form", description: "Add contact functionality" },
                { title: "Testing & Publishing", description: "Test and publish to app stores" }
            ],
            future_enhancements: [
                "Add dark mode",
                "Implement animations",
                "Add project demo videos"
            ]
        },
        // ... إضافة المزيد من القوالب حسب الحاجة
    ];
    
    // اختيار القالب الأنسب بناءً على مخرجات النموذج
    const templateIndex = Math.floor(outputArray[0] * templates.length);
    return templates[templateIndex % templates.length];
}

// قاعدة معرفة المشاريع
export const projectKnowledgeBase = {
    beginner: {
        web: {
            learn: {
                name: "Personal Blog Website",
                description: "Create your own blog to share your learning journey",
                steps: 4,
                complexity: "Low",
                estimated_time: "2-3 weeks"
            },
            portfolio: {
                name: "Portfolio Website",
                description: "Showcase your projects and skills",
                steps: 5,
                complexity: "Low-Medium",
                estimated_time: "3-4 weeks"
            }
        },
        game: {
            learn: {
                name: "Simple 2D Game",
                description: "Learn game development basics",
                steps: 4,
                complexity: "Medium",
                estimated_time: "3-4 weeks"
            }
        }
    },
    intermediate: {
        web: {
            portfolio: {
                name: "E-commerce Store",
                description: "Full-featured online store",
                steps: 6,
                complexity: "Medium-High",
                estimated_time: "4-6 weeks"
            },
            freelance: {
                name: "Client Management System",
                description: "Manage clients and projects",
                steps: 5,
                complexity: "Medium",
                estimated_time: "4-5 weeks"
            }
        },
        mobile: {
            portfolio: {
                name: "Fitness Tracking App",
                description: "Track workouts and progress",
                steps: 6,
                complexity: "High",
                estimated_time: "5-7 weeks"
            }
        }
    },
    advanced: {
        ai: {
            startup: {
                name: "AI Content Generator",
                description: "Generate content using machine learning",
                steps: 7,
                complexity: "Very High",
                estimated_time: "8-12 weeks"
            }
        },
        api: {
            freelance: {
                name: "Microservices Architecture",
                description: "Scalable API system with multiple services",
                steps: 8,
                complexity: "Very High",
                estimated_time: "10-15 weeks"
            }
        }
    }
};