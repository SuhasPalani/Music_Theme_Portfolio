import React, { useState, useEffect } from 'react';
import { ArrowUp, Heart, Globe, Eye } from 'lucide-react';

const VISIT_KEY = 'suhas-portfolio-visits';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visitCount, setVisitCount] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global visit counter using Netlify serverless function + localStorage fallback
  useEffect(() => {
    const track = async () => {
      try {
        // Try the serverless function first (global count)
        const res = await fetch('/.netlify/functions/visit-counter', { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          setVisitCount(data.count);
          localStorage.setItem(VISIT_KEY, String(data.count));
          return;
        }
      } catch {
        // Serverless not available (local dev or function not deployed)
      }
      // Fallback: localStorage (per-browser)
      const current = parseInt(localStorage.getItem(VISIT_KEY) || '0', 10);
      const next = current + 1;
      localStorage.setItem(VISIT_KEY, String(next));
      setVisitCount(next);
    };
    track();
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" }, { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" }, { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];
  const extLinks = [
    { href: "mailto:suhaspalani23@gmail.com", label: "Email" },
    { href: "https://linkedin.com/in/suhaspalani/", label: "LinkedIn", ext: true },
    { href: "https://github.com/SuhasPalani", label: "GitHub", ext: true },
    { href: "https://suhaspalani23.netlify.app/", label: "Portfolio", ext: true },
  ];

  const formatCount = (n) => {
    if (n === null) return '---';
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toLocaleString();
  };

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--bg-card-border)' }}>
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--gold), #c27840)' }}>
                <span className="font-display font-bold text-sm" style={{ color: 'var(--bg-primary)' }}>SP</span>
              </div>
              <div>
                <p className="font-display font-bold t-text">Suhas Palani</p>
                <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Software Engineer</p>
              </div>
            </div>
            <p className="text-sm italic leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              "Composing tomorrow's digital symphonies, one line of code at a time."
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Navigation</h4>
            <ul className="space-y-2.5">
              {navLinks.map((l, i) => <li key={i}><a href={l.href} className="text-sm transition-colors" style={{ color: 'var(--text-tertiary)' }}>{l.label}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Connect</h4>
            <ul className="space-y-2.5">
              {extLinks.map((l, i) => (
                <li key={i}>
                  <a href={l.href} {...(l.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-sm flex items-center gap-1.5 transition-colors" style={{ color: 'var(--text-tertiary)' }}>
                    {l.label} {l.ext && <Globe size={10} style={{ color: 'var(--text-muted)' }} />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>At a Glance</h4>
            <div className="space-y-3">
              {[{ l: "Projects", v: "25+" }, { l: "Technologies", v: "20+" }, { l: "Years", v: "3+" }, { l: "Lines of Code", v: "Infinity" }].map((s, i) => (
                <div key={i} className="flex justify-between"><span className="text-sm" style={{ color: 'var(--text-muted)' }}>{s.l}</span><span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>{s.v}</span></div>
              ))}
            </div>
          </div>
        </div>

        <div className="glow-line mb-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
            <Heart size={12} style={{ color: 'var(--gold)' }} /> {new Date().getFullYear()} Suhas Palani. Built with React & Tailwind CSS.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>Every bug is just an undiscovered feature.</p>
            {/* Visit Counter - bottom right */}
            <div className="glass-card px-4 py-2 flex items-center gap-2.5">
              <Eye size={13} style={{ color: 'var(--gold)' }} />
              <span className="text-lg font-display font-bold text-gradient">{formatCount(visitCount)}</span>
              <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>visits</span>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--gold)' }} />
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 w-11 h-11 rounded-xl backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
        }`}
        style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', color: 'var(--text-tertiary)', zIndex: 40 }}>
        <ArrowUp size={16} />
      </button>
    </footer>
  );
};

export default Footer;
