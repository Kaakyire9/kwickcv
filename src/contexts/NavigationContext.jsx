import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const NavigationProvider = ({ children }) => {
  const [currentSection, setCurrentSection] = useState(0);
  
  const sections = [
    { id: 'personal', name: 'Personal Info', icon: '👤' },
    { id: 'skills', name: 'Skills', icon: '🛠️' },
    { id: 'languages', name: 'Languages', icon: '🌍' },
    { id: 'certifications', name: 'Certifications', icon: '🏆' },
    { id: 'experience', name: 'Experience', icon: '💼' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'projects', name: 'Projects', icon: '📁' },
    { id: 'awards', name: 'Awards', icon: '🥇' },
    { id: 'templates', name: 'Templates', icon: '📄' }
  ];

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  const goToSection = (index) => {
    setCurrentSection(index);
  };

  return (
    <NavigationContext.Provider value={{
      currentSection,
      sections,
      nextSection,
      prevSection,
      goToSection
    }}>
      {children}
    </NavigationContext.Provider>
  );
};
