import { useNavigation } from "../contexts/NavigationContext";
import "./Navigation.css";

function Navigation() {
  const { currentSection, sections, nextSection, prevSection, goToSection } = useNavigation();

  return (
    <div className="navigation-container">
      {/* Main Navigation Bar */}
      <div className="navigation-bar">
        <div className="navigation-inner">
          {/* Section Info */}
          <div className="section-info">
            <div className="section-info-content">
              <span className="section-icon">{sections[currentSection].icon}</span>
              <div className="section-details">
                <div className="section-name">
                  {sections[currentSection].name}
                </div>
                <div className="section-counter">
                  {currentSection + 1} of {sections.length}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="navigation-controls">
            {/* Previous Button */}
            <button
              onClick={prevSection}
              disabled={currentSection === 0}
              className={`nav-button ${
                currentSection === 0 ? '' : 'nav-button-active'
              }`}
              title="Previous Section"
            >
              <svg className="nav-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Section Progress Dots */}
            <div className="progress-dots">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSection(index)}
                  className={`progress-dot ${
                    index === currentSection 
                      ? 'progress-dot-active' 
                      : 'progress-dot-inactive'
                  }`}
                  style={index === currentSection ? { width: '32px' } : {}}
                  title={sections[index].name}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSection}
              disabled={currentSection === sections.length - 1}
              className="next-button"
              title="Next Section"
            >
              <svg className="next-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard Hint */}
      <div className="mt-2 text-center">
        <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded-full">
          Use ← → keys or click Next
        </span>
      </div>
    </div>
  );
}

export default Navigation;
