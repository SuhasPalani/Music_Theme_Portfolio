import React, { useState, useEffect } from "react";
import { Database, Code, Terminal, Cloud, Globe, Sparkles, Zap, Star } from "lucide-react";

const AboutMe = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(newParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + particle.speed) % 110,
        x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.1,
      })));
    }, 50);

    const handleMouseMove = (e) => {
      const rect = document.querySelector('#about')?.getBoundingClientRect();
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

  const skillCategories = [
    {
      title: "PROGRAMMING LANGUAGES",
      icon: <Terminal size={22} className="text-cyan-400" />,
      skills: [
        "Python", "JAVA", "C/C++", "Shell-Scripting", 
        "HTML", "CSS", "JavaScript"
      ],
      gradient: "from-cyan-400 via-purple-500 to-pink-500",
      magicalColor: "cyan",
    },
    {
      title: "FRAMEWORKS",
      icon: <Code size={22} className="text-purple-400" />,
      skills: [
        "Django", "Flask", "React", "React Native", 
        "Node.js", "Pandas", "NumPy"
      ],
      gradient: "from-purple-400 via-pink-500 to-red-500",
      magicalColor: "purple",
    },
    {
      title: "DATABASES AND TOOLS",
      icon: <Database size={22} className="text-emerald-400" />,
      skills: [
        "PostgreSQL", "MongoDB", "SQL", "Snowflake", 
        "DBT Labs", "Redis", "UiPath", "Postman"
      ],
      gradient: "from-emerald-400 via-teal-500 to-blue-500",
      magicalColor: "emerald",
    },
    {
      title: "CLOUD AND DEVOPS TOOLS",
      icon: <Cloud size={22} className="text-blue-400" />,
      skills: [
        "AWS", "Docker", "Kubernetes", "Jenkins", 
        "Ansible", "GCP", "Unix", "Git", "Kafka", "Key Cloak"
      ],
      gradient: "from-blue-400 via-indigo-500 to-purple-500",
      magicalColor: "blue",
    },
  ];

  return (
    <section id="about" className="relative py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
      {/* Magical Background */}
      <div className="absolute inset-0">
        {/* Animated gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.3), transparent 40%)`
          }}
        />
        
        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            }}
          />
        ))}

        {/* Animated constellation lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <linearGradient id="constellation" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <path
            d="M100,200 Q300,100 500,200 T900,200"
            stroke="url(#constellation)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M50,400 Q250,300 450,400 T850,400"
            stroke="url(#constellation)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          {/* Left Column - Enhanced Record Player */}
          <div className="lg:w-1/2">
            <div className="relative group">
              <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 flex items-center">
                <Sparkles className="mr-4 text-purple-400 animate-spin" size={32} />
                About The Code Composer
              </h2>

              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Magical glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-75 animate-pulse group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Outer ring with floating elements */}
                <div className="relative record-player w-full h-full rounded-full overflow-hidden border-4 border-purple-500/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-blue-800 to-purple-900 animate-spin-slow"></div>
                  
                  {/* Holographic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-pulse"></div>
                  
                  {/* Center vinyl */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative">
                      {/* Vinyl grooves */}
                      <div className="absolute inset-4 rounded-full border border-gray-700 opacity-50"></div>
                      <div className="absolute inset-8 rounded-full border border-gray-600 opacity-40"></div>
                      <div className="absolute inset-12 rounded-full border border-gray-500 opacity-30"></div>
                      
                      {/* Center hub with magic effect */}
                      <div className="w-1/2 h-1/2 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-ping"></div>
                        <div className="w-1/4 h-1/4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Magical tonearm */}
                  <div className="absolute top-1/2 right-1/4 origin-left">
                    <div className="w-24 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full rotate-45 relative">
                      <div className="absolute right-0 top-1/2 w-4 h-4 bg-yellow-400 rounded-full transform -translate-y-1/2 animate-pulse shadow-lg shadow-yellow-400/50"></div>
                    </div>
                  </div>
                  
                  {/* Floating magical symbols */}
                  <Star className="absolute top-4 right-4 text-purple-400 animate-bounce" size={16} />
                  <Zap className="absolute bottom-4 left-4 text-pink-400 animate-bounce" size={16} style={{ animationDelay: '0.5s' }} />
                  <Sparkles className="absolute top-1/4 left-4 text-cyan-400 animate-bounce" size={14} style={{ animationDelay: '1s' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Enhanced Profile */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="flex items-center mb-6 group">
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative text-white font-bold text-lg">SP</span>
                <div className="absolute -inset-1 rounded-full border-2 border-purple-400/50 animate-spin"></div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300">
                  Suhas Palani
                </h3>
                <p className="text-purple-300 text-lg">
                  Digital Maestro | Code Virtuoso | Cloud Harmonist
                </p>
                <p className="text-gray-400">
                  Illinois Institute of Technology
                </p>
              </div>
            </div>

            <div className="relative mb-6">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              <p className="text-gray-300 text-lg leading-relaxed pl-4">
                A digital composer who orchestrates ideas into symphonic code. 
                I conduct algorithms like musical arrangements, harmonize scalable 
                architectures with perfect pitch, and compose applications that resonate 
                with users' souls. Currently mastering the sacred art of Computer Science 
                while composing the future's soundtrack, one melodic line of code at a time.
              </p>
            </div>

            <div className="flex space-x-4 mb-8">
              <a
                href="https://linkedin.com/in/suhaspalani/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-500 hover:to-blue-600 transition-all duration-300 flex items-center transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn Portal
              </a>
              <a
                href="https://github.com/SuhasPalani"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative py-3 px-6 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-full hover:from-gray-600 hover:to-gray-700 transition-all duration-300 flex items-center transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/25"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-500 to-gray-700 opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Code Vault
              </a>
            </div>

            {/* Magical Focus Section */}
            <div className="mt-auto">
              <div className="relative bg-gradient-to-r from-gray-800/80 to-purple-800/80 rounded-2xl p-6 border border-purple-500/30 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur"></div>
                <div className="relative">
                  <h4 className="text-white text-xl font-bold mb-3 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                      <Zap size={16} className="text-white animate-pulse" />
                    </div>
                    Current Rhythm & Flow
                  </h4>
                  <p className="text-gray-200 leading-relaxed">
                    Currently tuning into the ethereal frequencies of cloud architecture, 
                    composing AI melodies into web symphonies, and strengthening my 
                    backend bass lines to create harmonious solutions that scale 
                    beyond the audible spectrum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Skills Section */}
        <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 flex items-center justify-center">
          <Sparkles className="mr-4 text-purple-400 animate-spin" size={32} />
          Musical Instruments & Sonic Spells
          <Globe size={32} className="ml-4 text-cyan-400 animate-pulse" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl backdrop-blur-sm border border-gray-700/50"
            >
              {/* Magical glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
              
              {/* Animated border */}
              <div className={`h-1 bg-gradient-to-r ${category.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 animate-pulse"></div>
              </div>
              
              <div className="relative p-8">
                <div className="flex items-center mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${category.magicalColor}-500/20 to-${category.magicalColor}-700/20 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 border border-${category.magicalColor}-500/30`}>
                    <div className="relative">
                      {category.icon}
                      <div className={`absolute inset-0 text-${category.magicalColor}-400 animate-ping opacity-0 group-hover:opacity-75 transition-opacity`}>
                        {category.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      onMouseEnter={() => setHoveredSkill(`${index}-${idx}`)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                        hoveredSkill === `${index}-${idx}`
                          ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg transform scale-110`
                          : 'bg-gray-700/50 text-gray-200 hover:bg-gray-600/50'
                      }`}
                    >
                      {hoveredSkill === `${index}-${idx}` && (
                        <>
                          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
                          <Star className="absolute -top-1 -right-1 text-yellow-400 animate-spin" size={12} />
                        </>
                      )}
                      <span className="relative">{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional magical effects */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-900/50 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default AboutMe;