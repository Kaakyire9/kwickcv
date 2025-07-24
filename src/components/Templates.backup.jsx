import { useState } from 'react';
import { useCVData } from '../contexts/CVDataContext';
import '../styles/Templates.css';

function Templates() {
  const { getAllCVData } = useCVData();
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const cvData = getAllCVData();

  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean and contemporary design with accent colors',
      preview: '/templates/modern-preview.png'
    },
    {
      id: 'classic',
      name: 'Classic Traditional',
      description: 'Traditional format perfect for conservative industries',
      preview: '/templates/classic-preview.png'
    },
    {
      id: 'creative',
      name: 'Creative Designer',
      description: 'Bold and creative layout for design professionals',
      preview: '/templates/creative-preview.png'
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Minimalist design focusing on content',
      preview: '/templates/minimal-preview.png'
    }
  ];

  const handlePrint = () => {
    setIsPreviewMode(true);
    setTimeout(() => {
      window.print();
      setIsPreviewMode(false);
    }, 500);
  };

  const handleDownloadPDF = async () => {
    // For now, we'll use the browser's print to PDF functionality
    // In a real implementation, you'd use a library like jsPDF or puppeteer
    setIsPreviewMode(true);
    setTimeout(() => {
      window.print();
      setIsPreviewMode(false);
    }, 500);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate cvData={cvData} formatDate={formatDate} />;
      case 'classic':
        return <ClassicTemplate cvData={cvData} formatDate={formatDate} />;
      case 'creative':
        return <CreativeTemplate cvData={cvData} formatDate={formatDate} />;
      case 'minimal':
        return <MinimalTemplate cvData={cvData} formatDate={formatDate} />;
      default:
        return <ModernTemplate cvData={cvData} formatDate={formatDate} />;
    }
  };

  if (isPreviewMode) {
    return (
      <div className="print-preview">
        {renderTemplate()}
      </div>
    );
  }

  return (
    <div className="templates-container">
      <div className="templates-header">
        <h2 className="templates-title">
          <svg className="templates-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          CV Templates
        </h2>
        <div className="action-buttons">
          <button onClick={handlePrint} className="action-button print-button">
            <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print CV
          </button>
          <button onClick={handleDownloadPDF} className="action-button download-button">
            <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>

      <div className="templates-content">
        <div className="template-selector">
          <h3 className="selector-title">Choose Template</h3>
          <div className="templates-grid">
            {templates.map(template => (
              <div 
                key={template.id}
                className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="template-preview-placeholder">
                  <svg className="preview-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="template-info">
                  <h4 className="template-name">{template.name}</h4>
                  <p className="template-description">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="template-preview">
          <h3 className="preview-title">Preview</h3>
          <div className="preview-container">
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}

// Modern Template Component
function ModernTemplate({ cvData, formatDate }) {
  return (
  <div className="cv-template modern-template">
    <div className="cv-header">
      <div className="personal-info">
        <h1 className="full-name">{cvData.generalInfo.name}</h1>
        <div className="contact-info">
          <div className="contact-line-1">
            {cvData.generalInfo.email && <span className="contact-item">{cvData.generalInfo.email}</span>}
            {cvData.generalInfo.phone && <span className="contact-item">{cvData.generalInfo.phone}</span>}
            {cvData.generalInfo.location && <span className="contact-item">{cvData.generalInfo.location}</span>}
          </div>
          <div className="contact-line-2">
            {cvData.generalInfo.website && <span className="contact-item">{cvData.generalInfo.website}</span>}
            {cvData.generalInfo.linkedin && <span className="contact-item">LinkedIn: {cvData.generalInfo.linkedin}</span>}
            {cvData.generalInfo.github && <span className="contact-item">GitHub: {cvData.generalInfo.github}</span>}
          </div>
        </div>
      </div>
    </div>
    
    {cvData.generalInfo.summary && (
      <section className="cv-section">
        <h2 className="section-title">Professional Summary</h2>
        <p className="summary-text">{cvData.generalInfo.summary}</p>
      </section>
    )}

    {cvData.experience.length > 0 && (
      <section className="cv-section">
        <h2 className="section-title">Experience</h2>
        {cvData.experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-header">
              <h3 className="job-title">{exp.jobTitle}</h3>
              <span className="date-range">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
            </div>
            <p className="company-name">{exp.company}</p>
            {exp.description && <p className="job-description">{exp.description}</p>}
          </div>
        ))}
      </section>
    )}

    {cvData.education.length > 0 && (
      <section className="cv-section">
        <h2 className="section-title">Education</h2>
        {cvData.education.map((edu, index) => (
          <div key={index} className="education-item">
            <div className="education-header">
              <h3 className="degree">{edu.degree}</h3>
              <span className="date-range">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
            </div>
            <p className="institution">{edu.institution}</p>
            {edu.gpa && <p className="gpa">GPA: {edu.gpa}</p>}
          </div>
        ))}
      </section>
    )}

    {cvData.skills.length > 0 && (
      <section className="cv-section">
        <h2 className="section-title">Skills</h2>
        <div className="skills-list">
          {cvData.skills.map((skill, index) => (
            <span key={index} className="skill-item">{skill.name}</span>
          ))}
        </div>
      </section>
    )}

    {cvData.languages.length > 0 && (
      <section className="cv-section">
        <h2 className="section-title">Languages</h2>
        <div className="languages-list">
          {cvData.languages.map((lang, index) => (
            <div key={index} className="language-item">
              <span className="language-name">{lang.name}</span>
              {lang.proficiency && <span className="language-level"> - {lang.proficiency}</span>}
            </div>
          ))}
        </div>
      </section>
    )}

    {cvData.projects.length > 0 && (
      <section className="cv-section">
        <h2 className="section-title">Projects</h2>
        {cvData.projects.map((project, index) => (
          <div key={index} className="project-item">
            <h3 className="project-title">{project.title}</h3>
            {project.description && <p className="project-description">{project.description}</p>}
            {project.technologies && <p className="project-tech">Technologies: {project.technologies}</p>}
            <div className="project-links">
              {project.liveUrl && <span className="project-link">Live: {project.liveUrl}</span>}
              {project.githubUrl && <span className="project-link">GitHub: {project.githubUrl}</span>}
            </div>
          </div>
        ))}
      </section>
    )}

    {cvData.certifications.length > 0 && (
      <section className="cv-section">
        <h2 className="section-title">Certifications</h2>
        {cvData.certifications.map((cert, index) => (
          <div key={index} className="certification-item">
            <h3 className="cert-name">{cert.name}</h3>
            <p className="cert-issuer">{cert.issuer}</p>
            {cert.date && <p className="cert-date">Issued: {formatDate(cert.date)}</p>}
            {cert.expiryDate && <p className="cert-expiry">Expires: {formatDate(cert.expiryDate)}</p>}
          </div>
        ))}
      </section>
    )}

    {cvData.awards.length > 0 && (
      <section className="cv-section">
        <h2 className="section-title">Awards & Achievements</h2>
        {cvData.awards.map((award, index) => (
          <div key={index} className="award-item">
            <h3 className="award-title">{award.title}</h3>
            <p className="award-issuer">{award.issuer}</p>
            {award.date && <p className="award-date">{formatDate(award.date)}</p>}
            {award.description && <p className="award-description">{award.description}</p>}
          </div>
        ))}
      </section>
    )}
  </div>
  );
}

// Classic Template Component
function ClassicTemplate({ cvData, formatDate }) {
  return (
  <div className="cv-template classic-template">
    <div className="cv-header">
      <h1 className="full-name">{cvData.generalInfo.name}</h1>
      <div className="contact-info">
        <div className="contact-line-1">
          {cvData.generalInfo.email && <span className="contact-item">{cvData.generalInfo.email}</span>}
          {cvData.generalInfo.phone && <span className="contact-item">{cvData.generalInfo.phone}</span>}
          {cvData.generalInfo.location && <span className="contact-item">{cvData.generalInfo.location}</span>}
        </div>
        <div className="contact-line-2">
          {cvData.generalInfo.website && <span className="contact-item">{cvData.generalInfo.website}</span>}
          {cvData.generalInfo.linkedin && <span className="contact-item">LinkedIn: {cvData.generalInfo.linkedin}</span>}
          {cvData.generalInfo.github && <span className="contact-item">GitHub: {cvData.generalInfo.github}</span>}
        </div>
      </div>
    </div>
    
    {/* Similar structure but with classic styling */}
    {cvData.generalInfo.summary && (
      <section className="cv-section">
        <h2 className="section-title">OBJECTIVE</h2>
        <p>{cvData.generalInfo.summary}</p>
      </section>
    )}

    {cvData.experience.length > 0 && (
      <section className="cv-section">
        <h2 className="section-title">PROFESSIONAL EXPERIENCE</h2>
        {cvData.experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>{exp.jobTitle} - {exp.company}</h3>
            <p>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
            {exp.description && <p>{exp.description}</p>}
          </div>
        ))}
      </section>
    )}

    {cvData.education.length > 0 && (
      <section className="cv-section">
        <h2 className="section-title">EDUCATION</h2>
        {cvData.education.map((edu, index) => (
          <div key={index} className="education-item">
            <h3>{edu.degree} - {edu.school}</h3>
            <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
            {edu.gpa && <p>GPA: {edu.gpa}</p>}
          </div>
        ))}
      </section>
    )}

    {cvData.skills.length > 0 && (
      <section className="cv-section">
        <h2 className="section-title">SKILLS</h2>
        <div className="skills-list">
          {cvData.skills.map((skill, index) => (
            <span key={index} className="skill-item">{skill.name}</span>
          ))}
        </div>
      </section>
    )}

    {cvData.certifications.length > 0 && (
      <section className="cv-section">
        <h2 className="section-title">CERTIFICATIONS</h2>
        {cvData.certifications.map((cert, index) => (
          <div key={index} className="certification-item">
            <h3>{cert.name}</h3>
            <p>{cert.issuer} - {formatDate(cert.date)}</p>
          </div>
        ))}
      </section>
    )}
  </div>
  );
}

// Creative Template Component
function CreativeTemplate({ cvData, formatDate }) {
  return (
  <div className="cv-template creative-template">
    <div className="cv-sidebar">
      <h1 className="full-name">{cvData.generalInfo.name}</h1>
      <div className="contact-section">
        <div className="contact-line-1">
          {cvData.generalInfo.email && <div className="contact-item">{cvData.generalInfo.email}</div>}
          {cvData.generalInfo.phone && <div className="contact-item">{cvData.generalInfo.phone}</div>}
          {cvData.generalInfo.location && <div className="contact-item">{cvData.generalInfo.location}</div>}
        </div>
        <div className="contact-line-2">
          {cvData.generalInfo.website && <div className="contact-item">{cvData.generalInfo.website}</div>}
          {cvData.generalInfo.linkedin && <div className="contact-item">LinkedIn: {cvData.generalInfo.linkedin}</div>}
          {cvData.generalInfo.github && <div className="contact-item">GitHub: {cvData.generalInfo.github}</div>}
        </div>
      </div>
      
      {cvData.skills.length > 0 && (
        <section>
          <h2>SKILLS</h2>
          {cvData.skills.map((skill, index) => (
            <div key={index} className="skill-item">{skill.name}</div>
          ))}
        </section>
      )}

      {cvData.languages.length > 0 && (
        <section>
          <h2>LANGUAGES</h2>
          {cvData.languages.map((lang, index) => (
            <div key={index} className="language-item">
              {lang.name} {lang.proficiency && `(${lang.proficiency})`}
            </div>
          ))}
        </section>
      )}

      {cvData.certifications.length > 0 && (
        <section>
          <h2>CERTIFICATIONS</h2>
          {cvData.certifications.map((cert, index) => (
            <div key={index} className="cert-item">
              <div>{cert.name}</div>
              <div className="cert-issuer">{cert.issuer}</div>
            </div>
          ))}
        </section>
      )}
    </div>
    
    <div className="cv-main">
      {cvData.generalInfo.summary && (
        <section>
          <h2>ABOUT</h2>
          <p>{cvData.generalInfo.summary}</p>
        </section>
      )}
      
      {cvData.experience.length > 0 && (
        <section>
          <h2>EXPERIENCE</h2>
          {cvData.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <h3>{exp.jobTitle}</h3>
              <p>{exp.company} | {formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
              {exp.description && <p>{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {cvData.education.length > 0 && (
        <section>
          <h2>EDUCATION</h2>
          {cvData.education.map((edu, index) => (
            <div key={index} className="education-item">
              <h3>{edu.degree}</h3>
              <p>{edu.school} | {formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
            </div>
          ))}
        </section>
      )}

      {cvData.projects.length > 0 && (
        <section>
          <h2>PROJECTS</h2>
          {cvData.projects.map((project, index) => (
            <div key={index} className="project-item">
              <h3>{project.title}</h3>
              {project.description && <p>{project.description}</p>}
              {project.technologies && <p><strong>Tech:</strong> {project.technologies}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  </div>
  );
}

// Minimal Template Component
function MinimalTemplate({ cvData, formatDate }) {
  return (
  <div className="cv-template minimal-template">
    <header>
      <h1>{cvData.generalInfo.name}</h1>
      <div className="contact-info">
        <div className="contact-line-1">
          {cvData.generalInfo.email && <span>{cvData.generalInfo.email}</span>}
          {cvData.generalInfo.phone && <span>{cvData.generalInfo.phone}</span>}
          {cvData.generalInfo.location && <span>{cvData.generalInfo.location}</span>}
        </div>
        <div className="contact-line-2">
          {cvData.generalInfo.website && <span>{cvData.generalInfo.website}</span>}
          {cvData.generalInfo.linkedin && <span>LinkedIn: {cvData.generalInfo.linkedin}</span>}
          {cvData.generalInfo.github && <span>GitHub: {cvData.generalInfo.github}</span>}
        </div>
      </div>
    </header>
    
    {cvData.generalInfo.summary && (
      <section>
        <p>{cvData.generalInfo.summary}</p>
      </section>
    )}

    {cvData.experience.length > 0 && (
      <section>
        <h2>Experience</h2>
        {cvData.experience.map((exp, index) => (
          <div key={index}>
            <h3>{exp.jobTitle}, {exp.company}</h3>
            <p>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
            {exp.description && <p>{exp.description}</p>}
          </div>
        ))}
      </section>
    )}

    {cvData.education.length > 0 && (
      <section>
        <h2>Education</h2>
        {cvData.education.map((edu, index) => (
          <div key={index}>
            <h3>{edu.degree}, {edu.school}</h3>
            <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
          </div>
        ))}
      </section>
    )}

    {cvData.skills.length > 0 && (
      <section>
        <h2>Skills</h2>
        <p>{cvData.skills.map(skill => skill.name).join(', ')}</p>
      </section>
    )}

    {cvData.projects.length > 0 && (
      <section>
        <h2>Projects</h2>
        {cvData.projects.map((project, index) => (
          <div key={index}>
            <h3>{project.title}</h3>
            {project.description && <p>{project.description}</p>}
          </div>
        ))}
      </section>
    )}
  </div>
  );
}

export default Templates;
