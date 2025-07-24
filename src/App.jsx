import GeneralInfo from "./components/GeneralInfo";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Header from "./components/Header";
import Certifications from "./components/Certifications";
import Awards from "./components/Awards";
import Languages from "./components/Languages";
import Templates from "./components/Templates";
import Navigation from "./components/Navigation";
import AISuggestions from "./components/AISuggestions";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { NavigationProvider, useNavigation } from "./contexts/NavigationContext";
import { CVDataProvider } from "./contexts/CVDataContext";
import { useEffect } from "react";
import "./App.css";

function CVContent() {
  const { currentSection, sections, nextSection, prevSection, goToSection } = useNavigation();

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
    <Awards key="awards" />,
    <Templates key="templates" />
  ];

  return (
    <div className="app-container">
      {/* Professional Header */}
      <Header />
      
      {/* Main Content - Centered */}
      <main className="main-content">
        <div className="content-wrapper">
          <div className="content-inner">
            {/* Current Section Display */}
            <div className="section-header">
              <h2 className="section-title">
                {sections[currentSection].icon} {sections[currentSection].name}
              </h2>
              <div className="section-divider"></div>
            </div>

            {/* Component Container */}
            <div className="component-transition">
              <div className="animate-fade-in">
                {components[currentSection]}
              </div>
            </div>

            {/* Inline Navigation - Always Visible */}
            <div className="inline-navigation">
              <button
                onClick={prevSection}
                disabled={currentSection === 0}
                className={`nav-btn prev-btn ${
                  currentSection === 0 ? 'nav-btn-disabled' : 'nav-btn-active'
                }`}
              >
                <svg className="nav-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Previous</span>
              </button>

              <div className="section-dots">
                {sections.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSection(index)}
                    className={`section-dot ${
                      index === currentSection 
                        ? 'section-dot-current' 
                        : index < currentSection
                        ? 'section-dot-completed'
                        : 'section-dot-pending'
                    }`}
                    title={sections[index].name}
                  />
                ))}
              </div>

              <button
                onClick={nextSection}
                disabled={currentSection === sections.length - 1}
                className={`nav-btn next-btn ${
                  currentSection === sections.length - 1 ? 'nav-btn-disabled' : 'nav-btn-active'
                }`}
              >
                <span>Next</span>
                <svg className="nav-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Navigation */}
      <Navigation />
      
      {/* AI Suggestions */}
      <AISuggestions />
      
      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; 2025 KwickCV - Your Professional CV Builder</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <CVDataProvider>
        <NavigationProvider>
          <CVContent />
        </NavigationProvider>
      </CVDataProvider>
    </DarkModeProvider>
  );
}

export default App;
