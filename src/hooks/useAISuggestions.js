import { useState, useCallback, useMemo } from 'react';
import aiSuggestionsService from '../services/aiSuggestions';

// Custom hook for real-time AI suggestions
export function useAISuggestions(cvData) {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Generate suggestions based on current CV data
  const generateSuggestions = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const allSuggestions = [];
      
      // Summary suggestions
      if (cvData.generalInfo?.summary) {
        const role = cvData.experience?.[0]?.jobTitle || 'software engineer';
        const experience = cvData.experience?.length || 0;
        const summarySuggestions = aiSuggestionsService.getSummaryImprovement(
          cvData.generalInfo.summary,
          role,
          experience
        );
        allSuggestions.push(...summarySuggestions);
      }

      // Skill suggestions
      if (cvData.experience?.[0]?.jobTitle) {
        const currentSkills = cvData.skills?.map(skill => skill.name) || [];
        const skillSuggestions = aiSuggestionsService.getSkillSuggestions(
          currentSkills,
          cvData.experience[0].jobTitle
        );
        allSuggestions.push(...skillSuggestions);
      }

      // Job description suggestions
      cvData.experience?.forEach((exp, index) => {
        if (exp.description) {
          const jobSuggestions = aiSuggestionsService.getJobDescriptionImprovement(
            exp.description,
            exp.jobTitle
          );
          allSuggestions.push(...jobSuggestions.map(sugg => ({
            ...sugg,
            relatedTo: `Experience #${index + 1}: ${exp.jobTitle}`
          })));
        }
      });

      setSuggestions(allSuggestions);
    } catch (error) {
      console.error('Error generating AI suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cvData]);

  // Calculate CV score
  const cvScore = useMemo(() => {
    return aiSuggestionsService.getCVScore(cvData);
  }, [cvData]);

  // Get quick suggestions for specific text
  const getQuickSuggestions = useCallback((text, context) => {
    if (!text || text.length < 10) return [];

    const suggestions = [];

    // Check for action verbs
    const startsWithActionVerb = aiSuggestionsService.actionVerbs.some(verb =>
      text.toLowerCase().startsWith(verb.toLowerCase())
    );

    if (!startsWithActionVerb && context === 'experience') {
      suggestions.push({
        type: 'quick',
        text: 'Start with an action verb',
        examples: ['Developed', 'Led', 'Implemented', 'Managed', 'Created']
      });
    }

    // Check for numbers/metrics
    const hasNumbers = /\d+/.test(text);
    if (!hasNumbers && (context === 'experience' || context === 'summary')) {
      suggestions.push({
        type: 'quick',
        text: 'Add specific metrics',
        examples: ['25% improvement', '500+ users', '$1M revenue', '15 team members']
      });
    }

    return suggestions;
  }, []);

  return {
    suggestions,
    cvScore,
    isLoading,
    generateSuggestions,
    getQuickSuggestions
  };
}

// Hook for smart auto-complete suggestions
export function useSmartAutocomplete(fieldType, currentValue) {
  const suggestions = useMemo(() => {
    if (!currentValue || currentValue.length < 2) return [];

    const value = currentValue.toLowerCase();
    
    switch (fieldType) {
      case 'skills':
        return getAllSkills().filter(skill => 
          skill.toLowerCase().includes(value)
        ).slice(0, 8);
        
      case 'companies':
        return getPopularCompanies().filter(company => 
          company.toLowerCase().includes(value)
        ).slice(0, 5);
        
      case 'schools':
        return getPopularSchools().filter(school => 
          school.toLowerCase().includes(value)
        ).slice(0, 5);
        
      case 'jobTitles':
        return getPopularJobTitles().filter(title => 
          title.toLowerCase().includes(value)
        ).slice(0, 5);
        
      default:
        return [];
    }
  }, [fieldType, currentValue]);

  return suggestions;
}

// Skill suggestions database
function getAllSkills() {
  return [
    // Frontend
    'React.js', 'Vue.js', 'Angular', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3',
    'Sass/SCSS', 'Next.js', 'Nuxt.js', 'Webpack', 'Vite', 'Redux', 'Vuex',
    
    // Backend
    'Node.js', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go', 'Rust',
    'Express.js', 'Django', 'Flask', 'Spring Boot', 'ASP.NET', 'Ruby on Rails',
    
    // Databases
    'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'SQLite',
    'Oracle', 'SQL Server', 'Cassandra', 'DynamoDB',
    
    // Cloud & DevOps
    'AWS', 'Azure', 'Google Cloud Platform', 'Docker', 'Kubernetes',
    'Jenkins', 'GitHub Actions', 'GitLab CI', 'Terraform', 'Ansible',
    
    // Data Science
    'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'Jupyter',
    'Tableau', 'Power BI', 'Apache Spark', 'Hadoop',
    
    // Mobile
    'React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin', 'Ionic',
    
    // Other
    'Git', 'GraphQL', 'REST APIs', 'Microservices', 'Agile', 'Scrum',
    'Unit Testing', 'Integration Testing', 'CI/CD', 'Machine Learning'
  ];
}

function getPopularCompanies() {
  return [
    'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Tesla',
    'Spotify', 'Uber', 'Airbnb', 'Twitter', 'LinkedIn', 'Salesforce',
    'Oracle', 'IBM', 'Intel', 'NVIDIA', 'Adobe', 'Shopify', 'Stripe',
    'Zoom', 'Slack', 'Dropbox', 'GitHub', 'Atlassian', 'PayPal'
  ];
}

function getPopularSchools() {
  return [
    'Stanford University', 'MIT', 'Harvard University', 'UC Berkeley',
    'Carnegie Mellon University', 'University of Washington', 'Georgia Tech',
    'University of Illinois', 'University of Texas at Austin', 'Caltech',
    'Princeton University', 'Yale University', 'Columbia University',
    'Cornell University', 'University of Michigan', 'UCLA'
  ];
}

function getPopularJobTitles() {
  return [
    'Software Engineer', 'Full Stack Developer', 'Frontend Developer',
    'Backend Developer', 'Data Scientist', 'Data Analyst', 'Product Manager',
    'Project Manager', 'DevOps Engineer', 'UI/UX Designer', 'Mobile Developer',
    'Machine Learning Engineer', 'Cloud Architect', 'Security Engineer',
    'QA Engineer', 'Technical Lead', 'Engineering Manager', 'CTO'
  ];
}
