// AI Content Suggestions Service
// This service provides intelligent suggestions for CV content improvement

class AISuggestionsService {
  constructor() {
    // For demo purposes, we'll use predefined suggestions
    // In production, you'd integrate with OpenAI API or similar
    this.suggestions = {
      jobTitles: {
        'software engineer': [
          'Full Stack Developer',
          'Frontend Engineer',
          'Backend Developer',
          'Software Development Engineer',
          'Web Developer'
        ],
        'data analyst': [
          'Data Scientist',
          'Business Intelligence Analyst',
          'Data Engineer',
          'Analytics Specialist',
          'Reporting Analyst'
        ],
        'project manager': [
          'Program Manager',
          'Product Manager',
          'Scrum Master',
          'Technical Project Manager',
          'Agile Project Manager'
        ]
      },
      
      skills: {
        'frontend': [
          'React.js', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript',
          'HTML5', 'CSS3', 'Sass/SCSS', 'Webpack', 'Next.js',
          'Responsive Design', 'Web Accessibility', 'Performance Optimization'
        ],
        'backend': [
          'Node.js', 'Python', 'Java', 'C#', 'PHP',
          'Express.js', 'Django', 'Spring Boot', 'ASP.NET',
          'RESTful APIs', 'GraphQL', 'Microservices'
        ],
        'database': [
          'PostgreSQL', 'MySQL', 'MongoDB', 'Redis',
          'SQL Server', 'Oracle', 'Elasticsearch'
        ],
        'cloud': [
          'AWS', 'Azure', 'Google Cloud Platform',
          'Docker', 'Kubernetes', 'Serverless',
          'CI/CD', 'DevOps', 'Infrastructure as Code'
        ],
        'data': [
          'Python', 'R', 'SQL', 'Tableau', 'Power BI',
          'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow',
          'Statistical Analysis', 'Machine Learning', 'Data Visualization'
        ]
      },

      summaryTemplates: {
        'software engineer': [
          "Passionate software engineer with {years} years of experience in developing scalable web applications using modern technologies.",
          "Results-driven developer specializing in {primarySkill} with a strong background in {secondarySkill} and agile methodologies.",
          "Full-stack developer with expertise in {techStack}, committed to writing clean, efficient code and delivering exceptional user experiences."
        ],
        'data analyst': [
          "Detail-oriented data analyst with {years} years of experience transforming complex datasets into actionable business insights.",
          "Analytical professional skilled in {tools} with a proven track record of improving business outcomes through data-driven decision making.",
          "Data enthusiast passionate about uncovering trends and patterns to drive strategic business decisions and operational efficiency."
        ],
        'project manager': [
          "Experienced project manager with {years} years leading cross-functional teams to deliver projects on time and within budget.",
          "Strategic leader with expertise in {methodology} methodologies and a track record of successfully managing {projectTypes} projects.",
          "Results-oriented project manager skilled in stakeholder management, risk mitigation, and process optimization."
        ]
      },

      actionVerbs: [
        'Achieved', 'Analyzed', 'Built', 'Collaborated', 'Created', 'Delivered',
        'Developed', 'Enhanced', 'Executed', 'Implemented', 'Improved', 'Led',
        'Managed', 'Optimized', 'Reduced', 'Streamlined', 'Transformed', 'Utilized'
      ],

      industryKeywords: {
        'technology': [
          'agile', 'scrum', 'DevOps', 'cloud computing', 'microservices',
          'scalability', 'performance optimization', 'user experience',
          'technical leadership', 'code review', 'automated testing'
        ],
        'finance': [
          'financial modeling', 'risk assessment', 'compliance', 'audit',
          'financial analysis', 'regulatory requirements', 'forecasting',
          'budget management', 'investment analysis', 'market research'
        ],
        'healthcare': [
          'patient care', 'clinical protocols', 'healthcare compliance',
          'medical records', 'quality assurance', 'patient safety',
          'healthcare technology', 'HIPAA compliance', 'care coordination'
        ]
      }
    };
  }

  // Get suggestions for improving job descriptions
  getSummaryImprovement(currentSummary, role, experience) {
    const suggestions = [];
    
    // Check for action verbs
    const hasActionVerbs = this.actionVerbs.some(verb => 
      currentSummary.toLowerCase().includes(verb.toLowerCase())
    );
    
    if (!hasActionVerbs) {
      suggestions.push({
        type: 'improvement',
        category: 'Action Verbs',
        suggestion: 'Start sentences with strong action verbs to make your summary more impactful',
        examples: this.actionVerbs.slice(0, 5)
      });
    }

    // Check for quantifiable achievements
    const hasNumbers = /\d+/.test(currentSummary);
    if (!hasNumbers && experience > 0) {
      suggestions.push({
        type: 'improvement',
        category: 'Quantifiable Results',
        suggestion: 'Add specific numbers and metrics to demonstrate your impact',
        examples: ['5+ years of experience', '20% performance improvement', 'Led team of 8 developers']
      });
    }

    // Role-specific suggestions
    if (role && this.summaryTemplates[role.toLowerCase()]) {
      suggestions.push({
        type: 'template',
        category: 'Professional Summary Templates',
        suggestion: 'Consider using these proven summary formats for your role',
        templates: this.summaryTemplates[role.toLowerCase()]
      });
    }

    return suggestions;
  }

  // Get skill suggestions based on role
  getSkillSuggestions(currentSkills, targetRole) {
    const suggestions = [];
    const currentSkillsLower = currentSkills.map(skill => skill.toLowerCase());
    
    // Determine skill category based on role
    let relevantSkills = [];
    const roleLower = targetRole.toLowerCase();
    
    if (roleLower.includes('frontend') || roleLower.includes('react') || roleLower.includes('web')) {
      relevantSkills = this.skills.frontend;
    } else if (roleLower.includes('backend') || roleLower.includes('server') || roleLower.includes('api')) {
      relevantSkills = this.skills.backend;
    } else if (roleLower.includes('data') || roleLower.includes('analyst') || roleLower.includes('scientist')) {
      relevantSkills = this.skills.data;
    } else if (roleLower.includes('cloud') || roleLower.includes('devops')) {
      relevantSkills = this.skills.cloud;
    } else {
      // General tech skills
      relevantSkills = [...this.skills.frontend, ...this.skills.backend].slice(0, 10);
    }

    // Find missing relevant skills
    const missingSkills = relevantSkills.filter(skill => 
      !currentSkillsLower.includes(skill.toLowerCase())
    );

    if (missingSkills.length > 0) {
      suggestions.push({
        type: 'skills',
        category: 'Trending Skills',
        suggestion: `Consider adding these in-demand skills for ${targetRole}`,
        skills: missingSkills.slice(0, 8)
      });
    }

    return suggestions;
  }

  // Get job description improvements
  getJobDescriptionImprovement(description, role) {
    const suggestions = [];
    
    // Check for action verbs at start of bullet points
    const lines = description.split('\n').filter(line => line.trim());
    const bulletPoints = lines.filter(line => line.trim().startsWith('•') || line.trim().startsWith('-'));
    
    if (bulletPoints.length > 0) {
      const weakStarts = bulletPoints.filter(point => {
        const firstWord = point.replace(/^[•\-\s]+/, '').split(' ')[0];
        return !this.actionVerbs.includes(firstWord);
      });

      if (weakStarts.length > 0) {
        suggestions.push({
          type: 'improvement',
          category: 'Bullet Point Optimization',
          suggestion: 'Start bullet points with strong action verbs',
          examples: [
            '• Developed scalable web applications...',
            '• Led cross-functional team of 5 developers...',
            '• Implemented automated testing resulting in 40% fewer bugs...'
          ]
        });
      }
    }

    // Check for industry keywords
    if (role) {
      const industry = this.detectIndustry(role);
      if (industry && this.industryKeywords[industry]) {
        const hasKeywords = this.industryKeywords[industry].some(keyword =>
          description.toLowerCase().includes(keyword.toLowerCase())
        );

        if (!hasKeywords) {
          suggestions.push({
            type: 'keywords',
            category: 'Industry Keywords',
            suggestion: `Add relevant ${industry} industry keywords to improve ATS compatibility`,
            keywords: this.industryKeywords[industry].slice(0, 6)
          });
        }
      }
    }

    return suggestions;
  }

  // Detect industry from job role
  detectIndustry(role) {
    const roleLower = role.toLowerCase();
    
    if (roleLower.includes('developer') || roleLower.includes('engineer') || 
        roleLower.includes('programmer') || roleLower.includes('tech')) {
      return 'technology';
    } else if (roleLower.includes('finance') || roleLower.includes('accounting') || 
               roleLower.includes('analyst') || roleLower.includes('banking')) {
      return 'finance';
    } else if (roleLower.includes('nurse') || roleLower.includes('doctor') || 
               roleLower.includes('medical') || roleLower.includes('healthcare')) {
      return 'healthcare';
    }
    
    return 'technology'; // Default to technology
  }

  // Generate improvement score for overall CV
  getCVScore(cvData) {
    let score = 0;
    let maxScore = 100;
    const feedback = [];

    // Check completeness (30 points)
    if (cvData.generalInfo.name) score += 5;
    if (cvData.generalInfo.email) score += 5;
    if (cvData.generalInfo.phone) score += 5;
    if (cvData.generalInfo.summary) score += 15;

    if (score < 30) {
      feedback.push({
        category: 'Completeness',
        issue: 'Complete your basic information and add a professional summary',
        priority: 'high'
      });
    }

    // Check experience section (25 points)
    if (cvData.experience.length > 0) {
      score += 10;
      const hasDescriptions = cvData.experience.some(exp => exp.description);
      if (hasDescriptions) score += 15;
    } else {
      feedback.push({
        category: 'Experience',
        issue: 'Add your work experience with detailed descriptions',
        priority: 'high'
      });
    }

    // Check skills section (20 points)
    if (cvData.skills.length >= 5) {
      score += 20;
    } else if (cvData.skills.length > 0) {
      score += 10;
      feedback.push({
        category: 'Skills',
        issue: 'Add more relevant skills (aim for 5-10)',
        priority: 'medium'
      });
    } else {
      feedback.push({
        category: 'Skills',
        issue: 'Add your technical and professional skills',
        priority: 'high'
      });
    }

    // Check education section (15 points)
    if (cvData.education.length > 0) score += 15;

    // Check projects section (10 points)
    if (cvData.projects.length > 0) score += 10;

    return {
      score: Math.min(score, maxScore),
      grade: this.getGrade(score),
      feedback,
      strengths: this.getStrengths(cvData),
      improvements: this.getTopImprovements(score, feedback)
    };
  }

  getGrade(score) {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B+';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C+';
    if (score >= 40) return 'C';
    return 'Needs Improvement';
  }

  getStrengths(cvData) {
    const strengths = [];
    
    if (cvData.generalInfo.summary && cvData.generalInfo.summary.length > 50) {
      strengths.push('Well-written professional summary');
    }
    
    if (cvData.experience.length > 2) {
      strengths.push('Strong work experience history');
    }
    
    if (cvData.skills.length > 5) {
      strengths.push('Comprehensive skills section');
    }
    
    if (cvData.projects.length > 0) {
      strengths.push('Showcases relevant projects');
    }

    return strengths;
  }

  getTopImprovements(score, feedback) {
    const improvements = [
      'Add quantifiable achievements with specific numbers',
      'Use stronger action verbs in descriptions',
      'Include industry-relevant keywords',
      'Optimize for Applicant Tracking Systems (ATS)'
    ];

    return improvements.slice(0, 3);
  }
}

export default new AISuggestionsService();
