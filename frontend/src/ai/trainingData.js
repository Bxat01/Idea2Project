export const trainingData = {
    inputs: [
        // Beginner projects
        {
            languages: ['JavaScript', 'HTML', 'CSS'],
            level: 'beginner',
            type: 'web',
            goal: 'learn',
            features: []
        },
        {
            languages: ['Python'],
            level: 'beginner',
            type: 'web',
            goal: 'portfolio',
            features: ['Database']
        },
        
        // Intermediate projects
        {
            languages: ['React', 'Node.js', 'MongoDB'],
            level: 'intermediate',
            type: 'web',
            goal: 'startup',
            features: ['Authentication', 'API', 'Payment']
        },
        {
            languages: ['TypeScript', 'React', 'Express'],
            level: 'intermediate',
            type: 'api',
            goal: 'freelance',
            features: ['Authentication', 'API', 'Admin Panel']
        },
        
        // Advanced projects
        {
            languages: ['Python', 'TensorFlow', 'React'],
            level: 'advanced',
            type: 'ai',
            goal: 'startup',
            features: ['API', 'Real-time', 'Analytics']
        },
        {
            languages: ['Go', 'TypeScript', 'Docker'],
            level: 'advanced',
            type: 'api',
            goal: 'enterprise',
            features: ['Authentication', 'API', 'Real-time', 'Admin Panel']
        },
        
        // Mobile projects
        {
            languages: ['React', 'JavaScript'],
            level: 'intermediate',
            type: 'mobile',
            goal: 'portfolio',
            features: ['Authentication', 'Database']
        },
        {
            languages: ['Swift', 'Python'],
            level: 'advanced',
            type: 'mobile',
            goal: 'startup',
            features: ['Authentication', 'Payment', 'Analytics']
        },
        
        // Game development
        {
            languages: ['JavaScript', 'Canvas'],
            level: 'beginner',
            type: 'game',
            goal: 'learn',
            features: []
        },
        {
            languages: ['C#', 'Unity'],
            level: 'intermediate',
            type: 'game',
            goal: 'portfolio',
            features: ['Multiplayer', 'Analytics']
        },
        
        // Specialized projects
        {
            languages: ['Python', 'Blockchain'],
            level: 'advanced',
            type: 'blockchain',
            goal: 'startup',
            features: ['Authentication', 'API', 'Payment']
        },
        {
            languages: ['JavaScript', 'IoT'],
            level: 'intermediate',
            type: 'iot',
            goal: 'freelance',
            features: ['Real-time', 'API']
        }
    ],
    
    outputs: [
        // Outputs corresponding to inputs - أفكار إبداعية
        {
            project_name: "Interactive Code Learning Platform",
            description: "A gamified platform where beginners learn programming through interactive challenges",
            detailed_description: "Create an engaging learning environment with bite-sized coding challenges, instant feedback, and progress tracking. Perfect for absolute beginners.",
            implementation_steps: [
                { step: 1, title: "Challenge Design", description: "Create 50+ beginner-friendly coding challenges" },
                { step: 2, title: "Code Execution Engine", description: "Build safe sandbox for running user code" },
                { step: 3, title: "Gamification System", description: "Add points, badges, and leaderboards" },
                { step: 4, title: "Progress Tracking", description: "Implement dashboard to track learning progress" }
            ],
            future_enhancements: [
                "Add video tutorials",
                "Implement social features",
                "Create mobile app",
                "Add more programming languages"
            ]
        },
        {
            project_name: "Personal Finance Tracker Pro",
            description: "AI-powered financial management system for personal budgeting",
            detailed_description: "Build an intelligent system that analyzes spending patterns, suggests budgets, and helps users achieve financial goals through machine learning insights.",
            implementation_steps: [
                { step: 1, title: "Bank API Integration", description: "Connect securely with banking institutions" },
                { step: 2, title: "Spending Categorization", description: "Implement AI to categorize transactions" },
                { step: 3, title: "Budget Planning", description: "Create personalized budget recommendations" },
                { step: 4, title: "Goal Setting", description: "Build system for financial goal tracking" },
                { step: 5, title: "Security Implementation", description: "Add bank-level security measures" }
            ],
            future_enhancements: [
                "Add investment tracking",
                "Implement bill negotiation AI",
                "Create family sharing features",
                "Add tax preparation tools"
            ]
        },
        {
            project_name: "Sustainable Marketplace Startup",
            description: "E-commerce platform connecting eco-conscious consumers with sustainable brands",
            detailed_description: "Create a marketplace with carbon footprint tracking, eco-certifications, and green delivery options. Revolutionize sustainable shopping.",
            implementation_steps: [
                { step: 1, title: "Vendor Platform", description: "Build system for sustainable brands to join" },
                { step: 2, title: "Sustainability Scoring", description: "Implement product environmental impact scoring" },
                { step: 3, title: "E-commerce Engine", description: "Create full shopping cart and payment system" },
                { step: 4, title: "Carbon Calculator", description: "Add delivery carbon footprint tracking" },
                { step: 5, title: "Community Features", description: "Build review and recommendation system" },
                { step: 6, title: "Launch Strategy", description: "Plan and execute marketing launch" }
            ],
            future_enhancements: [
                "Add AR product visualization",
                "Implement blockchain supply chain",
                "Create subscription boxes",
                "Add B2B wholesale platform"
            ]
        },
        {
            project_name: "Freelancer Management API",
            description: "Comprehensive API for managing freelance projects, clients, and payments",
            detailed_description: "Build a robust API service that handles project management, time tracking, invoicing, and client communication for freelancers and agencies.",
            implementation_steps: [
                { step: 1, title: "API Design", description: "Design RESTful endpoints with OpenAPI specification" },
                { step: 2, title: "Authentication System", description: "Implement OAuth2 and JWT for security" },
                { step: 3, title: "Project Management", description: "Create CRUD operations for projects and tasks" },
                { step: 4, title: "Time Tracking", description: "Build accurate time tracking with reports" },
                { step: 5, title: "Payment Integration", description: "Connect with Stripe/PayPal for invoicing" },
                { step: 6, title: "Documentation", description: "Create comprehensive API documentation" }
            ],
            future_enhancements: [
                "Add real-time notifications",
                "Implement contract management",
                "Create client portal",
                "Add AI project estimation"
            ]
        },
        {
            project_name: "AI Health Prediction System",
            description: "Advanced health monitoring using machine learning to predict potential issues",
            detailed_description: "Develop an AI system that analyzes health data from wearables to provide early warnings and personalized health recommendations.",
            implementation_steps: [
                { step: 1, title: "Medical Data Research", description: "Analyze health datasets and consult experts" },
                { step: 2, title: "ML Model Development", description: "Train prediction models on health data" },
                { step: 3, title: "Wearable Integration", description: "Connect with popular fitness trackers" },
                { step: 4, title: "User Dashboard", description: "Create intuitive health monitoring interface" },
                { step: 5, title: "Healthcare API", description: "Build API for doctors to access insights" },
                { step: 6, title: "Clinical Validation", description: "Test accuracy with medical professionals" },
                { step: 7, title: "Compliance", description: "Ensure HIPAA and medical regulations" }
            ],
            future_enhancements: [
                "Add genetic data analysis",
                "Implement telemedicine features",
                "Create mental health tracking",
                "Add family health history integration"
            ]
        },
        {
            project_name: "Enterprise Microservices Platform",
            description: "Scalable platform for building and deploying microservices at enterprise scale",
            detailed_description: "Create a comprehensive platform with service discovery, load balancing, monitoring, and automated deployment for large-scale microservices architectures.",
            implementation_steps: [
                { step: 1, title: "Architecture Design", description: "Design scalable microservices framework" },
                { step: 2, title: "Service Discovery", description: "Implement dynamic service registration" },
                { step: 3, title: "API Gateway", description: "Build intelligent routing and load balancing" },
                { step: 4, title: "Monitoring System", description: "Create real-time performance monitoring" },
                { step: 5, title: "CI/CD Pipeline", description: "Implement automated testing and deployment" },
                { step: 6, title: "Security Layer", description: "Add enterprise-grade security features" },
                { step: 7, title: "Documentation", description: "Create comprehensive deployment guides" }
            ],
            future_enhancements: [
                "Add AI performance optimization",
                "Implement multi-cloud deployment",
                "Create disaster recovery system",
                "Add cost optimization features"
            ]
        },
        {
            project_name: "Mobile Learning Companion",
            description: "AI-powered mobile app for personalized on-the-go learning",
            detailed_description: "Develop a mobile application that adapts learning content based on user progress, time availability, and learning preferences using machine learning algorithms.",
            implementation_steps: [
                { step: 1, title: "Mobile App Design", description: "Create intuitive mobile interface" },
                { step: 2, title: "Content Management", description: "Build system for organizing learning materials" },
                { step: 3, title: "AI Recommendation Engine", description: "Implement personalized content suggestions" },
                { step: 4, title: "Progress Tracking", description: "Add comprehensive learning analytics" },
                { step: 5, title: "Offline Mode", description: "Implement offline content access" },
                { step: 6, title: "Social Features", description: "Add study groups and peer learning" }
            ],
            future_enhancements: [
                "Add AR learning experiences",
                "Implement speech recognition",
                "Create content creator tools",
                "Add certification system"
            ]
        },
        {
            project_name: "HealthTech Startup Mobile App",
            description: "Comprehensive health management platform with doctor connectivity",
            detailed_description: "Build a mobile application that combines health tracking, telemedicine consultations, medication management, and emergency features for comprehensive healthcare.",
            implementation_steps: [
                { step: 1, title: "Medical Compliance", description: "Ensure HIPAA and healthcare regulations" },
                { step: 2, title: "Health Tracking", description: "Implement symptom and medication tracking" },
                { step: 3, title: "Telemedicine System", description: "Build video consultation platform" },
                { step: 4, title: "Emergency Features", description: "Add emergency contact and location sharing" },
                { step: 5, title: "Doctor Portal", description: "Create web portal for healthcare providers" },
                { step: 6, title: "Insurance Integration", description: "Connect with insurance providers" }
            ],
            future_enhancements: [
                "Add AI symptom checker",
                "Implement prescription delivery",
                "Create family health management",
                "Add wearable device integration"
            ]
        },
        {
            project_name: "Code Adventure Game",
            description: "Learn programming by solving puzzles in an epic adventure game",
            detailed_description: "Create an engaging game where players use real programming concepts to solve puzzles, defeat enemies, and progress through an immersive story world.",
            implementation_steps: [
                { step: 1, title: "Game Story Development", description: "Create compelling narrative and characters" },
                { step: 2, title: "Programming Puzzles", description: "Design 100+ coding challenges" },
                { step: 3, title: "Game Engine", description: "Build or customize game engine" },
                { step: 4, title: "Visual Design", description: "Create appealing game art and animations" },
                { step: 5, title: "Code Execution", description: "Implement safe code running environment" },
                { step: 6, title: "Multiplayer Mode", description: "Add collaborative coding challenges" }
            ],
            future_enhancements: [
                "Add VR programming environment",
                "Implement competitive tournaments",
                "Create level editor",
                "Add more programming languages"
            ]
        },
        {
            project_name: "Indie Game Development Studio",
            description: "Complete game development pipeline for creating and publishing indie games",
            detailed_description: "Build tools and framework for rapid indie game development including asset management, level design, testing, and publishing to multiple platforms.",
            implementation_steps: [
                { step: 1, title: "Game Framework", description: "Create reusable game development framework" },
                { step: 2, title: "Asset Pipeline", description: "Build tools for importing and managing assets" },
                { step: 3, title: "Level Editor", description: "Create visual level design tool" },
                { step: 4, title: "Testing Suite", description: "Implement automated game testing" },
                { step: 5, title: "Publishing System", description: "Build deployment to Steam/App Store" },
                { step: 6, title: "Monetization", description: "Add in-app purchases and ads system" }
            ],
            future_enhancements: [
                "Add multiplayer networking",
                "Implement physics engine",
                "Create VR support",
                "Add AI enemy behavior"
            ]
        },
        {
            project_name: "Blockchain Supply Chain Platform",
            description: "Transparent supply chain tracking using blockchain technology",
            detailed_description: "Create a decentralized platform for tracking products from manufacturer to consumer, ensuring transparency, authenticity, and ethical sourcing verification.",
            implementation_steps: [
                { step: 1, title: "Blockchain Design", description: "Design custom blockchain or use existing" },
                { step: 2, title: "Smart Contracts", description: "Create contracts for supply chain steps" },
                { step: 3, title: "QR/NFC Integration", description: "Implement physical product tracking" },
                { step: 4, title: "Supplier Portal", description: "Build interface for suppliers to update data" },
                { step: 5, title: "Consumer App", description: "Create app for consumers to verify products" },
                { step: 6, title: "Analytics Dashboard", description: "Build supply chain analytics" }
            ],
            future_enhancements: [
                "Add AI fraud detection",
                "Implement carbon tracking",
                "Create B2B marketplace",
                "Add IoT sensor integration"
            ]
        },
        {
            project_name: "Smart Home IoT Platform",
            description: "Centralized control system for smart home devices with AI automation",
            detailed_description: "Develop a platform that connects all smart home devices, learns user preferences, and automates routines for optimal comfort and energy efficiency.",
            implementation_steps: [
                { step: 1, title: "Device Protocol Support", description: "Add support for Zigbee, Z-Wave, WiFi" },
                { step: 2, title: "Central Hub", description: "Build central control system" },
                { step: 3, title: "AI Learning", description: "Implement pattern recognition for automation" },
                { step: 4, title: "Mobile Control", description: "Create comprehensive mobile app" },
                { step: 5, title: "Security System", description: "Add home security features" },
                { step: 6, title: "Energy Monitoring", description: "Implement energy usage tracking" }
            ],
            future_enhancements: [
                "Add voice control",
                "Implement facial recognition",
                "Create neighborhood network",
                "Add predictive maintenance"
            ]
        }
    ]
};