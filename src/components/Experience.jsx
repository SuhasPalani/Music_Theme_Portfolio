import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Music, Sparkles, Star, Zap, Headphones, Radio, Volume2, Play } from "lucide-react";

const Experience = () => {
  const [activeExp, setActiveExp] = useState(0);
  const [particles, setParticles] = useState([]);
  const [isHovering, setIsHovering] = useState(null);

  // Initialize magical particles
  useEffect(() => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.2 + 0.05,
      opacity: Math.random() * 0.4 + 0.2,
      color: ['purple', 'pink', 'cyan', 'blue', 'yellow'][Math.floor(Math.random() * 5)],
    }));
    setParticles(newParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + particle.speed) % 100,
        x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.03,
      })));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Tundra Technical Solutions",
      location: "Chicago, IL",
      period: "Nov 2025 - Present",
      description: [
        "🚀 Led end-to-end development of an AI-powered customer support chatbot using Next.js, LangGraph, and OpenAI modern APIs, creating intelligent conversation flows.",
        "🎯 Designed a RAG-based backend with Pinecone, boosting recommendation relevance by 45% and reducing LLM hallucinations through vector search optimization.",
        "🎫 Built AI-driven customer support workflows generating Jira tickets, helping internal teams resolve customer issues faster with automated triage.",
        "☁️ Delivered production-ready application on Azure, reducing customer support workload by 40% across enterprise teams globally.",
      ],
      color: "#10B981",
      gradient: "from-emerald-600 to-teal-600",
      icon: Radio,
      magical: "🚀",
    },
    {
      title: "Software Engineer Intern",
      company: "ONEBIT, INC.",
      location: "Chicago, IL",
      period: "Aug 2025 – Nov 2025",
      description: [
        "🔄 Built an idempotent ETL pipeline for 2,000+ clients, using distributed locking for data consistency and no duplicates across financial transactions.",
        "🔍 Developed a transfer detection service that pairs internal transfers, shielding 15% of transactions from expense misclassification.",
        "📊 Implemented a double-entry ledger system ensuring 100% transactional balance and an immutable financial audit trail.",
        "💰 Created daily reconciliation to automatically confirm 99.8% cash balance accuracy, minimizing financial drift risk.",
      ],
      color: "#6366F1",
      gradient: "from-indigo-600 to-purple-600",
      icon: Headphones,
      magical: "🔄",
    },
    {
      title: "Full Stack Software Developer",
      company: "Budhhi Technologies",
      location: "Remote (Non-profit, Volunteer)",
      period: "Jan 2025 – Present",
      description: [
        "🤖 Built AI matchmaking system using Python and TensorFlow, increasing match accuracy by 30% across 500+ profiles.",
        "📝 Designed automated NDA platform on Node.js and AWS Lambda, cutting legal review times by 40% effectively.",
        "⚡ Delivered responsive React/Redux applications with PostgreSQL, improving user engagement by 25% and page load efficiency.",
        "🐳 Deployed containerized AWS infrastructure with Docker, ensuring 99.9% uptime and enhanced system scalability.",
      ],
      color: "#EC4899",
      gradient: "from-pink-600 to-rose-600",
      icon: Music,
      magical: "🤖",
    },
    {
      title: "Backend Virtuoso",
      company: "Planet Celluloid Pvt Ltd",
      location: "India",
      period: "Dec 2024 - Mar 2025",
      description: [
        "🎼 Orchestrating backend symphonies with MongoDB, harmonizing system performance and optimizing data queries like a skilled conductor.",
        "🎵 Composing automated data loading systems that dance gracefully into MongoDB, reducing manual effort while the tempo of processing speeds up.",
        "🎶 Crafting algorithmic matchmaking melodies that connect brands with talents, creating perfect harmonies with 20% improved efficiency.",
        "🎧 Weaving AI-powered magic with Python and OpenAI, adding enchanting new capabilities to the platform's repertoire.",
      ],
      color: "#4F46E5",
      gradient: "from-indigo-600 to-purple-600",
      icon: Radio,
      magical: "🎼",
      // genre: "Backend Symphony"
    },
    {
      title: "Digital Architect",
      company: "Hamilton Digital Assets",
      location: "Chicago, IL",
      period: "Oct 2024 – Dec 2024",
      description: [
        "🎹 Architected authentication crescendos using MongoDB, Kafka, and Keycloak, creating microservice harmonies that reduced security vulnerabilities by 40%.",
        "🎸 Strummed React/React Native interfaces with GraphQL strings, improvising 20% faster load times and enchanting user experiences.",
        "🥁 Drummed up AI-powered chatbot rhythms with Node.js on Kubernetes, accelerating customer support response times by 30% across the digital stage.",
      ],
      color: "#8B5CF6",
      gradient: "from-purple-600 to-pink-600",
      icon: Headphones,
      magical: "🎹",
      // genre: "Tech Jazz"
    },
    {
      title: "Knowledge Conductor",
      company: "Illinois Institute of Technology",
      location: "Chicago, IL",
      period: "Aug 2024 - Dec 2024",
      description: [
        "🎺 Conducting educational orchestras in Software Project Management, guiding graduate musicians through complex technical compositions.",
        "🎻 Mentoring student virtuosos in their software development performances, helping them master intricate coding arrangements.",
        "🎪 Hosting tutoring concerts where complex topics transform into beautiful, understandable melodies for eager learners.",
        "📝 Composing constructive feedback symphonies that inspire students to reach new creative heights in their technical journey.",
      ],
      color: "#EC4899",
      gradient: "from-pink-600 to-rose-600",
      icon: Music,
      magical: "🎺",
      // genre: "Educational Classical"
    },
    {
      title: "Full Stack Maestro",
      company: "Whiterock Technologies",
      location: "Bengaluru, KA",
      period: "Mar 2022 - May 2023",
      description: [
        "⚡ Electrified website performance with 15% speed boosts, handling 500+ daily user concerts with Dockerized production magic.",
        "📱 Choreographed responsive layouts that danced across desktop, tablet, and mobile stages, increasing mobile engagement by 20%.",
        "🔗 Harmonized front-end and back-end integrations with REST API melodies, reducing data discord by 25% while automating quality assurance.",
      ],
      color: "#f6af3b",
      gradient: "from-yellow-500 to-orange-500",
      icon: Zap,
      magical: "⚡",
      // genre: "Electronic Fusion"
    },
    {
      title: "Digital Composer",
      company: "Varcons' Tech Pvt Ltd",
      location: "Bengaluru, KA",
      period: "Aug 2022 - Sept 2022",
      description: [
        "🌟 Engineered digital masterpieces with HTML, CSS, JavaScript, and Django, boosting application responsiveness by 15%.",
        "🚀 Launched traffic crescendos with 35% increases through responsive design magic and enchanting user experiences.",
        "⏰ Accelerated development rhythms, reducing time-to-market by 25% through scalable architectural frameworks.",
        "🤝 Collaborated in a 5-member ensemble, delivering 3 harmonious solutions that exceeded expectations and timelines.",
      ],
      color: "#3B82F6",
      gradient: "from-blue-600 to-cyan-600",
      icon: Star,
      magical: "🌟",
      // genre: "Web Pop"
    },
  ];

  const getColorValue = (color) => {
    const colorMap = {
      'purple': '#a855f7',
      'pink': '#ec4899',
      'cyan': '#06b6d4',
      'blue': '#3b82f6',
      'yellow': '#eab308'
    };
    return colorMap[color] || '#a855f7';
  };

  return (
    <section id="experience" className="relative py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 overflow-hidden">
      {/* Magical background particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            background: getColorValue(particle.color),
            boxShadow: `0 0 10px ${getColorValue(particle.color)}`,
          }}
        />
      ))}

      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-cyan-600/10 animate-pulse"></div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Magical Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-4">
              ✨ Musical Journey Collection ✨
            </h2>
            <div className="absolute -top-4 -right-8">
              <Sparkles className="text-purple-400 animate-spin" size={24} />
            </div>
            <div className="absolute -bottom-2 -left-6">
              <Star className="text-pink-400 animate-bounce" size={20} />
            </div>
          </div>
          <p className="text-purple-300 text-lg flex items-center justify-center gap-2">
            <Music className="animate-pulse" size={20} />
            Each experience is a unique composition in my professional symphony
            <Volume2 className="animate-pulse" size={20} />
          </p>
          <div className="mt-4 w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Album Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {experiences.map((exp, index) => {
            const IconComponent = exp.icon;
            return (
              <div
                key={index}
                onClick={() => setActiveExp(index)}
                onMouseEnter={() => setIsHovering(index)}
                onMouseLeave={() => setIsHovering(null)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 transform ${
                  activeExp === index 
                    ? "scale-105 shadow-2xl shadow-purple-500/30" 
                    : "hover:scale-102 hover:shadow-xl hover:shadow-purple-500/20"
                }`}
              >
                {/* Magical glow border */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${exp.gradient} rounded-2xl opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur`}></div>
                
                <div className={`relative bg-gradient-to-br ${exp.gradient} aspect-square`}>
                  {/* Vinyl Record Design */}
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="relative w-5/6 h-5/6 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      {/* Inner record circle */}
                      <div className="w-3/5 h-3/5 rounded-full bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4 border border-white/10">
                        <div className="mb-2">
                          <IconComponent size={24} className="text-white mx-auto animate-pulse" />
                        </div>
                        <h3 className="text-white font-bold text-sm mb-1 leading-tight">
                          {exp.title}
                        </h3>
                        <p className="text-white/90 text-xs font-medium">
                          {exp.company}
                        </p>
                        <div className="text-lg mt-1 animate-bounce">
                          {exp.magical}
                        </div>
                      </div>
                      
                      {/* Center hole */}
                      <div className="absolute w-6 h-6 rounded-full bg-black/80 border border-white/30"></div>
                      
                      {/* Record grooves */}
                      <div className="absolute inset-4 rounded-full border border-white/10"></div>
                      <div className="absolute inset-8 rounded-full border border-white/5"></div>
                    </div>
                  </div>

                  {/* Spinning effect when active */}
                  {(activeExp === index || isHovering === index) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5/6 h-5/6 rounded-full border-2 border-white/20 animate-spin-slow"></div>
                      <div className="absolute w-1/3 h-1/3 rounded-full border border-yellow-400/50 animate-ping"></div>
                    </div>
                  )}

                  {/* Magical sparkles */}
                  {activeExp === index && (
                    <>
                      <Sparkles className="absolute top-4 right-4 text-yellow-300 animate-spin" size={16} />
                      <Star className="absolute bottom-4 left-4 text-pink-300 animate-bounce" size={14} />
                      <Zap className="absolute top-1/2 left-2 text-cyan-300 animate-pulse" size={12} />
                    </>
                  )}
                </div>

                {/* Album Info Card */}
                <div className="relative bg-gray-800/95 backdrop-blur-sm p-4 border-t border-purple-500/20">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar size={14} className="text-purple-400 mr-2 animate-pulse" />
                      <span className="text-purple-300 font-medium">{exp.period}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin size={14} className="text-pink-400 mr-2 animate-pulse" />
                      <span className="text-pink-300 font-medium">{exp.location}</span>
                    </div>
                    <div className="text-xs text-cyan-300 font-medium flex items-center">
                      {/* <Play size={12} className="mr-1 animate-pulse" /> */}
                      {/* Genre: {exp.genre} */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Now Playing - Experience Details */}
        <div className="relative bg-gradient-to-r from-gray-800/80 via-purple-900/20 to-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-cyan-600/10 rounded-2xl animate-pulse"></div>
          
          {/* Header */}
          <div className="relative flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center animate-pulse">
                <Music size={24} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-sm text-green-400 font-medium">NOW PLAYING</span>
                </div>
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300">
                  {experiences[activeExp].title}
                </h3>
                <p className="text-purple-400 font-medium">
                  at {experiences[activeExp].company}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-purple-300 mb-1 flex items-center">
                <Calendar size={16} className="mr-2" />
                {experiences[activeExp].period}
              </p>
              <p className="text-pink-300 flex items-center">
                <MapPin size={16} className="mr-2" />
                {experiences[activeExp].location}
              </p>
            </div>
          </div>

          {/* Track Listing */}
          <div className="relative">
            <h4 className="text-lg font-semibold text-purple-300 mb-4 flex items-center">
              <Headphones size={18} className="mr-2 animate-pulse" />
              Track Highlights
            </h4>
            <div className="space-y-4">
              {experiences[activeExp].description.map((item, index) => (
                <div key={index} className="group flex items-start space-x-4 p-3 rounded-lg hover:bg-purple-900/20 transition-all duration-300">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-sm text-white font-bold group-hover:animate-pulse">
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {item}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play size={16} className="text-purple-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audio Visualizer Effect */}
          <div className="mt-6 flex items-center justify-center space-x-1">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-purple-500 to-pink-400 rounded-full transition-all duration-300"
                style={{
                  width: '3px',
                  height: `${Math.sin(Date.now() * 0.01 + i * 0.3) * 10 + 15}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Experience;