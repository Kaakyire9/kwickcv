import { useState } from "react";
import "./Skills.css";

function Skills() {
  const [isEditing, setIsEditing] = useState(true);
  const [skills, setSkills] = useState({
    technical: [],
    languages: [],
    soft: []
  });
  const [newSkill, setNewSkill] = useState({ category: "technical", name: "", level: 5 });

  const addSkill = () => {
    if (newSkill.name.trim()) {
      setSkills({
        ...skills,
        [newSkill.category]: [...skills[newSkill.category], { name: newSkill.name, level: newSkill.level }]
      });
      setNewSkill({ ...newSkill, name: "" });
    }
  };

  const removeSkill = (category, index) => {
    setSkills({
      ...skills,
      [category]: skills[category].filter((_, i) => i !== index)
    });
  };

  const SkillBar = ({ skill }) => (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-level">{skill.level * 20}%</span>
      </div>
      <div className="skill-bar-container">
        <div 
          className="skill-bar"
          style={{ width: `${skill.level * 20}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="skills-container">
      <div className="skills-header">
        <h2 className="skills-title">Skills</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="edit-button"
        >
          {isEditing ? "Done" : "Edit"}
        </button>
      </div>

      {isEditing ? (
        <div className="skills-form">
          {/* Add New Skill */}
          <div className="add-skill-section">
            <h3 className="category-title">Add New Skill</h3>
            <div className="add-skill-form">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="form-select"
                >
                  <option value="technical">Technical Skills</option>
                  <option value="languages">Languages</option>
                  <option value="soft">Soft Skills</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Skill Name</label>
                <input
                  type="text"
                  placeholder="Skill name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  Proficiency Level: {newSkill.level * 20}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                  className="form-input"
                />
              </div>
              
              <button
                onClick={addSkill}
                className="add-button"
              >
                Add Skill
              </button>
            </div>
          </div>

          {/* Skills Lists */}
          <div className="skills-categories">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="skill-category">
                <h3 className="category-title">
                  {category === "technical" ? "Technical Skills" : 
                   category === "languages" ? "Languages" : "Soft Skills"}
                </h3>
                <div className="skills-grid">
                  {skillList.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-header">
                        <SkillBar skill={skill} />
                        <button
                          onClick={() => removeSkill(category, index)}
                          className="remove-button"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="preview-skills">
          {Object.entries(skills).map(([category, skillList]) => 
            skillList.length > 0 && (
              <div key={category} className="preview-category">
                <h3 className="preview-category-title">
                  {category === "technical" ? "Technical Skills" : 
                   category === "languages" ? "Languages" : "Soft Skills"}
                </h3>
                <div className="skills-grid">
                  {skillList.map((skill, index) => (
                    <SkillBar key={index} skill={skill} />
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Skills;
