import React, { useEffect, useRef } from 'react';

const HeroSection = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Audio visualizer simulation
    const particles = [];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 5 + 1,
        color: `hsl(${Math.random() * 60 + 240}, 100%, 50%)`,
        velocity: {
          x: Math.random() * 2 - 1,
          y: Math.random() * 2 - 1
        }
      });
    }
    
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.velocity.x *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.velocity.y *= -1;
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
  <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
  
  <div className="relative z-10 text-center p-6">
    <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-blue-500 p-2 mb-8 shadow-lg shadow-purple-500/20 animate-pulse">
      <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
        <img
          src="DSC_2603.jpg" // Replace with your image path
          alt="Your Name"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
    
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Suhas Palani
      </span>
    </h1>
    <p className="text-xl text-gray-300 mb-8">
      Full Stack Developer | Software Engineer
    </p>
    
    <div className="flex justify-center space-x-4">
      <a href="#projects" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full transition-colors">
        View Projects
      </a>
      <a href="/Suhas Palani SDE_final.pdf" className="bg-transparent border border-purple-600 text-purple-400 hover:bg-purple-900/20 px-6 py-3 rounded-full transition-colors">
        Download Resume
      </a>
    </div>
  </div>
</section>

  );
};

export default HeroSection;