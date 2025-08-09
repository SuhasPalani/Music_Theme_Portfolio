// src/services/smartFallbackService.js
import { resumeData } from "../data/resumeData";

export class SmartFallbackService {
  constructor() {
    this.context = this.buildContext();
    this.intentPatterns = this.buildIntentPatterns();
  }

  buildContext() {
    return {
      personalInfo: resumeData.personalInfo,
      education: resumeData.education,
      experience: resumeData.experience,
      skills: resumeData.skills,
      projects: resumeData.projects,
      achievements: resumeData.achievements,
      interests: resumeData.interests
    };
  }

  buildIntentPatterns() {
    return {
      // Education intents
      masters: {
        keywords: ['masters', 'master', 'ms', 'graduate', 'grad school', 'graduate school'],
        entities: ['college', 'university', 'school', 'institution'],
        questions: ['which', 'what', 'where', 'when']
      },
      bachelors: {
        keywords: ['bachelors', 'bachelor', 'undergraduate', 'undergrad', 'ug'],
        entities: ['college', 'university', 'school', 'institution'],
        questions: ['which', 'what', 'where', 'when']
      },
      gpa: {
        keywords: ['gpa', 'grade', 'grades', 'cgpa', 'academic performance', 'marks'],
        entities: ['score', 'percentage', 'performance'],
        questions: ['what', 'how much', 'tell me']
      },
      
      // Experience intents
      experience: {
        keywords: ['experience', 'work', 'job', 'internship', 'employment', 'worked'],
        entities: ['company', 'role', 'position', 'responsibilities'],
        questions: ['what', 'where', 'when', 'tell me about']
      },
      currentJob: {
        keywords: ['current', 'recent', 'latest', 'now', 'present'],
        entities: ['job', 'work', 'position', 'role', 'company'],
        questions: ['what', 'where']
      },
      
      // Skills intents
      skills: {
        keywords: ['skills', 'technologies', 'tech stack', 'programming', 'languages', 'frameworks'],
        entities: ['technical', 'programming', 'development'],
        questions: ['what', 'which', 'tell me about']
      },
      
      // Project intents - dynamic based on project names
      projects: {
        keywords: ['project', 'projects', 'portfolio', 'built', 'developed', 'worked on'],
        entities: ['app', 'application', 'system', 'platform'],
        questions: ['what', 'which', 'tell me about']
      },
      
      // Contact intents
      contact: {
        keywords: ['contact', 'reach', 'email', 'phone', 'linkedin', 'github'],
        entities: ['information', 'details'],
        questions: ['how', 'what', 'where']
      }
    };
  }

  extractIntent(message) {
    const lowerMessage = message.toLowerCase();
    const words = lowerMessage.split(/\s+/);
    
    // Extract entities (specific things mentioned)
    const entities = this.extractEntities(lowerMessage, words);
    
    // Extract question type
    const questionType = this.extractQuestionType(lowerMessage, words);
    
    // Find best matching intent
    const intent = this.findBestIntent(lowerMessage, words, entities);
    
    return {
      intent,
      entities,
      questionType,
      originalMessage: message,
      confidence: this.calculateConfidence(lowerMessage, intent, entities)
    };
  }

  extractEntities(message, words) {
    const entities = {
      projects: [],
      companies: [],
      technologies: [],
      timeframes: [],
      degrees: [],
      institutions: []
    };

    // Extract project names dynamically
    this.context.projects.forEach(project => {
      const projectKeywords = project.name.toLowerCase().split(/[\s-_]+/);
      if (projectKeywords.some(keyword => message.includes(keyword.toLowerCase()))) {
        entities.projects.push(project.name);
      }
    });

    // Extract company names
    this.context.experience.forEach(exp => {
      if (message.includes(exp.company.toLowerCase())) {
        entities.companies.push(exp.company);
      }
    });

    // Extract technologies mentioned
    const allTechs = [
      ...this.context.skills.programmingLanguages,
      ...this.context.skills.frameworks,
      ...this.context.skills.databases,
      ...this.context.skills.cloudAndDevOps
    ];
    
    allTechs.forEach(tech => {
      if (message.includes(tech.toLowerCase())) {
        entities.technologies.push(tech);
      }
    });

    // Extract degree types
    if (message.includes('master') || message.includes('ms')) {
      entities.degrees.push('masters');
    }
    if (message.includes('bachelor') || message.includes('undergrad')) {
      entities.degrees.push('bachelors');
    }

    // Extract institutions
    this.context.education.forEach(edu => {
      const instWords = edu.institution.toLowerCase().split(/\s+/);
      if (instWords.some(word => message.includes(word) && word.length > 3)) {
        entities.institutions.push(edu.institution);
      }
    });

    return entities;
  }

  extractQuestionType(message, words) {
    const questionWords = {
      'what': ['what', 'which'],
      'where': ['where'],
      'when': ['when'],
      'how': ['how'],
      'why': ['why'],
      'tell': ['tell', 'describe', 'explain']
    };

    for (const [type, keywords] of Object.entries(questionWords)) {
      if (keywords.some(keyword => words.includes(keyword))) {
        return type;
      }
    }
    return 'general';
  }

  findBestIntent(message, words, entities) {
    let bestIntent = 'general';
    let maxScore = 0;

    for (const [intentName, pattern] of Object.entries(this.intentPatterns)) {
      let score = 0;
      
      // Score based on keyword matches
      pattern.keywords.forEach(keyword => {
        if (message.includes(keyword)) {
          score += 2;
        }
      });
      
      // Score based on entity matches
      pattern.entities.forEach(entity => {
        if (message.includes(entity)) {
          score += 1;
        }
      });
      
      // Bonus for specific entities
      if (entities.projects.length > 0 && intentName === 'projects') score += 3;
      if (entities.companies.length > 0 && intentName === 'experience') score += 3;
      if (entities.degrees.length > 0 && (intentName === 'masters' || intentName === 'bachelors')) score += 3;
      if (entities.technologies.length > 0 && intentName === 'skills') score += 2;

      if (score > maxScore) {
        maxScore = score;
        bestIntent = intentName;
      }
    }

    return bestIntent;
  }

  calculateConfidence(message, intent, entities) {
    // Simple confidence calculation based on entity extraction and keyword matches
    let confidence = 0.3; // Base confidence
    
    if (Object.values(entities).some(arr => arr.length > 0)) {
      confidence += 0.4; // Bonus for entity extraction
    }
    
    if (intent !== 'general') {
      confidence += 0.3; // Bonus for specific intent recognition
    }
    
    return Math.min(confidence, 1.0);
  }

  generateResponse(userMessage) {
    const analysis = this.extractIntent(userMessage);
    
    console.log('Intent Analysis:', analysis); // Debug log
    
    return this.generateContextualResponse(analysis);
  }

  generateContextualResponse(analysis) {
    const { intent, entities, questionType, confidence } = analysis;

    // Handle specific project questions
    if (entities.projects.length > 0) {
      return this.generateProjectResponse(entities.projects[0], questionType);
    }

    // Handle specific company/experience questions
    if (entities.companies.length > 0) {
      return this.generateExperienceResponse(entities.companies[0], questionType);
    }

    // Handle education with specific degree
    if (entities.degrees.includes('masters')) {
      return this.generateMastersResponse(questionType);
    }
    if (entities.degrees.includes('bachelors')) {
      return this.generateBachelorsResponse(questionType);
    }

    // Handle technology-specific questions
    if (entities.technologies.length > 0) {
      return this.generateTechnologyResponse(entities.technologies, questionType);
    }

    // Handle general intents
    switch (intent) {
      case 'gpa':
        return this.generateGPAResponse(questionType);
      case 'skills':
        return this.generateSkillsResponse(questionType);
      case 'experience':
        return this.generateGeneralExperienceResponse(questionType);
      case 'contact':
        return this.generateContactResponse(questionType);
      case 'projects':
        return this.generateProjectsOverviewResponse(questionType);
      default:
        return this.generateDefaultResponse(analysis);
    }
  }

  generateProjectResponse(projectName, questionType) {
    const project = this.context.projects.find(p => 
      p.name.toLowerCase().includes(projectName.toLowerCase()) ||
      projectName.toLowerCase().includes(p.name.toLowerCase())
    );

    if (!project) {
      return `I don't have detailed information about "${projectName}". Here are Suhas's main projects: ${this.context.projects.map(p => p.name).join(', ')}. Feel free to ask about any of these!`;
    }

    return `🚀 **${project.name}**

**Timeline:** ${project.duration}
**Category:** ${project.category.join(', ')}

**Technologies:** ${project.technologies.join(', ')}

**Description:** ${project.description}

**Key Achievements:**
${project.achievements.map(achievement => `✅ ${achievement}`).join('\n')}

Would you like more details about any specific aspect of this project?`;
  }

  generateMastersResponse(questionType) {
    const masters = this.context.education.find(edu => edu.degree.includes('Master'));
    
    if (questionType === 'where' || questionType === 'which') {
      return `🎓 **Suhas is pursuing his Master's degree at ${masters.institution}** in ${masters.location}.`;
    }
    
    return `🎓 **Master's Degree Information:**

**${masters.degree}**
🏫 ${masters.institution}
📍 ${masters.location}
⏰ ${masters.duration}
📊 GPA: ${masters.gpa}
🎯 Status: ${masters.status}

Currently pursuing advanced computer science studies with expected graduation in May 2025.`;
  }

  generateBachelorsResponse(questionType) {
    const bachelors = this.context.education.find(edu => edu.degree.includes('Bachelor'));
    
    if (questionType === 'where' || questionType === 'which') {
      return `🎓 **Suhas completed his Bachelor's degree at ${bachelors.institution}** in ${bachelors.location}.`;
    }
    
    return `🎓 **Bachelor's Degree Information:**

**${bachelors.degree}**
🏫 ${bachelors.institution}
📍 ${bachelors.location}
⏰ ${bachelors.duration}
📊 GPA: ${bachelors.gpa}
🎯 Status: ${bachelors.status}

Strong foundation in computer science fundamentals with excellent academic performance.`;
  }

  generateGPAResponse(questionType) {
    return `📊 **Suhas's Academic Performance:**

**Current GPA: 3.60/4.0** (consistent across both degrees)

🎓 **Master's:** 3.60/4.0 at Illinois Institute of Technology
🎓 **Bachelor's:** 3.60/4.0 at Visvesvaraya Technological University

Demonstrates consistent academic excellence while gaining practical industry experience!`;
  }

  generateExperienceResponse(companyName, questionType) {
    const experience = this.context.experience.find(exp => 
      exp.company.toLowerCase().includes(companyName.toLowerCase())
    );

    if (!experience) {
      return `I don't have specific information about work at "${companyName}". Here are Suhas's main experiences: ${this.context.experience.map(exp => exp.company).join(', ')}.`;
    }

    return `💼 **${experience.title} at ${experience.company}**

⏰ ${experience.duration}
📍 ${experience.location}

**Key Achievements:**
${experience.responsibilities.map(resp => `• ${resp}`).join('\n')}`;
  }

  generateSkillsResponse(questionType) {
    return `💻 **Suhas's Technical Skills:**

**Programming:** ${this.context.skills.programmingLanguages.join(', ')}

**Frameworks:** ${this.context.skills.frameworks.slice(0, 8).join(', ')}, +more

**Cloud & DevOps:** ${this.context.skills.cloudAndDevOps.join(', ')}

**Databases:** ${this.context.skills.databases.join(', ')}

Specialized in full-stack development, AI integration, and cloud-native solutions!`;
  }

  generateTechnologyResponse(technologies, questionType) {
    const techExperience = [];
    
    // Find projects using these technologies
    technologies.forEach(tech => {
      this.context.projects.forEach(project => {
        if (project.technologies.some(t => t.toLowerCase().includes(tech.toLowerCase()))) {
          techExperience.push(`• **${project.name}** - ${tech} used for ${project.description.split(' ').slice(0, 10).join(' ')}...`);
        }
      });
    });

    return `🔧 **Suhas's Experience with ${technologies.join(', ')}:**

${techExperience.slice(0, 3).join('\n')}

${techExperience.length > 3 ? `\n...and ${techExperience.length - 3} more projects using these technologies.` : ''}

Would you like more details about any specific project or technology?`;
  }

  generateContactResponse(questionType) {
    return `📞 **Contact Suhas:**

📧 **Email:** ${this.context.personalInfo.email}
📱 **Phone:** ${this.context.personalInfo.phone}
💼 **LinkedIn:** ${this.context.personalInfo.linkedin}
🐙 **GitHub:** ${this.context.personalInfo.github}
🌐 **Portfolio:** ${this.context.personalInfo.portfolio}

Currently located in ${this.context.personalInfo.location} and actively seeking opportunities!`;
  }

  generateProjectsOverviewResponse(questionType) {
    const recentProjects = this.context.projects.slice(0, 4);
    
    return `🚀 **Suhas's Recent Projects:**

${recentProjects.map(project => 
      `**${project.name}** (${project.category.join(', ')}) - ${project.achievements[0]}`
    ).join('\n\n')}

Total: ${this.context.projects.length} major projects across AI, fintech, and full-stack development. Ask about any specific project for more details!`;
  }

  generateGeneralExperienceResponse(questionType) {
    return `💼 **Suhas's Professional Experience:**

**Recent:** Software Engineer Intern at Hamilton Digital Assets (Chicago)
**Previous:** Full Stack Intern at Whiterock Technologies (India)
**Current:** Graduate Teaching Assistant at Illinois Institute of Technology

Key strengths: Fintech, AI integration, full-stack development, and cloud architecture.`;
  }

  generateDefaultResponse(analysis) {
    const { entities, confidence } = analysis;
    
    let response = `👋 **Hi! I'm here to help you learn about Suhas Palani.**\n\n`;
    
    if (confidence < 0.5) {
      response += `I'm not entirely sure what you're asking about, but I can help with:\n\n`;
    }
    
    response += `**Popular topics:**
• **Education** - Master's at IIT Chicago, Bachelor's in India
• **Experience** - Recent intern at Hamilton Digital Assets
• **Projects** - TRACKSPLITAI, NUTRITRACKAI, SUMMARAIZE, and more
• **Skills** - Full-stack development, AI/ML, cloud computing
• **Contact** - How to reach Suhas for opportunities

**Try asking:** "Where did he do his masters?" or "Tell me about TRACKSPLITAI" or "What are his Python projects?"`;

    return response;
  }
}

// Export as default
const smartFallbackService = new SmartFallbackService();
export default smartFallbackService;