import React, { memo } from 'react';
import { Code, Layers, Cpu, Database, Cloud } from 'lucide-react';
import { getTechColor, getTechTextColor, getTechBgColor } from '../utils/projectCalculations';

const TechCategoryCard = memo(({ category, technologies = [], count = 0 }) => { 
  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'frontend': return Code;
      case 'backend': return Cpu;
      case 'database': return Database;
      case 'devops': return Cloud;
      default: return Layers;
    }
  };

  const Icon = getCategoryIcon(category);
  const colorGradient = getTechColor(category);
  const textColor = getTechTextColor(category);
  const bgColor = getTechBgColor(category);

  const getBaseColor = () => {
    if (colorGradient.includes('indigo')) return 'text-indigo-600 bg-indigo-500';
    if (colorGradient.includes('emerald')) return 'text-emerald-600 bg-emerald-500';
    if (colorGradient.includes('amber')) return 'text-amber-600 bg-amber-500';
    if (colorGradient.includes('purple')) return 'text-purple-600 bg-purple-500';
    return 'text-gray-600 bg-gray-500';
  };

  const baseColor = getBaseColor();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${bgColor}`}>
            <Icon className={`h-5 w-5 ${textColor}`} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 capitalize">{category}</h3>
            <p className="text-sm text-gray-500">{count} technologies</p>
          </div>
        </div>
        <span className={`px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r ${colorGradient} text-white shadow-sm`}>
          {count}
        </span>
      </div>
      
      <div className="space-y-2">
        {technologies?.slice(0, 4).map((tech, index) => ( 
          <div 
            key={index}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-sm text-gray-700">{tech}</span>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${baseColor.split(' ')[1]}`} />
              <span className="text-xs text-gray-400">Tech</span>
            </div>
          </div>
        ))}
        
        {technologies?.length > 4 && (
          <div className="pt-2 border-t border-gray-100">
            <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
              +{technologies.length - 4} more technologies
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default TechCategoryCard;