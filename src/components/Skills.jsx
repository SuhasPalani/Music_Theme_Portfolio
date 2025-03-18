import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, Heart, Shuffle, RepeatIcon, Clock, Disc, BarChart2, Award, List } from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [likedTracks, setLikedTracks] = useState([]);
  const [showEqualizer, setShowEqualizer] = useState(false);

  // Enhanced skill categories with music-themed metadata
  const skillCategories = useMemo(() => [
    {
      name: "Programming Languages",
      artist: "The Coders",
      coverColor: "from-red-500 to-orange-500",
      releaseYear: "2023",
      icon: <Disc size={18} />,
      skills: [
        { name: "Python", level: 90, duration: "3:45", featured: true },
        { name: "Java", level: 80, duration: "3:22", featured: false },
        { name: "C/C++", level: 80, duration: "2:58", featured: false },
        { name: "JavaScript", level: 90, duration: "4:10", featured: true },
        { name: "Shell-Scripting", level: 85, duration: "3:15", featured: true },
        { name: "HTML/CSS", level: 85, duration: "3:05", featured: false }
      ]
    },
    {
      name: "Frameworks & Libraries",
      artist: "Dependency Injection",
      coverColor: "from-purple-500 to-blue-500",
      releaseYear: "2024",
      icon: <BarChart2 size={18} />,
      skills: [
        { name: "React", level: 90, duration: "4:20", featured: true },
        { name: "Django", level: 85, duration: "3:38", featured: false },
        { name: "Flask", level: 80, duration: "2:55", featured: true },
        { name: "Node.js", level: 85, duration: "3:42", featured: false },
        { name: "React Native", level: 80, duration: "3:15", featured: false }
      ]
    },
    {
      name: "Databases & Tools",
      artist: "Query Masters",
      coverColor: "from-emerald-500 to-teal-500",
      releaseYear: "2023",
      icon: <Award size={18} />,
      skills: [
        { name: "MongoDB", level: 85, duration: "3:50", featured: true },
        { name: "PostgreSQL", level: 80, duration: "3:12", featured: true },
        { name: "SQL", level: 85, duration: "3:40", featured: true },
        { name: "Redis", level: 75, duration: "2:58", featured: false },
        { name: "Snowflake", level: 70, duration: "3:22", featured: false },
        { name: "DBT Labs", level: 70, duration: "3:12", featured: false },
        { name: "UiPath", level: 70, duration: "2:12", featured: false },
        { name: "Postman", level: 90, duration: "3:52", featured: true },
      ]
    },
    {
      name: "Cloud & DevOps",
      artist: "The Containers",
      coverColor: "from-blue-500 to-cyan-500",
      releaseYear: "2024",
      icon: <List size={18} />,
      skills: [
        { name: "AWS", level: 80, duration: "3:55", featured: true },
        { name: "Docker", level: 85, duration: "4:02", featured: true },
        { name: "Kubernetes", level: 75, duration: "3:30", featured: false },
        { name: "Jenkins", level: 70, duration: "3:25", featured: false },
        { name: "Git", level: 90, duration: "3:15", featured: true },
        { name: "GCP", level: 80, duration: "3:45", featured: false },
        { name: "Unix", level: 85, duration: "3:22", featured: true },
        { name: "Kafka", level: 75, duration: "3:18", featured: false },
        { name: "Key Cloak", level: 70, duration: "3:10", featured: false },
        { name: "Ansible", level: 80, duration: "3:30", featured: false }
      ]
    }
  ], []); // The empty array means the skillCategories will not change unless explicitly modified

  // Memoized nextTrack function
  const nextTrack = useCallback(() => {
    setCurrentTrack((prev) => {
      const newTrack = (prev + 1) % skillCategories[activeCategory].skills.length;
      return newTrack;
    });
    setProgress(0);
  }, [activeCategory, skillCategories]); // Add skillCategories as a dependency

  // Memoized prevTrack function
  const prevTrack = useCallback(() => {
    setCurrentTrack((prev) => {
      const newTrack = (prev - 1 + skillCategories[activeCategory].skills.length) % skillCategories[activeCategory].skills.length;
      return newTrack;
    });
    setProgress(0);
  }, [activeCategory, skillCategories]); // Add skillCategories as a dependency

  // Memoized togglePlay function
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

  // Calculate formatted progress time
  const formatTime = (percentage) => {
    const duration = skillCategories[activeCategory].skills[currentTrack].duration;
    const [minutes, seconds] = duration.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;
    const currentSeconds = Math.floor(totalSeconds * (percentage / 100));
    const currentMinutes = Math.floor(currentSeconds / 60);
    const remainingSeconds = currentSeconds % 60;
    return `${currentMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <section id="skills" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-white flex items-center">
          <span className="inline-block w-8 h-1 bg-purple-600 mr-3"></span>
          My Playlist
          <Music size={24} className="ml-3 text-purple-500" />
        </h2>

        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl shadow-purple-900/20">
          {/* Album Header */}
          <div className={`bg-gradient-to-r ${skillCategories[activeCategory].coverColor} p-8`}>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-48 h-48 bg-gray-800 rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${skillCategories[activeCategory].coverColor} opacity-70`}></div>
                <div className="relative z-10 text-white text-5xl">
                  {skillCategories[activeCategory].icon}
                </div>
                {isPlaying && (
                  <div className="absolute bottom-3 right-3 z-10">
                    <div className="flex items-end space-x-1">
                      <div className="w-1 h-3 bg-white animate-equalize"></div>
                      <div className="w-1 h-5 bg-white animate-equalize delay-75"></div>
                      <div className="w-1 h-2 bg-white animate-equalize delay-150"></div>
                      <div className="w-1 h-4 bg-white animate-equalize"></div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <div className="text-gray-200 text-sm font-medium mb-1">PLAYLIST</div>
                <h3 className="text-3xl font-bold text-white mb-2">{skillCategories[activeCategory].name}</h3>
                <p className="text-gray-300 mb-4">By {skillCategories[activeCategory].artist} • Released {skillCategories[activeCategory].releaseYear} • {skillCategories[activeCategory].skills.length} tracks</p>
                <div className="flex space-x-4">
                  <button 
                    onClick={togglePlay} 
                    className="flex items-center gap-2 py-2 px-6 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors text-white font-medium"
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                  <button 
                    onClick={() => setShowEqualizer(!showEqualizer)}
                    className="p-3 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-70 text-white transition-colors"
                  >
                    <BarChart2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Playlists Sidebar */}
            <div className="md:w-1/3 p-6 border-r border-gray-800">
              <h3 className="text-xl font-medium text-white mb-4">Your Playlists</h3>
              <ul className="space-y-2">
                {skillCategories.map((category, index) => (
                  <li 
                    key={index}
                    onClick={() => setActiveCategory(index)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      activeCategory === index 
                        ? 'bg-purple-900/50 border-l-4 border-purple-500' 
                        : 'hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 flex-shrink-0 rounded-md ${
                        activeCategory === index ? 'bg-gradient-to-br ' + category.coverColor : 'bg-gray-700'
                      } flex items-center justify-center mr-3`}>
                        {activeCategory === index && isPlaying ? (
                          <div className="flex items-center space-x-px">
                            <div className="w-1 h-3 bg-white animate-equalize"></div>
                            <div className="w-1 h-5 bg-white animate-equalize delay-75"></div>
                            <div className="w-1 h-4 bg-white animate-equalize delay-150"></div>
                          </div>
                        ) : (
                          category.icon
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{category.name}</p>
                        <p className="text-gray-400 text-sm">By {category.artist}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Current Playlist */}
            <div className="md:w-2/3 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <h3 className="text-xl font-medium text-white">
                    Tracks
                  </h3>
                  <span className="ml-3 text-gray-400 text-sm">
                    {skillCategories[activeCategory].skills.length} skills
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Shuffle size={16} className="hover:text-white cursor-pointer" />
                  <RepeatIcon size={16} className="hover:text-white cursor-pointer" />
                  <Clock size={16} />
                </div>
              </div>

              {/* Track Headers */}
              <div className="grid grid-cols-12 text-gray-400 text-sm border-b border-gray-800 pb-2 mb-2">
                <div className="col-span-1">#</div>
                <div className="col-span-5">TITLE</div>
                <div className="col-span-3">PROFICIENCY</div>
                <div className="col-span-2 text-right">DURATION</div>
                <div className="col-span-1 text-right"></div>
              </div>

              {/* Tracks */}
              <div className="space-y-2">
                {skillCategories[activeCategory].skills.map((skill, index) => {
                  const isCurrentTrack = currentTrack === index && isPlaying;
                  const trackId = `${activeCategory}-${index}`;
                  const isLiked = likedTracks.includes(trackId);
                  
                  return (
                    <div 
                      key={index} 
                      onClick={() => { setCurrentTrack(index); setIsPlaying(true); }}
                      className={`grid grid-cols-12 items-center p-3 rounded-lg ${
                        isCurrentTrack ? 'bg-purple-900/30' : 'bg-gray-800 hover:bg-gray-700'
                      } cursor-pointer`}
                    >
                      <div className="col-span-1 flex justify-center">
                        {isCurrentTrack ? (
                          <div className="flex items-center space-x-px">
                            <div className="w-1 h-3 bg-purple-400 animate-equalize"></div>
                            <div className="w-1 h-5 bg-purple-400 animate-equalize delay-75"></div>
                            <div className="w-1 h-4 bg-purple-400 animate-equalize delay-150"></div>
                          </div>
                        ) : (
                          <span className={`text-sm ${currentTrack === index ? 'text-purple-400' : 'text-gray-400'}`}>
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <div className="col-span-5">
                        <div className="flex items-center">
                          <div className="flex flex-col">
                            <span className={`font-medium ${isCurrentTrack ? 'text-purple-400' : 'text-white'}`}>
                              {skill.name}
                            </span>
                            {skill.featured && (
                              <span className="text-xs text-purple-400 flex items-center mt-1">
                                <Award size={12} className="mr-1" /> Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`bg-gradient-to-r ${skillCategories[activeCategory].coverColor} h-2 rounded-full ${
                              isCurrentTrack ? 'animate-pulse-subtle' : ''
                            }`}
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{skill.level}%</div>
                      </div>
                      <div className="col-span-2 text-right text-gray-400 text-sm">
                        {skill.duration}
                      </div>
                      <div className="col-span-1 text-right">
                        <Heart 
                          size={16} 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            toggleLike(activeCategory, index); 
                          }}
                          className={`ml-auto ${isLiked ? 'text-purple-500 fill-purple-500' : 'text-gray-400'} hover:text-purple-400 cursor-pointer`} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Player Controls */}
          <div className="p-4 border-t border-gray-800 bg-gray-950">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0 w-full md:w-1/4">
                <div className={`w-12 h-12 rounded-md mr-3 bg-gradient-to-br ${skillCategories[activeCategory].coverColor} flex items-center justify-center`}>
                  {skillCategories[activeCategory].icon}
                </div>
                <div>
                  <p className="text-white font-medium">
                    {skillCategories[activeCategory].skills[currentTrack].name}
                  </p>
                  <p className="text-gray-400 text-sm">{skillCategories[activeCategory].artist}</p>
                </div>
                <Heart 
                  size={16} 
                  className={`ml-4 ${
                    likedTracks.includes(`${activeCategory}-${currentTrack}`) 
                      ? 'text-purple-500 fill-purple-500' 
                      : 'text-gray-400'
                  } hover:text-purple-400 cursor-pointer`} 
                  onClick={() => toggleLike(activeCategory, currentTrack)}
                />
              </div>
              
              <div className="flex flex-col items-center w-full md:w-2/4">
                <div className="flex items-center space-x-4 mb-2">
                  <button 
                    onClick={prevTrack}
                    className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <SkipBack size={18} className="text-gray-400" />
                  </button>
                  <button 
                    onClick={togglePlay}
                    className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
                  >
                    {isPlaying ? 
                      <Pause size={18} className="text-white" /> : 
                      <Play size={18} className="text-white" />
                    }
                  </button>
                  <button 
                    onClick={nextTrack}
                    className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <SkipForward size={18} className="text-gray-400" />
                  </button>
                </div>
                <div className="w-full flex items-center">
                  <span className="text-xs text-gray-400 mr-2">
                    {formatTime(progress)}
                  </span>
                  <div className="flex-1 bg-gray-700 rounded-full h-1 relative">
                    <div 
                      className={`bg-gradient-to-r from-purple-500 to-blue-500 h-1 rounded-full`}
                      style={{ width: `${progress}%` }}
                    ></div>
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md"
                      style={{ left: `${Math.max(0, progress - 1)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400 ml-2">
                    {skillCategories[activeCategory].skills[currentTrack].duration}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center w-full md:w-1/4 md:justify-end mt-4 md:mt-0">
                <Volume2 size={16} className="text-gray-400 mr-2" />
                <div className="w-24 bg-gray-700 rounded-full h-1">
                  <div 
                    className="bg-gray-400 h-1 rounded-full"
                    style={{ width: '70%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;