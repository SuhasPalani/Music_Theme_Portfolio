import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Home, User, Briefcase, Code, Mail, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const audioFiles = ['1.mp3', '2.mp3', '3.mp3'];

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [volume, setVolume] = useState(0.7);
  const [trackHistory, setTrackHistory] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showPlayer, setShowPlayer] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (currentTrackIndex === null) return;
    const audio = audioRef.current;
    audio.src = `/audios/${audioFiles[currentTrackIndex]}`;
    audio.volume = volume;
    audio.load();
    if (isPlaying) audio.play().catch(console.error);
  }, [currentTrackIndex, volume, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) audio.play().catch(() => setIsPlaying(false));
    else audio.pause();
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => { audio.pause(); audio.currentTime = 0; };
  }, []);

  const togglePlay = () => {
    if (currentTrackIndex === null) {
      const idx = Math.floor(Math.random() * audioFiles.length);
      setCurrentTrackIndex(idx);
      setTrackHistory([idx]);
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (!trackHistory.length) return;
    const next = (trackHistory[trackHistory.length - 1] + 1) % audioFiles.length;
    setTrackHistory([...trackHistory, next]);
    setCurrentTrackIndex(next);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    if (trackHistory.length <= 1) return;
    setTrackHistory(trackHistory.slice(0, -1));
    setCurrentTrackIndex(trackHistory[trackHistory.length - 2]);
    setIsPlaying(true);
  };

  const navItems = [
    { href: "#home", icon: Home, label: "Home" },
    { href: "#about", icon: User, label: "About" },
    { href: "#experience", icon: Briefcase, label: "Experience" },
    { href: "#projects", icon: Code, label: "Projects" },
    { href: "#contact", icon: Mail, label: "Contact" },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'backdrop-blur-2xl border-b' : 'bg-transparent border-b border-transparent'
      }`} style={{
        backgroundColor: scrolled ? `color-mix(in srgb, var(--bg-primary) 80%, transparent)` : 'transparent',
        borderColor: scrolled ? 'var(--bg-card-border)' : 'transparent',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <a href="#home" className="flex items-center space-x-3 group flex-shrink-0">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden gold-glow-border">
                <div className="absolute inset-[1px] rounded-[10px] flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
                  <span className="font-bold text-sm font-display" style={{ color: 'var(--gold)' }}>SP</span>
                </div>
                {isPlaying && (
                  <div className="absolute inset-0 rounded-xl animate-glow-pulse" style={{ background: 'linear-gradient(135deg, rgba(212,168,83,0.2), rgba(194,120,64,0.2))' }} />
                )}
              </div>
              <div className="hidden sm:block">
                <p className="font-display font-bold text-base leading-tight t-text">Suhas Palani</p>
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase" style={{ color: 'var(--gold)' }}>Software Engineer</p>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center p-1 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)' }}>
                {navItems.map((item) => {
                  const id = item.href.replace('#', '');
                  const active = activeSection === id;
                  return (
                    <a key={item.href} href={item.href}
                      className="relative px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-500 flex items-center gap-2 uppercase"
                      style={{ color: active ? 'var(--gold)' : 'var(--text-secondary)' }}
                    >
                      {active && (
                        <div className="absolute inset-0 rounded-xl" style={{ background: 'var(--gold-subtle)', border: `1px solid var(--bg-card-border-hover)` }} />
                      )}
                      <item.icon size={12} className="relative z-10" />
                      <span className="relative z-10">{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </nav>

            {/* Right controls */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl transition-all duration-300 hover:scale-110"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)' }}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <Sun size={14} style={{ color: 'var(--gold)' }} />
                ) : (
                  <Moon size={14} style={{ color: 'var(--gold)' }} />
                )}
              </button>

              {/* Music toggle button */}
              <button
                onClick={() => setShowPlayer(!showPlayer)}
                className="relative p-2.5 rounded-xl transition-all duration-300 hover:scale-110"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)' }}
                aria-label={showPlayer ? 'Close music player' : 'Open music player'}
                title="Toggle music player"
              >
                {isPlaying ? (
                  <div className="flex items-end space-x-[2px] h-3.5 w-4 justify-center">
                    {[1,2,3].map((i) => (
                      <div key={i} className="w-[2px] rounded-full eq-bar" style={{ height: '100%', backgroundColor: 'var(--gold)' }} />
                    ))}
                  </div>
                ) : (
                  <Play size={14} style={{ color: 'var(--gold)' }} />
                )}
              </button>

              {/* Mobile menu */}
              <button className="lg:hidden p-2.5 rounded-xl transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', color: 'var(--text-tertiary)' }}>
                {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden backdrop-blur-2xl border-t" style={{ backgroundColor: `color-mix(in srgb, var(--bg-primary) 95%, transparent)`, borderColor: 'var(--bg-card-border)' }}>
            <nav className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                  style={{ color: 'var(--text-secondary)' }}>
                  <item.icon size={16} />
                  <span className="font-medium text-sm">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ===== Floating Music Player Panel ===== */}
      <div className={`fixed top-20 right-4 z-40 transition-all duration-500 ${showPlayer ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="glass-card p-5 w-72" style={{ background: `color-mix(in srgb, var(--bg-primary) 90%, transparent)` }}>
          {/* Now playing */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(212,168,83,0.3), rgba(194,120,64,0.2))' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                {isPlaying ? (
                  <div className="flex items-end space-x-[2px] h-5">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-[3px] rounded-full eq-bar" style={{ height: '100%', backgroundColor: 'var(--gold)' }} />
                    ))}
                  </div>
                ) : (
                  <Play size={18} style={{ color: 'var(--gold)' }} />
                )}
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold t-text truncate">
                {currentTrackIndex !== null ? `Track ${currentTrackIndex + 1}` : 'Not Playing'}
              </p>
              <p className="text-[11px] t-text-muted">Ambient Collection</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button className="p-2 rounded-lg transition-colors disabled:opacity-20" onClick={playPrevious} disabled={trackHistory.length <= 1}
              style={{ color: 'var(--text-tertiary)' }}>
              <SkipBack size={16} />
            </button>
            <button className="relative p-3 rounded-xl overflow-hidden transition-all hover:scale-110" onClick={togglePlay}>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #d4a853, #c27840)' }} />
              <div className="relative z-10 text-surface-100">
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
              </div>
            </button>
            <button className="p-2 rounded-lg transition-colors disabled:opacity-20" onClick={playNext} disabled={!trackHistory.length}
              style={{ color: 'var(--text-tertiary)' }}>
              <SkipForward size={16} />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3">
            <button onClick={() => { setVolume(volume === 0 ? 0.7 : 0); audioRef.current.volume = volume === 0 ? 0.7 : 0; }}
              className="flex-shrink-0" style={{ color: 'var(--text-tertiary)' }}>
              {volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <div className="flex-1 relative">
              <input
                type="range" min="0" max="1" step="0.01" value={volume}
                onChange={(e) => { const v = parseFloat(e.target.value); setVolume(v); audioRef.current.volume = v; }}
                className="w-full h-1"
              />
              {/* Visual fill bar */}
              <div className="absolute top-1/2 left-0 h-[3px] rounded-full -translate-y-1/2 pointer-events-none"
                style={{ width: `${volume * 100}%`, background: 'linear-gradient(90deg, var(--gold), #c27840)' }} />
            </div>
            <span className="text-[10px] font-mono w-7 text-right flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* Track dots */}
          <div className="flex justify-center gap-2 mt-4">
            {audioFiles.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full transition-colors"
                style={{ backgroundColor: currentTrackIndex === i ? 'var(--gold)' : 'var(--bg-card-border)' }} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
