import { useState } from "react";
import { useCVData } from "../contexts/CVDataContext";
import "./Certifications.css";

function Certifications() {
  const { certifications, setCertifications } = useCVData();
  const [isEditing, setIsEditing] = useState(true);
  const [newCert, setNewCert] = useState({
    name: "",
    issuer: "",
    date: "",
    expiryDate: "",
    credentialId: "",
    credentialUrl: ""
  });

  const handleInputChange = (e) => {
    setNewCert({ ...newCert, [e.target.name]: e.target.value });
  };

  const addCertification = () => {
    if (newCert.name.trim() && newCert.issuer.trim()) {
      setCertifications([...certifications, { ...newCert, id: Date.now() }]);
      setNewCert({
        name: "",
        issuer: "",
        date: "",
        expiryDate: "",
        credentialId: "",
        credentialUrl: ""
      });
    }
  };

  const removeCertification = (id) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  return (
    <div className="certifications-container">
      <div className="certifications-header">
        <h2 className="certifications-title">
          <svg className="certifications-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          Certifications
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="edit-button"
        >
          {isEditing ? "Done" : "Edit"}
        </button>
      </div>

      {isEditing && (
        <div className="certifications-form">
          <h3 className="form-section-title">Add Certification</h3>
          <div className="form-grid">
            <input
              type="text"
              name="name"
              placeholder="Certification Name"
              value={newCert.name}
              onChange={handleInputChange}
              className="form-input"
            />
            
            <input
              type="text"
              name="issuer"
              placeholder="Issuing Organization"
              value={newCert.issuer}
              onChange={handleInputChange}
              className="form-input"
            />
            
            <input
              type="date"
              name="date"
              placeholder="Issue Date"
              value={newCert.date}
              onChange={handleInputChange}
              className="form-input"
            />
            
            <input
              type="date"
              name="expiryDate"
              placeholder="Expiry Date (optional)"
              value={newCert.expiryDate}
              onChange={handleInputChange}
              className="form-input"
            />
            
            <input
              type="text"
              name="credentialId"
              placeholder="Credential ID (optional)"
              value={newCert.credentialId}
              onChange={handleInputChange}
              className="form-input"
            />
            
            <input
              type="url"
              name="credentialUrl"
              placeholder="Credential URL (optional)"
              value={newCert.credentialUrl}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <button
            onClick={addCertification}
            className="add-button"
          >
            Add Certification
          </button>
        </div>
      )}

      <div className="certifications-list">
        {certifications.map((cert) => (
          <div key={cert.id} className="certification-item">
            <div className="certification-header">
              <div className="certification-main-info">
                <h3 className="certification-name">{cert.name}</h3>
                <p className="certification-issuer">{cert.issuer}</p>
                <div className="certification-meta">
                  {cert.date && (
                    <span className="certification-date">Issued: {new Date(cert.date).toLocaleDateString()}</span>
                  )}
                  {cert.expiryDate && (
                    <span className="certification-expiry">Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                  )}
                </div>
                <div className="certification-content">
                  <div className="certification-details">
                    {cert.credentialId && (
                      <p className="certification-credential">ID: {cert.credentialId}</p>
                    )}
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="certification-url"
                      >
                        View Credential →
                      </a>
                    )}
                  </div>
                </div>
              </div>
              {isEditing && (
                <div className="certification-actions">
                  <button
                    onClick={() => removeCertification(cert.id)}
                    className="remove-button"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {certifications.length === 0 && !isEditing && (
        <div className="empty-state">
          <p>No certifications added yet. Click "Edit" to add your certifications.</p>
        </div>
      )}
    </div>
  );
}

export default Certifications;
