import { useState, useRef, useEffect } from 'react';
import { useSmartAutocomplete } from '../hooks/useAISuggestions';
import '../styles/SmartInput.css';

function SmartInput({ 
  type = 'text',
  value = '',
  onChange,
  placeholder = '',
  fieldType = '',
  className = '',
  showSuggestions = true,
  ...props 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  
  const suggestions = useSmartAutocomplete(fieldType, value);

  // Handle input changes
  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(e);
    setSelectedIndex(-1);
    setIsVisible(showSuggestions && newValue.length > 1 && suggestions.length > 0);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isVisible || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        if (selectedIndex >= 0) {
          e.preventDefault();
          selectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsVisible(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Select a suggestion
  const selectSuggestion = (suggestion) => {
    const fakeEvent = {
      target: { value: suggestion }
    };
    onChange(fakeEvent);
    setIsVisible(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Handle focus and blur
  const handleFocus = () => {
    if (showSuggestions && value.length > 1 && suggestions.length > 0) {
      setIsVisible(true);
    }
  };

  const handleBlur = () => {
    // Delay hiding to allow clicking on suggestions
    setTimeout(() => setIsVisible(false), 150);
  };

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && suggestionsRef.current) {
      const selectedElement = suggestionsRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div className="smart-input-container">
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`smart-input ${className}`}
        autoComplete="off"
        {...props}
      />
      
      {isVisible && suggestions.length > 0 && (
        <div ref={suggestionsRef} className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => selectSuggestion(suggestion)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <span className="suggestion-text">{suggestion}</span>
              {fieldType === 'skills' && (
                <span className="suggestion-type">Skill</span>
              )}
              {fieldType === 'companies' && (
                <span className="suggestion-type">Company</span>
              )}
              {fieldType === 'schools' && (
                <span className="suggestion-type">School</span>
              )}
              {fieldType === 'jobTitles' && (
                <span className="suggestion-type">Job Title</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Smart Textarea with suggestions for longer content
function SmartTextarea({ 
  value = '',
  onChange,
  placeholder = '',
  rows = 4,
  className = '',
  fieldType = '',
  showQuickTips = true,
  ...props 
}) {
  const [quickTips, setQuickTips] = useState([]);
  const textareaRef = useRef(null);

  // Generate quick tips based on content
  useEffect(() => {
    if (!showQuickTips || !value) {
      setQuickTips([]);
      return;
    }

    const tips = [];
    
    // Check for action verbs (for experience descriptions)
    if (fieldType === 'experience' && value.length > 20) {
      const actionVerbs = ['Developed', 'Led', 'Implemented', 'Managed', 'Created', 'Achieved'];
      const hasActionVerb = actionVerbs.some(verb => 
        value.toLowerCase().includes(verb.toLowerCase())
      );
      
      if (!hasActionVerb) {
        tips.push({
          type: 'tip',
          icon: '💡',
          text: 'Start bullet points with action verbs',
          examples: actionVerbs.slice(0, 3)
        });
      }
    }

    // Check for quantifiable metrics
    const hasNumbers = /\d+/.test(value);
    if (!hasNumbers && (fieldType === 'experience' || fieldType === 'summary')) {
      tips.push({
        type: 'tip',
        icon: '📊',
        text: 'Add specific numbers and metrics',
        examples: ['25% improvement', '500+ users', '$1M revenue']
      });
    }

    // Check for professional keywords
    if (fieldType === 'summary' && value.length > 50) {
      const professionalWords = ['experienced', 'skilled', 'passionate', 'results-driven'];
      const hasProfessionalTone = professionalWords.some(word => 
        value.toLowerCase().includes(word)
      );
      
      if (!hasProfessionalTone) {
        tips.push({
          type: 'tip',
          icon: '✨',
          text: 'Use professional language',
          examples: professionalWords
        });
      }
    }

    setQuickTips(tips);
  }, [value, fieldType, showQuickTips]);

  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <div className="smart-textarea-container">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        className={`smart-textarea ${className}`}
        {...props}
      />
      
      {quickTips.length > 0 && (
        <div className="quick-tips">
          {quickTips.map((tip, index) => (
            <div key={index} className="quick-tip">
              <span className="tip-icon">{tip.icon}</span>
              <div className="tip-content">
                <span className="tip-text">{tip.text}</span>
                {tip.examples && (
                  <div className="tip-examples">
                    {tip.examples.map((example, i) => (
                      <span key={i} className="tip-example">{example}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { SmartInput, SmartTextarea };
