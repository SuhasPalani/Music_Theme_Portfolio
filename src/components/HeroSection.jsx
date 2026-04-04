import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowDown, Download, ExternalLink } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// Music symbols used as neural network nodes
const MUSIC_SYMBOLS = [
  '♪', '♫', '♬', '♩',        // notes
  '𝄞', '𝄢',                   // clefs
  '𝅝', '𝅗𝅥', '𝅘𝅥', '𝅘𝅥𝅮', '𝅘𝅥𝅯',       // note heads
  '𝄀', '𝄁',                   // barlines
  '♯', '♭', '♮',              // accidentals
  '𝄐', '𝄑',                   // fermatas
  '◉', '◎',                   // styled nodes
];

const HeroSection = () => {
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const nodesRef = useRef([]);
  const mouseWorldRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  const initNodes = useCallback((w, h) => {
    const count = Math.min(85, Math.floor((w * h) / 18000));
    nodesRef.current = Array.from({ length: count }, () => {
      // Distribute in layers like a neural network
      const layer = Math.floor(Math.random() * 5);
      const layerX = (layer / 4) * w * 0.8 + w * 0.1;
      const jitterX = (Math.random() - 0.5) * w * 0.15;
      const jitterY = (Math.random() - 0.5) * h * 0.8;

      return {
        x: layerX + jitterX,
        y: h / 2 + jitterY,
        baseX: layerX + jitterX,
        baseY: h / 2 + jitterY,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        symbol: MUSIC_SYMBOLS[Math.floor(Math.random() * MUSIC_SYMBOLS.length)],
        size: Math.random() * 10 + 8,
        opacity: Math.random() * 0.35 + 0.1,
        baseOpacity: Math.random() * 0.35 + 0.1,
        layer,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.5 + Math.random() * 1.5,
        rotation: Math.random() * 0.4 - 0.2,
        // Neural activation
        activation: 0,
        activated: false,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (nodesRef.current.length === 0) initNodes(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const CONNECTION_DIST = 180;
    const MOUSE_RADIUS = 200;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;
      const isLight = document.documentElement.classList.contains('light');
      const t = timeRef.current += 0.016;

      // Colors
      const goldR = isLight ? 130 : 212;
      const goldG = isLight ? 95 : 168;
      const goldB = isLight ? 30 : 83;
      const copperR = isLight ? 160 : 194;
      const copperG = isLight ? 90 : 120;
      const copperB = isLight ? 40 : 64;

      const mx = mouseWorldRef.current.x;
      const my = mouseWorldRef.current.y;

      // ===== UPDATE NODES =====
      nodes.forEach((node) => {
        // Gentle drift around base position
        node.x += node.vx;
        node.y += node.vy;

        // Elastic pull back to base
        const dx = node.baseX - node.x;
        const dy = node.baseY - node.y;
        node.vx += dx * 0.0004;
        node.vy += dy * 0.0004;
        node.vx *= 0.995;
        node.vy *= 0.995;

        // Mouse proximity - nodes "light up" near cursor
        const mDist = Math.sqrt((node.x - mx) ** 2 + (node.y - my) ** 2);
        if (mDist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - mDist) / MOUSE_RADIUS;
          node.activation = Math.min(1, node.activation + force * 0.08);
          // Gentle repulsion
          const angle = Math.atan2(node.y - my, node.x - mx);
          node.vx += Math.cos(angle) * force * 0.03;
          node.vy += Math.sin(angle) * force * 0.03;
        } else {
          node.activation *= 0.97;
        }

        // Pulse
        const pulse = Math.sin(t * node.pulseSpeed + node.pulsePhase) * 0.5 + 0.5;
        node.opacity = node.baseOpacity + node.activation * 0.5 + pulse * 0.05;
      });

      // ===== DRAW CONNECTIONS (neural synapses) =====
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          // Only connect nodes in adjacent or same layers (neural network structure)
          if (Math.abs(a.layer - b.layer) > 1) continue;

          const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (dist > CONNECTION_DIST) continue;

          const strength = (CONNECTION_DIST - dist) / CONNECTION_DIST;
          const activation = Math.max(a.activation, b.activation);

          // Base connection
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);

          // Slightly curved connections for organic feel
          const midX = (a.x + b.x) / 2 + Math.sin(t + i) * 3;
          const midY = (a.y + b.y) / 2 + Math.cos(t + j) * 3;
          ctx.quadraticCurveTo(midX, midY, b.x, b.y);

          const lineOpacity = strength * 0.06 + activation * strength * 0.15;
          // Lerp color based on activation: gold → copper when activated
          const r = goldR + (copperR - goldR) * activation;
          const g = goldG + (copperG - goldG) * activation;
          const b2 = goldB + (copperB - goldB) * activation;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b2}, ${lineOpacity})`;
          ctx.lineWidth = 0.5 + activation * 1.5;
          ctx.stroke();

          // "Data pulse" traveling along active connections
          if (activation > 0.3) {
            const pulsePos = (t * 0.5 + i * 0.1) % 1;
            const px = a.x + (b.x - a.x) * pulsePos;
            const py = a.y + (b.y - a.y) * pulsePos;
            ctx.beginPath();
            ctx.arc(px, py, 1.5 + activation * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${goldR}, ${goldG}, ${goldB}, ${activation * 0.4})`;
            ctx.fill();
          }
        }
      }

      // ===== DRAW NODES (music symbols) =====
      nodes.forEach((node) => {
        ctx.save();
        ctx.translate(node.x, node.y);
        ctx.rotate(node.rotation + Math.sin(t * 0.5 + node.pulsePhase) * 0.05);

        // Glow behind activated nodes
        if (node.activation > 0.2) {
          const glowRadius = 15 + node.activation * 20;
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius);
          gradient.addColorStop(0, `rgba(${goldR}, ${goldG}, ${goldB}, ${node.activation * 0.15})`);
          gradient.addColorStop(1, `rgba(${goldR}, ${goldG}, ${goldB}, 0)`);
          ctx.beginPath();
          ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Symbol
        const fontSize = node.size + node.activation * 6;
        ctx.font = `${fontSize}px "Inter", "Segoe UI Symbol", "Apple Symbols", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(${goldR}, ${goldG}, ${goldB}, ${node.opacity})`;

        // Shadow for depth on activated nodes
        if (node.activation > 0.1) {
          ctx.shadowColor = `rgba(${goldR}, ${goldG}, ${goldB}, ${node.activation * 0.3})`;
          ctx.shadowBlur = 8 + node.activation * 15;
        }

        ctx.fillText(node.symbol, 0, 0);
        ctx.shadowBlur = 0;
        ctx.restore();
      });

      // ===== "SIGNAL WAVE" that propagates outward from center periodically =====
      const wavePeriod = 8;
      const waveProgress = (t % wavePeriod) / wavePeriod;
      const waveRadius = waveProgress * Math.max(canvas.width, canvas.height) * 0.8;
      const waveOpacity = (1 - waveProgress) * 0.04;
      if (waveOpacity > 0.005) {
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, waveRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${goldR}, ${goldG}, ${goldB}, ${waveOpacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Activate nodes the wave touches
        nodes.forEach((node) => {
          const dist = Math.sqrt((node.x - canvas.width / 2) ** 2 + (node.y - canvas.height / 2) ** 2);
          if (Math.abs(dist - waveRadius) < 30) {
            node.activation = Math.min(1, node.activation + 0.05);
          }
        });
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
      mouseWorldRef.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animId);
    };
  }, [theme, initNodes]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <canvas ref={canvasRef} className="absolute inset-0" style={{ zIndex: 1 }} />

      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[800px] h-[800px] rounded-full transition-all duration-[3000ms]"
          style={{ background: `radial-gradient(circle, var(--gold-subtle), transparent 60%)`, left: `${mousePos.x - 25}%`, top: `${mousePos.y - 25}%` }} />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[120px] animate-float" style={{ background: 'rgba(194,120,64,0.04)' }} />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-[100px] animate-float-delayed" style={{ background: 'rgba(78,205,196,0.03)' }} />
      </div>

      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Content */}
      <div className="relative text-center px-4 max-w-5xl mx-auto" style={{ zIndex: 2 }}>
        {/* Profile */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-12 perspective-1000">
          <div className="absolute -inset-4 rounded-full blur-xl animate-glow-pulse" style={{ background: 'linear-gradient(135deg, var(--gold-dim), rgba(194,120,64,0.3))' }} />
          <div className="absolute -inset-8 rounded-full vinyl-grooves" style={{ border: '1px solid var(--bg-card-border)' }} />
          <div className="relative w-full h-full rounded-full overflow-hidden" style={{ border: '2px solid var(--bg-card-border-hover)', backgroundColor: 'var(--bg-primary)', isolation: 'isolate' }}>
            <img src="DSC_2603.jpg" alt="Suhas Palani" className="w-full h-full object-cover" style={{ transform: 'scale(1.02)', willChange: 'transform' }} loading="eager" />
          </div>
          <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500/90" style={{ border: '2px solid var(--bg-primary)' }} />
        </div>

        <div className="space-y-5">
          <p className="text-sm md:text-base font-mono tracking-[0.3em] uppercase" style={{ color: 'var(--gold)' }}>
            Software Engineer & Digital Composer
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight">
            <span className="text-gradient">Suhas Palani</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
            Orchestrating algorithms into symphonic solutions.
            Building scalable, intelligent systems with full-stack mastery.
          </p>
        </div>

        {/* Waveform - dynamic cinematic */}
        <div className="flex justify-center items-end space-x-[3px] h-14 my-12 opacity-40">
          {Array.from({ length: 60 }, (_, i) => {
            const center = Math.abs(i - 30) / 30;
            const h = Math.sin(i * 0.18) * 24 + 28 - center * 20;
            const hue = i / 60;
            return (
              <div key={i} className="rounded-full animate-waveform"
                style={{
                  width: '3px',
                  background: `linear-gradient(to top, hsl(${35 + hue * 15}, 70%, 45%), hsl(${20 + hue * 20}, 60%, 55%))`,
                  animationDelay: `${i * 0.035}s`,
                  animationDuration: `${0.8 + Math.sin(i * 0.3) * 0.4}s`,
                  height: `${Math.max(h, 6)}px`,
                }} />
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#projects" className="btn-primary">
            <ExternalLink size={16} className="mr-2" /> View My Work
          </a>
          <a href="/Suhas Palani.pdf" className="btn-ghost">
            <Download size={16} className="mr-2" /> Download Resume
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ zIndex: 2 }}>
        <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Scroll</span>
        <ArrowDown size={16} className="animate-bounce" style={{ color: 'var(--text-muted)' }} />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)', zIndex: 2 }} />
    </section>
  );
};

export default HeroSection;
