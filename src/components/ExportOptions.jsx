import React, { useState } from 'react';
import { useCVData } from '../contexts/CVDataContext';

function ExportOptions({ selectedTemplate, onExport }) {
  const { getAllCVData } = useCVData();
  const [isExporting, setIsExporting] = useState(false);
  const [exportSettings, setExportSettings] = useState({
    format: 'pdf',
    paperSize: 'a4',
    orientation: 'portrait',
    includePhoto: true,
    colorMode: 'color',
    fontSize: 'medium',
    margins: 'normal',
    sections: {
      personalInfo: true,
      summary: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
      languages: true,
      awards: true
    }
  });

  const cvData = getAllCVData();

  const exportFormats = [
    { id: 'pdf', name: 'PDF Document', icon: '📄', description: 'Best for sharing and printing' },
    { id: 'docx', name: 'Word Document', icon: '📝', description: 'Editable format for further customization' },
    { id: 'html', name: 'Web Page', icon: '🌐', description: 'For online portfolios and websites' },
    { id: 'json', name: 'JSON Data', icon: '🔗', description: 'Raw data for integrations' }
  ];

  const paperSizes = [
    { id: 'a4', name: 'A4 (210×297mm)', description: 'Standard international' },
    { id: 'letter', name: 'Letter (8.5×11in)', description: 'US standard' },
    { id: 'legal', name: 'Legal (8.5×14in)', description: 'US legal size' }
  ];

  const fontSizes = [
    { id: 'small', name: 'Small (10pt)', description: 'Compact, fits more content' },
    { id: 'medium', name: 'Medium (12pt)', description: 'Standard readability' },
    { id: 'large', name: 'Large (14pt)', description: 'Better accessibility' }
  ];

  const handleSettingChange = (setting, value) => {
    setExportSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSectionToggle = (section) => {
    setExportSettings(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: !prev.sections[section]
      }
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      switch (exportSettings.format) {
        case 'pdf':
          await exportAsPDF();
          break;
        case 'docx':
          await exportAsWord();
          break;
        case 'html':
          await exportAsHTML();
          break;
        case 'json':
          await exportAsJSON();
          break;
        default:
          await exportAsPDF();
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsPDF = async () => {
    // Create a temporary iframe for printing
    const printFrame = document.createElement('iframe');
    printFrame.style.display = 'none';
    document.body.appendChild(printFrame);

    const printContent = generatePrintableHTML();
    
    printFrame.contentDocument.open();
    printFrame.contentDocument.write(printContent);
    printFrame.contentDocument.close();

    // Focus and print
    printFrame.contentWindow.focus();
    setTimeout(() => {
      printFrame.contentWindow.print();
      document.body.removeChild(printFrame);
    }, 1000);
  };

  const exportAsWord = async () => {
    const htmlContent = generatePrintableHTML();
    const blob = new Blob([htmlContent], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    });
    downloadFile(blob, `${cvData.generalInfo.name || 'CV'}_Resume.doc`);
  };

  const exportAsHTML = async () => {
    const htmlContent = generateFullHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    downloadFile(blob, `${cvData.generalInfo.name || 'CV'}_Resume.html`);
  };

  const exportAsJSON = async () => {
    const filteredData = filterDataBySections();
    const jsonContent = JSON.stringify(filteredData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    downloadFile(blob, `${cvData.generalInfo.name || 'CV'}_Data.json`);
  };

  const downloadFile = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filterDataBySections = () => {
    const filtered = { ...cvData };
    
    Object.keys(exportSettings.sections).forEach(section => {
      if (!exportSettings.sections[section]) {
        switch (section) {
          case 'personalInfo':
            filtered.generalInfo = { name: cvData.generalInfo.name };
            break;
          case 'summary':
            filtered.generalInfo.summary = '';
            break;
          case 'experience':
            filtered.experience = [];
            break;
          case 'education':
            filtered.education = [];
            break;
          case 'skills':
            filtered.skills = [];
            break;
          case 'projects':
            filtered.projects = [];
            break;
          case 'certifications':
            filtered.certifications = [];
            break;
          case 'languages':
            filtered.languages = [];
            break;
          case 'awards':
            filtered.awards = [];
            break;
        }
      }
    });

    return filtered;
  };

  const generatePrintableHTML = () => {
    const filteredData = filterDataBySections();
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${filteredData.generalInfo.name || 'CV'} - Resume</title>
          <style>
            @page {
              size: ${exportSettings.paperSize.toUpperCase()};
              margin: ${exportSettings.margins === 'narrow' ? '0.5in' : exportSettings.margins === 'wide' ? '1.5in' : '1in'};
            }
            
            body {
              font-family: 'Arial', sans-serif;
              font-size: ${exportSettings.fontSize === 'small' ? '10pt' : exportSettings.fontSize === 'large' ? '14pt' : '12pt'};
              line-height: 1.4;
              color: ${exportSettings.colorMode === 'grayscale' ? '#333' : '#000'};
              margin: 0;
              padding: 0;
            }
            
            .cv-container {
              max-width: 100%;
              margin: 0 auto;
            }
            
            .cv-header {
              text-align: center;
              margin-bottom: 20px;
              padding-bottom: 15px;
              border-bottom: 2px solid ${exportSettings.colorMode === 'color' ? '#667eea' : '#333'};
            }
            
            .full-name {
              font-size: ${exportSettings.fontSize === 'small' ? '18pt' : exportSettings.fontSize === 'large' ? '24pt' : '20pt'};
              font-weight: bold;
              margin: 0 0 10px 0;
              color: ${exportSettings.colorMode === 'color' ? '#667eea' : '#000'};
            }
            
            .contact-info {
              font-size: ${exportSettings.fontSize === 'small' ? '9pt' : exportSettings.fontSize === 'large' ? '12pt' : '10pt'};
              margin-bottom: 5px;
            }
            
            .section-title {
              font-size: ${exportSettings.fontSize === 'small' ? '12pt' : exportSettings.fontSize === 'large' ? '16pt' : '14pt'};
              font-weight: bold;
              margin: 20px 0 10px 0;
              padding-bottom: 5px;
              border-bottom: 1px solid ${exportSettings.colorMode === 'color' ? '#667eea' : '#333'};
              color: ${exportSettings.colorMode === 'color' ? '#667eea' : '#000'};
            }
            
            .cv-section {
              margin-bottom: 20px;
            }
            
            .experience-item, .education-item, .project-item {
              margin-bottom: 15px;
            }
            
            .job-title, .degree, .project-title {
              font-weight: bold;
              margin-bottom: 3px;
            }
            
            .company-name, .institution {
              font-style: italic;
              margin-bottom: 5px;
            }
            
            .date-range {
              float: right;
              font-weight: normal;
              color: #666;
            }
            
            .skills-list {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
            }
            
            .skill-item {
              background: ${exportSettings.colorMode === 'color' ? '#f0f9ff' : '#f5f5f5'};
              padding: 5px 10px;
              border-radius: 5px;
              border: 1px solid ${exportSettings.colorMode === 'color' ? '#667eea' : '#ccc'};
            }
            
            @media print {
              .no-print { display: none !important; }
              body { print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="cv-container">
            ${generateTemplateHTML(filteredData)}
          </div>
        </body>
      </html>
    `;
  };

  const generateFullHTML = () => {
    return generatePrintableHTML().replace(
      '<body>',
      `<body>
        <div class="no-print" style="padding: 20px; background: #f5f5f5; text-align: center; margin-bottom: 20px;">
          <h2>🎉 Your CV has been exported successfully!</h2>
          <p>Generated by KwickCV - Professional CV Builder</p>
        </div>`
    );
  };

  const generateTemplateHTML = (data) => {
    return `
      <div class="cv-header">
        <h1 class="full-name">${data.generalInfo.name || ''}</h1>
        <div class="contact-info">
          ${data.generalInfo.email ? `📧 ${data.generalInfo.email}` : ''}
          ${data.generalInfo.phone ? ` • 📞 ${data.generalInfo.phone}` : ''}
          ${data.generalInfo.location ? ` • 📍 ${data.generalInfo.location}` : ''}
        </div>
        <div class="contact-info">
          ${data.generalInfo.website ? `🌐 ${data.generalInfo.website}` : ''}
          ${data.generalInfo.linkedin ? ` • 💼 ${data.generalInfo.linkedin}` : ''}
          ${data.generalInfo.github ? ` • 💻 ${data.generalInfo.github}` : ''}
        </div>
      </div>

      ${data.generalInfo.summary && exportSettings.sections.summary ? `
        <div class="cv-section">
          <h2 class="section-title">Professional Summary</h2>
          <p>${data.generalInfo.summary}</p>
        </div>
      ` : ''}

      ${data.experience.length > 0 && exportSettings.sections.experience ? `
        <div class="cv-section">
          <h2 class="section-title">Experience</h2>
          ${data.experience.map(exp => `
            <div class="experience-item">
              <h3 class="job-title">${exp.jobTitle} <span class="date-range">${exp.startDate} - ${exp.endDate || 'Present'}</span></h3>
              <p class="company-name">${exp.company}</p>
              ${exp.description ? `<p>${exp.description}</p>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.education.length > 0 && exportSettings.sections.education ? `
        <div class="cv-section">
          <h2 class="section-title">Education</h2>
          ${data.education.map(edu => `
            <div class="education-item">
              <h3 class="degree">${edu.degree} <span class="date-range">${edu.startDate} - ${edu.endDate || 'Present'}</span></h3>
              <p class="institution">${edu.institution}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.skills.length > 0 && exportSettings.sections.skills ? `
        <div class="cv-section">
          <h2 class="section-title">Skills</h2>
          <div class="skills-list">
            ${data.skills.map(skill => `<span class="skill-item">${skill.name}</span>`).join('')}
          </div>
        </div>
      ` : ''}

      ${data.projects.length > 0 && exportSettings.sections.projects ? `
        <div class="cv-section">
          <h2 class="section-title">Projects</h2>
          ${data.projects.map(project => `
            <div class="project-item">
              <h3 class="project-title">${project.name}</h3>
              ${project.description ? `<p>${project.description}</p>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;
  };

  return (
    <div style={{
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '0'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '30px',
          borderRadius: '20px 20px 0 0',
          color: 'white',
          position: 'relative'
        }}>
          <button
            onClick={() => onExport(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseOut={(e) => e.target.style.background = 'none'}
          >
            ×
          </button>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '28px', fontWeight: '700' }}>
            🚀 Enhanced Export Options
          </h2>
          <p style={{ margin: '0', opacity: '0.9', fontSize: '16px' }}>
            Customize your CV export with advanced options
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: '30px' }}>
          {/* Export Format Selection */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#1a202c', fontSize: '18px', fontWeight: '600' }}>
              📄 Export Format
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              {exportFormats.map(format => (
                <div
                  key={format.id}
                  onClick={() => handleSettingChange('format', format.id)}
                  style={{
                    padding: '15px',
                    border: `2px solid ${exportSettings.format === format.id ? '#667eea' : '#e2e8f0'}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    background: exportSettings.format === format.id ? '#f0f9ff' : 'white',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{format.icon}</div>
                  <div style={{ fontWeight: '600', marginBottom: '4px', color: '#1a202c' }}>{format.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{format.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Paper Settings */}
          {exportSettings.format === 'pdf' && (
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#1a202c', fontSize: '18px', fontWeight: '600' }}>
                📏 Paper Settings
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                    Paper Size
                  </label>
                  <select
                    value={exportSettings.paperSize}
                    onChange={(e) => handleSettingChange('paperSize', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  >
                    {paperSizes.map(size => (
                      <option key={size.id} value={size.id}>{size.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                    Orientation
                  </label>
                  <select
                    value={exportSettings.orientation}
                    onChange={(e) => handleSettingChange('orientation', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Styling Options */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#1a202c', fontSize: '18px', fontWeight: '600' }}>
              🎨 Styling Options
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                  Font Size
                </label>
                <select
                  value={exportSettings.fontSize}
                  onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                >
                  {fontSizes.map(size => (
                    <option key={size.id} value={size.id}>{size.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                  Color Mode
                </label>
                <select
                  value={exportSettings.colorMode}
                  onChange={(e) => handleSettingChange('colorMode', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                >
                  <option value="color">Full Color</option>
                  <option value="grayscale">Grayscale</option>
                  <option value="blackwhite">Black & White</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                  Margins
                </label>
                <select
                  value={exportSettings.margins}
                  onChange={(e) => handleSettingChange('margins', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                >
                  <option value="narrow">Narrow (0.5in)</option>
                  <option value="normal">Normal (1in)</option>
                  <option value="wide">Wide (1.5in)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section Selection */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#1a202c', fontSize: '18px', fontWeight: '600' }}>
              📋 Include Sections
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {Object.entries(exportSettings.sections).map(([section, enabled]) => (
                <label
                  key={section}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px',
                    background: enabled ? '#f0f9ff' : '#f9fafb',
                    border: `1px solid ${enabled ? '#667eea' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => handleSectionToggle(section)}
                    style={{ margin: '0' }}
                  />
                  <span style={{ fontWeight: '500', color: '#374151', textTransform: 'capitalize' }}>
                    {section.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Export Button */}
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => onExport(null)}
              style={{
                padding: '12px 24px',
                background: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                color: '#374151',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              style={{
                padding: '12px 32px',
                background: isExporting ? '#9ca3af' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontWeight: '600',
                cursor: isExporting ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {isExporting ? (
                <>
                  <span style={{ animation: 'spin 1s linear infinite' }}>🔄</span>
                  Exporting...
                </>
              ) : (
                <>
                  🚀 Export {exportSettings.format.toUpperCase()}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Add spinning animation */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default ExportOptions;
