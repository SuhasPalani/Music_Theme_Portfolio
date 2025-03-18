import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, User, Briefcase, Code, Mail, Home } from 'lucide-react';

// List all the audio files in the public/audios folder
const audioFiles = [
  '1.mp3',
  '2.mp3',
  '3.mp3',
];

const Header = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null); // Initially set to null for random selection
  const [volume, setVolume] = useState(1); // Volume ranges from 0 to 1
  const [trackHistory, setTrackHistory] = useState([]); // Store played tracks for next/previous buttons
  const audioRef = useRef(new Audio());

  // Update audio source when track changes
  useEffect(() => {
    if (currentTrackIndex === null) return; // Don't set source if no track has been chosen yet
    
    const audio = audioRef.current;
    audio.src = `/audios/${audioFiles[currentTrackIndex]}`;
    audio.volume = volume;
    audio.load(); // Reload the audio when the source changes
    
    // Auto-play when changing tracks via next/previous buttons
    if (isPlaying) {
      const playPromise = audio.play();
      
      // Handle the play promise to avoid uncaught promise errors
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
      const playPromise = audio.play();
      
      // Handle the play promise to avoid uncaught promise errors
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio play failed:", error);
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
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
    // If no track is set, pick a random one
    if (currentTrackIndex === null) {
      const randomIndex = Math.floor(Math.random() * audioFiles.length);
      setCurrentTrackIndex(randomIndex); // Set the random track to start playing
      setTrackHistory([randomIndex]); // Initialize the history with the first track
    }
    
    setIsPlaying(!isPlaying);
  };

  // Play next track in the list
  const playNext = () => {
    if (!trackHistory.length) return; // If there's no history, return

    const currentIndex = trackHistory[trackHistory.length - 1];
    let nextIndex = (currentIndex + 1) % audioFiles.length; // Wrap around to the first song if at the end
    setTrackHistory([...trackHistory, nextIndex]);
    setCurrentTrackIndex(nextIndex); // Update the current track to the next one
    setIsPlaying(true); // Auto play when clicking next
  };

  // Play previous track in the list
  const playPrevious = () => {
    if (trackHistory.length <= 1) return; // If there's only one track in history, return

    const prevIndex = trackHistory[trackHistory.length - 2]; // Get the previous track from history
    setTrackHistory(trackHistory.slice(0, trackHistory.length - 1)); // Remove the last track (since we're going back)
    setCurrentTrackIndex(prevIndex); // Set the current track to the previous one
    setIsPlaying(true); // Auto play when clicking previous
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume; // Update the audio volume
  };

  return (
    <header className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-lg font-bold">SP</span>
            </div>
            <div>
              <h3 className="font-bold">Suhas Palani</h3>
              <p className="text-xs text-gray-400">Software Engineer</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            <nav>
              <ul className="flex space-x-6">
                <li><a href="#home" className="hover:text-purple-400 transition-colors flex items-center gap-1"><Home size={16} /> Home</a></li>
                <li><a href="#about" className="hover:text-purple-400 transition-colors flex items-center gap-1"><User size={16} /> About</a></li>
                <li><a href="#experience" className="hover:text-purple-400 transition-colors flex items-center gap-1"><Briefcase size={16} /> Experience</a></li>
                <li><a href="#projects" className="hover:text-purple-400 transition-colors flex items-center gap-1"><Code size={16} /> Projects</a></li>
                <li><a href="#contact" className="hover:text-purple-400 transition-colors flex items-center gap-1"><Mail size={16} /> Contact</a></li>
              </ul>
            </nav>
          </div>

          {/* Music Controls */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              onClick={playPrevious}
              disabled={trackHistory.length <= 1}
            >
              <SkipBack size={18} />
            </button>
            <button 
              className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button 
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              onClick={playNext}
              disabled={!trackHistory.length}
            >
              <SkipForward size={18} />
            </button>

            {/* Volume Control */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24"
            />
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <Volume2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;