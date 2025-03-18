import React, { useState } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const skillCategories = [
    {
      name: "Programming Languages",
      skills: [
        { name: "Python", level: 90 },
        { name: "Java", level: 80 },
        { name: "C/C++", level: 80 },
        { name: "JavaScript", level: 90 },
        { name: "HTML/CSS", level: 85 }
      ]
    },
    {
      name: "Frameworks & Libraries",
      skills: [
        { name: "React", level: 90 },
        { name: "Django", level: 85 },
        { name: "Flask", level: 80 },
        { name: "Node.js", level: 85 },
        { name: "React Native", level: 80 }
      ]
    },
    {
      name: "Databases & Tools",
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "SQL", level: 85 },
        { name: "Redis", level: 75 },
        { name: "Snowflake", level: 70 }
      ]
    },
    {
      name: "Cloud & DevOps",
      skills: [
        { name: "AWS", level: 80 },
        { name: "Docker", level: 85 },
        { name: "Kubernetes", level: 75 },
        { name: "Jenkins", level: 70 },
        { name: "Git", level: 90 }
      ]
    }
  ];

  const nextPlaylist = () => {
    setActiveCategory((prev) => (prev + 1) % skillCategories.length);
  };

  const prevPlaylist = () => {
    setActiveCategory((prev) => (prev - 1 + skillCategories.length) % skillCategories.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="skills" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-white flex items-center">
          <span className="inline-block w-8 h-1 bg-purple-600 mr-3"></span>
          My Playlist
          <Music size={24} className="ml-3 text-purple-500" />
        </h2>

        <div className="bg-gray-900 rounded-lg p-6 shadow-xl shadow-purple-900/20">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Playlists */}
            <div className="md:w-1/3">
              <h3 className="text-xl font-medium text-white mb-4">Playlists</h3>
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
                      <div className={`w-8 h-8 flex-shrink-0 rounded-full ${
                        activeCategory === index 
                          ? 'bg-purple-600' 
                          : 'bg-gray-700'
                      } flex items-center justify-center mr-3`}>
                        {activeCategory === index && isPlaying ? 
                          <div className="flex items-center space-x-px">
                            <div className="w-1 h-3 bg-white animate-equalize"></div>
                            <div className="w-1 h-5 bg-white animate-equalize delay-75"></div>
                            <div className="w-1 h-4 bg-white animate-equalize delay-150"></div>
                          </div> :
                          <span className="text-xs text-white">{index + 1}</span>
                        }
                      </div>
                      <div>
                        <p className="text-white font-medium">{category.name}</p>
                        <p className="text-gray-400 text-sm">{category.skills.length} tracks</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Current Playlist */}
            <div className="md:w-2/3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium text-white">
                  Now Playing: {skillCategories[activeCategory].name}
                </h3>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={prevPlaylist}
                    className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <SkipBack size={16} className="text-gray-400" />
                  </button>
                  <button 
                    onClick={togglePlay}
                    className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
                  >
                    {isPlaying ? 
                      <Pause size={16} className="text-white" /> : 
                      <Play size={16} className="text-white" />
                    }
                  </button>
                  <button 
                    onClick={nextPlaylist}
                    className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <SkipForward size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {skillCategories[activeCategory].skills.map((skill, index) => (
                  <div key={index} className={`p-3 rounded-lg bg-gray-800 ${
                    isPlaying ? 'animate-pulse-subtle' : ''
                  }`}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-3">{index + 1}</span>
                        <span className="text-white font-medium">{skill.name}</span>
                      </div>
                      <span className="text-gray-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;