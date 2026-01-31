import React from 'react';
import { 
    Calendar, 
    Clock, 
    Code, 
    TrendingUp, 
    ChevronRight,
    Users,
    Target,
    CheckCircle,
    MoreVertical
} from 'lucide-react';

const ProjectCard = ({ project }) => {
    const statusColors = {
        'generated': 'bg-blue-100 text-blue-800',
        'in-progress': 'bg-yellow-100 text-yellow-800',
        'completed': 'bg-green-100 text-green-800',
        'archived': 'bg-gray-100 text-gray-800'
    };

    const statusIcons = {
        'generated': Clock,
        'in-progress': TrendingUp,
        'completed': CheckCircle,
        'archived': Calendar
    };

    const StatusIcon = statusIcons[project.status] || Clock;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Code className="h-5 w-5 text-blue-600" />
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                                <StatusIcon className="inline h-3 w-3 mr-1" />
                                {project.status.replace('-', ' ')}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{project.project_name}</h3>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-5 w-5" />
                    </button>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 line-clamp-2">{project.description}</p>

                {/* Tech Stack */}
                <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-2">Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                        {project.tech_stack?.slice(0, 4).map((tech, index) => (
                            <span 
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.tech_stack?.length > 4 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                +{project.tech_stack.length - 4} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Progress & Info */}
                <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Target className="h-4 w-4" />
                            <span>{project.completion_percentage}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(project.created_at)}</span>
                        </div>
                    </div>
                    
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
                        View Details
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            style={{ width: `${project.completion_percentage}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;