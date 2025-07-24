import React, { useState, useEffect } from 'react';
import { useCollaboration } from '../contexts/CollaborationContext';

function CollaborationComments() {
  const { 
    showComments, 
    commentsSection, 
    comments, 
    closeComments, 
    addComment: addCommentToContext, 
    toggleCommentResolved,
    currentUser 
  } = useCollaboration();
  
  const [newComment, setNewComment] = useState('');

  // Mock comments for demo
  useEffect(() => {
    if (commentsSection && showComments && !comments[commentsSection]) {
      // Add some mock comments for demo
      const mockComments = [
        {
          id: 1,
          user: { name: 'Sarah Wilson', color: '#10B981', avatar: '👩‍💼' },
          text: 'Consider adding more specific achievements here. Numbers and metrics would make this stronger.',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          resolved: false
        },
        {
          id: 2,
          user: { name: 'Mike Chen', color: '#F59E0B', avatar: '👨‍💻' },
          text: 'Great improvement! The formatting looks much cleaner now.',
          timestamp: new Date(Date.now() - 180000).toISOString(),
          resolved: true
        }
      ];
      
      // Add mock comments using the context
      mockComments.forEach(comment => {
        addCommentToContext(commentsSection, comment.text, comment.user);
      });
    }
  }, [commentsSection, showComments]);

  const addComment = () => {
    if (newComment.trim() && currentUser) {
      addCommentToContext(commentsSection, newComment.trim(), currentUser);
      setNewComment('');
    }
  };

  const handleToggleResolved = (commentId) => {
    toggleCommentResolved(commentsSection, commentId);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  if (!showComments || !currentUser) return null;

  const sectionComments = comments[commentsSection] || [];

  return (
    <div style={{
      position: 'fixed',
      top: '0',
      right: '0',
      width: '400px',
      height: '100%',
      background: 'white',
      boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #e2e8f0',
        background: '#f8fafc'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: '0', color: '#1a202c' }}>
            💬 Comments - {commentsSection}
          </h3>
          <button
            onClick={closeComments}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px'
      }}>
        {sectionComments.map(comment => (
          <div
            key={comment.id}
            style={{
              marginBottom: '16px',
              padding: '16px',
              background: comment.resolved ? '#f0fdf4' : '#fff',
              border: `1px solid ${comment.resolved ? '#bbf7d0' : '#e2e8f0'}`,
              borderRadius: '12px',
              borderLeft: `4px solid ${comment.user.color}`
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <span style={{ fontSize: '20px' }}>{comment.user.avatar}</span>
              <div>
                <div style={{
                  fontWeight: '600',
                  color: comment.user.color,
                  fontSize: '14px'
                }}>
                  {comment.user.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#64748b'
                }}>
                  {formatTime(comment.timestamp)}
                </div>
              </div>
              {comment.resolved && (
                <span style={{
                  background: '#10b981',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: '600',
                  marginLeft: 'auto'
                }}>
                  ✓ RESOLVED
                </span>
              )}
            </div>
            
            <p style={{
              margin: '0 0 12px 0',
              color: '#374151',
              lineHeight: '1.5'
            }}>
              {comment.text}
            </p>
            
            <button
              onClick={() => handleToggleResolved(comment.id)}
              style={{
                padding: '4px 8px',
                background: comment.resolved ? '#fbbf24' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              {comment.resolved ? '↩️ Reopen' : '✅ Resolve'}
            </button>
          </div>
        ))}
        
        {sectionComments.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: '#64748b',
            marginTop: '40px'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💭</div>
            <p>No comments yet for this section.</p>
            <p>Add the first comment below!</p>
          </div>
        )}
      </div>

      {/* Add Comment */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid #e2e8f0',
        background: '#f8fafc'
      }}>
        <div style={{ marginBottom: '12px' }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment or suggestion..."
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '12px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              resize: 'vertical',
              fontSize: '14px'
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                addComment();
              }
            }}
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            Ctrl+Enter to send
          </span>
          <button
            onClick={addComment}
            disabled={!newComment.trim()}
            style={{
              padding: '8px 16px',
              background: newComment.trim() ? '#3b82f6' : '#e2e8f0',
              color: newComment.trim() ? 'white' : '#9ca3af',
              border: 'none',
              borderRadius: '6px',
              cursor: newComment.trim() ? 'pointer' : 'not-allowed',
              fontWeight: '500'
            }}
          >
            💬 Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CollaborationComments;
