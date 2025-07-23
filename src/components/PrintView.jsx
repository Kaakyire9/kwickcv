import { useNavigation } from "../contexts/NavigationContext";
import GeneralInfo from "./GeneralInfo";
import Skills from "./Skills";
import Languages from "./Languages";
import Certifications from "./Certifications";
import Experience from "./Experience";
import Education from "./Education";
import Projects from "./Projects";
import Awards from "./Awards";

function PrintView({ onClose }) {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto print:static print:bg-white">
      {/* Close button - hidden in print */}
      <div className="no-print sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Print Preview</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => window.print()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Print CV
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>

      {/* Print content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <GeneralInfo />
            <Skills />
            <Languages />
            <Certifications />
          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <Experience />
            <Education />
            <Projects />
            <Awards />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrintView;
