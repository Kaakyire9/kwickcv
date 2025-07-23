import GeneralInfo from "./components/GeneralInfo";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Header from "./components/Header";
import Certifications from "./components/Certifications";
import Awards from "./components/Awards";
import Languages from "./components/Languages";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import "./App.css";

function App() {
  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        {/* Professional Header */}
        <Header />
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Personal Info */}
            <div className="lg:col-span-1 space-y-6 animate-fade-in">
              <GeneralInfo />
              <Skills />
              <Languages />
              <Certifications />
            </div>
            
            {/* Right Column - Professional Info */}
            <div className="lg:col-span-2 space-y-6 animate-slide-up">
              <Experience />
              <Education />
              <Projects />
              <Awards />
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="bg-gray-800 dark:bg-gray-950 text-white text-center py-4 mt-12 transition-colors duration-300">
          <p>&copy; 2025 Professional CV Builder. Built with React & Tailwind CSS.</p>
        </footer>
      </div>
    </DarkModeProvider>
  );
}

export default App;
