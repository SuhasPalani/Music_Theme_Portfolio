import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, User, Briefcase, Code, Mail, Home, Music, Sparkles, Zap, Star, Headphones } from 'lucide-react';

// List all the audio files in the public/audios folder
const audioFiles = [
  '1.mp3',
  '2.mp3',
  '3.mp3',
];

const Header = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [volume, setVolume] = useState(1);
  const [trackHistory, setTrackHistory] = useState([]);
  const [waveformData, setWaveformData] = useState([]);
  const [particles, setParticles] = useState([]);
  const [isGlowing, setIsGlowing] = useState(false);
  const audioRef = useRef(new Audio());

  // Initialize magical effects
  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.6 + 0.2,
      color: ['purple', 'pink', 'cyan', 'blue'][Math.floor(Math.random() * 4)],
    }));
    setParticles(newParticles);

    // Generate waveform data
    const waveform = Array.from({ length: 20 }, (_, i) => 
      Math.sin(i * 0.1) * (Math.random() * 0.5 + 0.3)
    );
    setWaveformData(waveform);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + particle.speed) % 100,
        x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.05,
      })));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Update audio source when track changes
  useEffect(() => {
    if (currentTrackIndex === null) return;
    
    const audio = audioRef.current;
    audio.src = `/audios/${audioFiles[currentTrackIndex]}`;
    audio.volume = volume;
    audio.load();
    
    if (isPlaying) {
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio play failed:", error);
        });
      }
    }
  }, [currentTrackIndex, volume, isPlaying]);

  // Handle play/pause state changes
  useEffect(() => {
    const audio = audioRef.current;
    
    if (isPlaying) {
      setIsGlowing(true);
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio play failed:", error);
          setIsPlaying(false);
          setIsGlowing(false);
        });
      }
    } else {
      audio.pause();
      setIsGlowing(false);
    }
  }, [isPlaying]);

  // Update waveform when playing
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setWaveformData(prev => 
          prev.map((_, i) => 
            Math.sin(Date.now() * 0.01 + i * 0.3) * (Math.random() * 0.8 + 0.2)
          )
        );
      }, 120);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  // Cleanup when component unmounts
  useEffect(() => {
    const audio = audioRef.current;
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // Toggle play/pause
  const togglePlay = () => {
    if (currentTrackIndex === null) {
      const randomIndex = Math.floor(Math.random() * audioFiles.length);
      setCurrentTrackIndex(randomIndex);
      setTrackHistory([randomIndex]);
    }
    
    setIsPlaying(!isPlaying);
  };

  // Play next track
  const playNext = () => {
    if (!trackHistory.length) return;

    const currentIndex = trackHistory[trackHistory.length - 1];
    let nextIndex = (currentIndex + 1) % audioFiles.length;
    setTrackHistory([...trackHistory, nextIndex]);
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
  };

  // Play previous track
  const playPrevious = () => {
    if (trackHistory.length <= 1) return;

    const prevIndex = trackHistory[trackHistory.length - 2];
    setTrackHistory(trackHistory.slice(0, trackHistory.length - 1));
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(true);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const navItems = [
    { href: "#home", icon: Home, label: "Home", magical: "🏠" },
    { href: "#about", icon: User, label: "About", magical: "✨" },
    { href: "#experience", icon: Briefcase, label: "Experience", magical: "🎭" },
    { href: "#projects", icon: Code, label: "Compositions", magical: "🎵" },
    { href: "#contact", icon: Mail, label: "Contact", magical: "📡" },
  ];

  return (
    <header className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden">
      {/* Magical background with glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-purple-900/95 to-gray-900/95 backdrop-blur-xl">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 animate-pulse"></div>
        
        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full animate-pulse`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              background: particle.color === 'purple' ? '#a855f7' : 
                         particle.color === 'pink' ? '#ec4899' :
                         particle.color === 'cyan' ? '#06b6d4' : '#3b82f6',
              boxShadow: `0 0 10px ${particle.color === 'purple' ? '#a855f7' : 
                                    particle.color === 'pink' ? '#ec4899' :
                                    particle.color === 'cyan' ? '#06b6d4' : '#3b82f6'}`,
            }}
          />
        ))}

        {/* Top border glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between">
          {/* Magical Logo */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 flex items-center justify-center transition-all duration-300 ${isGlowing ? 'animate-pulse shadow-lg shadow-purple-500/50' : ''} group-hover:scale-110`}>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <span className="relative text-white font-bold text-lg z-10">SP</span>
                {isPlaying && <div className="absolute inset-0 rounded-full border-2 border-yellow-400/50 animate-spin"></div>}
              </div>
              
              {/* Magical sparkles around logo */}
              <Sparkles className="absolute -top-2 -right-2 text-purple-400 animate-spin" size={16} />
              <Star className="absolute -bottom-1 -left-1 text-pink-400 animate-bounce" size={12} />
            </div>
            
            <div className="relative">
              <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300 text-lg">
                Suhas Palani
              </h3>
              <p className="text-sm text-purple-300 flex items-center">
                <Music className="mr-1 animate-pulse" size={12} />
                Code Composer & Digital Maestro
              </p>
            </div>
          </div>

          {/* Magical Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="group relative px-4 py-2 rounded-full text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2 hover:bg-purple-600/20 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/20 group-hover:to-pink-600/20 transition-all duration-300"></div>
                    <item.icon size={16} className="relative z-10 group-hover:text-purple-400 transition-colors" />
                    <span className="relative z-10 font-medium">{item.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">{item.magical}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Enhanced Music Controls */}
          <div className="flex items-center space-x-3">
            {/* Audio visualizer */}
            <div className="hidden sm:flex items-end space-x-1 h-8 px-3 py-1 bg-black/30 rounded-full backdrop-blur-sm border border-purple-500/30">
              {waveformData.map((height, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-purple-500 to-pink-400 rounded-full transition-all duration-150"
                  style={{
                    width: '2px',
                    height: `${Math.abs(height) * 20 + 4}px`,
                    opacity: isPlaying ? 0.8 : 0.3,
                  }}
                />
              ))}
            </div>

            {/* Control buttons with magical effects */}
            <div className="flex items-center space-x-2 bg-black/20 rounded-full p-2 backdrop-blur-sm border border-purple-500/20">
              <button 
                className="group relative p-2 hover:bg-purple-600/30 rounded-full transition-all duration-300 disabled:opacity-50 disabled:hover:bg-transparent"
                onClick={playPrevious}
                disabled={trackHistory.length <= 1}
              >
                <div className="absolute inset-0 rounded-full bg-purple-600/0 group-hover:bg-purple-600/20 transition-all duration-300"></div>
                <SkipBack size={16} className="relative z-10 text-gray-300 group-hover:text-purple-400 transition-colors" />
              </button>
              
              <button 
                className="group relative p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110"
                onClick={togglePlay}
              >
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur opacity-50 transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''}`}></div>
                {isPlaying ? (
                  <Pause size={18} className="relative z-10 text-white" />
                ) : (
                  <Play size={18} className="relative z-10 text-white ml-0.5" />
                )}
                
                {/* Magical glow effect when playing */}
                {isPlaying && (
                  <>
                    <div className="absolute -inset-1 rounded-full border border-yellow-400/50 animate-ping"></div>
                    <Zap className="absolute -top-2 -right-2 text-yellow-400 animate-bounce" size={12} />
                  </>
                )}
              </button>
              
              <button 
                className="group relative p-2 hover:bg-purple-600/30 rounded-full transition-all duration-300 disabled:opacity-50 disabled:hover:bg-transparent"
                onClick={playNext}
                disabled={!trackHistory.length}
              >
                <div className="absolute inset-0 rounded-full bg-purple-600/0 group-hover:bg-purple-600/20 transition-all duration-300"></div>
                <SkipForward size={16} className="relative z-10 text-gray-300 group-hover:text-purple-400 transition-colors" />
              </button>
            </div>

            {/* Enhanced Volume Control */}
            <div className="hidden lg:flex items-center space-x-2 bg-black/20 rounded-full px-3 py-2 backdrop-blur-sm border border-purple-500/20">
              <Volume2 size={16} className="text-purple-400" />
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #a855f7 0%, #ec4899 ${volume * 50}%, #06b6d4 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
                  }}
                />
                <div className="absolute -top-1 rounded-full w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 transition-all duration-200" style={{ left: `${volume * 68}px` }}></div>
              </div>
              <Headphones size={16} className="text-cyan-400 animate-pulse" />
            </div>

            {/* Now Playing indicator */}
            {isPlaying && currentTrackIndex !== null && (
              <div className="hidden xl:flex items-center space-x-2 bg-black/30 rounded-full px-4 py-2 backdrop-blur-sm border border-purple-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-purple-300">
                  Track {currentTrackIndex + 1} / {audioFiles.length}
                </span>
                <Music className="text-purple-400 animate-spin" size={14} />
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(45deg, #a855f7, #ec4899);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(45deg, #a855f7, #ec4899);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
        }
      `}</style>
    </header>
  );
};

export default Header;