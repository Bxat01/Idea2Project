// في frontend/src/components/projects/ProjectForm.jsx
import React, { useState } from 'react';
import { Code, Target, Layers, BookOpen, GraduationCap, Briefcase } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { generateProject } from '../../services/projectService';

const ProjectForm = ({ onProjectGenerated }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [loading, setLoading] = useState(false);

    const languages = [
        'React', 'PHP', 'JavaScript', 'Python', 'Java', 'C#',
        'TypeScript', 'Vue', 'Angular', 'Node.js', 'Laravel',
        'Django', 'Spring', '.NET', 'Flutter', 'React Native'
    ];

    const levels = [
        { value: 'beginner', label: '👶 Beginner', icon: BookOpen },
        { value: 'intermediate', label: '🚀 Intermediate', icon: Target },
        { value: 'advanced', label: '🔥 Advanced', icon: Layers }
    ];

    const projectTypes = [
        { value: 'web', label: '🌐 Web Application' },
        { value: 'desktop', label: '💻 Desktop Application' },
        { value: 'api', label: '🔌 API Development' },
        { value: 'full-stack', label: '⚡ Full Stack Project' }
    ];

    const goals = [
        { value: 'learn', label: '📚 Learning & Practice', icon: BookOpen },
        { value: 'graduation', label: '🎓 Graduation Project', icon: GraduationCap },
        { value: 'employment', label: '💼 Job Portfolio', icon: Briefcase }
    ];

    const toggleLanguage = (lang) => {
        setSelectedLanguages(prev =>
            prev.includes(lang)
                ? prev.filter(l => l !== lang)
                : [...prev, lang]
        );
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const projectData = {
                ...data,
                languages: selectedLanguages
            };
            const project = await generateProject(projectData);
            onProjectGenerated(project);
        } catch (error) {
            console.error('Error generating project:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Code className="h-8 w-8 text-blue-600" />
                    Generate Your Perfect Project
                </h1>
                <p className="text-gray-600 mt-2">
                    Tell us about your skills and goals, and we'll create a customized project plan for you.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Languages Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Code className="h-5 w-5 text-blue-600" />
                        Programming Languages & Technologies
                    </h2>
                    <p className="text-gray-600 mb-4">Select all languages and frameworks you know</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {languages.map(lang => (
                            <button
                                key={lang}
                                type="button"
                                onClick={() => toggleLanguage(lang)}
                                className={`px-4 py-3 rounded-lg border transition-all ${
                                    selectedLanguages.includes(lang)
                                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-blue-300'
                                }`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                    {selectedLanguages.length === 0 && (
                        <p className="text-red-500 text-sm mt-2">Please select at least one language</p>
                    )}
                </div>

                {/* Level Selection */}
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <h2 className="text-xl font-semibold mb-4">Your Experience Level</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {levels.map(({ value, label, icon: Icon }) => (
                            <label key={value} className="relative">
                                <input
                                    type="radio"
                                    value={value}
                                    {...register('level', { required: 'Please select your level' })}
                                    className="sr-only peer"
                                />
                                <div className="p-4 border-2 rounded-xl cursor-pointer transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-blue-300">
                                    <Icon className="h-6 w-6 mb-2" />
                                    <span className="font-medium">{label}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                    {errors.level && <p className="text-red-500 text-sm mt-2">{errors.level.message}</p>}
                </div>

                {/* Project Type */}
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <h2 className="text-xl font-semibold mb-4">Project Type</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projectTypes.map(({ value, label }) => (
                            <label key={value} className="relative">
                                <input
                                    type="radio"
                                    value={value}
                                    {...register('type', { required: 'Please select project type' })}
                                    className="sr-only peer"
                                />
                                <div className="p-4 border-2 rounded-xl cursor-pointer transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-blue-300">
                                    <span className="font-medium">{label}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                    {errors.type && <p className="text-red-500 text-sm mt-2">{errors.type.message}</p>}
                </div>

                {/* Goal */}
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <h2 className="text-xl font-semibold mb-4">Project Goal</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {goals.map(({ value, label, icon: Icon }) => (
                            <label key={value} className="relative">
                                <input
                                    type="radio"
                                    value={value}
                                    {...register('goal', { required: 'Please select your goal' })}
                                    className="sr-only peer"
                                />
                                <div className="p-4 border-2 rounded-xl cursor-pointer transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-blue-300">
                                    <Icon className="h-6 w-6 mb-2" />
                                    <span className="font-medium">{label}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                    {errors.goal && <p className="text-red-500 text-sm mt-2">{errors.goal.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading || selectedLanguages.length === 0}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Generating Project...
                            </>
                        ) : (
                            <>
                                <Target className="h-5 w-5" />
                                Generate My Project Plan
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;