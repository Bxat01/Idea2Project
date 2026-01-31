const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

fetch(`${API_URL}/api/generate`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    languages: ['React', 'Node.js'],
    level: 'intermediate',
    type: 'web',
    goal: 'learn'
  })
})
.then(res => res.json())
.then(data => console.log('Generated project:', data));
export const generateProject = async (projectData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/projects/generate`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(projectData)
        });
        
        const data = await response.json();
        console.log('✅ Generated project:', data);
        return data;
    } catch (error) {
        console.error('❌ Error in generateProject:', error);
        throw error;
    }
};