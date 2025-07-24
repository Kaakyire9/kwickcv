import React, { useState, useEffect } from 'react';
import { useCVData } from '../contexts/CVDataContext';
import { useNavigation } from '../contexts/NavigationContext';

function AISuggestions() {
  const [isOpen, setIsOpen] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { 
    generalInfo, 
    skills, 
    languages, 
    certifications, 
    experience, 
    education, 
    projects, 
    awards,
    setGeneralInfo,
    setSkills,
    setExperience
  } = useCVData();
  const { goToSection } = useNavigation();

  // AI Analysis Functions
  const analyzeCV = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      const completionScore = calculateCompletionScore();
      const suggestions = generateSmartSuggestions();
      const insights = generateInsights();
      
      setAnalysis({
        score: completionScore,
        suggestions,
        insights,
        lastAnalyzed: new Date().toLocaleTimeString()
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  const calculateCompletionScore = () => {
    let score = 0;
    let maxScore = 100;
    
    // Basic info (30 points)
    if (generalInfo.name) score += 5;
    if (generalInfo.email) score += 5;
    if (generalInfo.phone) score += 5;
    if (generalInfo.location) score += 5;
    if (generalInfo.summary) score += 10;
    
    // Professional sections (50 points)
    if (skills.length > 0) score += 10;
    if (experience.length > 0) score += 15;
    if (education.length > 0) score += 10;
    if (projects.length > 0) score += 10;
    if (certifications.length > 0) score += 5;
    
    // Additional sections (20 points)
    if (languages.length > 0) score += 5;
    if (awards.length > 0) score += 5;
    if (generalInfo.linkedin) score += 5;
    if (generalInfo.github || generalInfo.website) score += 5;
    
    return Math.min(score, maxScore);
  };

  const generateSmartSuggestions = () => {
    const suggestions = [];
    
    // Check for missing summary
    if (!generalInfo.summary) {
      suggestions.push({
        id: 'add-summary',
        icon: '📝',
        title: 'Add Professional Summary',
        description: 'A compelling summary increases your chances by 40%',
        action: 'Add Summary',
        priority: 'high',
        section: 0
      });
    }
    
    // Check for weak experience descriptions
    if (experience.length > 0) {
      const hasWeakDescriptions = experience.some(exp => 
        !exp.description || exp.description.length < 50
      );
      if (hasWeakDescriptions) {
        suggestions.push({
          id: 'improve-experience',
          icon: '🎯',
          title: 'Enhance Experience Descriptions',
          description: 'Add quantified achievements and impact metrics',
          action: 'Improve Experience',
          priority: 'high',
          section: 4
        });
      }
    }
    
    // Check for limited skills
    if (skills.length < 5) {
      suggestions.push({
        id: 'add-skills',
        icon: '⭐',
        title: 'Expand Your Skills',
        description: 'Add more relevant technical and soft skills',
        action: 'Add Skills',
        priority: 'medium',
        section: 1
      });
    }
    
    // Check for missing projects
    if (projects.length === 0) {
      suggestions.push({
        id: 'add-projects',
        icon: '🚀',
        title: 'Showcase Your Projects',
        description: 'Personal projects demonstrate initiative and skills',
        action: 'Add Projects',
        priority: 'medium',
        section: 6
      });
    }
    
    // Check for missing contact links
    if (!generalInfo.linkedin && !generalInfo.github) {
      suggestions.push({
        id: 'add-links',
        icon: '🔗',
        title: 'Add Professional Links',
        description: 'LinkedIn and GitHub profiles boost credibility',
        action: 'Add Links',
        priority: 'low',
        section: 0
      });
    }
    
    return suggestions.slice(0, 4); // Limit to 4 suggestions
  };

  const generateInsights = () => {
    const insights = [];
    
    // Industry-specific insights
    if (skills.some(skill => skill.name.toLowerCase().includes('react') || 
                           skill.name.toLowerCase().includes('javascript'))) {
      insights.push('💼 Tech Profile: Consider adding cloud platforms and testing frameworks');
    }
    
    if (experience.length > 3) {
      insights.push('🌟 Experienced Professional: Highlight leadership and mentoring experience');
    }
    
    if (certifications.length > 0) {
      insights.push('🏆 Certified Professional: Your certifications add 25% more credibility');
    }
    
    return insights;
  };

  // AI Action Functions
  const applySuggestion = (suggestion) => {
    switch (suggestion.id) {
      case 'add-summary':
        generateSummary();
        break;
      case 'improve-experience':
        enhanceExperience();
        break;
      case 'add-skills':
        suggestSkills();
        break;
      default:
        goToSection(suggestion.section);
    }
  };

  const generateSummary = () => {
    if (generalInfo.name) {
      const sampleSummary = `Passionate professional with expertise in ${skills.slice(0, 3).map(s => s.name).join(', ')}. ` +
        `${experience.length > 0 ? `${experience.length}+ years of experience` : 'Eager to contribute'} ` +
        `in delivering high-quality solutions and driving business growth.`;
      
      setGeneralInfo(prev => ({
        ...prev,
        summary: prev.summary || sampleSummary
      }));
      goToSection(0);
    }
  };

  const enhanceExperience = () => {
    if (experience.length > 0) {
      const enhancedExperience = experience.map(exp => ({
        ...exp,
        description: exp.description || `• Led cross-functional projects resulting in 20% efficiency improvement
• Collaborated with stakeholders to deliver solutions on time and within budget
• Implemented best practices that enhanced team productivity and code quality`
      }));
      setExperience(enhancedExperience);
      goToSection(4);
    }
  };

  const suggestSkills = () => {
    const suggestedSkills = [
      'Problem Solving', 'Team Collaboration', 'Communication', 
      'Project Management', 'Leadership', 'Critical Thinking'
    ];
    
    const newSkills = suggestedSkills
      .filter(skillName => !skills.some(existing => existing.name === skillName))
      .slice(0, 3)
      .map(skillName => ({ name: skillName, level: 'Intermediate' }));
    
    if (newSkills.length > 0) {
      setSkills(prev => [...prev, ...newSkills]);
      goToSection(1);
    }
  };

  // Auto-analyze when CV data changes
  useEffect(() => {
    const timer = setTimeout(() => {
      analyzeCV();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [generalInfo, skills, experience, education, projects, certifications, languages, awards]);

  const togglePanel = () => {
    setIsOpen(!isOpen);
    if (!isOpen && !analysis) {
      analyzeCV();
    }
  };

  const closePanel = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating AI Button */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
        }}
      >
        <button
          onClick={togglePanel}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            border: 'none',
            background: isAnalyzing 
              ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' 
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontSize: '28px',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            animation: isAnalyzing ? 'pulse 2s infinite' : 'none',
          }}
          onMouseOver={(e) => {
            if (!isAnalyzing) {
              e.target.style.transform = 'translateY(-4px)';
              e.target.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.6)';
            }
          }}
          onMouseOut={(e) => {
            if (!isAnalyzing) {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.4)';
            }
          }}
        >
          {isAnalyzing ? '🔄' : '🤖'}
        </button>
        
        {/* Notification Badge */}
        {analysis && analysis.suggestions.length > 0 && !isOpen && (
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#ef4444',
              color: 'white',
              fontSize: '12px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'bounce 0.5s ease-out',
            }}
          >
            {analysis.suggestions.length}
          </div>
        )}
      </div>

      {/* AI Panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '24px',
            width: '380px',
            maxHeight: '600px',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            zIndex: 9998,
            animation: 'slideUp 0.3s ease-out',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '20px',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>🤖</span>
              <span style={{ fontSize: '18px', fontWeight: '600' }}>AI Assistant</span>
            </div>
            <button
              onClick={closePanel}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '28px',
                cursor: 'pointer',
                padding: '0',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'none';
              }}
            >
              ×
            </button>
          </div>

          {/* CV Score Section */}
          <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <span style={{ fontWeight: '600', color: '#1a202c' }}>CV Completion Score</span>
              <span style={{ fontSize: '24px', fontWeight: '700', color: analysis?.score >= 80 ? '#10b981' : analysis?.score >= 60 ? '#f59e0b' : '#ef4444' }}>
                {isAnalyzing ? '...' : `${analysis?.score || 0}%`}
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: '8px',
                background: '#f1f5f9',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${analysis?.score || 0}%`,
                  height: '100%',
                  background: analysis?.score >= 80 
                    ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                    : analysis?.score >= 60
                    ? 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)'
                    : 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)',
                  borderRadius: '4px',
                  transition: 'width 0.5s ease',
                }}
              ></div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <span style={{ 
                color: analysis?.score >= 80 ? '#10b981' : analysis?.score >= 60 ? '#f59e0b' : '#ef4444', 
                fontWeight: '600', 
                fontSize: '14px' 
              }}>
                {isAnalyzing 
                  ? 'Analyzing...' 
                  : analysis?.score >= 90 
                  ? 'Excellent!'
                  : analysis?.score >= 80
                  ? 'Great Progress!'
                  : analysis?.score >= 60
                  ? 'Good Start!'
                  : 'Keep Building!'}
              </span>
              {analysis?.lastAnalyzed && (
                <div style={{ color: '#64748b', fontSize: '12px', marginTop: '4px' }}>
                  Last analyzed: {analysis.lastAnalyzed}
                </div>
              )}
            </div>
          </div>

          {/* AI Insights Section */}
          {analysis?.insights && analysis.insights.length > 0 && (
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 12px 0', color: '#1a202c', fontSize: '14px', fontWeight: '600' }}>
                🧠 AI Insights
              </h3>
              {analysis.insights.map((insight, index) => (
                <div key={index} style={{ 
                  color: '#4f46e5', 
                  fontSize: '13px', 
                  marginBottom: '8px',
                  padding: '8px 12px',
                  background: '#f0f9ff',
                  borderRadius: '8px',
                  border: '1px solid #e0f2fe'
                }}>
                  {insight}
                </div>
              ))}
            </div>
          )}

          {/* Suggestions Section */}
          <div style={{ padding: '24px' }}>
            <h3
              style={{
                margin: '0 0 20px 0',
                color: '#1a202c',
                fontSize: '16px',
                fontWeight: '600',
              }}
            >
              💡 Smart Suggestions
            </h3>

            {/* Loading State */}
            {isAnalyzing && (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 20px',
                color: '#64748b'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔄</div>
                <div>Analyzing your CV...</div>
              </div>
            )}

            {/* Suggestion Items */}
            {analysis && !isAnalyzing && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {analysis.suggestions.length > 0 ? analysis.suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    style={{
                      background: '#f8fafc',
                      padding: '16px',
                      borderRadius: '12px',
                      border: `1px solid ${suggestion.priority === 'high' ? '#fecaca' : suggestion.priority === 'medium' ? '#fef3c7' : '#e2e8f0'}`,
                      borderLeft: `4px solid ${suggestion.priority === 'high' ? '#ef4444' : suggestion.priority === 'medium' ? '#f59e0b' : '#6b7280'}`,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                      }}
                    >
                      <span style={{ fontSize: '20px' }}>{suggestion.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontWeight: '600',
                            color: '#1a202c',
                            marginBottom: '4px',
                            fontSize: '14px',
                          }}
                        >
                          {suggestion.title}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.4', marginBottom: '12px' }}>
                          {suggestion.description}
                        </div>
                        <button
                          onClick={() => applySuggestion(suggestion)}
                          style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseOver={(e) => {
                            e.target.style.transform = 'translateY(-1px)';
                            e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          {suggestion.action}
                        </button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '30px 20px',
                    color: '#10b981',
                    background: '#f0fdf4',
                    borderRadius: '12px',
                    border: '1px solid #bbf7d0'
                  }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Amazing!</div>
                    <div style={{ fontSize: '14px' }}>Your CV looks comprehensive. Keep it updated!</div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
              <button
                onClick={analyzeCV}
                disabled={isAnalyzing}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: isAnalyzing ? '#f1f5f9' : 'white',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  color: isAnalyzing ? '#9ca3af' : '#374151',
                  fontWeight: '500',
                  cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                }}
                onMouseOver={(e) => {
                  if (!isAnalyzing) {
                    e.target.style.background = '#f9fafb';
                    e.target.style.borderColor = '#9ca3af';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isAnalyzing) {
                    e.target.style.background = 'white';
                    e.target.style.borderColor = '#d1d5db';
                  }
                }}
              >
                🔄 {isAnalyzing ? 'Analyzing...' : 'Refresh Analysis'}
              </button>
              
              <button
                onClick={() => goToSection(8)} // Go to Templates section
                style={{
                  padding: '12px 16px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                📄 Export CV
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add animation styles */}
      <style>
        {`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
        `}
      </style>
    </>
  );
}

export default AISuggestions;
