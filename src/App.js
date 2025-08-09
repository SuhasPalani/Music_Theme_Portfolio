import React, { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Play, Pause } from "lucide-react"; // Import icons
import "./App.css"; // Ensure you have this file for global styles if preferred

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Use useMemo to memoize the audio object so it doesn't get recreated on every render
  const audio = useMemo(() => {
    const audioFile = new Audio("/suhas.wav"); // Use '/suhas.wav' for the public folder
    audioFile.loop = true; // Add this if you want the music to loop
    return audioFile;
  }, []);

  useEffect(() => {
    // Apply global styles via CSS if App.css is used
    // If you prefer to keep them in JS for dynamic reasons, this is fine.
    // For basic body background/color, App.css or Tailwind config is generally cleaner.
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#fff";

    // Cleanup: pause and reset music if the component is unmounted
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]); // Depend on 'audio' to ensure cleanup applies to the correct instance

  const toggleMusic = () => {
    if (isPlaying) {
      console.log("Pausing music..."); // Consider removing in production
      audio.pause(); // Pause the audio
    } else {
      console.log("Playing music..."); // Consider removing in production
      // Note: Browsers require user interaction to play audio.
      // This button click is the user interaction.
      audio.play().catch((error) => {
        console.error("Failed to play audio:", error);
        // Handle cases where play() might fail (e.g., user hasn't interacted yet, or other browser policies)
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-portfolio relative">
      {" "}
      {/* Added relative for fixed child positioning */}
      <Header />
      <main>
        {/* You might want to pass isPlaying state to HeroSection or Skills
  if they need to react to the global music state, e.g.,
  <HeroSection isPlayingMusic={isPlaying} />
  <Skills isPlayingMusic={isPlaying} />
  */}
        <HeroSection />
        <AboutMe />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      {/* Magical Music Player Button - Fixed position for persistent control */}
      <div className="fixed bottom-6 right-6 z-50">
        {" "}
        {/* Added fixed positioning and higher z-index */}
        <button
          onClick={toggleMusic}
          className="group relative w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center
             hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110 shadow-lg shadow-purple-500/40
             overflow-hidden"
          aria-label={
            isPlaying ? "Pause background music" : "Play background music"
          }
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur opacity-50 group-hover:opacity-75 transition-opacity"></div>

          {isPlaying ? (
            <Pause
              className="text-white relative z-10 animate-pulse"
              size={28}
            />
          ) : (
            <Play
              className="text-white relative z-10 ml-1 animate-bounce"
              size={28}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default App;
