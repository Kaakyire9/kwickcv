import React, { createContext, useContext, useState, useEffect } from 'react';

const CollaborationContext = createContext();

export const useCollaboration = () => {
  const context = useContext(CollaborationContext);
  if (!context) {
    throw new Error('useCollaboration must be used within a CollaborationProvider');
  }
  return context;
};

export const CollaborationProvider = ({ children }) => {
  const [isCollaborationActive, setIsCollaborationActive] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [sessionCode, setSessionCode] = useState('');
  const [collaborators, setCollaborators] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [liveChanges, setLiveChanges] = useState([]);
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [commentsSection, setCommentsSection] = useState('');
  const [sharedCVData, setSharedCVData] = useState(null);
  const [pendingChanges, setPendingChanges] = useState({});
  const [editingFields, setEditingFields] = useState({});

  // Mock real-time updates
  useEffect(() => {
    if (isCollaborationActive) {
      const interval = setInterval(() => {
        // Simulate random activity
        if (collaborators.length > 1 && Math.random() > 0.7) {
          const randomCollaborator = collaborators[Math.floor(Math.random() * collaborators.length)];
          const sections = ['Personal Info', 'Skills', 'Experience', 'Education'];
          const actions = ['viewed', 'edited', 'commented on'];
          const randomSection = sections[Math.floor(Math.random() * sections.length)];
          const randomAction = actions[Math.floor(Math.random() * actions.length)];
          
          addActivity(randomAction, randomSection, randomCollaborator);
        }
      }, 10000); // Every 10 seconds

      return () => clearInterval(interval);
    }
  }, [isCollaborationActive, collaborators]);

  const generateSessionCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const startCollaboration = (user) => {
    console.log('startCollaboration called with user:', user);
    const code = generateSessionCode();
    console.log('Generated code:', code);
    setSessionCode(code);
    setSessionId(`session_${Date.now()}`);
    setIsCollaborationActive(true);
    setCurrentUser({ ...user, isOwner: true });
    setCollaborators([{ ...user, isOwner: true }]);
    addActivity('started', 'collaboration session', user);
    console.log('Collaboration started, returning code:', code);
    return code;
  };

  const joinCollaboration = (code, user) => {
    setSessionCode(code);
    setSessionId(`session_${code}`);
    setIsCollaborationActive(true);
    setCurrentUser({ ...user, isOwner: false });
    
    // Simulate adding to existing collaborators
    const mockOwner = {
      id: 'owner_1',
      name: 'CV Owner',
      email: 'owner@example.com',
      color: '#3B82F6',
      isOwner: true,
      joinedAt: new Date(Date.now() - 600000).toISOString()
    };
    
    setCollaborators([mockOwner, { ...user, isOwner: false }]);
    addActivity('joined', 'collaboration session', user);
  };

  const endCollaboration = () => {
    setIsCollaborationActive(false);
    setSessionId('');
    setSessionCode('');
    setCollaborators([]);
    setRecentActivity([]);
    setLiveChanges([]);
    setComments({});
    setShowComments(false);
    setSharedCVData(null);
    setPendingChanges({});
    setEditingFields({});
  };

  const addCollaborator = (user) => {
    setCollaborators(prev => [...prev, user]);
    addActivity('joined', 'collaboration session', user);
  };

  const removeCollaborator = (userId) => {
    setCollaborators(prev => prev.filter(c => c.id !== userId));
  };

  const addActivity = (action, target, user = currentUser) => {
    const activity = {
      id: Date.now() + Math.random(),
      user: user.name,
      userColor: user.color,
      action,
      target,
      timestamp: new Date().toISOString()
    };
    
    setRecentActivity(prev => [activity, ...prev.slice(0, 19)]);
  };

  const addLiveChange = (section, field, user = currentUser) => {
    const change = {
      id: Date.now(),
      user,
      section,
      field,
      timestamp: new Date().toISOString()
    };
    
    setLiveChanges(prev => [change, ...prev.slice(0, 4)]);
    
    // Remove after 3 seconds
    setTimeout(() => {
      setLiveChanges(prev => prev.filter(c => c.id !== change.id));
    }, 3000);
  };

  const addComment = (section, text, user = currentUser) => {
    const comment = {
      id: Date.now(),
      user,
      text,
      timestamp: new Date().toISOString(),
      resolved: false
    };
    
    setComments(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), comment]
    }));
    
    addActivity('commented on', section, user);
  };

  const toggleCommentResolved = (section, commentId) => {
    setComments(prev => ({
      ...prev,
      [section]: prev[section]?.map(comment =>
        comment.id === commentId
          ? { ...comment, resolved: !comment.resolved }
          : comment
      ) || []
    }));
  };

  const openComments = (section) => {
    setCommentsSection(section);
    setShowComments(true);
  };

  const closeComments = () => {
    setShowComments(false);
    setCommentsSection('');
  };

  const getUnresolvedCommentsCount = (section) => {
    return comments[section]?.filter(c => !c.resolved).length || 0;
  };

  // Real-time CV data synchronization
  const updateSharedCVData = (section, field, value, user = currentUser) => {
    if (!isCollaborationActive) return;
    
    const change = {
      id: Date.now(),
      user,
      section,
      field,
      value,
      timestamp: new Date().toISOString()
    };
    
    // Add to pending changes
    setPendingChanges(prev => ({
      ...prev,
      [`${section}.${field}`]: change
    }));
    
    // Simulate real-time sync (in production, this would be WebSocket)
    setTimeout(() => {
      setSharedCVData(prev => ({
        ...prev,
        [section]: {
          ...prev?.[section],
          [field]: value
        }
      }));
      
      // Remove from pending
      setPendingChanges(prev => {
        const newPending = { ...prev };
        delete newPending[`${section}.${field}`];
        return newPending;
      });
      
      addActivity('updated', `${section} - ${field}`, user);
    }, 500);
  };

  const setFieldEditing = (section, field, user = currentUser) => {
    if (!isCollaborationActive) return;
    
    const key = `${section}.${field}`;
    setEditingFields(prev => ({
      ...prev,
      [key]: {
        user,
        timestamp: new Date().toISOString()
      }
    }));
    
    addLiveChange(section, field, user);
    
    // Auto-clear after 10 seconds of inactivity
    setTimeout(() => {
      setEditingFields(prev => {
        const newEditing = { ...prev };
        if (newEditing[key]?.user?.id === user.id) {
          delete newEditing[key];
        }
        return newEditing;
      });
    }, 10000);
  };

  const clearFieldEditing = (section, field, user = currentUser) => {
    const key = `${section}.${field}`;
    setEditingFields(prev => {
      const newEditing = { ...prev };
      if (newEditing[key]?.user?.id === user.id) {
        delete newEditing[key];
      }
      return newEditing;
    });
  };

  const getFieldEditor = (section, field) => {
    const key = `${section}.${field}`;
    return editingFields[key]?.user;
  };

  const isFieldBeingEdited = (section, field) => {
    const key = `${section}.${field}`;
    const editing = editingFields[key];
    if (!editing) return false;
    
    // Check if it's not the current user and is recent (within 10 seconds)
    const isRecent = new Date() - new Date(editing.timestamp) < 10000;
    const isOtherUser = editing.user.id !== currentUser?.id;
    
    return isRecent && isOtherUser;
  };

  const value = {
    // State
    isCollaborationActive,
    sessionId,
    sessionCode,
    collaborators,
    currentUser,
    recentActivity,
    liveChanges,
    comments,
    showComments,
    commentsSection,
    sharedCVData,
    pendingChanges,
    editingFields,
    
    // Actions
    startCollaboration,
    joinCollaboration,
    endCollaboration,
    addCollaborator,
    removeCollaborator,
    addActivity,
    addLiveChange,
    addComment,
    toggleCommentResolved,
    openComments,
    closeComments,
    getUnresolvedCommentsCount,
    
    // Real-time collaboration
    updateSharedCVData,
    setFieldEditing,
    clearFieldEditing,
    getFieldEditor,
    isFieldBeingEdited
  };

  return (
    <CollaborationContext.Provider value={value}>
      {children}
    </CollaborationContext.Provider>
  );
};

export default CollaborationContext;
