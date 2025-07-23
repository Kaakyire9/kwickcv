import { useState } from "react";
import "./Skills.css";
import "./shared.css";

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
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
        <span className="text-sm text-gray-500">{skill.level * 20}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${skill.level * 20}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Skills</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 hover:text-blue-700 transition duration-200"
        >
          {isEditing ? "Done" : "Edit"}
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          {/* Add New Skill */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <h3 className="font-semibold mb-3 text-gray-700">Add New Skill</h3>
            <div className="grid grid-cols-1 gap-3">
              <select
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="technical">Technical Skills</option>
                <option value="languages">Languages</option>
                <option value="soft">Soft Skills</option>
              </select>
              
              <input
                type="text"
                placeholder="Skill name"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proficiency Level: {newSkill.level * 20}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
              
              <button
                onClick={addSkill}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Add Skill
              </button>
            </div>
          </div>

          {/* Skills Lists */}
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2 capitalize">
                {category === "technical" ? "Technical Skills" : 
                 category === "languages" ? "Languages" : "Soft Skills"}
              </h3>
              {skillList.map((skill, index) => (
                <div key={index} className="flex items-center justify-between mb-2">
                  <SkillBar skill={skill} />
                  <button
                    onClick={() => removeSkill(category, index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(skills).map(([category, skillList]) => 
            skillList.length > 0 && (
              <div key={category}>
                <h3 className="font-semibold text-gray-700 mb-3 capitalize">
                  {category === "technical" ? "Technical Skills" : 
                   category === "languages" ? "Languages" : "Soft Skills"}
                </h3>
                {skillList.map((skill, index) => (
                  <SkillBar key={index} skill={skill} />
                ))}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Skills;
