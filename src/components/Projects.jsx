import React, { useState, useRef, useEffect } from "react";
import { ExternalLink, Calendar, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FaCode, FaCloud, FaBrain } from "react-icons/fa";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeIndex, setActiveIndex] = useState(3);
  const [headerRef, headerVisible] = useScrollReveal();
  const carouselRef = useRef(null);

  const projects = [
    {
      title: "AI-Powered App Feedback Analysis System",
      period: "Jul 2025 - Aug 2025",
      description: "Designed a serverless AI-driven system for automated app feedback analysis and actionable insights.",
      details: [
        "Built an AWS-native pipeline using Step Functions, Lambda, DynamoDB, and Amazon Bedrock Claude AI to automatically process and analyze user complaints with 100% processing efficiency and sub-second API response times.",
        "Enabled real-time sentiment analysis and issue detection to identify critical pain points like crashes and slow loading, reducing manual analysis time by 90% through intelligent categorization and prioritization.",
        "Generated structured technical recommendations with only 1.5 RCU consumption per execution, empowering product teams to make rapid, data-driven improvements.",
      ],
      categories: ["Cloud", "AI"], gradient: "from-emerald-600 to-teal-700",
      link: "https://github.com/SuhasPalani/ai-analytics-project", status: "Lambda Anthem",
    },
    {
      title: "TRACKSPLITAI - AI-Based Expense Splitting Platform",
      period: "Feb 2025 - Jun 2025",
      description: "Built scalable microservices for AI-driven expense tracking and management.",
      details: [
        "Architected and built a highly scalable microservices ecosystem comprising 7 independent services, orchestrated with FastAPI, Docker, and Kubernetes. This delivered 99.9% system reliability and seamlessly integrated Google Gemini for AI-driven expense splitting.",
        "Engineered a robust event-driven backend utilizing RabbitMQ for asynchronous communication and MongoDB Atlas for consistent data persistence across services.",
        "Delivered a comprehensive full-stack solution with a React/TypeScript frontend, integrating critical external APIs like Google Gemini and Stripe for payment processing.",
      ],
      categories: ["Software Engineering", "Cloud", "AI"], gradient: "from-amber-600 to-orange-700",
      link: "https://github.com/SuhasPalani/aisplitwise", status: "Platinum Hit",
    },
    {
      title: "NutriTrackAI - AI-Powered Nutrition Tracker",
      period: "Mar 2025 - Present",
      description: "AI-powered assistant for nutrition tracking through natural language inputs.",
      details: [
        "Developed an AI-powered assistant using OpenAI's GPT APIs and prompt engineering to extract structured nutritional data from natural language meal inputs, achieving 95% accuracy.",
        "Designed and implemented a scalable backend architecture with MongoDB, reducing manual food tracking time by 80%.",
        "Collaborated with a data science partner to fine-tune NLP outputs and deploy robust meal parsing logic, resulting in a 40% improvement in response consistency.",
      ],
      categories: ["Software Engineering", "AI"], gradient: "from-cyan-600 to-blue-700",
      link: "https://github.com/uday-venkatesha/NutriTrackAI", status: "Chart Topper",
    },
    {
      title: "Real-Time Instagram Analytics Dashboard",
      period: "Feb 2025 - Apr 2025",
      description: "Instagram analytics platform with real-time data visualization and performance monitoring.",
      details: [
        "Developed a comprehensive Instagram analytics platform using FastAPI for the backend, Kafka for message queuing, DynamoDB for storage, and Next.js for real-time data visualization.",
        "Integrated performance monitoring with New Relic and optimized real-time data processing, reducing data processing time by 30%.",
        "Implemented efficient Instagram profile scraping through Apify, rate limiting, and robust error handling.",
      ],
      categories: ["Software Engineering", "Cloud"], gradient: "from-pink-600 to-rose-700",
      link: "https://github.com/SuhasPalani/Big_Data_Instagram", status: "Dance Floor Hit",
    },
    {
      title: "AI-Powered Report Generator",
      period: "Feb 2025",
      description: "AI-powered report generator improving efficiency in report creation.",
      details: [
        "Developed an AI-powered report generator using OpenAI's GPT-4 and Mistral AI to create customized reports based on user input.",
        "Integrated image upload with AI-generated captions and automatic table of contents generation.",
        "Implemented architecture diagram generation from Python code blocks, automatically visualizing code structure.",
      ],
      categories: ["AI", "Software Engineering"], gradient: "from-indigo-600 to-violet-700",
      link: "https://github.com/SuhasPalani/AI_Report_Generator", status: "Underground Classic",
    },
    {
      title: "Voice-Based Code Generator",
      period: "Feb 2025",
      description: "Voice-based code generation tool to improve development speed.",
      details: [
        "Developed a voice-based code generation application using React for the frontend and Flask for the backend.",
        "Integrated OpenAI and Google LLM APIs for speech-to-text and code generation, reducing code generation time by 15%.",
        "Implemented audio processing pipelines using Pydub and ffmpeg for seamless conversion and resampling of audio files.",
      ],
      categories: ["AI", "Software Engineering"], gradient: "from-emerald-600 to-green-700",
      link: "https://github.com/SuhasPalani/voice_based_code_generator", status: "Radio Favorite",
    },
    {
      title: "Voice-Activated Task Scheduler",
      period: "Jan 2025",
      description: "Voice-activated task scheduler with reminders and task management.",
      details: [
        "Developed a voice-activated task scheduler using Twilio and OpenAI's APIs for seamless speech-to-text and text-to-speech capabilities.",
        "Integrated OpenAI's Whisper for speech-to-text and TTS for converting text back to speech.",
        "Automated task management, enabling users to schedule tasks via voice, reducing manual input time by 15%.",
      ],
      categories: ["AI"], gradient: "from-amber-500 to-yellow-600",
      link: "https://github.com/SuhasPalani/task_scheduler", status: "Acoustic Gem",
    },
    {
      title: "Weather Dashboard",
      period: "Dec 2024 - Jan 2025",
      description: "Full-stack weather dashboard with real-time insights and AI chatbot.",
      details: [
        "Developed a full-stack Weather Dashboard to display real-time weather data using React and Chart.js for interactive visualizations.",
        "Integrated Flask backend to fetch weather data using WeatherAPI, and used MongoDB to store and retrieve weather information.",
        "Built a real-time chatbot assistant using OpenAI API to provide users with weather-related insights.",
      ],
      categories: ["Software Engineering", "Cloud", "AI"], gradient: "from-blue-600 to-sky-700",
      link: "https://github.com/SuhasPalani/weather-dashboard", status: "Seasonal Hit",
    },
    {
      title: "Bitcoin Prediction",
      period: "Dec 2024 - Present",
      description: "ML-based system for Bitcoin price trend forecasting.",
      details: [
        "Developed ML_Bitcoin_Prediction system with D3.js for interactive data visualization of Bitcoin price trends and forecasts.",
        "Implemented multiple machine learning models, with ARIMA providing 95.2% accuracy on a 15-year dataset.",
        "Utilized time series forecasting to improve predictive accuracy and decision-making for cryptocurrency market analysis.",
      ],
      categories: ["ML", "Software Engineering"], gradient: "from-yellow-600 to-amber-700",
      link: "https://github.com/SuhasPalani/ML_Bitcoin_Prediction", status: "Golden Record",
    },
    {
      title: "SUMMARAIZE",
      period: "Apr 2024 - Sept 2024",
      description: "Multimodal AI platform with web and mobile apps.",
      details: [
        "Developed a multimodal AI platform with web and mobile apps using Python Flask, MongoDB, HTML, CSS, JavaScript, and React Native.",
        "Enhanced mobile user engagement by 28% through optimized design and chatbot integration.",
        "Led API testing and validation using Postman, covering 25+ endpoints.",
        "Earned recognition at OraHacks and TikTok Tech Jam, competing against 600+ teams.",
      ],
      categories: ["AI", "Software Engineering"], gradient: "from-green-600 to-emerald-700",
      link: "https://github.com/SuhasPalani/summaraize-native", status: "Award Winner",
    },
    {
      title: "Airbnb Data Pipeline Optimization",
      period: "Jun 2024 - Jul 2024",
      description: "Optimized DBT data pipeline for improved performance.",
      details: [
        "Built a robust data pipeline using DBT, ensuring clean datasets and optimized query performance in Snowflake.",
        "Automated ETL process, cutting manual data processing time by 50%.",
        "Implemented rigorous testing strategies for data quality and integrity.",
      ],
      categories: ["Other"], gradient: "from-orange-600 to-red-700",
      link: "https://github.com/SuhasPalani/DBT", status: "Engineering Excellence",
    },
    {
      title: "GitHub Analytics Dashboard",
      period: "Mar 2024 - Apr 2024",
      description: "Real-time GitHub repository activity analytics.",
      details: [
        "Developed a React-based web application to display real-time data from popular GitHub repositories.",
        "Deployed the application on Google Cloud Platform (GCP).",
        "Built a Flask backend server to handle API requests and process data.",
        "Integrated machine learning models to predict and forecast repository activity trends.",
        "Created interactive data visualizations using Plotly and Matplotlib.",
      ],
      categories: ["Cloud", "ML", "Software Engineering"], gradient: "from-slate-600 to-gray-700",
      link: "https://github.com/SuhasPalani/spm-assignment-5", status: "Developer's Choice",
    },
  ];

  const filters = [
    { name: "All", icon: null },
    { name: "Software Engineering", icon: <FaCode size={11} /> },
    { name: "AI", icon: <FaBrain size={11} /> },
    { name: "Cloud", icon: <FaCloud size={11} /> },
    { name: "ML", icon: <FaBrain size={11} /> },
    { name: "Other", icon: null },
  ];

  const filteredProjects = activeFilter === "All" ? projects : projects.filter(p => p.categories.includes(activeFilter));

  useEffect(() => {
    setActiveIndex(Math.min(3, Math.floor(filteredProjects.length / 2)));
  }, [filteredProjects.length]);

  const navigate = (dir) => {
    setActiveIndex(prev => {
      const next = prev + dir;
      if (next < 0) return filteredProjects.length - 1;
      if (next >= filteredProjects.length) return 0;
      return next;
    });
  };

  // Calculate 3D card transforms for curved carousel
  const getCardStyle = (index) => {
    const diff = index - activeIndex;
    const absDiff = Math.abs(diff);
    const maxVisible = 4;

    if (absDiff > maxVisible) return { opacity: 0, pointerEvents: 'none', transform: 'scale(0.5)' };

    const translateX = diff * 260;
    const translateZ = -absDiff * 120;
    const rotateY = diff * -8;
    const scale = 1 - absDiff * 0.08;
    const opacity = 1 - absDiff * 0.2;

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: Math.max(opacity, 0),
      zIndex: 10 - absDiff,
      filter: absDiff > 0 ? `brightness(${1 - absDiff * 0.15})` : 'none',
    };
  };

  return (
    <section id="projects" className="relative section-padding overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 glow-line" />

      <div className="section-container relative">
        <div ref={headerRef} className={`max-w-3xl mb-16 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-sm font-mono tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--gold)' }}>Projects</p>
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 t-text">Greatest Hits <span className="text-gradient">Collection</span></h2>
          <p className="text-xl" style={{ color: 'var(--text-tertiary)' }}>A curated showcase of digital compositions and code orchestrations.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-16">
          {filters.map(f => (
            <button key={f.name} onClick={() => setActiveFilter(f.name)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase transition-all duration-300"
              style={{
                background: activeFilter === f.name ? 'var(--gold-subtle)' : 'transparent',
                border: `1px solid ${activeFilter === f.name ? 'var(--bg-card-border-hover)' : 'var(--bg-card-border)'}`,
                color: activeFilter === f.name ? 'var(--gold)' : 'var(--text-muted)',
              }}>
              {f.icon} {f.name}
            </button>
          ))}
        </div>

        {/* 3D Curved Carousel */}
        <div className="relative mb-16">
          {/* Navigation arrows */}
          <button onClick={() => navigate(-1)} aria-label="Previous project"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-xl transition-all hover:scale-110"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', color: 'var(--text-tertiary)' }}>
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => navigate(1)} aria-label="Next project"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-xl transition-all hover:scale-110"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', color: 'var(--text-tertiary)' }}>
            <ChevronRight size={20} />
          </button>

          {/* Carousel */}
          <div ref={carouselRef} role="region" aria-label="Projects carousel" className="carousel-perspective flex items-center justify-center h-[420px] overflow-hidden relative" style={{ perspective: '2000px' }}>
            <div className="relative preserve-3d" style={{ transformStyle: 'preserve-3d' }}>
              {filteredProjects.map((project, index) => (
                <div
                  key={index}
                  className="absolute top-0 left-1/2 w-[240px] carousel-card -ml-[120px]"
                  style={{
                    ...getCardStyle(index),
                    transition: 'all 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                >
                  <div className="card-3d h-[380px] flex flex-col gold-glow-border cursor-pointer"
                    onClick={() => setActiveIndex(index)}>
                    {/* Card visual top */}
                    <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex-shrink-0 rounded-t-2xl`}>
                      {/* Vinyl record */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-28 h-28 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center ${activeIndex === index ? 'animate-vinyl-spin' : ''}`}>
                          <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center border border-white/5">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gold-300 to-gold-500" />
                          </div>
                          {/* Grooves */}
                          <div className="absolute inset-3 rounded-full border border-white/5" />
                          <div className="absolute inset-6 rounded-full border border-white/[0.03]" />
                        </div>
                      </div>
                      {/* Status badge */}
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                        <span className="text-[9px] font-mono text-white/80 uppercase tracking-wider">{project.status}</span>
                      </div>
                    </div>

                    {/* Card content */}
                    <div className="flex-1 p-4 flex flex-col">
                      <h3 className="text-sm font-display font-bold t-text mb-1.5 line-clamp-2 leading-snug">{project.title}</h3>
                      <p className="text-[11px] leading-relaxed line-clamp-2 mb-3" style={{ color: 'var(--text-muted)' }}>{project.description}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{project.period}</span>
                        <a href={project.link} target="_blank" rel="noopener noreferrer"
                          className="p-1.5 rounded-lg transition-all hover:scale-110"
                          style={{ background: 'var(--gold-subtle)', color: 'var(--gold)' }}
                          onClick={(e) => e.stopPropagation()}>
                          <ArrowUpRight size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {filteredProjects.map((_, i) => (
              <button key={i} onClick={() => setActiveIndex(i)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: activeIndex === i ? 'var(--gold)' : 'var(--bg-card-border)',
                  transform: activeIndex === i ? 'scale(1.3)' : 'scale(1)',
                }} />
            ))}
          </div>
        </div>

        {/* Active project detail panel */}
        {filteredProjects[activeIndex] && (
          <div className="glass-card p-6 md:p-8 max-w-4xl mx-auto" key={activeIndex}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--gold)' }}>{filteredProjects[activeIndex].status}</span>
                <h3 className="text-2xl font-display font-bold t-text mt-1">{filteredProjects[activeIndex].title}</h3>
                <p className="text-sm mt-2" style={{ color: 'var(--text-tertiary)' }}>{filteredProjects[activeIndex].description}</p>
              </div>
              <a href={filteredProjects[activeIndex].link} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs py-2 px-4 flex-shrink-0">
                <ExternalLink size={12} className="mr-1.5" /> View Code
              </a>
            </div>

            {/* Details / bullet points */}
            {filteredProjects[activeIndex].details && filteredProjects[activeIndex].details.length > 0 && (
              <div className="space-y-3 mb-5">
                {filteredProjects[activeIndex].details.map((detail, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${filteredProjects[activeIndex].gradient} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5 opacity-50 group-hover:opacity-100 transition-opacity`}>
                      {i + 1}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{detail}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Footer meta */}
            <div className="glow-line mb-4" />
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                <Calendar size={12} /> <span className="text-xs font-mono">{filteredProjects[activeIndex].period}</span>
              </div>
              <div className="flex gap-1.5">
                {filteredProjects[activeIndex].categories.map((cat, i) => (
                  <span key={i} className="tag-pill text-[10px] py-0.5">{cat}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>No tracks found in this genre. Stay tuned!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
