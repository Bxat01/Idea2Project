// utils/projectCalculations.js
import { memoize, calculatePercentage } from './helpers';

// Status colors with gradients
export const getStatusColor = memoize((status) => {
  const colors = {
    'completed': 'from-green-500 to-emerald-600',
    'in-progress': 'from-blue-500 to-indigo-600',
    'planned': 'from-amber-500 to-orange-600',
    'on-hold': 'from-gray-500 to-gray-600',
    'cancelled': 'from-rose-500 to-red-600',
  };
  return colors[status?.toLowerCase()] || 'from-gray-500 to-gray-600';
});

// Tech category detection with more comprehensive list
export const getTechCategory = memoize((tech) => {
  const techLower = tech.toLowerCase();
  
  // Frontend technologies
  const frontend = [
    'react', 'vue', 'angular', 'nextjs', 'svelte', 'nuxt', 'gatsby',
    'tailwind', 'bootstrap', 'material-ui', 'chakra', 'antd',
    'typescript', 'javascript', 'redux', 'zustand', 'context',
    'webpack', 'vite', 'parcel', 'jest', 'cypress', 'storybook'
  ];
  
  // Backend technologies
  const backend = [
    'node', 'express', 'nest', 'django', 'flask', 'fastapi', 
    'spring', 'laravel', 'symfony', 'ruby on rails', 'asp.net',
    'graphql', 'rest', 'grpc', 'socket.io', 'redis', 'rabbitmq',
    'kafka', 'nginx', 'apache'
  ];
  
  // Database technologies
  const database = [
    'mongodb', 'postgresql', 'mysql', 'redis', 'firebase', 
    'supabase', 'prisma', 'sequelize', 'typeorm', 'mongoose',
    'elasticsearch', 'cassandra', 'dynamodb', 'couchbase',
    'oracle', 'sql server', 'sqlite', 'neo4j'
  ];
  
  // DevOps technologies
  const devops = [
    'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'github actions',
    'gitlab ci', 'jenkins', 'terraform', 'ansible', 'prometheus',
    'grafana', 'sentry', 'datadog', 'new relic', 'cloudflare',
    'vercel', 'netlify', 'heroku', 'digitalocean'
  ];
  
  if (frontend.some(f => techLower.includes(f))) return 'frontend';
  if (backend.some(b => techLower.includes(b))) return 'backend';
  if (database.some(d => techLower.includes(d))) return 'database';
  if (devops.some(d => techLower.includes(d))) return 'devops';
  return 'other';
});

// Tech category colors with gradients
export const getTechColor = memoize((category) => {
  const colors = {
    'frontend': 'from-indigo-500 to-blue-500',
    'backend': 'from-emerald-500 to-green-500',
    'database': 'from-amber-500 to-yellow-500',
    'devops': 'from-purple-500 to-pink-500',
    'other': 'from-gray-500 to-gray-600',
  };
  return colors[category] || 'from-gray-500 to-gray-600';
});

// Tech category background colors (light version)
export const getTechBgColor = memoize((category) => {
  const colors = {
    'frontend': 'bg-indigo-50',
    'backend': 'bg-emerald-50',
    'database': 'bg-amber-50',
    'devops': 'bg-purple-50',
    'other': 'bg-gray-50',
  };
  return colors[category] || 'bg-gray-50';
});

// Tech category text colors
export const getTechTextColor = memoize((category) => {
  const colors = {
    'frontend': 'text-indigo-600',
    'backend': 'text-emerald-600',
    'database': 'text-amber-600',
    'devops': 'text-purple-600',
    'other': 'text-gray-600',
  };
  return colors[category] || 'text-gray-600';
});

// Tech category border colors
export const getTechBorderColor = memoize((category) => {
  const colors = {
    'frontend': 'border-indigo-200',
    'backend': 'border-emerald-200',
    'database': 'border-amber-200',
    'devops': 'border-purple-200',
    'other': 'border-gray-200',
  };
  return colors[category] || 'border-gray-200';
});

// Calculate progress with caching
export const calculateProgress = memoize((checkedSteps, totalSteps) => {
  if (!totalSteps || totalSteps === 0) return 0;
  const completedSteps = Object.values(checkedSteps).filter(Boolean).length;
  return calculatePercentage(completedSteps, totalSteps);
});

// AI Insights generator with contextual analysis
export const getAIInsights = (project, progress) => {
  const insights = [];
  const status = project.status?.toLowerCase();
  const techStack = project.tech_stack || [];
  const features = project.features || [];

  // Progress-based insights
  if (progress < 25) {
    insights.push({
      type: 'early-stage',
      title: 'Project Kickoff',
      message: 'Focus on MVP features and establishing core architecture. Start with essential features first.',
      icon: '🏗️',
      priority: 'high',
      color: 'from-blue-500 to-indigo-500'
    });
  } else if (progress < 50) {
    insights.push({
      type: 'mid-stage',
      title: 'Development Phase',
      message: 'Build out core functionality and establish data flow patterns. Focus on integration points.',
      icon: '⚡',
      priority: 'medium',
      color: 'from-emerald-500 to-green-500'
    });
  } else if (progress < 75) {
    insights.push({
      type: 'advanced-stage',
      title: 'Feature Enhancement',
      message: 'Add advanced features and optimize performance. Consider implementing caching and optimization.',
      icon: '🚀',
      priority: 'medium',
      color: 'from-amber-500 to-orange-500'
    });
  } else {
    insights.push({
      type: 'final-stage',
      title: 'Polish & Deploy',
      message: 'Focus on testing, documentation, and deployment preparation. Conduct thorough QA testing.',
      icon: '🎯',
      priority: 'low',
      color: 'from-purple-500 to-pink-500'
    });
  }

  // Tech stack recommendations
  if (techStack.some(tech => tech.toLowerCase().includes('react'))) {
    insights.push({
      type: 'frontend-optimization',
      title: 'React Optimization',
      message: 'Consider implementing React 18 features, code splitting, and virtualized lists for better performance.',
      icon: '⚛️',
      priority: 'medium',
      color: 'from-indigo-500 to-blue-500'
    });
  }

  if (techStack.some(tech => tech.toLowerCase().includes('node'))) {
    insights.push({
      type: 'backend-optimization',
      title: 'Node.js Performance',
      message: 'Implement clustering, connection pooling, and consider adding Redis caching layer.',
      icon: '🔄',
      priority: 'high',
      color: 'from-emerald-500 to-green-500'
    });
  }

  if (techStack.some(tech => tech.toLowerCase().includes('mongodb'))) {
    insights.push({
      type: 'database-optimization',
      title: 'MongoDB Indexing',
      message: 'Review query patterns and ensure proper indexing for frequently accessed collections.',
      icon: '🗄️',
      priority: 'medium',
      color: 'from-amber-500 to-yellow-500'
    });
  }

  // Feature complexity analysis
  if (features.length > 10) {
    insights.push({
      type: 'feature-management',
      title: 'Feature Prioritization',
      message: 'Consider breaking down complex features into smaller, manageable milestones.',
      icon: '📊',
      priority: 'medium',
      color: 'from-purple-500 to-pink-500'
    });
  }

  // Status-specific insights
  if (status === 'in-progress') {
    insights.push({
      type: 'development-momentum',
      title: 'Maintain Velocity',
      message: 'Regular code reviews and continuous integration will help maintain development momentum.',
      icon: '📈',
      priority: 'high',
      color: 'from-blue-500 to-cyan-500'
    });
  }

  if (status === 'on-hold') {
    insights.push({
      type: 'project-resumption',
      title: 'Project Resumption Plan',
      message: 'Create a detailed plan for resuming work, including knowledge transfer and task prioritization.',
      icon: '⏸️',
      priority: 'high',
      color: 'from-gray-500 to-gray-600'
    });
  }

  // Risk assessment based on tech stack complexity
  const techCount = techStack.length;
  if (techCount > 8) {
    insights.push({
      type: 'tech-stack-complexity',
      title: 'Tech Stack Complexity',
      message: 'Consider simplifying the tech stack to reduce maintenance overhead and improve team efficiency.',
      icon: '⚙️',
      priority: 'medium',
      color: 'from-rose-500 to-red-500'
    });
  }

  return insights.slice(0, 4); // Return top 4 insights
};

// Project health score calculation
export const calculateHealthScore = memoize((project, checkedSteps) => {
  let score = 50; // Base score
  
  // Progress factor (0-30 points)
  const progress = calculateProgress(checkedSteps, project.roadmap?.length || 0);
  score += (progress * 0.3);
  
  // Tech stack factor (0-10 points)
  const techStack = project.tech_stack || [];
  const hasFrontend = techStack.some(t => getTechCategory(t) === 'frontend');
  const hasBackend = techStack.some(t => getTechCategory(t) === 'backend');
  const hasDatabase = techStack.some(t => getTechCategory(t) === 'database');
  
  if (hasFrontend && hasBackend && hasDatabase) score += 10;
  else if (hasFrontend && hasBackend) score += 7;
  else if (hasFrontend) score += 5;
  
  // Features factor (0-10 points)
  const features = project.features || [];
  if (features.length >= 5) score += 10;
  else if (features.length >= 3) score += 7;
  else if (features.length >= 1) score += 5;
  
  return Math.min(100, Math.round(score));
});

// Estimated completion time based on progress
export const estimateCompletionTime = memoize((progress, startDate) => {
  if (!startDate) return 'Unknown';
  
  const start = new Date(startDate);
  const now = new Date();
  const elapsedDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  
  if (progress === 0) return 'Just started';
  if (progress === 100) return 'Completed';
  
  const estimatedTotalDays = Math.round((elapsedDays / progress) * 100);
  const remainingDays = estimatedTotalDays - elapsedDays;
  
  if (remainingDays <= 0) return 'Overdue';
  if (remainingDays <= 7) return `${remainingDays} days`;
  if (remainingDays <= 30) return `${Math.round(remainingDays / 7)} weeks`;
  return `${Math.round(remainingDays / 30)} months`;
});