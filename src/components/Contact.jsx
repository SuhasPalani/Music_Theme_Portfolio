import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, Github, Globe, Sparkles, Music, Zap, Star, Heart, MessageCircle } from "lucide-react";
import emailjs from "emailjs-com";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    // Generate floating musical particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.4 + 0.2,
      color: ['#8B5CF6', '#06B6D4', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 4)],
    }));
    setParticles(newParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + particle.speed) % 110,
        x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.08,
      })));
    }, 50);

    const handleMouseMove = (e) => {
      const rect = document.querySelector('#contact')?.getBoundingClientRect();
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

  // Access environment variables directly without importing dotenv
  const emailJsConfig = {
    serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
    templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
    userId: process.env.REACT_APP_EMAILJS_USER_ID,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // For demonstration, we'll simulate the email sending
    // setTimeout(() => {
    //   setIsSubmitting(false);
    //   setSubmitSuccess(true);
    //   setFormData({ name: "", email: "", message: "" });

    //   // Reset submit success message after 5 seconds
    //   setTimeout(() => {
    //     setSubmitSuccess(false);
    //   }, 5000);
    // }, 2000);
emailjs
    .send(
      emailJsConfig.serviceId,
      emailJsConfig.templateId,
      formData,
      emailJsConfig.userId
    )
    .then(
      () => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", message: "" });

        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      },
      (error) => {
        setIsSubmitting(false);
        console.error("Failed to send message:", error);
      }
    );
};

  const contactMethods = [
    {
      icon: <Mail size={20} className="text-purple-400" />,
      title: "Digital Frequency",
      content: "suhaspalani23@gmail.com",
      description: "Send me a harmonic message",
      gradient: "from-purple-500 to-pink-500",
      href: "mailto:suhaspalani23@gmail.com"
    },
    {
      icon: <Phone size={20} className="text-cyan-400" />,
      title: "Voice Channel",
      content: "773-850-4663",
      description: "Let's tune into conversation",
      gradient: "from-cyan-500 to-blue-500",
      href: "tel:773-850-4663"
    },
    {
      icon: <MapPin size={20} className="text-emerald-400" />,
      title: "Physical Wavelength",
      content: "Chicago, IL",
      description: "Where the magic happens",
      gradient: "from-emerald-500 to-teal-500",
      href: "#"
    }
  ];

  const socialPlatforms = [
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      name: "LinkedIn Network",
      url: "https://linkedin.com/in/suhaspalani/",
      gradient: "from-blue-600 to-blue-700",
      hoverGradient: "hover:from-blue-500 hover:to-blue-600"
    },
    {
      icon: <Github size={18} />,
      name: "Code Symphony",
      url: "https://Github.com/SuhasPalani",
      gradient: "from-gray-700 to-gray-800",
      hoverGradient: "hover:from-gray-600 hover:to-gray-700"
    },
    {
      icon: <Globe size={18} />,
      name: "Digital Stage",
      url: "https://suhaspalani23.netlify.app/",
      gradient: "from-purple-600 to-purple-700",
      hoverGradient: "hover:from-purple-500 hover:to-purple-600"
    }
  ];

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
      {/* Magical Background Effects */}
      <div className="absolute inset-0">
        {/* Dynamic gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30 transition-opacity duration-500"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.4), transparent 50%)`
          }}
        />
        
        {/* Floating musical particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              boxShadow: `0 0 15px ${particle.color}80`,
            }}
          />
        ))}

        {/* Animated constellation lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <linearGradient id="contactConstellation" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          <path
            d="M100,150 Q400,50 700,150 T1100,150"
            stroke="url(#contactConstellation)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M50,350 Q350,250 650,350 T1050,350"
            stroke="url(#contactConstellation)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1.5s' }}
          />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 flex items-center justify-center">
            <Music className="mr-4 text-purple-400 animate-bounce" size={40} />
            Compose a Connection
            <MessageCircle size={40} className="ml-4 text-cyan-400 animate-pulse" />
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Let's orchestrate something amazing together! Send me a message and let's harmonize 
            ideas into extraordinary digital symphonies.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-3xl p-8 backdrop-blur-sm border border-purple-500/30">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8 flex items-center">
                  <Sparkles className="mr-3 text-purple-400 animate-spin" size={28} />
                  Harmonic Frequencies
                </h3>

                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="group/item">
                      <a 
                        href={method.href}
                        className="flex items-start p-4 rounded-2xl transition-all duration-300 hover:bg-gray-700/50 hover:scale-105 cursor-pointer"
                      >
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${method.gradient} flex items-center justify-center mr-4 group-hover/item:scale-110 transition-transform duration-300 shadow-lg`}>
                          <div className="relative">
                            {method.icon}
                            <div className="absolute inset-0 animate-ping opacity-0 group-hover/item:opacity-75 transition-opacity">
                              {method.icon}
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-bold text-lg mb-1 group-hover/item:text-transparent group-hover/item:bg-clip-text group-hover/item:bg-gradient-to-r group-hover/item:from-purple-400 group-hover/item:to-pink-400 transition-all duration-300">
                            {method.title}
                          </h4>
                          <p className="text-gray-300 font-medium mb-1">{method.content}</p>
                          <p className="text-gray-400 text-sm">{method.description}</p>
                        </div>
                        <Star className="text-yellow-400 opacity-0 group-hover/item:opacity-100 group-hover/item:animate-spin transition-all duration-300" size={16} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Platforms */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-3xl p-8 backdrop-blur-sm border border-cyan-500/30">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6 flex items-center">
                  <Zap className="mr-3 text-cyan-400 animate-pulse" size={24} />
                  Social Wavelengths
                </h3>
                
                <div className="flex flex-wrap gap-4">
                  {socialPlatforms.map((platform, index) => (
                    <a
                      key={index}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group/social relative py-3 px-6 bg-gradient-to-r ${platform.gradient} text-white rounded-full ${platform.hoverGradient} transition-all duration-300 flex items-center transform hover:scale-110 hover:shadow-lg`}
                    >
                      <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover/social:opacity-100 blur transition-opacity duration-300"></div>
                      <div className="relative flex items-center">
                        {platform.icon}
                        <span className="ml-2 font-medium">{platform.name}</span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-0 group-hover/social:opacity-100 transition-opacity"></div>
                    </a>
                  ))}
                </div>

                {/* Personal Touch */}
                <div className="mt-8 flex items-center p-4 rounded-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30">
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">SP</span>
                    <Heart className="absolute -top-1 -right-1 text-pink-400 animate-pulse" size={14} />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">The Digital Composer</p>
                    <p className="text-gray-300 text-sm">
                      Ready to harmonize your ideas into reality! 🎵
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Message Form */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-3xl p-8 backdrop-blur-sm border border-pink-500/30">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-8 flex items-center">
                <Music className="mr-3 text-pink-400 animate-bounce" size={28} />
                Compose Your Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group/field">
                  <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
                    Your Name (The Composer)
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full bg-gray-700/50 border-2 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-300 ${
                      focusedField === 'name' 
                        ? 'border-purple-500 shadow-lg shadow-purple-500/25 transform scale-105' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    placeholder="What should I call you?"
                  />
                  {focusedField === 'name' && (
                    <div className="absolute -top-1 -right-1">
                      <Sparkles className="text-purple-400 animate-spin" size={16} />
                    </div>
                  )}
                </div>

                <div className="relative group/field">
                  <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                    Email Frequency
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full bg-gray-700/50 border-2 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-pink-500 outline-none transition-all duration-300 ${
                      focusedField === 'email' 
                        ? 'border-pink-500 shadow-lg shadow-pink-500/25 transform scale-105' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    placeholder="your.harmony@email.com"
                  />
                  {focusedField === 'email' && (
                    <div className="absolute -top-1 -right-1">
                      <Star className="text-pink-400 animate-pulse" size={16} />
                    </div>
                  )}
                </div>

                <div className="relative group/field">
                  <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">
                    Your Musical Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows="6"
                    className={`w-full bg-gray-700/50 border-2 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none resize-none transition-all duration-300 ${
                      focusedField === 'message' 
                        ? 'border-cyan-500 shadow-lg shadow-cyan-500/25 transform scale-105' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    placeholder="Share your ideas, dreams, or just say hello! Let's create something magical together..."
                  ></textarea>
                  {focusedField === 'message' && (
                    <div className="absolute -top-1 -right-1">
                      <Zap className="text-cyan-400 animate-bounce" size={16} />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`relative w-full group/btn overflow-hidden rounded-xl py-4 px-8 font-bold text-lg transition-all duration-500 transform hover:scale-105 ${
                    isSubmitting
                      ? "bg-gray-600 cursor-not-allowed"
                      : submitSuccess
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 shadow-lg shadow-green-500/25"
                      : "bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 shadow-lg shadow-purple-500/25"
                  }`}
                >
                  {/* Magical button overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                  
                  <span className="relative flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Transmitting Magic...
                      </>
                    ) : submitSuccess ? (
                      <>
                        <svg
                          className="w-6 h-6 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        Message Sent Successfully! 🎵
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-2 group-hover/btn:animate-pulse" />
                        Send My Symphony
                        <Sparkles size={16} className="ml-2 animate-pulse" />
                      </>
                    )}
                  </span>
                </button>
              </form>

              {submitSuccess && (
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                  <p className="text-green-300 text-center font-medium">
                    🎉 Your message has been harmoniously transmitted! I'll compose a response soon!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional magical effects */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-900/50 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Contact;