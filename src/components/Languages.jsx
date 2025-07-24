import { useState } from "react";
import { useCVData } from "../contexts/CVDataContext";
import "./Languages.css";

function Languages() {
  const { languages, setLanguages } = useCVData();
  const [isEditing, setIsEditing] = useState(true);
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
    const { level } = proficiencyLevels[proficiency];
    const proficiencyClass = proficiency.toLowerCase().replace(' ', '-');
    return (
      <div className="proficiency-bar-container">
        <div 
          className={`proficiency-bar ${proficiencyClass}`}
          style={{ width: `${(level / 5) * 100}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="languages-container">
      <div className="languages-header">
        <h2 className="languages-title">
          <svg className="languages-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          Languages
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="edit-button"
        >
          {isEditing ? "Done" : "Edit"}
        </button>
      </div>

      {isEditing && (
        <div className="languages-form">
          <h3 className="form-section-title">Add Language</h3>
          <div className="form-section">
            <input
              type="text"
              name="name"
              placeholder="Language name"
              value={newLanguage.name}
              onChange={handleInputChange}
              className="form-input"
            />
            
            <select
              name="proficiency"
              value={newLanguage.proficiency}
              onChange={handleInputChange}
              className="form-select"
            >
              {Object.keys(proficiencyLevels).map(level => (
                <option key={level} value={level}>
                  {level} - {proficiencyLevels[level].description}
                </option>
              ))}
            </select>
            
            <button
              onClick={addLanguage}
              className="add-button"
            >
              Add Language
            </button>
          </div>
        </div>
      )}

      <div className="languages-list">
        {languages.map((language) => (
          <div key={language.id} className="language-item">
            <div className="language-header">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="language-name">{language.name}</h3>
                  <span className="language-proficiency">{language.proficiency}</span>
                </div>
                <ProficiencyBar proficiency={language.proficiency} />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {proficiencyLevels[language.proficiency].description}
                </p>
              </div>
              {isEditing && (
                <button
                  onClick={() => removeLanguage(language.id)}
                  className="remove-button"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {languages.length === 0 && !isEditing && (
        <div className="empty-state">
          <p>No languages added yet. Click "Edit" to add your language skills.</p>
        </div>
      )}
    </div>
  );
}

export default Languages;
