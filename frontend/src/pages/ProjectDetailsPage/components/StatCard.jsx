import React, { memo } from 'react';

const StatCard = memo(({ 
  title, 
  value, 
  icon: Icon, 
  color = 'from-blue-500 to-indigo-500',
  trend = null,
  trendValue = null,
  showProgress = false, 
  progress = 0,
  description = '',
  isLoading = false,
  onClick = null
}) => {
  
  const getTrendIcon = () => {
    if (!trend || !trendValue) return null;
    
    const isPositive = trendValue > 0;
    const iconColor = isPositive ? 'text-emerald-500' : 'text-rose-500';
    const bgColor = isPositive ? 'bg-emerald-50' : 'bg-rose-50';
    
    return (
      <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${bgColor}`}>
        {isPositive ? (
          <span className="text-xs font-bold text-emerald-600">↑</span>
        ) : (
          <span className="text-xs font-bold text-rose-600">↓</span>
        )}
        <span className={`text-xs font-bold ${isPositive ? 'text-emerald-700' : 'text-rose-700'}`}>
          {Math.abs(trendValue)}%
        </span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-5 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-xl"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-24 mb-3"></div>
        <div className="h-2 bg-gray-200 rounded-full"></div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={`
        group relative bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 
        p-5 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 
        transition-all duration-500 hover:border-transparent overflow-hidden
        ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}
      `}
    >
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${color.split('from-')[1].split(' ')[0]}08, ${color.split('to-')[1]}08)`
        }}
      />
      
      {/* Animated border effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200/30 rounded-2xl transition-all duration-500" />
      
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full -translate-y-16 translate-x-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-600 tracking-wide uppercase">
              {title}
            </span>
            {getTrendIcon()}
          </div>
          
          <div className={`
            p-2 rounded-xl bg-gradient-to-br ${color}/10 
            group-hover:${color}/20 transition-all duration-500
            group-hover:scale-110 group-hover:rotate-12
          `}>
            <Icon className={`h-5 w-5 bg-gradient-to-br ${color} bg-clip-text text-transparent`} />
          </div>
        </div>
        
        {/* Value */}
        <div className="mb-2">
          <p className="font-bold text-3xl bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {value}
          </p>
        </div>
        
        {/* Description */}
        {description && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{description}</p>
        )}
        
        {/* Progress bar with animation */}
        {showProgress && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">Progress</span>
              <span className="font-bold text-gray-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse"></span>
                {progress}%
              </span>
            </div>
            <div className="relative w-full bg-gray-100/50 rounded-full h-2.5 overflow-hidden">
              <div 
                className={`
                  absolute inset-y-0 left-0 h-2.5 rounded-full bg-gradient-to-r ${color} 
                  transition-all duration-1000 ease-out
                `}
                style={{ width: `${progress}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
              </div>
              
              {/* Dots pattern */}
              <div className="absolute inset-0 flex items-center justify-between px-1">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-0.5 h-0.5 bg-gray-300/50 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Interactive indicator */}
        {onClick && (
          <div className="mt-4 flex items-center justify-end">
            <span className="text-xs text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
              Click for details →
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

export default StatCard;