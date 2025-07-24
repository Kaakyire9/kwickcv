import React, { useState } from 'react';

function AISuggestions() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
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
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontSize: '28px',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-4px)';
            e.target.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.6)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.4)';
          }}
        >
          🤖
        </button>
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
              <span style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>
                78%
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
                  width: '78%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                  borderRadius: '4px',
                }}
              ></div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <span style={{ color: '#10b981', fontWeight: '600', fontSize: '14px' }}>
                Good Progress!
              </span>
            </div>
          </div>

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

            {/* Suggestion Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  background: '#f8fafc',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>📝</span>
                  <div>
                    <div
                      style={{
                        fontWeight: '600',
                        color: '#1a202c',
                        marginBottom: '4px',
                        fontSize: '14px',
                      }}
                    >
                      Add Professional Summary
                    </div>
                    <div style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.4' }}>
                      Include a compelling 2-3 sentence summary highlighting your key skills and experience.
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: '#f8fafc',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>🎯</span>
                  <div>
                    <div
                      style={{
                        fontWeight: '600',
                        color: '#1a202c',
                        marginBottom: '4px',
                        fontSize: '14px',
                      }}
                    >
                      Quantify Achievements
                    </div>
                    <div style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.4' }}>
                      Use numbers and percentages to showcase your impact and results.
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: '#f8fafc',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>⭐</span>
                  <div>
                    <div
                      style={{
                        fontWeight: '600',
                        color: '#1a202c',
                        marginBottom: '4px',
                        fontSize: '14px',
                      }}
                    >
                      Add More Skills
                    </div>
                    <div style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.4' }}>
                      Include both technical and soft skills relevant to your target role.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              style={{
                width: '100%',
                padding: '12px 16px',
                marginTop: '20px',
                background: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                color: '#374151',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px',
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#f9fafb';
                e.target.style.borderColor = '#9ca3af';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'white';
                e.target.style.borderColor = '#d1d5db';
              }}
            >
              🔄 Refresh Analysis
            </button>
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
        `}
      </style>
    </>
  );
}

export default AISuggestions;
