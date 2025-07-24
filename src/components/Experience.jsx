import { useState } from "react";
import "./Experience.css";

function Experience() {
  const [isEditing, setIsEditing] = useState(true);
  const [experienceList, setExperienceList] = useState([]);
  const [currentExp, setCurrentExp] = useState({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    responsibilities: "",
    achievements: ""
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setCurrentExp({ 
      ...currentExp, 
      [name]: type === 'checkbox' ? checked : value 
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (currentExp.company && currentExp.position) {
      setExperienceList([...experienceList, { ...currentExp, id: Date.now() }]);
      setCurrentExp({
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        responsibilities: "",
        achievements: ""
      });
    }
  }

  function removeExperience(id) {
    setExperienceList(experienceList.filter(exp => exp.id !== id));
  }

  return (
    <div className="experience-container">
      <div className="experience-header">
        <h2 className="experience-title">Work Experience</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="edit-button"
        >
          {isEditing ? "Done Editing" : "Edit Experience"}
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="experience-form">
          <h3 className="form-section-title">Add Work Experience</h3>
          <div className="form-section">
            <div className="form-row">
              <input
                type="text"
                name="company"
                value={currentExp.company}
                placeholder="Company Name"
                onChange={handleChange}
                className="form-input"
                required
              />
              <input
                type="text"
                name="position"
                value={currentExp.position}
                placeholder="Job Title/Position"
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-row-three">
              <input
                type="text"
                name="location"
                value={currentExp.location}
                placeholder="Location (City, State)"
                onChange={handleChange}
                className="form-input"
              />
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  name="current"
                  checked={currentExp.current}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                <label className="checkbox-label">Current Position</label>
              </div>
            </div>
            <div className="form-row">
              <input
                type="date"
                name="startDate"
                value={currentExp.startDate}
                onChange={handleChange}
                className="form-input"
              />
              {!currentExp.current && (
                <input
                  type="date"
                  name="endDate"
                  value={currentExp.endDate}
                  onChange={handleChange}
                  className="form-input"
                />
              )}
            </div>
          </div>
          
          <textarea
            name="responsibilities"
            value={currentExp.responsibilities}
            placeholder="Key responsibilities and duties..."
            onChange={handleChange}
            rows="3"
            className="form-textarea"
          />
          
          <textarea
            name="achievements"
            value={currentExp.achievements}
            placeholder="Major achievements and accomplishments..."
            onChange={handleChange}
            rows="3"
            className="form-textarea"
          />
          
          <button 
            type="submit"
            className="add-button"
          >
            Add Experience
          </button>
        </form>
      )}

      {/* Experience List Display */}
      <div className="experience-list">
        {experienceList.map((exp) => (
          <div key={exp.id} className="experience-item">
            <div className="experience-item-header">
              <div className="experience-main-info">
                <h3 className="experience-position">{exp.position}</h3>
                <p className="experience-company">{exp.company}</p>
                <div className="experience-meta">
                  {exp.location && <span className="experience-location">{exp.location}</span>}
                  {(exp.startDate || exp.endDate) && (
                    <span className="experience-duration">
                      {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                      {exp.current ? ' Present' : (exp.endDate ? ` ${new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : '')}
                    </span>
                  )}
                  {exp.current && (
                    <span className="current-badge">Current</span>
                  )}
                </div>
              </div>
              {isEditing && (
                <div className="experience-actions">
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="remove-button"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            
            <div className="experience-content">
              {exp.responsibilities && (
                <div className="experience-section">
                  <h4 className="experience-section-title">Key Responsibilities:</h4>
                  <p className="experience-text">{exp.responsibilities}</p>
                </div>
              )}
              
              {exp.achievements && (
                <div className="experience-section">
                  <h4 className="experience-section-title">Achievements:</h4>
                  <p className="experience-text">{exp.achievements}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {experienceList.length === 0 && !isEditing && (
        <div className="empty-state">
          <p>No work experience added yet. Click "Edit Experience" to add your professional background.</p>
        </div>
      )}
    </div>
  );
}

export default Experience;
