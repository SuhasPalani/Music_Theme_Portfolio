import React, { useState, useEffect, useRef, useCallback } from 'react';

const SYMBOLS = ['♪', '♫', '♬', '♩', '𝄞', '𝄢', '♯', '♭', '♮', '◉', '◎'];

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0→4
  const [exiting, setExiting] = useState(false);
  const [statusText, setStatusText] = useState('');
  const canvasRef = useRef(null);
  const progressRef = useRef(0);
  const phaseRef = useRef(0);
  const completedRef = useRef(false);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setExiting(true);
    setTimeout(() => onComplete(), 900);
  }, [onComplete]);

  // Progress ticker
  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        const speed = p < 40 ? 1.8 : p < 70 ? 1.2 : p < 90 ? 0.7 : 0.5;
        const next = Math.min(p + speed, 100);
        progressRef.current = next;
        return next;
      });
    }, 35);
    return () => clearInterval(iv);
  }, []);

  // Phases
  useEffect(() => {
    const phases = [
      { at: 0, text: 'Tuning frequencies...' },
      { at: 25, text: 'Composing harmonies...' },
      { at: 50, text: 'Orchestrating elements...' },
      { at: 75, text: 'Dropping the beat...' },
      { at: 100, text: '' },
    ];
    for (let i = phases.length - 1; i >= 0; i--) {
      if (progress >= phases[i].at && phase < i) {
        setPhase(i);
        phaseRef.current = i;
        setStatusText(phases[i].text);
        break;
      }
    }
    if (progress >= 100) {
      setTimeout(finish, 600);
    }
  }, [progress, phase, finish]);

  // Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const t0 = Date.now();

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    // Background symbols rising
    const bgSymbols = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 200,
      s: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      size: Math.random() * 18 + 10,
      speed: Math.random() * 0.6 + 0.3,
      opacity: 0,
      maxOp: Math.random() * 0.12 + 0.03,
      drift: (Math.random() - 0.5) * 0.4,
      phase: Math.random() * Math.PI * 2,
      rot: (Math.random() - 0.5) * 0.6,
    }));

    // Ring symbols
    const ringCount = 16;
    const ringSymbols = Array.from({ length: ringCount }, (_, i) => ({
      s: SYMBOLS[i % SYMBOLS.length],
      angle: (i / ringCount) * Math.PI * 2,
      fromX: (Math.random() - 0.5) * 3000,
      fromY: (Math.random() - 0.5) * 3000,
      arrived: false,
      arriveTime: 0,
    }));

    // EQ bars
    const eqCount = 64;

    // Particles that burst on beat drop
    const burstParticles = Array.from({ length: 60 }, () => ({
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 8 + 3,
      size: Math.random() * 3 + 1,
      life: 1,
      symbol: Math.random() > 0.5 ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] : null,
    }));
    let burstTriggered = false;
    let burstTime = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = (Date.now() - t0) / 1000;
      const p = progressRef.current;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // ===== BACKGROUND: Rising music symbols =====
      bgSymbols.forEach(sym => {
        sym.y -= sym.speed;
        sym.x += sym.drift + Math.sin(t * 0.5 + sym.phase) * 0.3;
        if (sym.y < -30) { sym.y = canvas.height + 30; sym.x = Math.random() * canvas.width; }
        sym.opacity += (sym.maxOp * Math.min(p / 15, 1) - sym.opacity) * 0.03;

        ctx.save();
        ctx.translate(sym.x, sym.y);
        ctx.rotate(sym.rot + Math.sin(t * 0.3 + sym.phase) * 0.15);
        ctx.font = `${sym.size}px "Inter", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(212, 168, 83, ${sym.opacity})`;
        ctx.fillText(sym.s, 0, 0);
        ctx.restore();
      });

      // ===== CENTRAL GLOW (always present, grows) =====
      const glowSize = 80 + p * 1.5;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowSize);
      grd.addColorStop(0, `rgba(212, 168, 83, ${0.04 + p * 0.001})`);
      grd.addColorStop(0.5, `rgba(194, 120, 64, ${0.02 + p * 0.0005})`);
      grd.addColorStop(1, 'rgba(212, 168, 83, 0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, glowSize, 0, Math.PI * 2);
      ctx.fill();

      // ===== PHASE 0-1: WAVEFORM EQ (bottom area, cinematic) =====
      if (p > 0) {
        const eqFade = Math.min(p / 20, 1);
        const barW = 4;
        const gap = 2;
        const totalW = eqCount * (barW + gap);
        const startX = cx - totalW / 2;
        const eqY = cy + 100;
        const maxH = 55 * Math.min(p / 35, 1);

        for (let i = 0; i < eqCount; i++) {
          const x = startX + i * (barW + gap);
          const center = Math.abs(i - eqCount / 2) / (eqCount / 2);
          const envelope = 1 - center * 0.65;
          const beat = Math.abs(Math.sin(t * 2.8 + i * 0.25));
          const h = beat * maxH * envelope;

          // Gradient per bar
          const hue = 33 + (i / eqCount) * 18;
          const light = 42 + beat * 15;
          const alpha = (0.5 + beat * 0.4) * eqFade;

          ctx.fillStyle = `hsla(${hue}, 75%, ${light}%, ${alpha})`;
          ctx.beginPath();
          ctx.roundRect(x, eqY - h, barW, h, 2);
          ctx.fill();

          // Reflection
          ctx.fillStyle = `hsla(${hue}, 75%, ${light}%, ${alpha * 0.15})`;
          ctx.beginPath();
          ctx.roundRect(x, eqY + 2, barW, h * 0.3, 2);
          ctx.fill();
        }

        // Horizontal line under EQ
        ctx.strokeStyle = `rgba(212, 168, 83, ${0.1 * eqFade})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(startX, eqY);
        ctx.lineTo(startX + totalW, eqY);
        ctx.stroke();
      }

      // ===== PHASE 1-2: RING ASSEMBLY (symbols fly into ring) =====
      if (p > 25) {
        const ringP = Math.min((p - 25) / 30, 1);
        const ringR = 100;

        ringSymbols.forEach((rs, i) => {
          const symP = Math.min(ringP * ringCount - i, 1);
          if (symP <= 0) return;

          if (!rs.arrived && symP >= 0.95) { rs.arrived = true; rs.arriveTime = t; }

          const ease = 1 - Math.pow(1 - Math.min(symP, 1), 4);
          const toX = cx + Math.cos(rs.angle - Math.PI / 2) * ringR;
          const toY = cy + Math.sin(rs.angle - Math.PI / 2) * ringR;
          const x = rs.fromX + (toX - rs.fromX) * ease;
          const y = rs.fromY + (toY - rs.fromY) * ease;

          // Trail while flying
          if (ease < 0.9) {
            ctx.strokeStyle = `rgba(212, 168, 83, ${(1 - ease) * 0.08})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(rs.fromX + (toX - rs.fromX) * Math.max(ease - 0.15, 0), rs.fromY + (toY - rs.fromY) * Math.max(ease - 0.15, 0));
            ctx.lineTo(x, y);
            ctx.stroke();
          }

          // Symbol
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate((1 - ease) * Math.PI * 6);
          const pulse = rs.arrived ? 1 + Math.sin((t - rs.arriveTime) * 4) * 0.15 : 1;
          ctx.scale(pulse, pulse);
          ctx.font = `${16 + ease * 6}px "Inter", sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = `rgba(212, 168, 83, ${ease * 0.8})`;
          ctx.shadowColor = 'rgba(212, 168, 83, 0.5)';
          ctx.shadowBlur = ease * 20;
          ctx.fillText(rs.s, 0, 0);
          ctx.restore();
        });

        // Ring connections
        if (ringP > 0.6) {
          const connOp = (ringP - 0.6) * 2.5 * 0.12;
          for (let i = 0; i < ringCount; i++) {
            const a1 = (i / ringCount) * Math.PI * 2 - Math.PI / 2;
            const a2 = ((i + 1) % ringCount / ringCount) * Math.PI * 2 - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(a1) * ringR, cy + Math.sin(a1) * ringR);
            ctx.lineTo(cx + Math.cos(a2) * ringR, cy + Math.sin(a2) * ringR);
            ctx.strokeStyle = `rgba(212, 168, 83, ${connOp})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }

          // Cross connections (neural net feel)
          for (let i = 0; i < ringCount; i += 2) {
            const a1 = (i / ringCount) * Math.PI * 2 - Math.PI / 2;
            const opposite = ((i + ringCount / 2) % ringCount / ringCount) * Math.PI * 2 - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(a1) * ringR, cy + Math.sin(a1) * ringR);
            const cpx = cx + Math.sin(t * 0.5 + i) * 15;
            const cpy = cy + Math.cos(t * 0.5 + i) * 15;
            ctx.quadraticCurveTo(cpx, cpy, cx + Math.cos(opposite) * ringR, cy + Math.sin(opposite) * ringR);
            ctx.strokeStyle = `rgba(212, 168, 83, ${connOp * 0.4})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }

          // Rotating outer ring
          ctx.beginPath();
          ctx.arc(cx, cy, ringR + 15, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(212, 168, 83, ${connOp * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.setLineDash([4, 8]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Spinning ring rotation visual
        if (ringP > 0.8) {
          const spin = t * 0.3;
          for (let i = 0; i < 3; i++) {
            const a = spin + (i / 3) * Math.PI * 2;
            const ox = cx + Math.cos(a) * (ringR + 25);
            const oy = cy + Math.sin(a) * (ringR + 25);
            ctx.beginPath();
            ctx.arc(ox, oy, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 168, 83, 0.4)`;
            ctx.fill();
          }
        }
      }

      // ===== PHASE 3: SP LOGO REVEAL =====
      if (p > 68) {
        const logoP = Math.min((p - 68) / 25, 1);
        const ease = 1 - Math.pow(1 - logoP, 4);
        const scale = 0.2 + ease * 0.8;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(scale, scale);
        ctx.globalAlpha = ease;

        // Inner glow
        const igrd = ctx.createRadialGradient(0, 0, 0, 0, 0, 50);
        igrd.addColorStop(0, `rgba(212, 168, 83, ${ease * 0.25})`);
        igrd.addColorStop(0.5, `rgba(194, 120, 64, ${ease * 0.08})`);
        igrd.addColorStop(1, 'rgba(212, 168, 83, 0)');
        ctx.fillStyle = igrd;
        ctx.beginPath();
        ctx.arc(0, 0, 50, 0, Math.PI * 2);
        ctx.fill();

        // SP text
        ctx.font = 'bold 58px "Space Grotesk", "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(212, 168, 83, 0.7)';
        ctx.shadowBlur = 25 + ease * 30;
        ctx.fillStyle = `rgba(212, 168, 83, ${ease})`;
        ctx.fillText('SP', 0, 2);

        // Subtitle fades in later
        if (logoP > 0.5) {
          const subP = (logoP - 0.5) * 2;
          ctx.shadowBlur = 0;
          ctx.font = '500 11px "Inter", sans-serif';
          ctx.fillStyle = `rgba(212, 168, 83, ${subP * 0.5})`;
          ctx.letterSpacing = '4px';
          ctx.fillText('S U H A S   P A L A N I', 0, 40);
        }

        ctx.restore();
      }

      // ===== PHASE 4: BEAT DROP — particles burst + shockwave =====
      if (p >= 100 && !burstTriggered) {
        burstTriggered = true;
        burstTime = t;
      }

      if (burstTriggered) {
        const bt = t - burstTime;

        // Shockwave rings
        for (let r = 0; r < 3; r++) {
          const delay = r * 0.12;
          const rt = Math.max(bt - delay, 0);
          if (rt <= 0) continue;
          const radius = rt * 400;
          const opacity = Math.max(0, 0.25 - rt * 0.3);
          if (opacity <= 0) continue;

          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(212, 168, 83, ${opacity})`;
          ctx.lineWidth = 2 - r * 0.5;
          ctx.stroke();
        }

        // Flash
        const flash = Math.max(0, 0.2 - bt * 0.5);
        if (flash > 0) {
          ctx.fillStyle = `rgba(212, 168, 83, ${flash})`;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Burst particles
        burstParticles.forEach(bp => {
          if (bt <= 0) return;
          bp.life = Math.max(0, 1 - bt * 1.2);
          if (bp.life <= 0) return;

          const dist = bt * bp.speed * 60;
          const bx = cx + Math.cos(bp.angle) * dist;
          const by = cy + Math.sin(bp.angle) * dist;

          if (bp.symbol) {
            ctx.font = `${12 + bp.size * 3}px "Inter", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = `rgba(212, 168, 83, ${bp.life * 0.6})`;
            ctx.fillText(bp.symbol, bx, by);
          } else {
            ctx.beginPath();
            ctx.arc(bx, by, bp.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 168, 83, ${bp.life * 0.5})`;
            ctx.fill();
          }
        });
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center transition-all duration-700 ${exiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
      style={{ zIndex: 9999, backgroundColor: '#08080a' }}>
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Progress UI */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-72 z-10">
        {/* Status text */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em]"
            style={{ color: 'rgba(212,168,83,0.4)' }}>
            {statusText}
          </span>
          <span className="text-xs font-mono font-semibold" style={{ color: 'rgba(212,168,83,0.6)' }}>
            {Math.round(progress)}%
          </span>
        </div>

        {/* Progress track */}
        <div className="relative h-[3px] rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(212,168,83,0.08)' }}>
          <div className="h-full rounded-full transition-all duration-75 relative overflow-hidden"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #8c6e26, #d4a853, #e8cc8a)' }}>
            {/* Shimmer */}
            <div className="absolute inset-0 animate-shimmer"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', width: '50%' }} />
          </div>
          {/* Glow dot at tip */}
          <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{ left: `${progress}%`, marginLeft: '-4px', background: '#e8cc8a', boxShadow: '0 0 12px rgba(212,168,83,0.6)' }} />
        </div>

        {/* Phase dots */}
        <div className="flex justify-between mt-3 px-1">
          {['♪', '♫', '𝄞', '♬'].map((s, i) => (
            <span key={i} className="text-xs transition-all duration-500"
              style={{ color: phase > i ? 'rgba(212,168,83,0.7)' : 'rgba(212,168,83,0.15)', transform: phase > i ? 'scale(1.3)' : 'scale(1)' }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
