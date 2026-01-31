import React, { memo } from 'react';
import { CheckCircle, Zap, Clock, Star } from 'lucide-react';

const FeatureCard = memo(({ feature, priority, status, index }) => {
  const getPriorityColor = () => {
    switch (priority) {
      case 'High': return 'from-rose-500 to-red-500';
      case 'Medium': return 'from-amber-500 to-orange-500';
      case 'Low': return 'from-emerald-500 to-green-500';
      default: return 'from-blue-500 to-indigo-500';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'Completed': return 'bg-gradient-to-r from-green-500 to-emerald-600';
      case 'In Progress': return 'bg-gradient-to-r from-blue-500 to-indigo-600';
      case 'Planned': return 'bg-gradient-to-r from-amber-500 to-orange-500';
      case 'On Hold': return 'bg-gradient-to-r from-gray-500 to-gray-600';
      default: return 'bg-gradient-to-r from-purple-500 to-pink-500';
    }
  };

  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-3">
        {/* Feature Icon */}
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getPriorityColor()}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            {index < 3 ? (
              <Star className="h-5 w-5 text-amber-500" />
            ) : (
              <CheckCircle className="h-5 w-5 text-blue-500" />
            )}
          </div>
        </div>
        
        {/* Feature Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
            {feature}
          </h4>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-md ${getPriorityColor()} text-white shadow-sm`}>
              {priority} Priority
            </span>
            
            <span className={`px-2 py-1 text-xs font-medium rounded-md ${getStatusColor()} text-white shadow-sm`}>
              {status}
            </span>
            
            {index === 0 && (
              <span className="px-2 py-1 text-xs font-medium rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm flex items-center gap-1">
                <Zap className="h-3 w-3" />
                MVP Feature
              </span>
            )}
          </div>
          
          {/* Estimated Time */}
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Est: {index % 2 === 0 ? '3-5 days' : '1-2 weeks'}</span>
          </div>
        </div>
      </div>
      
      {/* Hover Indicator */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-xl pointer-events-none transition-all duration-300" />
    </div>
  );
});

export default FeatureCard;