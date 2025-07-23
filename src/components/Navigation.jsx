import { useNavigation } from "../contexts/NavigationContext";

function Navigation() {
  const { currentSection, sections, nextSection, prevSection, goToSection } = useNavigation();

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      {/* Main Navigation Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-2xl border border-gray-200 dark:border-gray-600">
        <div className="flex items-center space-x-4">
          {/* Section Info */}
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{sections[currentSection].icon}</span>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-800 dark:text-white">
                  {sections[currentSection].name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {currentSection + 1} of {sections.length}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={prevSection}
              disabled={currentSection === 0}
              className={`p-3 rounded-full transition-all duration-200 transform hover:scale-110 ${
                currentSection === 0
                  ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-500 hover:bg-gray-600 text-white'
              }`}
              title="Previous Section"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Section Progress Dots */}
            <div className="flex space-x-1">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSection(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                    index === currentSection 
                      ? 'bg-blue-500 w-8' 
                      : index < currentSection
                      ? 'bg-green-400 hover:bg-green-500'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-blue-300'
                  }`}
                  title={sections[index].name}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSection}
              disabled={currentSection === sections.length - 1}
              className={`p-3 rounded-full transition-all duration-200 transform hover:scale-110 ${
                currentSection === sections.length - 1
                  ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
              }`}
              title="Next Section"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
