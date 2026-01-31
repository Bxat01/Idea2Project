import React, { useState, useEffect } from 'react';
import { Cpu, Sparkles, Zap } from 'lucide-react';

const AIIntelligenceBanner = ({ project }) => {
  const [analysisStage, setAnalysisStage] = useState(0);
  const stages = [
    'Analyzing project architecture...',
    'Evaluating tech stack efficiency...',
    'Generating optimization recommendations...',
    'Calculating risk factors...',
    'Preparing strategic insights...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalysisStage(prev => (prev + 1) % stages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900/5 via-blue-900/5 to-purple-900/5 border-y border-indigo-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg animate-float">
                <Cpu className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -inset-1 bg-indigo-500/20 rounded-xl blur-md -z-10" />
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-indigo-700 tracking-wider uppercase">
                  Ryder AI Engine
                </span>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse delay-150" />
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse delay-300" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-amber-500" />
                {stages[analysisStage]}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Real-time analysis</span>
            </div>
            <div className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-bold rounded-full animate-gradient">
              AI-POWERED
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIIntelligenceBanner;