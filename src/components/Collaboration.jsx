import React, { useState } from 'react';
import { useCVData } from '../contexts/CVDataContext';
import { useCollaboration } from '../contexts/CollaborationContext';

function Collaboration() {
  const { generalInfo } = useCVData();
  
  console.log('Collaboration component rendered');
  
  const collaborationContext = useCollaboration();
  console.log('Collaboration context:', collaborationContext);
  
  const {
    isCollaborationActive,
    sessionCode,
    collaborators,
    currentUser,
    recentActivity,
    liveChanges,
    startCollaboration: startCollaborationContext,
    joinCollaboration: joinCollaborationContext,
    endCollaboration: endCollaborationContext,
    addActivity: addActivityContext
  } = collaborationContext;
  
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  const handleStartCollaboration = () => {
    console.log('Start collaboration clicked');
    console.log('generalInfo:', generalInfo);
    console.log('startCollaborationContext:', startCollaborationContext);
    
    try {
      const user = {
        id: `user_${Date.now()}`,
        name: generalInfo.name || 'Anonymous User',
        email: generalInfo.email || '',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
        color: '#3B82F6',
        joinedAt: new Date().toISOString()
      };
      
      console.log('Created user:', user);
      const code = startCollaborationContext(user);
      console.log('Session code:', code);
      setShowInviteModal(true);
      console.log('Invite modal should show');
    } catch (error) {
      console.error('Error starting collaboration:', error);
    }
  };

  const handleJoinSession = () => {
    if (joinCode.length === 6) {
      const user = {
        id: `user_${Date.now()}`,
        name: generalInfo.name || 'Anonymous User',
        email: generalInfo.email || '',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
        color: '#10B981',
        joinedAt: new Date().toISOString()
      };
      
      joinCollaborationContext(joinCode, user);
    }
  };

  const simulateEdit = () => {
    if (collaborators.length > 0) {
      const sections = ['Personal Info', 'Skills', 'Experience', 'Education'];
      const fields = ['Name', 'Title', 'Description', 'Details'];
      const randomSection = sections[Math.floor(Math.random() * sections.length)];
      const randomField = fields[Math.floor(Math.random() * fields.length)];
      
      addActivityContext('edited', `${randomSection} - ${randomField}`);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const copyInviteLink = () => {
    const link = `${window.location.origin}/join/${sessionCode}`;
    navigator.clipboard.writeText(link);
  };

  if (!isCollaborationActive) {
    return (
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ color: '#1a202c', fontSize: '28px', marginBottom: '8px' }}>
            🤝 Real-time Collaboration
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', margin: '0' }}>
            Work together on CVs in real-time with colleagues, mentors, or friends
          </p>
        </div>

        {/* Collaboration Options */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Start New Session */}
          <div style={{
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
            <h3 style={{ margin: '0 0 12px 0' }}>Start New Session</h3>
            <p style={{ margin: '0 0 20px 0', opacity: '0.9' }}>
              Create a new collaboration session and invite others to work on your CV
            </p>
            <button
              onClick={handleStartCollaboration}
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}
            >
              🎯 Start Collaboration
            </button>
          </div>

          {/* Join Existing Session */}
          <div style={{
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔗</div>
            <h3 style={{ margin: '0 0 12px 0' }}>Join Session</h3>
            <p style={{ margin: '0 0 20px 0', opacity: '0.9' }}>
              Enter a session code to join an existing collaboration
            </p>
            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              style={{
                width: '100%',
                padding: '12px',
                border: 'none',
                borderRadius: '8px',
                marginBottom: '12px',
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: '600',
                letterSpacing: '2px'
              }}
              maxLength={6}
            />
            <button
              onClick={handleJoinSession}
              disabled={joinCode.length !== 6}
              style={{
                width: '100%',
                padding: '12px',
                background: joinCode.length === 6 ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: joinCode.length === 6 ? 'pointer' : 'not-allowed',
                backdropFilter: 'blur(10px)',
                opacity: joinCode.length === 6 ? 1 : 0.7
              }}
            >
              🚪 Join Session
            </button>
          </div>
        </div>

        {/* Features Overview */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{ color: '#1a202c', marginBottom: '20px' }}>✨ Collaboration Features</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {[
              { icon: '👥', title: 'Multi-user Editing', desc: 'Multiple people can edit simultaneously' },
              { icon: '🔄', title: 'Real-time Sync', desc: 'Changes appear instantly for all users' },
              { icon: '💬', title: 'Live Comments', desc: 'Add comments and suggestions inline' },
              { icon: '📱', title: 'Version History', desc: 'Track all changes and revisions' },
              { icon: '🔒', title: 'Secure Sessions', desc: 'Private, encrypted collaboration' },
              { icon: '🎯', title: 'Role-based Access', desc: 'Owner and collaborator permissions' }
            ].map((feature, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{feature.icon}</div>
                <div style={{ fontWeight: '600', color: '#1a202c', marginBottom: '4px' }}>
                  {feature.title}
                </div>
                <div style={{ fontSize: '14px', color: '#64748b' }}>
                  {feature.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invite Modal */}
        {showInviteModal && (
          <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '500px',
              width: '90%'
            }}>
              <h3 style={{ color: '#1a202c', marginBottom: '16px' }}>
                📤 Invite Collaborators
              </h3>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>
                Share this session code or link with others to invite them to collaborate
              </p>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Session Code:
                </label>
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  letterSpacing: '4px'
                }}>
                  {sessionCode}
                </div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Invite Link:
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={`${window.location.origin}/join/${sessionCode}`}
                    readOnly
                    style={{
                      flex: 1,
                      padding: '12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      background: '#f8fafc'
                    }}
                  />
                  <button
                    onClick={copyInviteLink}
                    style={{
                      padding: '12px 16px',
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    📋 Copy
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowInviteModal(false)}
                  style={{
                    padding: '12px 24px',
                    background: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
      {/* Active Session Header */}
      <div style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        borderRadius: '12px',
        padding: '20px',
        color: 'white',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ margin: '0 0 4px 0' }}>🤝 Collaboration Active</h2>
            <p style={{ margin: '0', opacity: '0.9' }}>Session: {sessionCode}</p>
          </div>
          <button
            onClick={endCollaborationContext}
            style={{
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            🚪 End Session
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={() => setShowInviteModal(true)}
            style={{
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            📤 Invite Others
          </button>
          <button
            onClick={simulateEdit}
            style={{
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🎭 Simulate Edit
          </button>
        </div>
      </div>

      {/* Collaboration Mode Notice */}
      <div style={{
        background: '#f0f9ff',
        border: '2px solid #0ea5e9',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '24px' }}>🎯</div>
          <div>
            <h4 style={{ margin: '0 0 4px 0', color: '#0f172a' }}>
              Collaborative Editing Mode Active
            </h4>
            <p style={{ margin: '0', color: '#64748b', fontSize: '14px' }}>
              Navigate to any CV section to start editing together. All changes are shared in real-time with your collaborators.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Collaborators Panel */}
        <div>
          <h3 style={{ color: '#1a202c', marginBottom: '16px' }}>
            👥 Collaborators ({collaborators.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {collaborators.map(collaborator => (
              <div
                key={collaborator.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  background: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: collaborator.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  {collaborator.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', color: '#1a202c' }}>
                    {collaborator.name}
                    {collaborator.isOwner && (
                      <span style={{
                        background: '#fbbf24',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        marginLeft: '8px'
                      }}>
                        OWNER
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    Joined {formatTime(collaborator.joinedAt)}
                  </div>
                </div>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981'
                }} />
              </div>
            ))}
          </div>

          {/* How to Collaborate Guide */}
          <div style={{
            marginTop: '24px',
            background: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '8px',
            padding: '16px'
          }}>
            <h4 style={{ color: '#0f172a', marginBottom: '12px', fontSize: '14px' }}>
              🎯 How to Collaborate
            </h4>
            <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
              <div style={{ marginBottom: '8px' }}>
                • Navigate to any CV section (Personal Info, Skills, etc.)
              </div>
              <div style={{ marginBottom: '8px' }}>
                • Click on input fields to start editing
              </div>
              <div style={{ marginBottom: '8px' }}>
                • See real-time indicators when others are editing
              </div>
              <div>
                • All changes sync automatically across sessions
              </div>
            </div>
          </div>

          {/* Pending Changes */}
          {liveChanges && liveChanges.length > 0 && (
            <div style={{ marginTop: '24px' }}>
              <h4 style={{ color: '#1a202c', marginBottom: '12px' }}>
                ⚡ Live Changes
              </h4>
              {liveChanges.map(change => (
                <div
                  key={change.id}
                  style={{
                    padding: '8px 12px',
                    background: '#fef3c7',
                    border: '1px solid #fbbf24',
                    borderRadius: '6px',
                    marginBottom: '8px',
                    fontSize: '14px',
                    animation: 'pulse 1s infinite'
                  }}
                >
                  <span style={{ color: change.user.color, fontWeight: '600' }}>
                    {change.user.name}
                  </span>
                  {' '}is editing{' '}
                  <span style={{ fontWeight: '600' }}>
                    {change.section} - {change.field}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity Feed */}
        <div>
          <h3 style={{ color: '#1a202c', marginBottom: '16px' }}>
            📝 Recent Activity
          </h3>
          <div style={{
            maxHeight: '400px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {recentActivity && recentActivity.map(activity => (
              <div
                key={activity.id}
                style={{
                  padding: '12px',
                  background: '#f8fafc',
                  borderLeft: `4px solid ${activity.userColor}`,
                  borderRadius: '0 8px 8px 0',
                  fontSize: '14px'
                }}
              >
                <div>
                  <span style={{ color: activity.userColor, fontWeight: '600' }}>
                    {activity.user}
                  </span>
                  {' '}{activity.action}{' '}
                  <span style={{ fontWeight: '500' }}>{activity.target}</span>
                </div>
                <div style={{ color: '#64748b', fontSize: '12px', marginTop: '4px' }}>
                  {formatTime(activity.timestamp)}
                </div>
              </div>
            ))}
            {(!recentActivity || recentActivity.length === 0) && (
              <div style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>
                No recent activity
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Invite Modal - Also available during active collaboration */}
      {showInviteModal && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h3 style={{ color: '#1a202c', marginBottom: '16px' }}>
              📤 Invite Collaborators
            </h3>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>
              Share this session code or link with others to invite them to collaborate
            </p>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Session Code:
              </label>
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
                letterSpacing: '4px'
              }}>
                {sessionCode}
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Invite Link:
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={`${window.location.origin}/join/${sessionCode}`}
                  readOnly
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    background: '#f8fafc'
                  }}
                />
                <button
                  onClick={copyInviteLink}
                  style={{
                    padding: '12px 16px',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  📋 Copy
                </button>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowInviteModal(false)}
                style={{
                  padding: '12px 24px',
                  background: 'white',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Collaboration;
