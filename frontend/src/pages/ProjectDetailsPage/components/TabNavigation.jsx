import React, { useState } from 'react';

const TabButton = ({ name, label, icon: Icon, activeTab, onClick, hasUpdates = false, count }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(name)}
      className={`
        relative px-5 py-3.5 rounded-xl flex items-center gap-3 transition-all duration-300
        transform hover:-translate-y-1 active:translate-y-0
        ${activeTab === name
          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/30'
          : 'text-gray-600 hover:bg-white hover:shadow-lg hover:border-gray-200 border border-transparent bg-white/50'
        }
      `}
    >
      <div className="relative">
        <Icon className={`h-5 w-5 transition-colors ${activeTab === name ? 'text-white' : 'text-gray-400'}`} />
        {hasUpdates && activeTab !== name && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse border border-white" />
        )}
      </div>
      <span className="font-semibold">{label}</span>
      
      {count !== undefined && (
        <span className={`
          ml-2 px-2 py-0.5 text-xs font-bold rounded-full transition-all duration-300
          ${activeTab === name 
            ? 'bg-white/20 text-white' 
            : 'bg-gray-100 text-gray-600'
          }
        `}>
          {count}
        </span>
      )}
      
      {activeTab === name && (
        <>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white/80 rounded-full" />
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl blur-sm -z-10" />
        </>
      )}
      
      {/* Hover effect */}
      {isHovered && activeTab !== name && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl -z-10" />
      )}
    </button>
  );
};

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl blur-xl -z-10" />
      
      <div className="flex flex-wrap gap-3 p-1 rounded-2xl" role="tablist">
        {tabs.map((tab) => (
          <TabButton
            key={tab.name}
            {...tab}
            activeTab={activeTab}
            onClick={onTabChange}
          />
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;