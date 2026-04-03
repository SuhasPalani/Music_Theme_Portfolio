import React, { useState, useEffect, useRef } from "react";
import { ArrowDown, Download, ExternalLink } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const HeroSection = () => {
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    particlesRef.current = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const p = particlesRef.current;
      const isLight = document.documentElement.classList.contains('light');
      const lineColor = isLight ? '120, 80, 20' : '212, 168, 83';
      const dotColor = isLight ? '120, 80, 20' : '212, 168, 83';

      for (let i = 0; i < p.length; i++) {
        for (let j = i + 1; j < p.length; j++) {
          const dx = p[i].x - p[j].x, dy = p[i].y - p[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p[i].x, p[i].y);
            ctx.lineTo(p[j].x, p[j].y);
            ctx.strokeStyle = `rgba(${lineColor}, ${((140 - dist) / 140) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      p.forEach((pt) => {
        pt.x += pt.vx; pt.y += pt.vy;
        if (pt.x < 0) pt.x = canvas.width; if (pt.x > canvas.width) pt.x = 0;
        if (pt.y < 0) pt.y = canvas.height; if (pt.y > canvas.height) pt.y = 0;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor}, ${pt.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleMouse = (e) => setMousePos({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
    document.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animId);
    };
  }, [theme]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[800px] h-[800px] rounded-full transition-all duration-[3000ms]"
          style={{ background: `radial-gradient(circle, var(--gold-subtle), transparent 60%)`, left: `${mousePos.x - 25}%`, top: `${mousePos.y - 25}%` }} />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[120px] animate-float" style={{ background: 'rgba(194,120,64,0.04)' }} />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-[100px] animate-float-delayed" style={{ background: 'rgba(78,205,196,0.03)' }} />
      </div>

      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full animate-spin-slow" style={{ border: '1px solid var(--bg-card-border)' }} />
        <div className="absolute w-[700px] h-[700px] rounded-full animate-spin-reverse" style={{ border: '1px solid var(--bg-card-border)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Profile */}
        <div className="relative w-44 h-44 md:w-52 md:h-52 mx-auto mb-12 perspective-1000">
          <div className="absolute -inset-3 rounded-full blur-lg animate-glow-pulse" style={{ background: 'linear-gradient(135deg, var(--gold-dim), rgba(194,120,64,0.3))' }} />
          <div className="absolute -inset-6 rounded-full vinyl-grooves" style={{ border: '1px solid var(--bg-card-border)' }} />
          <div className="relative w-full h-full rounded-full overflow-hidden" style={{ border: '2px solid var(--bg-card-border-hover)', backgroundColor: 'var(--bg-primary)' }}>
            <img src="DSC_2603.jpg" alt="Suhas Palani" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent" />
          </div>
          <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500/90" style={{ border: '2px solid var(--bg-primary)' }} />
        </div>

        <div className="space-y-5">
          <p className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase" style={{ color: 'var(--gold)' }}>
            Software Engineer & Digital Composer
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight">
            <span className="text-gradient">Suhas Palani</span>
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
            Orchestrating algorithms into symphonic solutions.
            Building scalable, intelligent systems with full-stack mastery.
          </p>
        </div>

        {/* Waveform */}
        <div className="flex justify-center items-end space-x-[2px] h-8 my-10 opacity-30">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className="w-[2px] rounded-full animate-waveform"
              style={{ background: 'linear-gradient(to top, var(--gold), #c27840)', animationDelay: `${i * 0.04}s`, height: `${Math.sin(i * 0.25) * 14 + 16}px` }} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#projects" className="btn-primary">
            <ExternalLink size={16} className="mr-2" /> View My Work
          </a>
          <a href="/Suhas Palani SDE.pdf" className="btn-ghost">
            <Download size={16} className="mr-2" /> Download Resume
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Scroll</span>
        <ArrowDown size={16} className="animate-bounce" style={{ color: 'var(--text-muted)' }} />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }} />
    </section>
  );
};

export default HeroSection;
