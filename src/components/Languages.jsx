import { useState } from "react";

function Languages() {
  const [isEditing, setIsEditing] = useState(true);
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState({
    name: "",
    proficiency: "Beginner"
  });

  const proficiencyLevels = {
    "Beginner": { level: 1, color: "bg-red-400", description: "Basic phrases" },
    "Elementary": { level: 2, color: "bg-orange-400", description: "Simple conversations" },
    "Intermediate": { level: 3, color: "bg-yellow-400", description: "Comfortable communication" },
    "Advanced": { level: 4, color: "bg-blue-400", description: "Fluent communication" },
    "Native": { level: 5, color: "bg-green-400", description: "Native speaker" }
  };

  const handleInputChange = (e) => {
    setNewLanguage({ ...newLanguage, [e.target.name]: e.target.value });
  };

  const addLanguage = () => {
    if (newLanguage.name.trim()) {
      setLanguages([...languages, { ...newLanguage, id: Date.now() }]);
      setNewLanguage({
        name: "",
        proficiency: "Beginner"
      });
    }
  };

  const removeLanguage = (id) => {
    setLanguages(languages.filter(lang => lang.id !== id));
  };

  const ProficiencyBar = ({ proficiency }) => {
    const { level, color } = proficiencyLevels[proficiency];
    return (
      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
        <div 
          className={`${color} h-2 rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${(level / 5) * 100}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg animate-scale-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
          <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          Languages
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 hover:text-blue-700 transition duration-200 transform hover:scale-105"
        >
          {isEditing ? "Done" : "Edit"}
        </button>
      </div>

      {isEditing && (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-6 animate-fade-in">
          <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Add Language</h3>
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Language name"
              value={newLanguage.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            
            <select
              name="proficiency"
              value={newLanguage.proficiency}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              {Object.keys(proficiencyLevels).map(level => (
                <option key={level} value={level}>
                  {level} - {proficiencyLevels[level].description}
                </option>
              ))}
            </select>
            
            <button
              onClick={addLanguage}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 transform hover:scale-105"
            >
              Add Language
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {languages.map((language) => (
          <div key={language.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{language.name}</h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{language.proficiency}</span>
                </div>
                <ProficiencyBar proficiency={language.proficiency} />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {proficiencyLevels[language.proficiency].description}
                </p>
              </div>
              {isEditing && (
                <button
                  onClick={() => removeLanguage(language.id)}
                  className="text-red-500 hover:text-red-700 font-bold ml-4 transform hover:scale-110 transition-all duration-200"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {languages.length === 0 && !isEditing && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No languages added yet. Click "Edit" to add your language skills.</p>
        </div>
      )}
    </div>
  );
}

export default Languages;
