import { createContext, useContext, useState, useEffect } from 'react';

const CVDataContext = createContext();

export const useCVData = () => {
  const context = useContext(CVDataContext);
  if (!context) {
    throw new Error('useCVData must be used within a CVDataProvider');
  }
  return context;
};

export const CVDataProvider = ({ children }) => {
  // General Information
  const [generalInfo, setGeneralInfo] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
    profilePhoto: ''
  });

  // Skills
  const [skills, setSkills] = useState([]);

  // Languages
  const [languages, setLanguages] = useState([]);

  // Certifications
  const [certifications, setCertifications] = useState([]);

  // Experience
  const [experience, setExperience] = useState([]);

  // Education
  const [education, setEducation] = useState([]);

  // Projects
  const [projects, setProjects] = useState([]);

  // Awards
  const [awards, setAwards] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('cvData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setGeneralInfo(parsedData.generalInfo || {
          name: '',
          email: '',
          phone: '',
          location: '',
          website: '',
          linkedin: '',
          github: '',
          summary: '',
          profilePhoto: ''
        });
        setSkills(parsedData.skills || []);
        setLanguages(parsedData.languages || []);
        setCertifications(parsedData.certifications || []);
        setExperience(parsedData.experience || []);
        setEducation(parsedData.education || []);
        setProjects(parsedData.projects || []);
        setAwards(parsedData.awards || []);
      } catch (error) {
        console.error('Error loading CV data from localStorage:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    const cvData = {
      generalInfo,
      skills,
      languages,
      certifications,
      experience,
      education,
      projects,
      awards
    };
    localStorage.setItem('cvData', JSON.stringify(cvData));
  }, [generalInfo, skills, languages, certifications, experience, education, projects, awards]);

  // Helper function to get all CV data
  const getAllCVData = () => ({
    generalInfo,
    skills,
    languages,
    certifications,
    experience,
    education,
    projects,
    awards
  });

  // Clear all data
  const clearAllData = () => {
    setGeneralInfo({
      name: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      summary: '',
      profilePhoto: ''
    });
    setSkills([]);
    setLanguages([]);
    setCertifications([]);
    setExperience([]);
    setEducation([]);
    setProjects([]);
    setAwards([]);
  };

  const value = {
    // Data
    generalInfo,
    skills,
    languages,
    certifications,
    experience,
    education,
    projects,
    awards,
    
    // Setters
    setGeneralInfo,
    setSkills,
    setLanguages,
    setCertifications,
    setExperience,
    setEducation,
    setProjects,
    setAwards,
    
    // Helpers
    getAllCVData,
    clearAllData
  };

  return (
    <CVDataContext.Provider value={value}>
      {children}
    </CVDataContext.Provider>
  );
};
