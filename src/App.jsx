import GeneralInfo from "./components/GeneralInfo";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Header from "./components/Header";
import Certifications from "./components/Certifications";
import Awards from "./components/Awards";
import Languages from "./components/Languages";
import Navigation from "./components/Navigation";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { NavigationProvider, useNavigation } from "./contexts/NavigationContext";
import { useEffect } from "react";
import "./App.css";

function CVContent() {
  const { currentSection, sections, nextSection, prevSection } = useNavigation();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') {
        nextSection();
      } else if (e.key === 'ArrowLeft') {
        prevSection();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSection, prevSection]);

  const components = [
    <GeneralInfo key="personal" />,
    <Skills key="skills" />,
    <Languages key="languages" />,
    <Certifications key="certifications" />,
    <Experience key="experience" />,
    <Education key="education" />,
    <Projects key="projects" />,
    <Awards key="awards" />
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Professional Header */}
      <Header />
      
      {/* Main Content - Centered */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            {/* Current Section Display */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {sections[currentSection].icon} {sections[currentSection].name}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            {/* Component Container */}
            <div className="transition-all duration-500 ease-in-out transform">
              <div className="animate-fade-in">
                {components[currentSection]}
              </div>
            </div>

            {/* Inline Navigation - Always Visible */}
            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={prevSection}
                disabled={currentSection === 0}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                  currentSection === 0
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-500 hover:bg-gray-600 text-white shadow-lg'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-2">
                {sections.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSection(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSection 
                        ? 'bg-blue-500 w-6' 
                        : index < currentSection
                        ? 'bg-green-400'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    title={sections[index].name}
                  />
                ))}
              </div>

              <button
                onClick={nextSection}
                disabled={currentSection === sections.length - 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                  currentSection === sections.length - 1
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                }`}
              >
                <span>Next</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <Navigation />
      
      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-white text-center py-4 mt-12 transition-colors duration-300">
        <p>&copy; 2025 Professional CV Builder. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <NavigationProvider>
        <CVContent />
      </NavigationProvider>
    </DarkModeProvider>
  );
}

export default App;
