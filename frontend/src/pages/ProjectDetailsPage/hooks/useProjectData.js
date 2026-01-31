import { useState, useEffect, useCallback, useMemo } from 'react';
import { getProject, deleteProject } from '../../../services/projectService';
import { getTechCategory } from '../utils/projectCalculations';
export const useProjectData = (projectId, navigate) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkedSteps, setCheckedSteps] = useState({});

  const loadProject = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProject(projectId);
      setProject(data);
            const savedChecks = JSON.parse(
        localStorage.getItem(`project-${projectId}-checks`) || '{}'
      );
      setCheckedSteps(savedChecks);
    } catch (error) {
      console.error('Error loading project:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  }, [projectId, navigate]);

  const handleDelete = useCallback(async () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        await deleteProject(projectId);
        localStorage.removeItem(`project-${projectId}-checks`);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      }
    }
  }, [projectId, navigate]);

  const toggleStepCheck = useCallback((stepIndex) => {
    setCheckedSteps(prev => {
      const newChecks = {
        ...prev,
        [stepIndex]: !prev[stepIndex]
      };
      localStorage.setItem(`project-${projectId}-checks`, JSON.stringify(newChecks));
      return newChecks;
    });
  }, [projectId]);

  const progress = useMemo(() => {
    if (!project?.roadmap?.length) return 0;
    const completedSteps = Object.values(checkedSteps).filter(Boolean).length;
    return Math.round((completedSteps / project.roadmap.length) * 100);
  }, [project, checkedSteps]);

  const techByCategory = useMemo(() => {
    if (!project?.tech_stack) return {};
    
    const categories = {};
    project.tech_stack.forEach(tech => {
      const category = getTechCategory(tech);
      if (!categories[category]) categories[category] = [];
      categories[category].push(tech);
    });
    return categories;
  }, [project?.tech_stack]);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

  return {
    project,
    loading,
    checkedSteps,
    progress,
    techByCategory,
    loadProject,
    handleDelete,
    toggleStepCheck
  };
};