// src/data/resumeData.js
export const resumeData = {
  personalInfo: {
    name: "Suhas Palani",
    title: "Master of Science in Computer Science",
    email: "spalani3@hawk.illinoistech.edu",
    phone: "+1 773-850-4663",
    location: "Chicago, IL (open for relocation)",
    linkedin: "https://linkedin.com/in/suhaspalani/",
    github: "https://github.com/SuhasPalani",
    portfolio: "https://suhaspalani23.netlify.app",
    university: "Illinois Institute of Technology",
    recommendations: "https://linkedin.com/in/suhaspalani/details/recommendations"
  },
  
  education: [
    {
      degree: "Master of Science in Computer Science",
      institution: "Illinois Institute of Technology",
      location: "Chicago, IL",
      duration: "Aug 2023 - May 2025",
      gpa: "3.60/4.0",
      status: "Current"
    },
    {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "Visvesvaraya Technological University",
      location: "Bengaluru, India",
      duration: "Aug 2019 - Jul 2023",
      gpa: "3.60/4.0",
      status: "Completed"
    }
  ],

  experience: [
    {
      title: "Full Stack Developer",
      company: "Tundra Technical Solutions",
      location: "Chicago, IL",
      duration: "Nov 2025 - Present",
      responsibilities: [
        "Led end-to-end development of an AI-powered customer support chatbot using Next.js, LangGraph, OpenAI modern APIs",
        "Designed a RAG-based backend with Pinecone, boosting recommendation relevance by 45% and reducing LLM hallucinations",
        "Built AI-driven customer support workflows generating Jira tickets, helping internal teams resolve customer issues faster",
        "Delivered production-ready application on Azure, reducing customer support workload by 40% across enterprise teams globally"
      ]
    },
    {
      title: "Software Engineer Intern",
      company: "ONEBIT, INC.",
      location: "Chicago, IL",
      duration: "Aug 2025 – Nov 2025",
      responsibilities: [
        "Built an idempotent ETL pipeline for 2,000+ clients, using distributed locking for data consistency and no duplicates",
        "Developed a transfer detection service that pairs internal transfers, shielding 15% of transactions from expense misclassification",
        "Implemented a double-entry ledger system ensuring 100% transactional balance and an immutable financial audit trail",
        "Created daily reconciliation to automatically confirm 99.8% cash balance accuracy, minimizing financial drift risk"
      ]
    },
    {
      title: "Full Stack Software Developer",
      company: "Budhhi Technologies",
      location: "Remote (Non-profit Organization, Volunteer)",
      duration: "Jan 2025 – Aug 2025",
      responsibilities: [
        "Built AI matchmaking system using Python and TensorFlow, increasing match accuracy by 30% across 500+ profiles",
        "Designed automated NDA platform on Node.js and AWS Lambda, cutting legal review times by 40% effectively",
        "Delivered responsive React/Redux applications with PostgreSQL, improving user engagement by 25% and page load efficiency",
        "Deployed containerized AWS infrastructure with Docker, ensuring 99.9% uptime and enhanced system scalability"
      ]
    },
    {
      title: "Software Engineer Intern",
      company: "Hamilton Digital Assets",
      location: "Chicago, IL",
      duration: "Oct 2024 – Dec 2024",
      responsibilities: [
        "Architected authentication infrastructure using MongoDB, Kafka, and Keycloak within a microservices architecture, supporting high-traffic apps, ensuring reliability, and optimizing security, resulting in a 40% reduction in vulnerabilities with senior engineers",
        "Crafted React/React Native apps with GraphQL integration, improving load times by 20% and enhancing user engagement. Assisted in optimizing the CI/CD pipeline, reducing deployment cycles by 50% through build process improvements",
        "Supported the development of an AI-powered chatbot solution using Node.js on Kubernetes, improving customer support response times by 30% while handling high daily queries, ensuring optimal performance and uptime across production environments"
      ]
    },
    {
      title: "Graduate Teaching Assistant",
      company: "Illinois Institute of Technology",
      location: "Chicago, IL",
      duration: "Aug 2024 – Dec 2024",
      responsibilities: [
        "Teaching Assistant for Software Project Management course",
        "Assisted students with project management methodologies and software development practices",
        "Conducted lab sessions and provided mentorship to graduate students"
      ]
    },
    {
      title: "Full Stack Software Engineer Intern",
      company: "Whiterock Technologies",
      location: "Bengaluru, KA",
      duration: "Mar 2022 - May 2023",
      responsibilities: [
        "Optimized website features to improve page load speed by 15%, handling 500+ daily user requests. Used Dockerized environments to simulate production loads, enhancing performance and reducing bounce rates",
        "Designed fully responsive layouts for desktop, tablet, and mobile, increasing mobile engagement by 20% and average session duration by 12%. Implemented automated visual regression testing to ensure cross-device UI consistency",
        "Developed and validated front-end to back-end integrations using REST APIs, reducing data inconsistencies by 25%. Automated test scripts uncovered 8+ bugs per sprint and integrated them into CI/CD pipelines, improving product quality by 30% over three cycles"
      ]
    }
  ],

  skills: {
    programmingLanguages: [
      "JavaScript", "TypeScript", "Python", "Java", "Go", "C#", "SQL", "HTML", "CSS"
    ],
    frameworks: [
      "React", "Next.js", "Node.js", "Flask", "FastAPI", ".NET Core", "Angular", "Spring Boot", 
      "Hibernate", "GraphQL", "Vue.js", "Redux", "Django", "React Native", "LangGraph"
    ],
    databases: [
      "MongoDB", "PostgreSQL", "SQL Server", "DynamoDB", "Redis", "Firebase", "MongoDB Atlas", "Pinecone"
    ],
    cloudAndDevOps: [
      "AWS", "GCP", "Azure", "Docker", "Kubernetes", "CI/CD pipelines", "Jenkins", 
      "GitLab", "Terraform", "CloudFormation"
    ],
    bigDataTechnologies: [
      "Kafka", "Apache Spark", "Cassandra", "Hadoop", "Apache Flink", "RabbitMQ"
    ],
    tools: [
      "Git & GitHub", "Postman", "Grafana", "New Relic", "Keycloak", "UiPath", 
      "Selenium", "PyAutoGUI", "CloudWatch", "Datadog", "Jira"
    ],
    methodologies: [
      "Agile", "SDLC", "Scrum & Kanban", "Test-Driven Development (TDD)", "Code Reviews"
    ],
    aiMl: [
      "OpenAI APIs", "TensorFlow", "RAG (Retrieval-Augmented Generation)", "Vector Databases",
      "LangGraph", "NLP", "Machine Learning"
    ]
  },

  projects: [
    {
      name: "TRACKSPLITAI",
      duration: "Feb 2025 – June 2025",
      technologies: ["FastAPI", "Docker", "Kubernetes", "RabbitMQ", "MongoDB Atlas", "Google Gemini API", "React", "TypeScript", "JWT", "Stripe"],
      description: "Scalable microservices ecosystem for AI-driven expense splitting with real-time tracking and payment integration",
      achievements: [
        "Engineered 7 independent microservices achieving 99.9% system reliability",
        "Implemented event-driven backend with RabbitMQ and MongoDB Atlas for data consistency",
        "Integrated Google Gemini API for AI-driven expense splitting, reducing manual tracking time by 80%",
        "Delivered full-stack solution with React/TypeScript frontend and JWT-secured backend",
        "Established CI/CD pipeline tested with 100K fake transactions and 20 concurrent users"
      ],
      category: ["Full Stack", "AI", "Fintech"]
    },
    {
      name: "NUTRITRACKAI (Open Source)",
      duration: "Apr 2025 – May 2025",
      technologies: ["OpenAI GPT APIs", "MongoDB", "NLP", "Python"],
      description: "AI assistant for nutrition data extraction from voice inputs, handwritten meal logs, and natural language queries",
      achievements: [
        "Developed AI assistant using OpenAI GPT APIs and MongoDB",
        "Implemented advanced NLP preprocessing and prompt engineering techniques",
        "Achieved 95% data extraction accuracy with consistent recommendations",
        "Reduced manual food tracking time by 80% for health-conscious users"
      ],
      category: ["AI", "Healthcare", "Full Stack"]
    },
    {
      name: "REAL-TIME INSTAGRAM ANALYTICS DASHBOARD",
      duration: "Feb 2025 – Apr 2025",
      technologies: ["Kafka", "DynamoDB", "Vue.js", "Microservices", "Apify"],
      description: "Real-time influencer analytics dashboard for marketing teams with scalable scraping infrastructure",
      achievements: [
        "Built real-time dashboard using Kafka, DynamoDB, and Vue.js with microservices architecture",
        "Reduced campaign analysis time by 30% for marketing teams",
        "Implemented scalable scraping infrastructure with exponential backoff retries",
        "Achieved 99% uptime while processing 1,000+ influencer profiles per hour"
      ],
      category: ["Full Stack", "DevOps"]
    },
    {
      name: "SUMMARAIZE",
      duration: "Apr 2024 – Sept 2024",
      technologies: ["Python Flask", "Java", "MongoDB", "React Native", "AWS Kubernetes", "AI Chatbots"],
      description: "Cross-platform app for real-time video and text summarization with AI chatbots integration",
      achievements: [
        "Developed cross-platform app using Python Flask, Java microservices, MongoDB, and React Native",
        "Deployed on AWS Kubernetes with CI/CD pipelines",
        "Achieved 28% increase in mobile user engagement",
        "Led development of 25+ REST endpoints with integrated AI chatbots",
        "Earned recognition at OraHacks and TikTok Tech Jam, competing against 600+ teams"
      ],
      category: ["Full Stack", "AI", "Mobile"]
    },
    {
      name: "LOGICFLOW – REAL-TIME ORDER PROCESSING SYSTEM",
      duration: "Feb 2025 – Apr 2025",
      technologies: ["Angular", "WebSockets", "AWS EC2", "S3", "CloudWatch"],
      description: "Real-time, responsive order processing system with AWS deployment",
      achievements: [
        "Designed and developed real-time order processing system using Angular and WebSockets",
        "Deployed on AWS using EC2, S3, and CloudWatch for monitoring",
        "Implemented responsive design for optimal user experience"
      ],
      category: ["Full Stack", "Cloud"]
    },
    {
      name: "INSURIFY.AI – AI-Powered Insurance Insights Platform",
      duration: "Feb 2025 – Apr 2025",
      technologies: ["LangChain", "ElasticSearch", "LLMs", "TensorFlow", "PyTorch", "FAISS"],
      description: "AI-driven insurance assistant with vector search capabilities",
      achievements: [
        "Developed AI-driven insurance assistant using LangChain and ElasticSearch",
        "Implemented vector search using TensorFlow, PyTorch, and FAISS",
        "Created intelligent insights platform for insurance industry"
      ],
      category: ["AI", "Fintech"]
    },
    {
      name: "CLOUD-NATIVE DEVOPS PLATFORM",
      duration: "Feb 2025 – June 2025",
      technologies: ["Jenkins", "GitLab", "AWS", "Terraform", "CloudFormation", "Docker", "Kubernetes"],
      description: "Comprehensive DevOps platform with CI/CD pipelines and infrastructure automation",
      achievements: [
        "Built CI/CD pipelines using Jenkins and GitLab",
        "Implemented AWS infrastructure automation using Terraform and CloudFormation",
        "Deployed Dockerized microservices on Kubernetes",
        "Established full-stack monitoring and alerting"
      ],
      category: ["DevOps", "Cloud"]
    }
  ],

  achievements: [
    {
      title: "Graduate Teaching Assistant",
      organization: "Illinois Institute of Technology",
      duration: "Aug 2024 – Dec 2024",
      description: "Software Project Management course"
    },
    {
      title: "Top 12 Finalist, TikTok Tech Jam 2024",
      organization: "TikTok",
      duration: "Aug 2024",
      description: "Recognized for developing a scalable backend system from 600+ teams"
    },
    {
      title: "Winner, OraHacks 2024",
      organization: "OraHacks",
      duration: "Apr 2024",
      description: "Led an AI mobile app with text-to-video/audio news, voted top solution"
    },
    {
      title: "Published Paper",
      organization: "International Conference on Advanced Engineering & Technology",
      duration: "Jun 2023",
      description: "API Contract Driven Testing"
    }
  ],

  interests: [
    "Full Stack Development",
    "AI/Machine Learning & RAG Systems",
    "Cloud Computing & DevOps",
    "Microservices Architecture", 
    "Fintech Solutions",
    "Healthcare Technology",
    "Open Source Contributions",
    "Competitive Programming"
  ]
};

export default resumeData;