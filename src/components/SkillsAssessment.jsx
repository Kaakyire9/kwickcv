import React, { useState, useEffect } from 'react';
import { useCVData } from '../contexts/CVDataContext';

function SkillsAssessment() {
  const { skills, setSkills } = useCVData();
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [assessmentProgress, setAssessmentProgress] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [completedAssessments, setCompletedAssessments] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState(null);

  // Available skill assessments
  const availableAssessments = [
    {
      id: 'javascript',
      name: 'JavaScript',
      category: 'Programming',
      duration: '15 min',
      difficulty: 'Intermediate',
      icon: '💻',
      description: 'Test your knowledge of JavaScript fundamentals, ES6+, and modern practices',
      questions: [
        {
          id: 1,
          question: 'What is the difference between let, const, and var in JavaScript?',
          type: 'multiple-choice',
          options: [
            'No difference, they are interchangeable',
            'let and const have block scope, var has function scope',
            'var is newer than let and const',
            'const can be reassigned, let cannot'
          ],
          correctAnswer: 1,
          explanation: 'let and const have block scope and are hoisted differently than var which has function scope.'
        },
        {
          id: 2,
          question: 'What will console.log(typeof null) output?',
          type: 'multiple-choice',
          options: ['null', 'undefined', 'object', 'boolean'],
          correctAnswer: 2,
          explanation: 'This is a well-known JavaScript quirk - typeof null returns "object".'
        },
        {
          id: 3,
          question: 'Which method is used to add elements to the end of an array?',
          type: 'multiple-choice',
          options: ['append()', 'push()', 'add()', 'insert()'],
          correctAnswer: 1,
          explanation: 'push() adds one or more elements to the end of an array and returns the new length.'
        },
        {
          id: 4,
          question: 'What is a closure in JavaScript?',
          type: 'multiple-choice',
          options: [
            'A way to close browser windows',
            'A function that has access to variables in its outer scope',
            'A method to end function execution',
            'A type of loop'
          ],
          correctAnswer: 1,
          explanation: 'A closure gives you access to an outer function\'s scope from an inner function.'
        },
        {
          id: 5,
          question: 'What does the spread operator (...) do?',
          type: 'multiple-choice',
          options: [
            'Creates a new object',
            'Expands iterables into individual elements',
            'Deletes array elements',
            'Converts strings to arrays'
          ],
          correctAnswer: 1,
          explanation: 'The spread operator expands iterables (arrays, strings, objects) into individual elements.'
        }
      ]
    },
    {
      id: 'react',
      name: 'React',
      category: 'Frontend Framework',
      duration: '20 min',
      difficulty: 'Advanced',
      icon: '⚛️',
      description: 'Assess your React knowledge including hooks, state management, and best practices',
      questions: [
        {
          id: 1,
          question: 'What is the purpose of useEffect hook?',
          type: 'multiple-choice',
          options: [
            'To create state variables',
            'To handle side effects in functional components',
            'To render JSX',
            'To create custom hooks'
          ],
          correctAnswer: 1,
          explanation: 'useEffect is used to handle side effects like API calls, subscriptions, and DOM manipulation.'
        },
        {
          id: 2,
          question: 'When does a React component re-render?',
          type: 'multiple-choice',
          options: [
            'Every second',
            'When state or props change',
            'Only when manually triggered',
            'When the page is refreshed'
          ],
          correctAnswer: 1,
          explanation: 'React components re-render when their state or props change.'
        },
        {
          id: 3,
          question: 'What is the virtual DOM?',
          type: 'multiple-choice',
          options: [
            'A backup of the real DOM',
            'A JavaScript representation of the real DOM',
            'A browser API',
            'A React component'
          ],
          correctAnswer: 1,
          explanation: 'The virtual DOM is a JavaScript representation of the real DOM that React uses for efficient updates.'
        }
      ]
    },
    {
      id: 'python',
      name: 'Python',
      category: 'Programming',
      duration: '18 min',
      difficulty: 'Intermediate',
      icon: '🐍',
      description: 'Test your Python programming skills, data structures, and OOP concepts',
      questions: [
        {
          id: 1,
          question: 'What is the difference between a list and a tuple in Python?',
          type: 'multiple-choice',
          options: [
            'No difference',
            'Lists are mutable, tuples are immutable',
            'Tuples are faster than lists',
            'Lists can only store numbers'
          ],
          correctAnswer: 1,
          explanation: 'Lists are mutable (can be changed) while tuples are immutable (cannot be changed after creation).'
        },
        {
          id: 2,
          question: 'What does the len() function return for a string?',
          type: 'multiple-choice',
          options: [
            'Number of words',
            'Number of characters',
            'Size in bytes',
            'Number of lines'
          ],
          correctAnswer: 1,
          explanation: 'len() returns the number of characters in a string.'
        }
      ]
    },
    {
      id: 'communication',
      name: 'Communication Skills',
      category: 'Soft Skills',
      duration: '12 min',
      difficulty: 'Beginner',
      icon: '🗣️',
      description: 'Evaluate your communication and interpersonal skills',
      questions: [
        {
          id: 1,
          question: 'What is active listening?',
          type: 'multiple-choice',
          options: [
            'Listening to music while working',
            'Fully concentrating and responding to the speaker',
            'Listening only to important parts',
            'Multitasking while someone speaks'
          ],
          correctAnswer: 1,
          explanation: 'Active listening involves fully concentrating, understanding, and responding to the speaker.'
        },
        {
          id: 2,
          question: 'In a team conflict, what should you do first?',
          type: 'multiple-choice',
          options: [
            'Take sides immediately',
            'Ignore the conflict',
            'Listen to all perspectives',
            'Report to management'
          ],
          correctAnswer: 2,
          explanation: 'Understanding all perspectives is crucial before attempting to resolve conflicts.'
        }
      ]
    }
  ];

  useEffect(() => {
    // Load completed assessments from localStorage
    const saved = localStorage.getItem('completedAssessments');
    if (saved) {
      setCompletedAssessments(JSON.parse(saved));
    }
  }, []);

  const startAssessment = (assessment) => {
    setCurrentAssessment(assessment);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setAssessmentProgress(0);
    setShowResults(false);
  };

  const answerQuestion = (answerIndex) => {
    const newAnswers = [...userAnswers, answerIndex];
    setUserAnswers(newAnswers);

    if (currentQuestion < currentAssessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAssessmentProgress(((currentQuestion + 1) / currentAssessment.questions.length) * 100);
    } else {
      // Assessment completed
      completeAssessment(newAnswers);
    }
  };

  const completeAssessment = (answers) => {
    const questions = currentAssessment.questions;
    let correctAnswers = 0;

    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctAnswers++;
      }
    });

    const percentage = Math.round((correctAnswers / questions.length) * 100);
    const level = getSkillLevel(percentage);

    const result = {
      assessmentId: currentAssessment.id,
      skillName: currentAssessment.name,
      score: percentage,
      level: level,
      correctAnswers: correctAnswers,
      totalQuestions: questions.length,
      timestamp: new Date().toISOString(),
      answers: answers
    };

    setAssessmentResult(result);
    setShowResults(true);

    // Save to completed assessments
    const newCompleted = [...completedAssessments, result];
    setCompletedAssessments(newCompleted);
    localStorage.setItem('completedAssessments', JSON.stringify(newCompleted));

    // Add/update skill in CV
    addSkillToCV(result);
  };

  const getSkillLevel = (percentage) => {
    if (percentage >= 90) return 'Expert';
    if (percentage >= 80) return 'Advanced';
    if (percentage >= 70) return 'Intermediate';
    if (percentage >= 60) return 'Beginner';
    return 'Novice';
  };

  const addSkillToCV = (result) => {
    const existingSkillIndex = skills.findIndex(skill => 
      skill.name.toLowerCase() === result.skillName.toLowerCase()
    );

    const newSkill = {
      name: result.skillName,
      level: result.level,
      verified: true,
      assessmentScore: result.score,
      assessmentDate: result.timestamp
    };

    if (existingSkillIndex >= 0) {
      // Update existing skill
      const updatedSkills = [...skills];
      updatedSkills[existingSkillIndex] = newSkill;
      setSkills(updatedSkills);
    } else {
      // Add new skill
      setSkills([...skills, newSkill]);
    }
  };

  const retakeAssessment = () => {
    setCurrentAssessment(null);
    setShowResults(false);
    setAssessmentResult(null);
  };

  const getCompletedAssessment = (assessmentId) => {
    return completedAssessments.find(completed => completed.assessmentId === assessmentId);
  };

  if (showResults && assessmentResult) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>
            {assessmentResult.score >= 80 ? '🎉' : assessmentResult.score >= 60 ? '👍' : '💪'}
          </div>
          <h2 style={{ color: '#1a202c', margin: '0 0 8px 0' }}>
            Assessment Complete!
          </h2>
          <p style={{ color: '#64748b', margin: '0' }}>
            {currentAssessment.name} Assessment Results
          </p>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
          padding: '24px',
          color: 'white',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>
                {assessmentResult.score}%
              </div>
              <div style={{ opacity: '0.9' }}>
                {assessmentResult.correctAnswers} of {assessmentResult.totalQuestions} correct
              </div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '12px 20px',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              {assessmentResult.level}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#1a202c', marginBottom: '16px' }}>
            ✅ Skill Added to Your CV
          </h3>
          <div style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '24px' }}>{currentAssessment.icon}</span>
            <div>
              <div style={{ fontWeight: '600', color: '#166534' }}>
                {assessmentResult.skillName}
              </div>
              <div style={{ color: '#16a34a', fontSize: '14px' }}>
                Level: {assessmentResult.level} (Verified)
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={retakeAssessment}
            style={{
              padding: '12px 24px',
              background: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              color: '#374151',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Take Another Assessment
          </button>
          <button
            onClick={() => setCurrentAssessment(null)}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Continue Building CV
          </button>
        </div>
      </div>
    );
  }

  if (currentAssessment) {
    const question = currentAssessment.questions[currentQuestion];
    
    return (
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '700px',
        margin: '0 auto'
      }}>
        {/* Assessment Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '32px' }}>{currentAssessment.icon}</span>
            <div>
              <h2 style={{ color: '#1a202c', margin: '0' }}>
                {currentAssessment.name} Assessment
              </h2>
              <p style={{ color: '#64748b', margin: '0', fontSize: '14px' }}>
                Question {currentQuestion + 1} of {currentAssessment.questions.length}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{
            background: '#f1f5f9',
            borderRadius: '8px',
            height: '8px',
            overflow: 'hidden'
          }}>
            <div style={{
              background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
              height: '100%',
              width: `${((currentQuestion + 1) / currentAssessment.questions.length) * 100}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Question */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            color: '#1a202c',
            fontSize: '20px',
            lineHeight: '1.5',
            marginBottom: '24px'
          }}>
            {question.question}
          </h3>

          {/* Answer Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => answerQuestion(index)}
                style={{
                  padding: '16px 20px',
                  background: 'white',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  color: '#374151',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '16px'
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.background = '#f8fafc';
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.background = 'white';
                }}
              >
                <span style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#e2e8f0',
                  color: '#64748b',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  lineHeight: '24px',
                  marginRight: '12px'
                }}>
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Assessment Info */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '12px',
          fontSize: '14px',
          color: '#64748b',
          textAlign: 'center'
        }}>
          💡 Take your time and choose the best answer. This assessment will verify your {currentAssessment.name} skills.
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ color: '#1a202c', fontSize: '28px', marginBottom: '8px' }}>
          🏆 Skills Assessment Center
        </h2>
        <p style={{ color: '#64748b', fontSize: '16px', margin: '0' }}>
          Take professional assessments to verify your skills and boost your CV credibility
        </p>
      </div>

      {/* Assessment Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {availableAssessments.map(assessment => {
          const completed = getCompletedAssessment(assessment.id);
          
          return (
            <div
              key={assessment.id}
              style={{
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px',
                background: completed ? '#f0fdf4' : 'white',
                borderColor: completed ? '#bbf7d0' : '#e2e8f0',
                position: 'relative',
                transition: 'all 0.2s ease'
              }}
            >
              {completed && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: '#10b981',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  ✓ Completed
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '40px' }}>{assessment.icon}</span>
                <div>
                  <h3 style={{ color: '#1a202c', margin: '0 0 4px 0' }}>{assessment.name}</h3>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#64748b' }}>
                    <span>📁 {assessment.category}</span>
                    <span>⏱️ {assessment.duration}</span>
                    <span>📊 {assessment.difficulty}</span>
                  </div>
                </div>
              </div>

              <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: '1.5', marginBottom: '16px' }}>
                {assessment.description}
              </p>

              {completed && (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#059669', fontWeight: '600' }}>
                      Score: {completed.score}%
                    </span>
                    <span style={{ color: '#059669', fontWeight: '600' }}>
                      Level: {completed.level}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={() => startAssessment(assessment)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: completed 
                    ? 'linear-gradient(135deg, #64748b 0%, #475569 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                {completed ? '🔄 Retake Assessment' : '🚀 Start Assessment'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Completed Skills Summary */}
      {completedAssessments.length > 0 && (
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ color: '#1a202c', marginBottom: '16px' }}>
            ✅ Your Verified Skills ({completedAssessments.length})
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {completedAssessments.map(completed => (
              <div
                key={completed.assessmentId}
                style={{
                  background: 'white',
                  border: '1px solid #d1d5db',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px'
                }}
              >
                <span>🏆</span>
                <span style={{ fontWeight: '600' }}>{completed.skillName}</span>
                <span style={{ color: '#64748b' }}>({completed.level})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SkillsAssessment;
