import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart, Shuffle, Repeat, Clock, Award, Zap, Code2, Star, Database } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [likedTracks, setLikedTracks] = useState([]);
  const [headerRef, headerVisible] = useScrollReveal();

  const skillCategories = useMemo(() => [
    { name: "Programming Languages", artist: "Core Fundamentals", coverColor: "from-amber-600 to-orange-700", icon: <Code2 size={20} />,
      skills: [
        { name: "Python", level: 90, duration: "3:45", featured: true, rarity: "Legendary" },
        { name: "Java", level: 80, duration: "3:22", rarity: "Epic" },
        { name: "C/C++", level: 80, duration: "2:58", rarity: "Epic" },
        { name: "JavaScript", level: 90, duration: "4:10", featured: true, rarity: "Legendary" },
        { name: "TypeScript", level: 85, duration: "3:15", featured: true, rarity: "Epic" },
        { name: "Go", level: 70, duration: "3:05", rarity: "Rare" },
      ],
    },
    { name: "Frameworks & Libraries", artist: "Architecture Stack", coverColor: "from-yellow-700 to-amber-800", icon: <Zap size={20} />,
      skills: [
        { name: "React", level: 90, duration: "4:20", featured: true, rarity: "Legendary" },
        { name: "Next.js", level: 85, duration: "3:38", featured: true, rarity: "Epic" },
        { name: "Node.js", level: 85, duration: "3:42", featured: true, rarity: "Epic" },
        { name: "Django", level: 80, duration: "2:55", rarity: "Epic" },
        { name: "Flask", level: 80, duration: "3:10", rarity: "Rare" },
        { name: "FastAPI", level: 85, duration: "3:25", featured: true, rarity: "Epic" },
        { name: "React Native", level: 80, duration: "3:15", rarity: "Rare" },
        { name: "LangGraph", level: 75, duration: "3:00", rarity: "Rare" },
      ],
    },
    { name: "Databases & Tools", artist: "Data Layer", coverColor: "from-emerald-700 to-teal-800", icon: <Database size={20} />,
      skills: [
        { name: "MongoDB", level: 85, duration: "3:50", featured: true, rarity: "Epic" },
        { name: "PostgreSQL", level: 80, duration: "3:12", featured: true, rarity: "Epic" },
        { name: "DynamoDB", level: 75, duration: "3:40", rarity: "Rare" },
        { name: "Redis", level: 75, duration: "2:58", rarity: "Rare" },
        { name: "Pinecone", level: 70, duration: "3:22", rarity: "Rare" },
        { name: "Postman", level: 90, duration: "3:52", featured: true, rarity: "Legendary" },
      ],
    },
    { name: "Cloud & DevOps", artist: "Infrastructure", coverColor: "from-blue-700 to-indigo-800", icon: <Star size={20} />,
      skills: [
        { name: "AWS", level: 80, duration: "3:55", featured: true, rarity: "Epic" },
        { name: "Docker", level: 85, duration: "4:02", featured: true, rarity: "Epic" },
        { name: "Kubernetes", level: 75, duration: "3:30", rarity: "Rare" },
        { name: "Git", level: 90, duration: "3:15", featured: true, rarity: "Legendary" },
        { name: "GCP", level: 75, duration: "3:45", rarity: "Rare" },
        { name: "Azure", level: 75, duration: "3:22", rarity: "Rare" },
        { name: "Terraform", level: 70, duration: "3:18", rarity: "Rare" },
        { name: "Kafka", level: 75, duration: "3:10", rarity: "Rare" },
      ],
    },
  ], []);

  const nextTrack = useCallback(() => { setCurrentTrack((p) => (p + 1) % skillCategories[activeCategory].skills.length); setProgress(0); }, [activeCategory, skillCategories]);
  const prevTrack = useCallback(() => { setCurrentTrack((p) => (p - 1 + skillCategories[activeCategory].skills.length) % skillCategories[activeCategory].skills.length); setProgress(0); }, [activeCategory, skillCategories]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => setProgress((p) => { if (p >= 100) { nextTrack(); return 0; } return p + 0.5; }), 1000);
    return () => clearInterval(interval);
  }, [isPlaying, nextTrack]);

  const toggleLike = (c, t) => { const id = `${c}-${t}`; setLikedTracks((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]); };

  const formatTime = (pct) => {
    const [m, s] = skillCategories[activeCategory].skills[currentTrack].duration.split(":").map(Number);
    const cur = Math.floor((m * 60 + s) * (pct / 100));
    return `${Math.floor(cur / 60)}:${(cur % 60).toString().padStart(2, "0")}`;
  };

  const rarityStyle = (r) => {
    const map = { Legendary: 'text-amber-400 bg-amber-400/10 border-amber-400/20', Epic: 'text-gold-300 bg-gold-300/10 border-gold-300/20', Rare: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' };
    return map[r] || 'text-gray-500 bg-gray-500/10 border-gray-500/20';
  };

  return (
    <section id="skills" className="relative section-padding overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 glow-line" />

      <div className="section-container relative">
        <div ref={headerRef} className={`max-w-3xl mb-16 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--gold)' }}>Skills</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 t-text">Skill <span className="text-gradient">Symphony</span></h2>
          <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>A curated collection of technical abilities, presented as your favorite playlist.</p>
        </div>

        <div className="glass-card overflow-hidden">
          {/* Album Header */}
          <div className={`bg-gradient-to-r ${skillCategories[activeCategory].coverColor} p-6 md:p-8 relative`}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/10 flex-shrink-0 relative">
                <span className="text-white/90">{skillCategories[activeCategory].icon}</span>
                {isPlaying && (
                  <div className="absolute bottom-2 right-2 flex items-end space-x-[2px]">
                    {[1,2,3].map(i => <div key={i} className="w-1 bg-white rounded-full eq-bar" style={{ height: '12px' }} />)}
                  </div>
                )}
              </div>
              <div>
                <p className="text-white/50 text-[10px] font-mono uppercase tracking-widest mb-1">Collection</p>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">{skillCategories[activeCategory].name}</h3>
                <p className="text-white/60 text-sm mb-3">{skillCategories[activeCategory].artist}</p>
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="flex items-center gap-2 py-2 px-6 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all text-white text-sm font-medium border border-white/20">
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />} {isPlaying ? "Pause" : "Play All"}
                  </button>
                  <span className="text-white/40 text-sm">{skillCategories[activeCategory].skills.length} tracks</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-64 p-4 flex-shrink-0" style={{ borderRight: '1px solid var(--bg-card-border)' }}>
              <p className="text-[10px] font-mono uppercase tracking-widest px-3 mb-3" style={{ color: 'var(--text-muted)' }}>Collections</p>
              <ul className="space-y-1">
                {skillCategories.map((cat, idx) => (
                  <li key={idx} onClick={() => { setActiveCategory(idx); setCurrentTrack(0); setProgress(0); }}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300"
                    style={{
                      background: activeCategory === idx ? 'var(--bg-card-hover)' : 'transparent',
                      border: `1px solid ${activeCategory === idx ? 'var(--bg-card-border)' : 'transparent'}`,
                    }}>
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${cat.coverColor} flex items-center justify-center flex-shrink-0`}>
                      {activeCategory === idx && isPlaying ? (
                        <div className="flex items-end space-x-[2px]">
                          {[1,2,3].map(i => <div key={i} className="w-[2px] bg-white rounded-full eq-bar" style={{ height: '8px' }} />)}
                        </div>
                      ) : <span className="text-white text-xs">{cat.icon}</span>}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: activeCategory === idx ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{cat.name}</p>
                      <p className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>{cat.skills.length} skills</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tracks */}
            <div className="flex-1 p-4 md:p-6">
              <div className="hidden md:grid grid-cols-12 text-[10px] font-mono uppercase tracking-widest pb-3 mb-2 px-3" style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--bg-card-border)' }}>
                <div className="col-span-1">#</div>
                <div className="col-span-4">Skill</div>
                <div className="col-span-3">Mastery</div>
                <div className="col-span-2">Tier</div>
                <div className="col-span-1 text-right"><Clock size={10} /></div>
                <div className="col-span-1 text-right"><Heart size={10} /></div>
              </div>
              <div className="space-y-1">
                {skillCategories[activeCategory].skills.map((skill, idx) => {
                  const isCurrent = currentTrack === idx;
                  const isLiked = likedTracks.includes(`${activeCategory}-${idx}`);
                  return (
                    <div key={idx} onClick={() => { setCurrentTrack(idx); setIsPlaying(true); setProgress(0); }}
                      className="group grid grid-cols-12 items-center p-3 rounded-lg cursor-pointer transition-all duration-200"
                      style={{
                        background: isCurrent ? 'var(--bg-card-hover)' : 'transparent',
                        border: `1px solid ${isCurrent ? 'var(--bg-card-border)' : 'transparent'}`,
                      }}>
                      <div className="col-span-1">
                        {isCurrent && isPlaying ? (
                          <div className="flex items-end space-x-[2px] h-4">
                            {[1,2,3].map(i => <div key={i} className="w-[2px] rounded-full eq-bar" style={{ height: '100%', backgroundColor: 'var(--gold)' }} />)}
                          </div>
                        ) : <span className="text-sm font-mono" style={{ color: isCurrent ? 'var(--gold)' : 'var(--text-muted)' }}>{idx + 1}</span>}
                      </div>
                      <div className="col-span-4 flex items-center gap-2">
                        <span className="font-medium text-sm" style={{ color: isCurrent ? 'var(--gold)' : 'var(--text-secondary)' }}>{skill.name}</span>
                        {skill.featured && <Award size={12} className="text-amber-400" />}
                      </div>
                      <div className="col-span-3 hidden md:flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-card)' }}>
                          <div className={`h-full rounded-full bg-gradient-to-r ${skillCategories[activeCategory].coverColor} transition-all duration-700`} style={{ width: `${skill.level}%` }} />
                        </div>
                        <span className="text-[10px] font-mono w-8" style={{ color: 'var(--text-muted)' }}>{skill.level}%</span>
                      </div>
                      <div className="col-span-2 hidden md:block">
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-mono font-medium border ${rarityStyle(skill.rarity)}`}>{skill.rarity}</span>
                      </div>
                      <div className="col-span-1 text-right hidden md:block">
                        <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>{skill.duration}</span>
                      </div>
                      <div className="col-span-1 text-right">
                        <Heart size={13} onClick={(e) => { e.stopPropagation(); toggleLike(activeCategory, idx); }}
                          className={`transition-all cursor-pointer ${isLiked ? 'text-red-400 fill-red-400' : ''}`}
                          style={{ color: isLiked ? undefined : 'var(--text-muted)' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Player bar */}
          <div className="p-4 md:p-6" style={{ borderTop: '1px solid var(--bg-card-border)', background: 'var(--bg-secondary)' }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-1/3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skillCategories[activeCategory].coverColor} flex items-center justify-center flex-shrink-0`}>
                  {skillCategories[activeCategory].icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium t-text truncate">{skillCategories[activeCategory].skills[currentTrack].name}</p>
                  <p className="text-[11px] t-text-muted truncate">{skillCategories[activeCategory].artist}</p>
                </div>
              </div>
              <div className="flex flex-col items-center w-full sm:w-2/5">
                <div className="flex items-center space-x-4 mb-2">
                  <button onClick={prevTrack} className="p-1.5 transition-colors" style={{ color: 'var(--text-tertiary)' }}><SkipBack size={16} /></button>
                  <button onClick={() => setIsPlaying(!isPlaying)} className="p-3 rounded-full transition-transform hover:scale-105" style={{ background: 'var(--gold)', color: 'var(--bg-primary)' }}>
                    {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                  </button>
                  <button onClick={nextTrack} className="p-1.5 transition-colors" style={{ color: 'var(--text-tertiary)' }}><SkipForward size={16} /></button>
                </div>
                <div className="w-full flex items-center gap-2">
                  <span className="text-[10px] font-mono w-8 text-right" style={{ color: 'var(--text-muted)' }}>{formatTime(progress)}</span>
                  <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-card)' }}>
                    <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, var(--gold), #c27840)' }} />
                  </div>
                  <span className="text-[10px] font-mono w-8" style={{ color: 'var(--text-muted)' }}>{skillCategories[activeCategory].skills[currentTrack].duration}</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center space-x-3 w-1/4 justify-end" style={{ color: 'var(--text-muted)' }}>
                <Shuffle size={13} className="hover:text-gold-300 cursor-pointer transition-colors" />
                <Repeat size={13} className="hover:text-gold-300 cursor-pointer transition-colors" />
                <Volume2 size={13} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
