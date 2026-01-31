import { ProjectAI } from './advanced_model';
import { trainingData } from './trainingData';

class ProjectGeneratorAI {
    constructor() {
        this.ai = new ProjectAI();
        this.initialized = false;
    }
    
    async initialize() {
        if (this.initialized) return true;
        
        try {
            console.log("Initializing Project Generator AI...");
            
            // Initialize the model
            const isTrained = await this.ai.initialize();
            
            if (!isTrained) {
                console.log("Training AI model for the first time...");
                await this.ai.train(trainingData);
            }
            
            this.initialized = true;
            console.log("Project Generator AI initialized successfully!");
            return true;
            
        } catch (error) {
            console.error("Failed to initialize AI:", error);
            this.initialized = false;
            return false;
        }
    }
    
    async generateProject(userInput) {
    if (!this.initialized) await this.initialize();

    const validatedInput = this.validateInput(userInput);

    let generatedProject = await this.ai.generateProject(validatedInput);


    if (validatedInput.goal === 'startup') {
        generatedProject.title = `Innovative ${generatedProject.title} Platform`;
        generatedProject.business_model = "SaaS (Software as a Service)";
        
        if (validatedInput.languages.includes('Go') && validatedInput.languages.includes('PHP')) {
            generatedProject.architecture = "Microservices: Go for high-speed API, PHP for Frontend & Dashboard";
        }
    }

    const enhancedProject = this.enhanceProject(generatedProject, validatedInput);
    
    return enhancedProject;
}
    
    validateInput(input) {
        return {
            languages: Array.isArray(input.languages) ? input.languages : [],
            level: ['beginner', 'intermediate', 'advanced'].includes(input.level) ? input.level : 'intermediate',
            type: ['web', 'mobile', 'desktop', 'api', 'game', 'ai'].includes(input.type) ? input.type : 'web',
            goal: ['learn', 'portfolio', 'startup', 'freelance'].includes(input.goal) ? input.goal : 'learn',
            features: Array.isArray(input.features) ? input.features : []
        };
    }
    
    enhanceProject(project, userInput) {
        // Add additional project details
        
        // Time estimate based on level and complexity
        const timeEstimate = this.calculateTimeEstimate(userInput);
        
        return {
            ...project,
            metadata: {
                generated_by: "AI Project Generator",
                generated_at: new Date().toISOString(),
                time_estimate: timeEstimate,
                difficulty_level: userInput.level
            },
            milestones: project.implementation_steps ? project.implementation_steps.map((step, index) => ({
                ...step,
                estimated_days: Math.ceil(timeEstimate.days / (project.implementation_steps?.length || 6)),
                priority: index === 0 ? 'high' : index < 3 ? 'medium' : 'low'
            })) : []
        };
    }
    
    calculateTimeEstimate(input) {
        // Estimate time based on inputs
        const baseDays = {
            beginner: 14,
            intermediate: 30,
            advanced: 60
        };
        
        const multiplier = {
            web: 1,
            mobile: 1.2,
            desktop: 1.3,
            api: 1.1,
            game: 1.5,
            ai: 2
        };
        
        const days = baseDays[input.level] * multiplier[input.type];
        
        return {
            days: Math.round(days),
            weeks: Math.round(days / 7),
            description: `Estimated completion time: ${Math.round(days / 7)} weeks`
        };
    }
    
    saveToKnowledgeBase(input, output) {
        // Save data for future model improvement
        try {
            const knowledgeBase = JSON.parse(localStorage.getItem('ai_knowledge_base') || '[]');
            
            knowledgeBase.push({
                input,
                output,
                timestamp: new Date().toISOString(),
                user_feedback: null
            });
            
            // Keep only last 100 examples
            const trimmedBase = knowledgeBase.slice(-100);
            localStorage.setItem('ai_knowledge_base', JSON.stringify(trimmedBase));
            
        } catch (error) {
            console.error("Failed to save to knowledge base:", error);
        }
    }
}

// Create single instance for app usage
const projectAI = new ProjectGeneratorAI();

export default projectAI;