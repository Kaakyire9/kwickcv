import React, { useState, useEffect } from 'react';
import { useCollaboration } from '../contexts/CollaborationContext';

function CollaborativeInput({ 
  section, 
  field, 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  style = {},
  disabled = false,
  multiline = false
}) {
  const {
    isCollaborationActive,
    setFieldEditing,
    clearFieldEditing,
    getFieldEditor,
    isFieldBeingEdited,
    updateSharedCVData
  } = useCollaboration();

  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const isBeingEditedByOther = isCollaborationActive && isFieldBeingEdited(section, field);
  const editor = getFieldEditor(section, field);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
    if (isCollaborationActive) {
      setFieldEditing(section, field);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (isCollaborationActive) {
      clearFieldEditing(section, field);
      if (localValue !== value) {
        updateSharedCVData(section, field, localValue);
      }
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(e);
  };

  const containerStyle = {
    position: 'relative',
    width: '100%',
    ...style
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: `2px solid ${
      isBeingEditedByOther 
        ? editor?.color || '#ef4444'
        : isFocused 
        ? '#3b82f6' 
        : '#e2e8f0'
    }`,
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s ease',
    backgroundColor: isBeingEditedByOther ? `${editor?.color}10` : 'white',
    ...(disabled && { backgroundColor: '#f8fafc', cursor: 'not-allowed' })
  };

  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div style={containerStyle}>
      <InputComponent
        type={multiline ? undefined : type}
        value={localValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled || isBeingEditedByOther}
        style={{
          ...inputStyle,
          ...(multiline && { minHeight: '100px', resize: 'vertical' })
        }}
      />
      
      {/* Real-time editing indicator */}
      {isBeingEditedByOther && editor && (
        <div style={{
          position: 'absolute',
          top: '-8px',
          left: '12px',
          backgroundColor: editor.color,
          color: 'white',
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '10px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          zIndex: 10
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            backgroundColor: 'white',
            borderRadius: '50%',
            animation: 'pulse 1s infinite'
          }} />
          {editor.name} is editing
        </div>
      )}
      
      {/* Focus indicator for collaborative sessions */}
      {isCollaborationActive && isFocused && !isBeingEditedByOther && (
        <div style={{
          position: 'absolute',
          top: '-8px',
          right: '12px',
          backgroundColor: '#10b981',
          color: 'white',
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '10px',
          fontWeight: '600',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          zIndex: 10
        }}>
          ✏️ You're editing
        </div>
      )}
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

export default CollaborativeInput;
