import React, { memo } from 'react';
import { CheckCircle2, Circle, Clock, Zap, AlertCircle, TrendingUp } from 'lucide-react';

const TimelineStep = memo(({ step, index, isCompleted, onToggle, isLast }) => {
  const complexity = ['Low', 'Medium', 'High'][index % 3];
  const complexityColor = {
    Low: 'text-emerald-500 bg-emerald-50',
    Medium: 'text-amber-500 bg-amber-50',
    High: 'text-rose-500 bg-rose-50',
  }[complexity];

  const estimatedTime = step.estimated_time || (index % 2 === 0 ? '3-5 hours' : '1-2 hours');

  return (
    <div className="relative flex items-start gap-4 group">
      {/* Connection line */}
      {!isLast && (
        <div className={`
          absolute left-6 top-14 bottom-0 w-0.5 transition-all duration-500
          ${isCompleted 
            ? 'bg-gradient-to-b from-green-400 to-green-200' 
            : 'bg-gradient-to-b from-gray-200 to-gray-100'
          }
          group-hover:bg-gradient-to-b group-hover:from-blue-300 group-hover:to-blue-100
        `} />
      )}
      
      {/* Step indicator */}
      <div className="relative z-10">
        <button
          onClick={() => onToggle(index)}
          className={`
            relative w-12 h-12 rounded-full flex items-center justify-center
            border-2 transition-all duration-300 transform hover:scale-110
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${isCompleted
              ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-400 shadow-lg shadow-green-200/50'
              : 'bg-white border-gray-300 group-hover:border-blue-400 group-hover:shadow-md'
            }
          `}
          aria-label={`${isCompleted ? 'Mark as incomplete' : 'Mark as complete'}: ${step.title}`}
          aria-checked={isCompleted}
          role="checkbox"
        >
          {isCompleted ? (
            <CheckCircle2 className="h-6 w-6 text-white" />
          ) : (
            <Circle className="h-6 w-6 text-gray-400 group-hover:text-blue-400" />
          )}
        </button>
        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500 whitespace-nowrap">
          Step {step.step || index + 1}
        </span>
      </div>
      
      {/* Step content */}
      <div className={`
        flex-1 p-4 rounded-xl border transition-all duration-500 min-h-[120px]
        ${isCompleted
          ? 'bg-gradient-to-r from-green-50/50 to-emerald-50/30 border-green-200'
          : 'bg-white border-gray-200 group-hover:border-blue-200 group-hover:bg-blue-50/20'
        }
        group-hover:shadow-lg
      `}>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
          <h3 className={`
            font-bold text-lg transition-colors duration-300 flex-1
            ${isCompleted ? 'text-green-800' : 'text-gray-900'}
          `}>
            {step.title}
          </h3>
          
          {!isCompleted ? (
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-bold uppercase px-2 py-1 rounded-md ${complexityColor} flex items-center gap-1`}>
                <Zap className="h-3 w-3" />
                {complexity} complexity
              </span>
              <span className="px-2 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs font-medium rounded-md flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                AI Recommended
              </span>
            </div>
          ) : (
            <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm font-medium rounded-lg shadow-sm">
              ✓ Completed
            </span>
          )}
        </div>
        
        <p className={`
          mb-4 transition-colors duration-300 text-sm
          ${isCompleted ? 'text-green-700/80' : 'text-gray-600'}
        `}>
          {step.description}
        </p>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-gray-500">
              <Clock className="h-4 w-4" />
              {estimatedTime}
            </span>
            
            {!isCompleted && step.dependencies && (
              <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                <AlertCircle className="h-3 w-3" />
                {step.dependencies} dependencies
              </span>
            )}
          </div>
          
          {!isCompleted && (
            <button
              onClick={() => onToggle(index)}
              className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Mark Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default TimelineStep;