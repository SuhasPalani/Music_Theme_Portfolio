import React, { useState, useEffect } from 'react';
import { ArrowUp, Sparkles, Zap, Star, Music, Heart, Globe } from 'lucide-react';

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Generate magical particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.4 + 0.2,
    }));
    setParticles(newParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y - particle.speed + 100) % 100,
        x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.05,
      })));
    }, 50);

    const handleMouseMove = (e) => {
      const rect = document.querySelector('#magical-footer')?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer id="magical-footer" className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white py-16 overflow-hidden">
      {/* Magical Background Effects */}
      <div className="absolute inset-0">
        {/* Dynamic gradient overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(500px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.4), transparent 50%)`
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
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.4)',
            }}
          />
        ))}

        {/* Animated constellation lines */}
        <svg className="absolute inset-0 w-full h-full opacity-15">
          <defs>
            <linearGradient id="footerConstellation" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 Q200,50 400,100 T800,100"
            stroke="url(#footerConstellation)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M100,150 Q300,100 500,150 T900,150"
            stroke="url(#footerConstellation)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1.5s' }}
          />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          {/* Enhanced Brand Section */}
          <div className="lg:w-1/3">
            <div className="group mb-6">
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-all duration-500">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative text-white font-bold text-xl">SP</span>
                  <div className="absolute -inset-1 rounded-full border-2 border-purple-400/50 animate-spin"></div>
                  <Star className="absolute -top-1 -right-1 text-yellow-400 animate-bounce" size={12} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Suhas Palani
                  </h3>
                  <p className="text-purple-300 text-lg">Digital Maestro & Code Virtuoso</p>
                </div>
              </div>
              
              <div className="relative bg-gradient-to-r from-gray-800/60 to-purple-800/60 rounded-xl p-4 border border-purple-500/30 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur"></div>
                <div className="relative flex items-center">
                  <Music className="mr-3 text-cyan-400 animate-pulse" size={20} />
                  <p className="text-gray-200 text-sm italic">
                    "Composing tomorrow's digital symphonies, one line of code at a time."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation Links */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sonic Navigation */}
            <div className="group">
              <h4 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center">
                <Sparkles className="mr-2 text-cyan-400 animate-spin" size={16} />
                Sonic Navigation
              </h4>
              <ul className="space-y-3">
                {[
                  { href: "#home", label: "Main Stage", icon: <Star size={14} /> },
                  { href: "#about", label: "The Composer", icon: <Zap size={14} /> },
                  { href: "#experience", label: "Performance History", icon: <Music size={14} /> },
                  { href: "#projects", label: "Musical Creations", icon: <Sparkles size={14} /> },
                  { href: "#contact", label: "Connect & Collaborate", icon: <Heart size={14} /> }
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="group/link flex items-center text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-300 transform hover:translate-x-2"
                    >
                      <span className="mr-2 text-purple-400 group-hover/link:text-pink-400 group-hover/link:animate-pulse transition-all duration-300">
                        {link.icon}
                      </span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Magical Connections */}
            <div className="group">
              <h4 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 flex items-center">
                <Zap className="mr-2 text-pink-400 animate-pulse" size={16} />
                Magical Portals
              </h4>
              <ul className="space-y-3">
                {[
                  { href: "mailto:suhaspalani23@gmail.com", label: "Digital Owl Post", external: false },
                  { href: "https://linkedin.com/in/suhaspalani/", label: "Professional Realm", external: true },
                  { href: "https://github.com/SuhasPalani", label: "Code Sanctuary", external: true },
                  { href: "https://suhaspalani23.netlify.app/", label: "Personal Universe", external: true }
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group/link flex items-center text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-400 hover:to-cyan-400 transition-all duration-300 transform hover:translate-x-2"
                    >
                      <span className="mr-2 text-pink-400 group-hover/link:text-cyan-400 transition-all duration-300">
                        <Globe size={14} className="group-hover/link:animate-spin" />
                      </span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mystical Stats */}
            <div className="group">
              <h4 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-purple-400 flex items-center">
                <Star className="mr-2 text-emerald-400 animate-bounce" size={16} />
                Mystical Metrics
              </h4>
              <div className="space-y-3">
                {[
                  { label: "Lines of Code Composed", value: "∞", color: "text-emerald-400" },
                  { label: "Magical Projects", value: "25+", color: "text-purple-400" },
                  { label: "Technologies Mastered", value: "20+", color: "text-pink-400" },
                  { label: "Digital Symphonies", value: "∞", color: "text-cyan-400" }
                ].map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{stat.label}</span>
                    <span className={`font-bold ${stat.color} animate-pulse`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Copyright Section */}
        <div className="relative mt-12 pt-8">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-300 flex items-center justify-center md:justify-start">
                <Heart className="mr-2 text-pink-400 animate-pulse" size={16} />
                © {new Date().getFullYear()} Suhas Palani. Crafted with magical code.
              </p>
              <p className="text-gray-500 text-sm mt-1 flex items-center justify-center md:justify-start">
                <Sparkles className="mr-1 text-purple-400" size={12} />
                Built with React, Tailwind CSS & Pure Imagination
              </p>
            </div>

            <div className="text-center md:text-right">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-sm font-medium italic">
                "Every bug is just an undiscovered feature waiting to be composed."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Magical Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white shadow-2xl transform transition-all duration-500 hover:scale-110 hover:shadow-purple-500/50 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
        style={{ zIndex: 1000 }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-ping opacity-20"></div>
        <div className="relative flex items-center justify-center h-full">
          <ArrowUp size={22} className="animate-bounce" />
        </div>
        <div className="absolute -inset-1 rounded-full border-2 border-purple-400/30 animate-spin"></div>
      </button>

      {/* Bottom Magical Glow */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black via-purple-900/30 to-transparent pointer-events-none"></div>
    </footer>
  );
};

export default Footer;