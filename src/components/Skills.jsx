import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Music,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Heart,
  Shuffle,
  RepeatIcon,
  Clock,
  Disc,
  BarChart2,
  Award,
  List,
  Sparkles,
  Star,
  Zap,
  Wand2,
} from "lucide-react";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [likedTracks, setLikedTracks] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate floating magical particles
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.2 + 0.03,
      opacity: Math.random() * 0.5 + 0.2,
      type: ["✨", "⭐", "💫", "🎵", "🎶"][Math.floor(Math.random() * 5)],
    }));
    setParticles(newParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          y: (particle.y + particle.speed) % 110,
          x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.03,
        }))
      );
    }, 100);

    const handleMouseMove = (e) => {
      const rect = document.querySelector("#skills")?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      clearInterval(interval);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Enhanced skill categories with magical music metadata
  const skillCategories = useMemo(
    () => [
      {
        name: "Programming Languages",
        artist: "The Code Wizards",
        coverColor: "from-red-500 via-pink-500 to-purple-600",
        releaseYear: "2023",
        icon: <Wand2 size={18} />,
        genre: "Mystical Syntax",
        skills: [
          {
            name: "Python",
            level: 90,
            duration: "3:45",
            featured: true,
            rarity: "Legendary",
          },
          {
            name: "Java",
            level: 80,
            duration: "3:22",
            featured: false,
            rarity: "Epic",
          },
          {
            name: "C/C++",
            level: 80,
            duration: "2:58",
            featured: false,
            rarity: "Epic",
          },
          {
            name: "JavaScript",
            level: 90,
            duration: "4:10",
            featured: true,
            rarity: "Legendary",
          },
          {
            name: "Shell-Scripting",
            level: 85,
            duration: "3:15",
            featured: true,
            rarity: "Rare",
          },
          {
            name: "HTML/CSS",
            level: 85,
            duration: "3:05",
            featured: false,
            rarity: "Rare",
          },
        ],
      },
      {
        name: "Frameworks & Libraries",
        artist: "Arcane Dependencies",
        coverColor: "from-purple-500 via-indigo-500 to-blue-600",
        releaseYear: "2024",
        icon: <Sparkles size={18} />,
        genre: "Enchanted Architecture",
        skills: [
          {
            name: "React",
            level: 90,
            duration: "4:20",
            featured: true,
            rarity: "Legendary",
          },
          {
            name: "Django",
            level: 85,
            duration: "3:38",
            featured: false,
            rarity: "Epic",
          },
          {
            name: "Flask",
            level: 80,
            duration: "2:55",
            featured: true,
            rarity: "Epic",
          },
          {
            name: "Node.js",
            level: 85,
            duration: "3:42",
            featured: false,
            rarity: "Epic",
          },
          {
            name: "React Native",
            level: 80,
            duration: "3:15",
            featured: false,
            rarity: "Rare",
          },
        ],
      },
      {
        name: "Databases & Tools",
        artist: "Data Sorcerers",
        coverColor: "from-emerald-500 via-teal-500 to-cyan-600",
        releaseYear: "2023",
        icon: <Star size={18} />,
        genre: "Crystalline Queries",
        skills: [
          {
            name: "MongoDB",
            level: 85,
            duration: "3:50",
            featured: true,
            rarity: "Epic",
          },
          {
            name: "PostgreSQL",
            level: 80,
            duration: "3:12",
            featured: true,
            rarity: "Epic",
          },
          {
            name: "SQL",
            level: 85,
            duration: "3:40",
            featured: true,
            rarity: "Epic",
          },
          {
            name: "Redis",
            level: 75,
            duration: "2:58",
            featured: false,
            rarity: "Rare",
          },
          {
            name: "Snowflake",
            level: 70,
            duration: "3:22",
            featured: false,
            rarity: "Rare",
          },
          {
            name: "DBT Labs",
            level: 70,
            duration: "3:12",
            featured: false,
            rarity: "Common",
          },
          {
            name: "UiPath",
            level: 70,
            duration: "2:12",
            featured: false,
            rarity: "Common",
          },
          {
            name: "Postman",
            level: 90,
            duration: "3:52",
            featured: true,
            rarity: "Legendary",
          },
        ],
      },
      {
        name: "Cloud & DevOps",
        artist: "Ethereal Infrastructure",
        coverColor: "from-blue-500 via-cyan-500 to-purple-600",
        releaseYear: "2024",
        icon: <Zap size={18} />,
        genre: "Atmospheric Computing",
        skills: [
          {
            name: "AWS",
            level: 80,
            duration: "3:55",
            featured: true,
            rarity: "Epic",
          },
          {
            name: "Docker",
            level: 85,
            duration: "4:02",
            featured: true,
            rarity: "Epic",
          },
          {
            name: "Kubernetes",
            level: 75,
            duration: "3:30",
            featured: false,
            rarity: "Rare",
          },
          {
            name: "Jenkins",
            level: 70,
            duration: "3:25",
            featured: false,
            rarity: "Common",
          },
          {
            name: "Git",
            level: 90,
            duration: "3:15",
            featured: true,
            rarity: "Legendary",
          },
          {
            name: "GCP",
            level: 80,
            duration: "3:45",
            featured: false,
            rarity: "Epic",
          },
          {
            name: "Unix",
            level: 85,
            duration: "3:22",
            featured: true,
            rarity: "Epic",
          },
          {
            name: "Kafka",
            level: 75,
            duration: "3:18",
            featured: false,
            rarity: "Rare",
          },
          {
            name: "Key Cloak",
            level: 70,
            duration: "3:10",
            featured: false,
            rarity: "Common",
          },
          {
            name: "Ansible",
            level: 80,
            duration: "3:30",
            featured: false,
            rarity: "Epic",
          },
        ],
      },
    ],
    []
  );

  // Memoized functions
  const nextTrack = useCallback(() => {
    setCurrentTrack((prev) => {
      const newTrack =
        (prev + 1) % skillCategories[activeCategory].skills.length;
      return newTrack;
    });
    setProgress(0);
  }, [activeCategory, skillCategories]);

  const prevTrack = useCallback(() => {
    setCurrentTrack((prev) => {
      const newTrack =
        (prev - 1 + skillCategories[activeCategory].skills.length) %
        skillCategories[activeCategory].skills.length;
      return newTrack;
    });
    setProgress(0);
  }, [activeCategory, skillCategories]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 0.5;
          if (newProgress >= 100) {
            nextTrack();
            return 0;
          }
          return newProgress;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, nextTrack]);

  const toggleLike = (categoryIndex, trackIndex) => {
    const trackId = `${categoryIndex}-${trackIndex}`;
    setLikedTracks((prev) =>
      prev.includes(trackId)
        ? prev.filter((id) => id !== trackId)
        : [...prev, trackId]
    );
  };

  const formatTime = (percentage) => {
    const duration =
      skillCategories[activeCategory].skills[currentTrack].duration;
    const [minutes, seconds] = duration.split(":").map(Number);
    const totalSeconds = minutes * 60 + seconds;
    const currentSeconds = Math.floor(totalSeconds * (percentage / 100));
    const currentMinutes = Math.floor(currentSeconds / 60);
    const remainingSeconds = currentSeconds % 60;
    return `${currentMinutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "Legendary":
        return "from-yellow-400 to-orange-500";
      case "Epic":
        return "from-purple-500 to-pink-500";
      case "Rare":
        return "from-blue-400 to-cyan-500";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  return (
    <section
      id="skills"
      className="relative py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden"
    >
      {/* Magical Background Effects */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.4), transparent 50%)`,
          }}
        />

        {/* Floating magical particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute text-purple-300 animate-pulse pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              fontSize: `${particle.size * 4}px`,
              filter: "drop-shadow(0 0 8px rgba(147, 51, 234, 0.7))",
            }}
          >
            {particle.type}
          </div>
        ))}

        {/* Constellation lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <linearGradient
              id="constellation-skills"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          <path
            d="M100,200 Q400,100 700,200 T1200,200"
            stroke="url(#constellation-skills)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
          />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Enhanced Magical Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 flex items-center justify-center">
            <Sparkles className="mr-4 text-purple-400 animate-spin" size={40} />
            Enchanted Skill Symphony
            <Music size={40} className="ml-4 text-pink-400 animate-bounce" />
          </h2>
          <p className="text-xl text-gray-300">
            A magical collection of mystical abilities and arcane knowledge
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20 backdrop-blur-sm">
          {/* Magical Album Header */}
          <div
            className={`bg-gradient-to-r ${skillCategories[activeCategory].coverColor} p-8 relative overflow-hidden`}
          >
            {/* Floating sparkles in header */}
            <Sparkles
              className="absolute top-4 left-4 text-white/30 animate-spin"
              size={24}
            />
            <Star
              className="absolute top-4 right-4 text-white/30 animate-pulse"
              size={20}
            />
            <Zap
              className="absolute bottom-4 right-8 text-white/30 animate-bounce"
              size={18}
            />

            <div className="relative flex flex-col md:flex-row items-center gap-6">
              <div className="w-48 h-48 bg-gray-800/50 rounded-xl shadow-2xl flex items-center justify-center relative overflow-hidden backdrop-blur-sm border border-white/20">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${skillCategories[activeCategory].coverColor} opacity-80`}
                ></div>
                <div className="relative z-10 text-white text-5xl drop-shadow-lg">
                  {skillCategories[activeCategory].icon}
                </div>
                {isPlaying && (
                  <div className="absolute bottom-3 right-3 z-10">
                    <div className="flex items-end space-x-1">
                      <div className="w-1.5 h-4 bg-white animate-equalize rounded-full"></div>
                      <div className="w-1.5 h-6 bg-white animate-equalize delay-75 rounded-full"></div>
                      <div className="w-1.5 h-3 bg-white animate-equalize delay-150 rounded-full"></div>
                      <div className="w-1.5 h-5 bg-white animate-equalize rounded-full"></div>
                    </div>
                  </div>
                )}

                {/* Magical glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl animate-pulse"></div>
              </div>
              <div className="relative">
                <div className="text-gray-200 text-sm font-medium mb-1 flex items-center">
                  <Award className="mr-2" size={16} />
                  MAGICAL COLLECTION
                </div>
                <h3 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  {skillCategories[activeCategory].name}
                </h3>
                <p className="text-gray-200 mb-2">
                  By {skillCategories[activeCategory].artist}
                </p>
                <p className="text-gray-300 text-sm mb-4">
                  Genre: {skillCategories[activeCategory].genre} • Released{" "}
                  {skillCategories[activeCategory].releaseYear} •{" "}
                  {skillCategories[activeCategory].skills.length} enchanted
                  tracks
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={togglePlay}
                    className="flex items-center gap-3 py-3 px-8 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 text-white font-medium border border-white/30 shadow-lg hover:scale-105"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    {isPlaying ? "Pause Magic" : "Cast Spells"}
                  </button>
                  <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all duration-300 border border-white/20 hover:scale-105">
                    <BarChart2 size={20} />
                  </button>
                  <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all duration-300 border border-white/20 hover:scale-105">
                    <Shuffle size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Magical Spell Books Sidebar */}
            <div className="lg:w-1/3 p-6 border-r border-purple-500/20">
              <h3 className="text-xl font-medium text-white mb-4 flex items-center">
                <Disc className="mr-2 text-purple-400" size={20} />
                Spell Collections
              </h3>
              <ul className="space-y-3">
                {skillCategories.map((category, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setActiveCategory(index);
                      setCurrentTrack(0);
                      setProgress(0);
                    }}
                    className={`group p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      activeCategory === index
                        ? `bg-gradient-to-r ${category.coverColor} bg-opacity-20 border-l-4 border-purple-400 shadow-lg shadow-purple-500/20`
                        : "hover:bg-gray-800/50 border border-gray-700/50"
                    } backdrop-blur-sm`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-12 h-12 flex-shrink-0 rounded-lg ${
                          activeCategory === index
                            ? `bg-gradient-to-br ${category.coverColor}`
                            : "bg-gray-700/50"
                        } flex items-center justify-center mr-3 border border-white/10 shadow-lg`}
                      >
                        {activeCategory === index && isPlaying ? (
                          <div className="flex items-center space-x-px">
                            <div className="w-1 h-3 bg-white animate-equalize rounded-full"></div>
                            <div className="w-1 h-5 bg-white animate-equalize delay-75 rounded-full"></div>
                            <div className="w-1 h-4 bg-white animate-equalize delay-150 rounded-full"></div>
                          </div>
                        ) : (
                          <div className="text-white">{category.icon}</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium group-hover:text-purple-300 transition-colors">
                          {category.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {category.artist}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {category.genre}
                        </p>
                      </div>
                      {activeCategory === index && (
                        <Sparkles
                          className="text-purple-400 animate-spin"
                          size={16}
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Magical Skills Tracks */}
            <div className="lg:w-2/3 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <h3 className="text-xl font-medium text-white flex items-center">
                    <List className="mr-2 text-purple-400" size={20} />
                    Enchanted Abilities
                  </h3>
                  <span className="ml-3 text-gray-400 text-sm">
                    {skillCategories[activeCategory].skills.length} magical
                    skills
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Shuffle
                    size={16}
                    className="hover:text-purple-400 cursor-pointer transition-colors"
                  />
                  <RepeatIcon
                    size={16}
                    className="hover:text-purple-400 cursor-pointer transition-colors"
                  />
                  <Clock size={16} />
                </div>
              </div>

              {/* Magical Track Headers */}
              <div className="grid grid-cols-12 text-gray-400 text-sm border-b border-purple-500/20 pb-3 mb-4">
                <div className="col-span-1">#</div>
                <div className="col-span-4">SPELL NAME</div>
                <div className="col-span-3">MASTERY LEVEL</div>
                <div className="col-span-2">RARITY</div>
                <div className="col-span-1 text-right">TIME</div>
                <div className="col-span-1 text-right">♥</div>
              </div>

              {/* Magical Skill Tracks */}
              <div className="space-y-2">
                {skillCategories[activeCategory].skills.map((skill, index) => {
                  const isCurrentTrack = currentTrack === index;
                  const trackId = `${activeCategory}-${index}`;
                  const isLiked = likedTracks.includes(trackId);
                  const shouldPlaying = isCurrentTrack && isPlaying;

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setCurrentTrack(index);
                        setIsPlaying(true);
                        setProgress(0);
                      }}
                      className={`group grid grid-cols-12 items-center p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                        isCurrentTrack
                          ? `bg-gradient-to-r ${skillCategories[activeCategory].coverColor} bg-opacity-20 shadow-lg shadow-purple-500/20 border border-purple-400/30`
                          : "bg-gray-800/30 hover:bg-gray-700/50 border border-gray-700/30"
                      } backdrop-blur-sm hover:scale-[1.02]`}
                    >
                      <div className="col-span-1 flex justify-center">
                        {shouldPlaying ? (
                          <div className="flex items-center space-x-px">
                            <div className="w-1 h-3 bg-purple-400 animate-equalize rounded-full"></div>
                            <div className="w-1 h-5 bg-purple-400 animate-equalize delay-75 rounded-full"></div>
                            <div className="w-1 h-4 bg-purple-400 animate-equalize delay-150 rounded-full"></div>
                          </div>
                        ) : (
                          <span
                            className={`text-sm font-medium ${
                              isCurrentTrack
                                ? "text-purple-400"
                                : "text-gray-400 group-hover:text-white"
                            }`}
                          >
                            {index + 1}
                          </span>
                        )}
                      </div>

                      <div className="col-span-4">
                        <div className="flex items-center">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <span
                                className={`font-medium ${
                                  isCurrentTrack
                                    ? "text-purple-400"
                                    : "text-white"
                                }`}
                              >
                                {skill.name}
                              </span>
                              {skill.featured && (
                                <Star
                                  className="ml-2 text-yellow-400 animate-pulse"
                                  size={14}
                                />
                              )}
                            </div>
                            {skill.featured && (
                              <span className="text-xs text-purple-400 flex items-center mt-1">
                                <Award size={12} className="mr-1" />
                                Featured Spell
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-span-3">
                        <div className="relative">
                          <div className="w-full bg-gray-700/50 rounded-full h-2.5 border border-gray-600/30">
                            <div
                              className={`bg-gradient-to-r ${
                                skillCategories[activeCategory].coverColor
                              } h-2.5 rounded-full transition-all duration-500 ${
                                isCurrentTrack
                                  ? "animate-pulse-subtle shadow-lg"
                                  : ""
                              }`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-400">
                              {skill.level}% Mastered
                            </span>
                            {isCurrentTrack && (
                              <Sparkles
                                className="text-purple-400 animate-spin"
                                size={12}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getRarityColor(
                            skill.rarity
                          )} text-white shadow-sm`}
                        >
                          {skill.rarity}
                        </span>
                      </div>

                      <div className="col-span-1 text-right text-gray-400 text-sm font-mono">
                        {skill.duration}
                      </div>

                      <div className="col-span-1 text-right">
                        <Heart
                          size={16}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(activeCategory, index);
                          }}
                          className={`transition-all duration-300 ${
                            isLiked
                              ? "text-pink-500 fill-pink-500 animate-pulse"
                              : "text-gray-400 hover:text-pink-400 hover:scale-110"
                          } cursor-pointer`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Magical Player Controls */}
          <div className="p-6 border-t border-purple-500/20 bg-gradient-to-r from-gray-950/80 to-gray-900/80 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Current Track Info */}
              <div className="flex items-center w-full lg:w-1/3">
                <div
                  className={`w-14 h-14 rounded-xl mr-4 bg-gradient-to-br ${skillCategories[activeCategory].coverColor} flex items-center justify-center shadow-lg border border-white/20`}
                >
                  {skillCategories[activeCategory].icon}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium flex items-center">
                    {skillCategories[activeCategory].skills[currentTrack].name}
                    {skillCategories[activeCategory].skills[currentTrack]
                      .featured && (
                      <Star className="ml-2 text-yellow-400" size={14} />
                    )}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {skillCategories[activeCategory].artist}
                  </p>
                </div>
                <Heart
                  size={18}
                  className={`ml-4 transition-all duration-300 ${
                    likedTracks.includes(`${activeCategory}-${currentTrack}`)
                      ? "text-pink-500 fill-pink-500 animate-pulse"
                      : "text-gray-400 hover:text-pink-400"
                  } cursor-pointer hover:scale-110`}
                  onClick={() => toggleLike(activeCategory, currentTrack)}
                />
              </div>

              {/* Magical Player Controls */}
              <div className="flex flex-col items-center w-full lg:w-1/2">
                <div className="flex items-center space-x-6 mb-3">
                  <button
                    onClick={prevTrack}
                    className="p-2 rounded-full hover:bg-purple-500/20 transition-all duration-300 hover:scale-110"
                  >
                    <SkipBack
                      size={20}
                      className="text-gray-400 hover:text-white"
                    />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105"
                  >
                    {isPlaying ? (
                      <Pause size={20} className="text-white" />
                    ) : (
                      <Play size={20} className="text-white ml-0.5" />
                    )}
                  </button>
                  <button
                    onClick={nextTrack}
                    className="p-2 rounded-full hover:bg-purple-500/20 transition-all duration-300 hover:scale-110"
                  >
                    <SkipForward
                      size={20}
                      className="text-gray-400 hover:text-white"
                    />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full flex items-center">
                  <span className="text-xs text-gray-400 mr-3 font-mono">
                    {formatTime(progress)}
                  </span>
                  <div className="flex-1 bg-gray-700/50 rounded-full h-1.5 relative border border-gray-600/30">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full transition-all duration-300 shadow-sm"
                      style={{ width: `${progress}%` }}
                    ></div>
                    {/* Magical glow effect on progress */}
                    {isPlaying && (
                      <div
                        className="absolute top-0 left-0 h-1.5 bg-white/30 rounded-full animate-pulse"
                        style={{ width: `${progress}%` }}
                      ></div>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 ml-3 font-mono">
                    {
                      skillCategories[activeCategory].skills[currentTrack]
                        .duration
                    }
                  </span>
                </div>
              </div>

              {/* Volume and Additional Controls */}
              <div className="flex items-center space-x-4 w-full lg:w-1/3 lg:justify-end">
                <button className="p-2 rounded-full hover:bg-purple-500/20 transition-all duration-300 hover:scale-110">
                  <Shuffle
                    size={18}
                    className="text-gray-400 hover:text-purple-400"
                  />
                </button>
                <button className="p-2 rounded-full hover:bg-purple-500/20 transition-all duration-300 hover:scale-110">
                  <RepeatIcon
                    size={18}
                    className="text-gray-400 hover:text-purple-400"
                  />
                </button>
                <div className="flex items-center space-x-2">
                  <Volume2 size={18} className="text-gray-400" />
                  <div className="w-20 bg-gray-700/50 rounded-full h-1 border border-gray-600/30">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes equalize {
          0%,
          100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.5);
          }
        }
        @keyframes pulse-subtle {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-equalize {
          animation: equalize 0.6s ease-in-out infinite;
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;
