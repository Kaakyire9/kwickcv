import { useState } from "react";
import { useCVData } from "../contexts/CVDataContext";
import "../styles/Education.css";

function Education() {
  const { education, setEducation } = useCVData();
  const [isEditing, setIsEditing] = useState(true);
  const [currentEdu, setCurrentEdu] = useState({ 
    school: "", 
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    gpa: "",
    description: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setCurrentEdu({ ...currentEdu, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (currentEdu.school && currentEdu.degree) {
      setEducation([...education, { ...currentEdu, id: Date.now() }]);
      setCurrentEdu({ 
        school: "", 
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        gpa: "",
        description: ""
      });
    }
  }

  function removeEducation(id) {
    setEducation(education.filter(edu => edu.id !== id));
  }

  return (
    <div className="education-container">
      <div className="education-header">
        <h2 className="education-title">Education</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="edit-button"
        >
          {isEditing ? "Done Editing" : "Edit Education"}
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="education-form">
          <h3 className="form-section-title">Add Education</h3>
          <div className="form-section">
            <div className="form-row">
              <input
                type="text"
                name="school"
                value={currentEdu.school}
                placeholder="School/University Name"
                onChange={handleChange}
                className="form-input"
                required
              />
              <input
                type="text"
                name="degree"
                value={currentEdu.degree}
                placeholder="Degree (e.g., Bachelor's, Master's)"
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="field"
                value={currentEdu.field}
                placeholder="Field of Study"
                onChange={handleChange}
                className="form-input"
              />
              <input
                type="text"
                name="gpa"
                value={currentEdu.gpa}
                placeholder="GPA (optional)"
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <input
                type="date"
                name="startDate"
                value={currentEdu.startDate}
                onChange={handleChange}
                className="form-input"
              />
              <input
                type="date"
                name="endDate"
                value={currentEdu.endDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
          <textarea
            name="description"
            value={currentEdu.description}
            placeholder="Description, achievements, relevant coursework..."
            onChange={handleChange}
            rows="3"
            className="form-textarea"
          />
          <button 
            type="submit"
            className="add-button"
          >
            Add Education
          </button>
        </form>
      )}

      {/* Education List Display */}
      <div className="education-list">
        {education.map((edu) => (
          <div key={edu.id} className="education-item">
            <div className="education-item-header">
              <div className="education-main-info">
                <h3 className="education-degree">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                <p className="education-school">{edu.school}</p>
                <div className="education-meta">
                  {(edu.startDate || edu.endDate) && (
                    <span className="education-duration">
                      {edu.startDate && new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                    </span>
                  )}
                  {edu.gpa && <span className="education-gpa">GPA: {edu.gpa}</span>}
                </div>
              </div>
              {isEditing && (
                <div className="education-actions">
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="remove-button"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            {edu.description && (
              <div className="education-content">
                <p className="education-text">{edu.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {education.length === 0 && !isEditing && (
        <div className="empty-state">
          <p>No education entries added yet. Click "Edit Education" to add your educational background.</p>
        </div>
      )}
    </div>
  );
}

export default Education;
