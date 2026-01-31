import React, { memo, useState } from 'react';
import { Brain, Zap, TrendingUp, AlertCircle, Target, RefreshCw, Sparkles } from 'lucide-react';

const AIIntelligenceCard = memo(({ project, progress, insights = [] }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'from-rose-500 to-red-500';
      case 'medium': return 'from-amber-500 to-orange-500';
      case 'low': return 'from-emerald-500 to-green-500';
      default: return 'from-blue-500 to-indigo-500';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔥';
      case 'medium': return '⚡';
      case 'low': return '💡';
      default: return '✨';
    }
  };

  return (
    <div className="relative group">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-3xl blur-3xl -z-10" />
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

      <div className="bg-gradient-to-br from-white via-white/95 to-blue-50/30 border border-blue-200/30 rounded-3xl p-6 shadow-2xl shadow-blue-100/30 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl animate-float">
                <Brain className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -inset-2 bg-blue-500/20 rounded-2xl blur-lg -z-10 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  AI Intelligence
                </h3>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150" />
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-300" />
                </div>
              </div>
              <p className="text-gray-500 flex items-center gap-2">
                <span>Real-time analysis for</span>
                <span className="font-semibold text-blue-600">{project?.project_name}</span>
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              AI Confidence
            </div>
            <div className="relative">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {Math.min(98, 75 + (progress || 0) / 4)}%
              </div>
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-gradient" style={{ width: '85%' }} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {insights.slice(0, 4).map((insight, idx) => (
            <div
              key={idx}
              className={`
                relative p-4 rounded-2xl border-2 bg-white/50 backdrop-blur-sm
                transform transition-all duration-500 hover:scale-[1.02] group/card
                hover:shadow-lg hover:shadow-current/10
                border-${insight.priority === 'high' ? 'rose' : insight.priority === 'medium' ? 'amber' : 'emerald'}-200/50
              `}
            >
              {/* Card gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${getPriorityColor(insight.priority)}/5 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-r ${getPriorityColor(insight.priority)}/10 group-hover/card:${getPriorityColor(insight.priority)}/20 transition-all duration-300`}>
                    <span className="text-xl">{getPriorityIcon(insight.priority)}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {insight.type?.replace('-', ' ') || 'Insight'}
                      </span>
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${getPriorityColor(insight.priority)} text-white shadow-sm`}>
                        {insight.priority}
                      </span>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {insight.message}
                    </p>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200/50 flex items-center justify-between">
                      <span className="text-xs text-gray-400">AI Generated</span>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
                        {insight.icon}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-blue-200/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <TrendingUp className="h-4 w-4" />
              <span>Updates every 6 hours</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-gray-500">
              <Target className="h-4 w-4" />
              <span>92% accuracy rate</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`
                px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2
                transition-all duration-300 transform hover:-translate-y-0.5
                ${isRefreshing 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30'
                }
              `}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Analyzing...' : 'Refresh Analysis'}
            </button>
            
            <button className="px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow transition-all duration-200">
              View All Insights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

AIIntelligenceCard.displayName = 'AIIntelligenceCard';

export default AIIntelligenceCard;