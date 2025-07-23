import { useDarkMode } from "../contexts/DarkModeContext";
import { useState } from "react";
import PrintView from "./PrintView";
import "./Header.css";

function Header() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [showPrintView, setShowPrintView] = useState(false);

  const downloadCV = () => {
    setShowPrintView(true);
  };

  return (
    <>
      <header className="header-container">
        <div className="header-content">
          <div className="header-inner">
            <div className="header-brand">
              <h1 className="header-title">KwickCV</h1>
              <p className="header-subtitle">Professional CV Builder</p>
            </div>
            
            <div className="header-controls">
              <button
                onClick={downloadCV}
                className="print-button"
              >
                <svg className="print-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Print CV</span>
              </button>
              
              <button
                onClick={toggleDarkMode}
                className="theme-toggle"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? (
                  <svg className="theme-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="theme-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
