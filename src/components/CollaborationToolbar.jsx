import React from 'react';
import { useCollaboration } from '../contexts/CollaborationContext';
import { useNavigation } from '../contexts/NavigationContext';

function CollaborationToolbar() {
  const { 
    isCollaborationActive, 
    collaborators, 
    liveChanges, 
    openComments,
    getUnresolvedCommentsCount,
    endCollaboration 
  } = useCollaboration();
  
  const { sections, currentSection } = useNavigation();

  if (!isCollaborationActive) return null;

  const currentSectionName = sections[currentSection]?.name || 'Unknown Section';
  const unresolvedComments = getUnresolvedCommentsCount(currentSectionName);

  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      right: '20px',
      background: 'white',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      zIndex: 999,
      minWidth: '280px',
      border: '2px solid #10b981'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10b981',
            animation: 'pulse 2s infinite'
          }} />
          <span style={{
            fontWeight: '600',
            color: '#10b981',
            fontSize: '14px'
          }}>
            🤝 Collaboration Active
          </span>
        </div>
        <button
          onClick={endCollaboration}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ✕
        </button>
      </div>

      {/* Collaborators */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{
          fontSize: '12px',
          color: '#64748b',
          marginBottom: '6px'
        }}>
          Online ({collaborators.length})
        </div>
        <div style={{
          display: 'flex',
          gap: '4px',
          flexWrap: 'wrap'
        }}>
          {collaborators.map(collaborator => (
            <div
              key={collaborator.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: '#f8fafc',
                padding: '4px 8px',
                borderRadius: '16px',
                fontSize: '12px'
              }}
            >
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: collaborator.color,
                color: 'white',
                fontSize: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {collaborator.name.charAt(0)}
              </div>
              {collaborator.name.split(' ')[0]}
              {collaborator.isOwner && (
                <span style={{
                  background: '#fbbf24',
                  color: 'white',
                  padding: '1px 4px',
                  borderRadius: '4px',
                  fontSize: '8px'
                }}>
                  👑
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Live Changes */}
      {liveChanges.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <div style={{
            fontSize: '12px',
            color: '#64748b',
            marginBottom: '6px'
          }}>
            ⚡ Live Changes
          </div>
          {liveChanges.slice(0, 2).map(change => (
            <div
              key={change.id}
              style={{
                background: '#fef3c7',
                padding: '6px 8px',
                borderRadius: '6px',
                fontSize: '12px',
                marginBottom: '4px',
                border: '1px solid #fbbf24'
              }}
            >
              <span style={{ color: change.user.color, fontWeight: '600' }}>
                {change.user.name.split(' ')[0]}
              </span>
              {' '}editing {change.field}
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div style={{
        display: 'flex',
        gap: '8px'
      }}>
        <button
          onClick={() => openComments(currentSectionName)}
          style={{
            flex: 1,
            padding: '8px 12px',
            background: unresolvedComments > 0 ? '#ef4444' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '12px',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          💬 Comments
          {unresolvedComments > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#dc2626',
              color: 'white',
              borderRadius: '50%',
              width: '16px',
              height: '16px',
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {unresolvedComments}
            </span>
          )}
        </button>
        
        <button
          onClick={() => {
            const link = `${window.location.origin}/join/${collaborators[0]?.sessionCode || 'ABC123'}`;
            navigator.clipboard.writeText(link);
          }}
          style={{
            padding: '8px 12px',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          📤 Invite
        </button>
      </div>
    </div>
  );
}

export default CollaborationToolbar;
