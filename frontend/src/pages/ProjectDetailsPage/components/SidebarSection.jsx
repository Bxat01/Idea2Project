import React, { memo } from 'react';

const SidebarSection = memo(({ 
  title, 
  icon: Icon, 
  children, 
  actions,
  color = 'text-blue-600' 
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-100 px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${color.replace('text', 'bg')}/10`}>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <h3 className="font-bold text-gray-900">{title}</h3>
          </div>
          
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
});

export default SidebarSection;