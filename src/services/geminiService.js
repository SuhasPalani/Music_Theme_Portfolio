// src/services/geminiService.js
import { resumeData } from "../data/resumeData";

class GeminiService {
  constructor() {
    this.isInitialized = false;
    this.apiKey = null;
    this.genAI = null;
    this.model = null;
    
    this.initialize();
  }

  async initialize() {
    try {
      // Check for API key in multiple possible locations
      this.apiKey = process.env.REACT_APP_GEMINI_API_KEY || 
                   process.env.VITE_GEMINI_API_KEY ||
                   window.ENV?.REACT_APP_GEMINI_API_KEY;

      console.log("Initializing Gemini Service...", {
        hasApiKey: !!this.apiKey,
        keyLength: this.apiKey?.length || 0,
        env: process.env.NODE_ENV
      });

      if (!this.apiKey) {
        console.warn("No Gemini API key found. Using fallback responses.");
        return;
      }

      // Dynamic import to avoid build issues
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      
      this.genAI = new GoogleGenerativeAI(this.apiKey);
      this.model = this.genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1024,
        }
      });

      // Test the connection
      await this.testConnection();
      this.isInitialized = true;
      console.log("✅ Gemini service initialized successfully");
      
    } catch (error) {
      console.error("❌ Failed to initialize Gemini service:", error);
      this.isInitialized = false;
    }
  }

  createSystemPrompt() {
    return `You are an AI assistant representing Suhas Palani, a talented software engineer and computer science graduate student. 

IMPORTANT: Always respond in a conversational, helpful manner as if you're Suhas's personal assistant. Be specific and detailed when possible.

RESUME INFORMATION:

PERSONAL INFO:
- Name: ${resumeData.personalInfo.name}
- Currently pursuing: ${resumeData.personalInfo.title}
- University: ${resumeData.personalInfo.university}
- Location: ${resumeData.personalInfo.location}
- Email: ${resumeData.personalInfo.email}
- Phone: ${resumeData.personalInfo.phone}

EDUCATION:
${resumeData.education.map(edu => `
• ${edu.degree} - ${edu.institution} (${edu.duration})
  GPA: ${edu.gpa}/4.0 | Status: ${edu.status}
`).join('')}

WORK EXPERIENCE:
${resumeData.experience.map(exp => `
• ${exp.title} at ${exp.company} (${exp.duration})
  Location: ${exp.location}
  Key achievements:
  ${exp.responsibilities.map(resp => `  - ${resp}`).join('\n')}
`).join('\n')}

TECHNICAL SKILLS:
• Programming: ${resumeData.skills.programmingLanguages.join(', ')}
• Frameworks: ${resumeData.skills.frameworks.join(', ')}
• Databases: ${resumeData.skills.databases.join(', ')}
• Cloud/DevOps: ${resumeData.skills.cloudAndDevOps.join(', ')}
• Big Data: ${resumeData.skills.bigDataTechnologies.join(', ')}
• Tools: ${resumeData.skills.tools.join(', ')}

NOTABLE PROJECTS:
${resumeData.projects.map(project => `
• **${project.name}** (${project.duration})
  Tech Stack: ${project.technologies.join(', ')}
  Description: ${project.description}
  Key achievements:
  ${project.achievements.map(achievement => `  - ${achievement}`).join('\n')}
`).join('\n')}

ACHIEVEMENTS:
${resumeData.achievements.map(achievement => `
• ${achievement.title} - ${achievement.organization} (${achievement.duration})
  ${achievement.description}
`).join('')}

RESPONSE GUIDELINES:
1. Be conversational and engaging, not robotic
2. Provide specific details from the resume when relevant
3. If asked about GPA, mention he maintains a 3.60/4.0 in both degrees
4. For project questions, include specific technologies and achievements
5. Always encourage direct contact for opportunities
6. If you don't have specific info, say so honestly but offer related information
7. Use markdown formatting for better readability
8. Be enthusiastic about Suhas's accomplishments`;
  }

  async generateResponse(userMessage) {
    // If Gemini isn't initialized, provide intelligent fallback
    if (!this.isInitialized || !this.model) {
      return this.getIntelligentFallback(userMessage);
    }

    try {
      const systemPrompt = this.createSystemPrompt();
      const fullPrompt = `${systemPrompt}

USER QUESTION: "${userMessage}"

Please provide a helpful, detailed response about Suhas based on the resume information above. Be conversational and specific.`;

      console.log("🚀 Sending request to Gemini...");
      
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();
      
      console.log("✅ Response received from Gemini");
      return text;
      
    } catch (error) {
      console.error("❌ Gemini API error:", error);
      
      // Provide specific error handling
      if (error.message?.includes('API_KEY_INVALID')) {
        console.warn("Invalid API key, switching to fallback");
        this.isInitialized = false;
      } else if (error.message?.includes('QUOTA_EXCEEDED')) {
        console.warn("API quota exceeded, using fallback");
      }
      
      return this.getIntelligentFallback(userMessage);
    }
  }

  getIntelligentFallback(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // GPA specific responses
    if (lowerMessage.includes('gpa') || lowerMessage.includes('grade')) {
      return `Suhas maintains excellent academic performance:

🎓 **Current GPA: 3.60/4.0**
- Master of Science in Computer Science - Illinois Institute of Technology (Current)
- Bachelor of Engineering in Computer Science - Visvesvaraya Technological University (Completed)

Both degrees show consistent academic excellence while he was also gaining hands-on industry experience through internships!`;
    }
    
    // NUTRITRACKAI specific
    if (lowerMessage.includes('nutritrackai') || lowerMessage.includes('nutrition')) {
      return `**NUTRITRACKAI** is one of Suhas's impressive AI projects:

🤖 **Open Source AI Nutrition Assistant** (Apr 2025 – May 2025)

**Technologies Used:**
- OpenAI GPT APIs for natural language processing
- MongoDB for data storage
- Advanced NLP preprocessing
- Python for backend development

**Key Achievements:**
✅ **95% data extraction accuracy** from voice inputs and handwritten meal logs
✅ **80% reduction** in manual food tracking time for users
✅ Advanced prompt engineering for consistent AI recommendations
✅ Intelligent parsing of natural language nutrition queries

This project showcases his expertise in AI integration, healthcare technology, and creating user-friendly solutions for health-conscious individuals. It's open source, demonstrating his commitment to community contribution!`;
    }
    
    // SUMMARAIZE specific
    if (lowerMessage.includes('summaraize') || lowerMessage.includes('summarize')) {
      return `**SUMMARAIZE** is one of Suhas's most recognized projects:

📱 **Cross-Platform Summarization App** (Apr 2024 – Sept 2024)

**Technologies Used:**
- Python Flask (Backend)
- Java Microservices
- MongoDB (Database)
- React Native (Mobile)
- AWS Kubernetes (Deployment)
- AI Chatbots Integration

**Major Achievements:**
🏆 **TikTok Tech Jam 2024** - Top 12 Finalist (competed against 600+ teams!)
🥇 **OraHacks 2024** - Winner for AI mobile app solution
📈 **28% increase** in mobile user engagement
⚡ **25+ REST endpoints** with integrated AI chatbots
🚀 Full CI/CD pipeline deployment on AWS

**What it does:**
Real-time video and text summarization with AI chatbots, making content consumption more efficient for users. The recognition at major tech competitions shows the innovation and scalability of his solution!`;
    }

    // Skills with more detail
    if (lowerMessage.includes('skill') || lowerMessage.includes('technical') || lowerMessage.includes('technology')) {
      return `Suhas has a comprehensive tech stack spanning multiple domains:

💻 **Programming Languages:**
JavaScript, TypeScript, Python, Java, Go, C#, SQL, HTML, CSS

🚀 **Frameworks & Libraries:**
React, Node.js, Flask, FastAPI, .NET Core, Angular, Spring Boot, React Native, Vue.js, Redux, Django, GraphQL, Hibernate

🗄️ **Databases:**
MongoDB, PostgreSQL, SQL Server, DynamoDB, Redis, Firebase, MongoDB Atlas

☁️ **Cloud & DevOps:**
AWS, GCP, Azure, Docker, Kubernetes, CI/CD pipelines, Jenkins, GitLab, Terraform, CloudFormation

📊 **Big Data & Messaging:**
Kafka, Apache Spark, Cassandra, Hadoop, Apache Flink, RabbitMQ

🔧 **Tools & Monitoring:**
Git & GitHub, Postman, Grafana, New Relic, Keycloak, UiPath, Selenium, CloudWatch, Datadog

**Specializations:**
- Full-stack development with modern frameworks
- Microservices architecture and scalable systems
- AI/ML integration in applications
- Cloud-native solutions and DevOps practices
- Real-time data processing and analytics

His diverse skill set allows him to work across the entire technology stack!`;
    }

    // Enhanced experience response
    if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('internship')) {
      return `Suhas has valuable hands-on experience across different domains:

💼 **Software Engineer Intern - Hamilton Digital Assets** (Oct 2024 – Dec 2024)
🏢 Chicago, IL - Fintech/Digital Assets
- Architected authentication infrastructure with **MongoDB, Kafka, and Keycloak**
- **40% reduction in security vulnerabilities** through microservices design
- Built React/React Native apps with GraphQL, **20% improvement in load times**
- AI-powered chatbot development, **30% faster customer support response**
- **50% reduction in deployment cycles** through CI/CD optimization

⚡ **Full Stack Software Engineer Intern - Whiterock Technologies** (Mar 2022 - May 2023)
🏢 Bengaluru, India - Technology Solutions
- Website optimization handling **500+ daily users**, **15% faster page loads**
- Responsive design implementation, **20% increase in mobile engagement**
- REST API development, **25% reduction in data inconsistencies**
- Automated testing discovering **8+ bugs per sprint**, **30% quality improvement**

👨‍🏫 **Graduate Teaching Assistant - Illinois Institute of Technology** (Aug 2024 – Dec 2024)
📚 Software Project Management course
- Mentoring graduate students in project management methodologies
- Hands-on experience with educational leadership

His experience spans fintech, full-stack development, AI integration, and educational mentorship!`;
    }

    // Default enhanced response
    return `Hello! I'm here to help you learn about **Suhas Palani** - a talented software engineer and Master's student at Illinois Institute of Technology.

🎯 **Quick Facts:**
- 📍 Currently in Chicago, IL (open to relocation)
- 🎓 MS Computer Science student at IIT (GPA: 3.60/4.0)
- 💼 Recent Software Engineer Intern at Hamilton Digital Assets
- 🏆 TikTok Tech Jam 2024 Top 12 Finalist (600+ teams)

**I can tell you about:**
✨ His **technical skills** and expertise areas  
💼 **Work experience** and internship achievements  
🚀 **Notable projects** like TRACKSPLITAI, NUTRITRACKAI, and SUMMARAIZE  
🎓 **Educational background** and academic performance  
🏆 **Awards and recognition** from competitions  
📞 **Contact information** for opportunities

**What specific aspect would you like to know more about?** Feel free to ask about particular projects, technologies, or experiences!`;
  }

  async testConnection() {
    if (!this.model) {
      throw new Error("Model not initialized");
    }
    
    try {
      const result = await this.model.generateContent("Test connection - respond with 'OK'");
      const response = await result.response;
      const text = response.text();
      console.log("🔍 API test result:", text);
      return true;
    } catch (error) {
      console.error("🔍 API test failed:", error);
      throw error;
    }
  }
} // ✅ This closing brace fixes the syntax issue

const geminiService = new GeminiService();
export default geminiService;
