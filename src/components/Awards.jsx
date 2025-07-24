import { useState } from "react";
import { useCVData } from "../contexts/CVDataContext";
import "../styles/Awards.css";

function Awards() {
  const { awards, setAwards } = useCVData();
  const [isEditing, setIsEditing] = useState(true);
  const [newAward, setNewAward] = useState({
    title: "",
    issuer: "",
    date: "",
    description: ""
  });

  const handleInputChange = (e) => {
    setNewAward({ ...newAward, [e.target.name]: e.target.value });
  };

  const addAward = () => {
    if (newAward.title.trim() && newAward.issuer.trim()) {
      setAwards([...awards, { ...newAward, id: Date.now() }]);
      setNewAward({
        title: "",
        issuer: "",
        date: "",
        description: ""
      });
    }
  };

  const removeAward = (id) => {
    setAwards(awards.filter(award => award.id !== id));
  };

  return (
    <div className="awards-container">
      <div className="awards-header">
        <h2 className="awards-title">
          <svg className="awards-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          Awards & Achievements
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="edit-button"
        >
          {isEditing ? "Done Editing" : "Edit Awards"}
        </button>
      </div>

      {isEditing && (
        <div className="awards-form">
          <h3 className="form-title">Add Award</h3>
          <div className="form-grid">
            <input
              type="text"
              name="title"
              placeholder="Award Title"
              value={newAward.title}
              onChange={handleInputChange}
              className="form-input"
            />
            
            <div className="form-grid-row">
              <input
                type="text"
                name="issuer"
                placeholder="Issuing Organization"
                value={newAward.issuer}
                onChange={handleInputChange}
                className="form-input"
              />
              
              <input
                type="date"
                name="date"
                value={newAward.date}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            
            <textarea
              name="description"
              placeholder="Award description or achievement details..."
              value={newAward.description}
              onChange={handleInputChange}
              rows="3"
              className="form-textarea"
            />
            
            <button
              onClick={addAward}
              className="add-button"
            >
              Add Award
            </button>
          </div>
        </div>
      )}

      <div className="awards-list">
        {awards.map((award) => (
          <div key={award.id} className="award-item">
            <div className="award-accent"></div>
            <div className="award-content">
              <div className="award-info">
                <div className="award-header">
                  <svg className="award-medal-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 16L3 21l5.25-1.4L12 17l3.75 2.6L21 16l-2-5h-3l-4-6-4 6H5l-2 5z"/>
                  </svg>
                  <h3 className="award-title">{award.title}</h3>
                </div>
                <p className="award-issuer">{award.issuer}</p>
                {award.date && (
                  <p className="award-date">
                    {new Date(award.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                )}
                {award.description && (
                  <p className="award-description">{award.description}</p>
                )}
              </div>
              {isEditing && (
                <button
                  onClick={() => removeAward(award.id)}
                  className="delete-button"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {awards.length === 0 && !isEditing && (
        <div className="empty-state">
          <p>No awards added yet. Click "Edit Awards" to add your achievements.</p>
        </div>
      )}
    </div>
  );
}

export default Awards;
