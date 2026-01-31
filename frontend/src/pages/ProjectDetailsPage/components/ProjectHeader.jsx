import React from 'react';
import { ArrowLeft, Share2, Download, Edit, Trash2, Star, Users, Calendar } from 'lucide-react';
import { getStatusColor } from '../utils/projectCalculations';

const ProjectHeader = ({ project, onBack, onDelete, progress, teamMembers = [] }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top Row: Navigation and Actions */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
            <span className="text-sm font-medium hidden sm:inline">Back to Dashboard</span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Star className="h-4 w-4 text-amber-500" />
              <span className="font-medium">Project Details</span>
            </div>
          </div>
        </div>

        {/* Main Header Content */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          {/* Project Info */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">
                  {project.project_name?.charAt(0).toUpperCase()}
                </span>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                    {project.project_name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(project.status)} shadow-md`}>
                      {project.status?.toUpperCase()}
                    </span>
                    {progress >= 100 && (
                      <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-full animate-pulse">
                        🎉 COMPLETED
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Project Meta */}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
              </div>
              
              {teamMembers.length > 0 && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <div className="flex -space-x-2">
                    {teamMembers.slice(0, 3).map((member, index) => (
                      <div key={index} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                        {member.charAt(0).toUpperCase()}
                      </div>
                    ))}
                    {teamMembers.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold border-2 border-white">
                        +{teamMembers.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 lg:flex-col lg:items-end">
            <div className="flex gap-2">
              <button className="p-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-200 hover:shadow-md group">
                <Share2 className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
              </button>
              <button className="p-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-200 hover:shadow-md group">
                <Download className="h-5 w-5 text-gray-600 group-hover:text-green-600" />
              </button>
              <button className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
                <Edit className="h-5 w-5" />
              </button>
            </div>
            
            <button
              onClick={onDelete}
              className="mt-2 px-4 py-2.5 rounded-xl border border-red-300 bg-red-50 text-red-600 hover:bg-red-100 flex items-center gap-2 transition-all duration-200 hover:shadow-md"
            >
              <Trash2 className="h-5 w-5" />
              <span className="font-medium">Delete Project</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProjectHeader;