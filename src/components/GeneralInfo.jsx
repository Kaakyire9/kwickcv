import { useState } from "react";
import { useCVData } from "../contexts/CVDataContext";
import { SmartInput, SmartTextarea } from "./SmartInput";
import "./GeneralInfo.css";

function GeneralInfo() {
  const { generalInfo, setGeneralInfo } = useCVData();
  const [isEditing, setIsEditing] = useState(true);
  const [photoPreview, setPhotoPreview] = useState(generalInfo.profilePhoto || null);

  function handleChange(e) {
    const { name, value } = e.target;
    setGeneralInfo({ ...generalInfo, [name]: value });
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setGeneralInfo({ ...generalInfo, profilePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditing(false);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  return (
    <div className="general-info-container">
      <div className="general-info-header">
        <h2 className="general-info-title">Personal Information</h2>
        <button
          onClick={handleEdit}
          className="edit-button"
        >
          {isEditing ? "Preview" : "Edit"}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="general-info-form">
          {/* Profile Photo Upload */}
          <div className="photo-upload-container">
            <div className="photo-upload-wrapper">
              <div className="photo-upload-area">
                {photoPreview || generalInfo.profilePhoto ? (
                  <img 
                    src={photoPreview || generalInfo.profilePhoto} 
                    alt="Profile" 
                    className="photo-preview"
                  />
                ) : (
                  <div className="photo-placeholder">
                    <svg className="photo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="photo-placeholder-text">Photo</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="photo-input"
              />
            </div>
            <p className="photo-upload-label">Click to upload profile photo</p>
          </div>

          <div className="form-grid">
            <input
              type="text"
              name="name"
              value={generalInfo.name}
              placeholder="Full Name"
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="email"
              name="email"
              value={generalInfo.email}
              placeholder="Email Address"
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="tel"
              name="phone"
              value={generalInfo.phone}
              placeholder="Phone Number"
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="text"
              name="location"
              value={generalInfo.location}
              placeholder="Location (City, State)"
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="url"
              name="website"
              value={generalInfo.website}
              placeholder="Website/Portfolio URL"
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="url"
              name="linkedin"
              value={generalInfo.linkedin}
              placeholder="LinkedIn Profile"
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="url"
              name="github"
              value={generalInfo.github}
              placeholder="GitHub Profile"
              onChange={handleChange}
              className="form-input-full-width"
            />
          </div>
          
          <SmartTextarea
            name="summary"
            value={generalInfo.summary}
            placeholder="Professional summary or objective... (Highlight your key achievements and career goals)"
            onChange={handleChange}
            rows={4}
            fieldType="summary"
            className="form-textarea"
          />
          
          <button 
            type="submit"
            className="save-button"
          >
            Save Information
          </button>
        </form>
      ) : (
        <div className="preview-container">
          {/* Profile Photo Display */}
          {generalInfo.profilePhoto && (
            <div className="profile-photo-display-container">
              <img 
                src={generalInfo.profilePhoto} 
                alt="Profile" 
                className="profile-photo-display"
              />
            </div>
          )}
          
          {generalInfo.name && <h3 className="preview-name">{generalInfo.name}</h3>}
          
          <div className="contact-info-list">
            {generalInfo.email && (
              <p className="contact-info-item">
                <svg className="contact-info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {generalInfo.email}
              </p>
            )}
            {generalInfo.phone && (
              <p className="contact-info-item">
                <svg className="contact-info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {generalInfo.phone}
              </p>
            )}
            {generalInfo.location && (
              <p className="contact-info-item">
                <svg className="contact-info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {generalInfo.location}
              </p>
            )}
          </div>

          {/* Social Links */}
          <div className="social-links-container">
            {generalInfo.website && (
              <a href={generalInfo.website} target="_blank" rel="noopener noreferrer" 
                 className="social-link-website">
                <svg className="social-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </a>
            )}
            {generalInfo.linkedin && (
              <a href={generalInfo.linkedin} target="_blank" rel="noopener noreferrer" 
                 className="social-link-linkedin">
                <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            )}
            {generalInfo.github && (
              <a href={generalInfo.github} target="_blank" rel="noopener noreferrer" 
                 className="social-link-github">
                <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
          </div>

          {generalInfo.summary && (
            <div className="summary-section">
              <h4 className="summary-title">Professional Summary</h4>
              <p className="summary-text">{generalInfo.summary}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GeneralInfo;
