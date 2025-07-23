import { useDarkMode } from "../contexts/DarkModeContext";
import { useState } from "react";
import PrintView from "./PrintView";

function Header() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [showPrintView, setShowPrintView] = useState(false);

  const downloadCV = () => {
    setShowPrintView(true);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white shadow-lg transition-all duration-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold">KwickCV</h1>
              <p className="text-blue-100 dark:text-blue-200">Professional CV Builder</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={downloadCV}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition duration-200 flex items-center space-x-2 transform hover:scale-105 animate-bounce-subtle"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Print CV</span>
              </button>
              
              <button
                onClick={toggleDarkMode}
                className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition duration-200 transform hover:scale-110"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Print View Modal */}
      {showPrintView && (
        <PrintView onClose={() => setShowPrintView(false)} />
      )}
    </>
  );
}

export default Header;
