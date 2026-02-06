import React, { useState, useEffect, useRef } from "react";
import {
  Music,
  Sparkles,
  Zap,
  Star,
  Headphones,
  Play,
  Pause,
} from "lucide-react";

const HeroSection = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [particles, setParticles] = useState([]);
  const [waveformData, setWaveformData] = useState([]);
  const [textGlitch, setTextGlitch] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Generate magical particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 8 + 2,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      color: `hsl(${Math.random() * 60 + 240}, 100%, ${
        Math.random() * 30 + 50
      }%)`,
      angle: Math.random() * Math.PI * 2,
      spin: Math.random() * 0.02 - 0.01,
      pulse: Math.random() * 0.02 + 0.01,
    }));
    setParticles(newParticles);

    // Generate waveform data
    const waveform = Array.from(
      { length: 64 },
      (_, i) => Math.sin(i * 0.1) * (Math.random() * 0.5 + 0.5)
    );
    setWaveformData(waveform);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw constellation connections
      ctx.strokeStyle = "rgba(147, 51, 234, 0.3)";
      ctx.lineWidth = 1;
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((other) => {
          const distance = Math.sqrt(
            Math.pow(particle.x - other.x, 2) +
              Math.pow(particle.y - other.y, 2)
          );
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.globalAlpha = ((150 - distance) / 150) * 0.5;
            ctx.stroke();
          }
        });
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      // Draw and animate particles
      particles.forEach((particle, i) => {
        particle.x += Math.sin(particle.angle) * particle.speed;
        particle.y += Math.cos(particle.angle) * particle.speed;
        particle.angle += particle.spin;
        particle.size += Math.sin(Date.now() * particle.pulse) * 0.1;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with glow effect
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          Math.abs(particle.size),
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Mouse tracking
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Text glitch effect
    const glitchInterval = setInterval(() => {
      setTextGlitch(true);
      setTimeout(() => setTextGlitch(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", handleMouseMove);
      clearInterval(glitchInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update waveform animation
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setWaveformData((prev) =>
          prev.map(
            (_, i) =>
              Math.sin(Date.now() * 0.005 + i * 0.2) *
              (Math.random() * 0.8 + 0.2)
          )
        );
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-black"
    >
      {/* Magical canvas background */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      {/* Dynamic gradient overlay */}
      <div
        className="absolute inset-0 opacity-30 transition-all duration-1000"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.4), rgba(59, 130, 246, 0.2), transparent 50%)`,
        }}
      />

      {/* Animated geometric shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-purple-500/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-pink-500/30 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/6 w-16 h-16 border-2 border-cyan-500/30 rounded-full animate-pulse"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center p-6 max-w-4xl">
        {/* Magical profile image */}
        <div className="relative group mb-8">
          <div className="w-64 h-64 md:w-80 md:h-80 mx-auto relative">
            {/* Outer magical ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 p-1 animate-spin-slow">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-900 to-black"></div>
            </div>

            {/* Middle pulsing ring */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 p-2 animate-pulse">
              <div className="w-full h-full rounded-full bg-black overflow-hidden relative">
                <img
                  src="DSC_2603.jpg"
                  alt="Suhas Palani"
                  className="w-full h-full object-cover relative z-10"
                />

                {/* Holographic overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-pulse"></div>

                {/* Musical notes floating around */}
                <Music
                  className="absolute -top-6 -right-6 text-purple-400 animate-bounce"
                  size={24}
                />
                <Headphones
                  className="absolute -bottom-6 -left-6 text-pink-400 animate-bounce"
                  size={24}
                  style={{ animationDelay: "0.5s" }}
                />
                <Star
                  className="absolute -top-8 left-1/4 text-cyan-400 animate-spin"
                  size={20}
                />
              </div>
            </div>

            {/* Floating magical elements */}
            <Sparkles
              className="absolute -top-4 right-1/4 text-yellow-400 animate-ping"
              size={16}
            />
            <Zap
              className="absolute -bottom-4 left-1/3 text-purple-400 animate-bounce"
              size={18}
            />
          </div>
        </div>

        {/* Main title with glitch effect */}
        <h1
          className={`text-4xl md:text-7xl font-bold mb-4 transition-all duration-150 ${
            textGlitch ? "animate-pulse text-red-400" : ""
          }`}
        >
          <span
            className={`text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 ${
              textGlitch ? "animate-bounce" : ""
            }`}
          >
            Suhas Palani
          </span>
        </h1>

        {/* Subtitle with musical theme */}
        <div className="mb-8">
          <p className="text-xl md:text-2xl text-gray-300 mb-2 flex items-center justify-center">
            <Music className="mr-2 text-purple-400 animate-pulse" size={24} />
            Digital Composer | Code Virtuoso
            <Sparkles className="ml-2 text-pink-400 animate-spin" size={24} />
          </p>
          <p className="text-lg text-purple-300">
            Orchestrating algorithms into symphonic solutions
          </p>
        </div>

        {/* Audio visualizer */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-end space-x-1 h-16 px-4 py-2 bg-black/30 rounded-full backdrop-blur-sm border border-purple-500/30">
            {waveformData.map((height, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-purple-500 to-pink-400 rounded-full transition-all duration-100"
                style={{
                  width: "4px",
                  height: `${Math.abs(height) * 40 + 8}px`,
                  opacity: isPlaying ? 0.8 : 0.3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex justify-center items-center space-x-6 mb-8">
          {/* Play/Pause button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="group relative w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
            {isPlaying ? (
              <Pause className="text-white relative z-10" size={24} />
            ) : (
              <Play className="text-white relative z-10 ml-1" size={24} />
            )}
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center space-x-4 flex-wrap gap-4">
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 flex items-center"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
            <Zap className="mr-2" size={20} />
            <span className="relative font-semibold">
              Experience My Compositions
            </span>
          </a>

          <a
            href="/Suhas Palani.pdf"
            className="group relative px-8 py-4 bg-transparent border-2 border-purple-600 text-purple-400 rounded-full hover:bg-purple-900/20 transition-all duration-300 transform hover:scale-105 flex items-center"
          >
            <div className="absolute inset-0 rounded-full border-2 border-purple-400 opacity-0 group-hover:opacity-50 animate-ping"></div>
            <Star className="mr-2" size={20} />
            <span className="relative font-semibold">
              Download Musical Score
            </span>
          </a>
        </div>

        {/* Scroll indicator */}
      </div>

      {/* Magical footer glow */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-900/50 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
