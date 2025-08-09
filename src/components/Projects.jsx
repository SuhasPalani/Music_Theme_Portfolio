import React, { useState, useEffect } from "react";
import { ExternalLink, Calendar, Award, Sparkles, Star, Zap, Music, Play, Pause } from "lucide-react";
import { FaEllipsisH, FaCode, FaCloud, FaBrain } from "react-icons/fa";

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [playingRecord, setPlayingRecord] = useState(null);

  useEffect(() => {
    // Generate floating musical particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.3 + 0.05,
      opacity: Math.random() * 0.4 + 0.2,
      type: ['♪', '♫', '♬', '♩'][Math.floor(Math.random() * 4)],
    }));
    setParticles(newParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + particle.speed) % 110,
        x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.05,
      })));
    }, 100);

    const handleMouseMove = (e) => {
      const rect = document.querySelector('#projects')?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(interval);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const projects = [
    {
      title: "TRACKSPLITAI - AI-Based Expense Splitting Platform",
      period: "Feb 2025 - Present",
      description: "Built scalable microservices for AI-driven expense tracking and management.",
      details: [
        "Architected and built a highly scalable microservices ecosystem comprising 7 independent services, orchestrated with FastAPI, Docker, and Kubernetes. This delivered 99.9% system reliability and seamlessly integrated Google Gemini for AI-driven expense splitting.",
        "Engineered a robust event-driven backend utilizing RabbitMQ for asynchronous communication and MongoDB Atlas for consistent data persistence across services.",
        "Delivered a comprehensive full-stack solution with a React/TypeScript frontend, integrating critical external APIs like Google Gemini and Stripe for payment processing."
      ],
      categories: ["Software Engineering", "Cloud", "AI"],
      color: "from-purple-600 to-pink-600",
      accentColor: "purple",
      musicGenre: "Synthwave Symphony",
      link: "https://github.com/SuhasPalani/aisplitwise",
      status: "Platinum Hit"
    },
    {
      title: "NutriTrackAI - AI-Powered Nutrition Tracker",
      period: "Mar 2025 - Present",
      description: "AI-powered assistant for nutrition tracking through natural language inputs",
      details: [
        "Developed an AI-powered assistant using OpenAI's GPT APIs and prompt engineering to extract structured nutritional data from natural language meal inputs, achieving 95% accuracy.",
        "Designed and implemented a scalable backend architecture with MongoDB, reducing manual food tracking time by 80%.",
        "Collaborated with a data science partner to fine-tune NLP outputs and deploy robust meal parsing logic, resulting in a 40% improvement in response consistency."
      ],
      categories: ["Software Engineering", "Cloud", "AI"],
      color: "from-cyan-500 to-blue-600",
      accentColor: "cyan",
      musicGenre: "Digital Jazz Fusion",
      link: "https://github.com/uday-venkatesha/NutriTrackAI",
      status: "Chart Topper"
    },
    {
      title: "Real-Time Instagram Analytics Dashboard",
      period: "Feb 2025 - Apr 2025",
      description: "Instagram analytics platform with real-time data visualization and performance monitoring",
      details: [
        "Developed a comprehensive Instagram analytics platform using FastAPI for the backend, Kafka for message queuing, DynamoDB for storage, and Next.js for real-time data visualization.",
        "Integrated performance monitoring with New Relic and optimized real-time data processing, reducing data processing time by 30%.",
        "Implemented efficient Instagram profile scraping through Apify, rate limiting, and robust error handling."
      ],
      categories: ["Software Engineering", "Cloud", "Other"],
      color: "from-pink-500 to-red-600",
      accentColor: "pink",
      musicGenre: "Electronic Beats",
      link: "https://github.com/SuhasPalani/Big_Data_Instagram",
      status: "Dance Floor Hit"
    },
    {
      title: "AI-Powered Report Generator",
      period: "Feb 2025",
      description: "AI-powered report generator improving efficiency in report creation",
      details: [
        "Developed an AI-powered report generator using OpenAI's GPT-4 and Mistral AI to create customized reports based on user input.",
        "Integrated image upload with AI-generated captions and automatic table of contents generation.",
        "Implemented architecture diagram generation from Python code blocks, automatically visualizing code structure."
      ],
      categories: ["AI", "Software Engineering"],
      color: "from-indigo-500 to-purple-700",
      accentColor: "indigo",
      musicGenre: "Ambient Intelligence",
      link: "https://github.com/SuhasPalani/AI_Report_Generator",
      status: "Underground Classic"
    },
    {
      title: "Voice-Based Code Generator",
      period: "Feb 2025",
      description: "Voice-based code generation tool to improve development speed",
      details: [
        "Developed a voice-based code generation application using React for the frontend and Flask for the backend.",
        "Integrated OpenAI and Google LLM APIs for speech-to-text and code generation, reducing code generation time by 15%.",
        "Implemented audio processing pipelines using Pydub and ffmpeg for seamless conversion and resampling of audio files."
      ],
      categories: ["AI", "Software Engineering"],
      color: "from-emerald-500 to-teal-600",
      accentColor: "emerald",
      musicGenre: "Vocal Harmonics",
      link: "https://github.com/SuhasPalani/voice_based_code_generator",
      status: "Radio Favorite"
    },
    {
      title: "Voice-Activated Task Scheduler",
      period: "Jan 2025",
      description: "Voice-activated task scheduler with reminders and task management",
      details: [
        "Developed a voice-activated task scheduler using Twilio and OpenAI's APIs for seamless speech-to-text and text-to-speech capabilities.",
        "Integrated OpenAI's Whisper for speech-to-text and TTS for converting text back to speech.",
        "Automated task management, enabling users to schedule tasks via voice, reducing manual input time by 15%."
      ],
      categories: ["AI"],
      color: "from-yellow-500 to-orange-600",
      accentColor: "yellow",
      musicGenre: "Orchestral Automation",
      link: "https://github.com/SuhasPalani/task_scheduler",
      status: "Acoustic Gem"
    },
    {
      title: "Weather Dashboard",
      period: "Dec 2024 - Jan 2025",
      description: "Full-stack weather dashboard with real-time insights and AI chatbot",
      details: [
        "Developed a full-stack Weather Dashboard to display real-time weather data using React and Chart.js for interactive visualizations.",
        "Integrated Flask backend to fetch weather data using WeatherAPI, and used MongoDB to store and retrieve weather information.",
        "Built a real-time chatbot assistant using OpenAI API to provide users with weather-related insights."
      ],
      categories: ["Software Engineering", "Cloud", "AI"],
      color: "from-blue-500 to-cyan-600",
      accentColor: "blue",
      musicGenre: "Atmospheric Soundscape",
      link: "https://github.com/SuhasPalani/weather-dashboard",
      status: "Seasonal Hit"
    },
    {
      title: "Bitcoin Prediction",
      period: "Dec 2024 - Present",
      description: "ML-based system for Bitcoin price trend forecasting",
      details: [
        "Developed ML_Bitcoin_Prediction system with D3.js for interactive data visualization of Bitcoin price trends and forecasts.",
        "Implemented multiple machine learning models, with ARIMA providing 95.2% accuracy on a 15-year dataset.",
        "Utilized time series forecasting to improve predictive accuracy and decision-making for cryptocurrency market analysis."
      ],
      categories: ["ML", "Software Engineering"],
      color: "from-amber-500 to-yellow-600",
      accentColor: "amber",
      musicGenre: "Algorithmic Composition",
      link: "https://github.com/SuhasPalani/ML_Bitcoin_Prediction",
      status: "Golden Record"
    },
    {
      title: "SUMMARAIZE",
      period: "Apr 2024 - Sept 2024",
      description: "Multimodal AI platform with web and mobile apps",
      details: [
        "Developed a multimodal AI platform with web and mobile apps using Python Flask, MongoDB, HTML, CSS, JavaScript, and React Native.",
        "Enhanced mobile user engagement by 28% through optimized design and chatbot integration.",
        "Led API testing and validation using Postman, covering 25+ endpoints."
      ],
      categories: ["AI", "Software Engineering"],
      color: "from-green-500 to-emerald-600",
      accentColor: "green",
      musicGenre: "Multi-Modal Harmony",
      link: "https://github.com/SuhasPalani/summaraize-native",
      status: "Award Winner"
    }
  ];

  const filters = [
    { name: "All", icon: Music, gradient: "from-purple-500 to-pink-500" },
    { name: "Software Engineering", icon: FaCode, gradient: "from-blue-500 to-cyan-500" },
    { name: "AI", icon: FaBrain, gradient: "from-pink-500 to-purple-600" },
    { name: "Cloud", icon: FaCloud, gradient: "from-cyan-500 to-blue-600" },
    { name: "Other", icon: FaEllipsisH, gradient: "from-gray-500 to-gray-700" },
  ];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter((project) => project.categories.includes(activeFilter));

  const toggleRecord = (index) => {
    setPlayingRecord(playingRecord === index ? null : index);
  };

  return (
    <section id="projects" className="relative py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
      {/* Magical Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.4), transparent 50%)`
          }}
        />
        
        {/* Floating musical particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute text-purple-300 animate-pulse pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              fontSize: `${particle.size * 6}px`,
              textShadow: '0 0 10px rgba(147, 51, 234, 0.7)',
            }}
          >
            {particle.type}
          </div>
        ))}

        {/* Constellation lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <linearGradient id="constellation" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          <path
            d="M100,300 Q400,200 700,300 T1200,300"
            stroke="url(#constellation)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 flex items-center justify-center">
            <Sparkles className="mr-4 text-purple-400 animate-spin" size={40} />
            The Greatest Hits Collection
            <Award size={40} className="ml-4 text-pink-400 animate-bounce" />
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            A symphonic journey through digital compositions and code orchestrations
          </p>
        </div>

        {/* Magical Filters */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {filters.map((filter) => (
            <button
              key={filter.name}
              onClick={() => setActiveFilter(filter.name)}
              className={`group relative flex items-center gap-3 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter.name 
                  ? `bg-gradient-to-r ${filter.gradient} shadow-lg shadow-purple-500/25` 
                  : "bg-gray-800/60 hover:bg-gray-700/60 backdrop-blur-sm border border-gray-600/30"
              }`}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
              <filter.icon size={18} className="relative" />
              <span className="relative">{filter.name}</span>
              {activeFilter === filter.name && (
                <Star className="relative text-yellow-300 animate-spin" size={16} />
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:shadow-purple-500/25"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Magical Record Player */}
              <div className="relative h-56 overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80`}></div>
                
                {/* Animated glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}></div>
                
                {/* Record Player */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className={`relative w-32 h-32 rounded-full bg-gradient-to-br from-black to-gray-900 border-4 border-${project.accentColor}-500/30 transition-transform duration-700 ${
                      playingRecord === index ? "animate-spin" : hoveredProject === index ? "rotate-12" : ""
                    }`}
                  >
                    {/* Vinyl grooves */}
                    <div className="absolute inset-2 rounded-full border border-gray-600/50"></div>
                    <div className="absolute inset-4 rounded-full border border-gray-500/40"></div>
                    <div className="absolute inset-6 rounded-full border border-gray-400/30"></div>
                    
                    {/* Center label */}
                    <div className={`absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-${project.accentColor}-600 to-${project.accentColor}-800`}>
                      <div className="w-3/5 h-3/5 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                        <button
                          onClick={() => toggleRecord(index)}
                          className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center hover:scale-110 transition-transform"
                        >
                          {playingRecord === index ? (
                            <Pause size={12} className="text-black" />
                          ) : (
                            <Play size={12} className="text-black ml-0.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tonearm */}
                  <div className={`absolute top-1/3 right-1/4 w-16 h-2 bg-gradient-to-r from-${project.accentColor}-600 to-${project.accentColor}-800 rounded-full origin-left transition-transform duration-500 ${
                    playingRecord === index ? "rotate-45" : "rotate-12"
                  }`}>
                    <div className="absolute right-0 top-1/2 w-3 h-3 bg-yellow-400 rounded-full transform -translate-y-1/2 shadow-lg shadow-yellow-400/50"></div>
                  </div>
                  
                  {/* Floating status badge */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className={`text-xs font-bold text-${project.accentColor}-400`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Magic sparkles */}
                {hoveredProject === index && (
                  <>
                    <Sparkles className="absolute top-4 left-4 text-yellow-300 animate-bounce" size={16} />
                    <Star className="absolute bottom-4 right-8 text-pink-400 animate-spin" size={14} />
                    <Zap className="absolute top-8 right-12 text-cyan-400 animate-pulse" size={12} />
                  </>
                )}

                {/* Project info overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                    {project.description}
                  </p>
                  <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${project.color} text-xs font-medium text-white`}>
                    {project.musicGenre}
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-300 text-sm">{project.period}</span>
                </div>

                <div className="space-y-3 mb-6">
                  {project.details.slice(0, 2).map((detail, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className={`w-2 h-2 rounded-full bg-${project.accentColor}-500 mr-3 mt-2 animate-pulse`}></div>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {detail.length > 500 ? detail.substring(0, 500) + "..." : detail}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Category tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.categories.map((category, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/30"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {/* Action button */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group/btn inline-flex items-center px-4 py-2 bg-gradient-to-r ${project.color} text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-${project.accentColor}-500/25 transform hover:scale-105`}
                >
                  <span className="mr-2">Listen to Track</span>
                  <ExternalLink size={16} className="transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state with magical touch */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="relative inline-block">
              <Music size={64} className="text-purple-400 animate-bounce mx-auto mb-4" />
              <Sparkles className="absolute -top-2 -right-2 text-yellow-300 animate-spin" size={20} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Tracks Found</h3>
            <p className="text-gray-400">This genre is still being composed... Stay tuned!</p>
          </div>
        )}
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-900/50 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Projects;