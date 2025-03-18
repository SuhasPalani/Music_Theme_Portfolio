import React, { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Use useMemo to memoize the audio object so it doesn't get recreated on every render
  const audio = useMemo(() => new Audio("/suhas.wav"), []); // Use '/suhas.wav' for the public folder

  useEffect(() => {
    // Set up any additional customizations or cleanup here.
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#fff";

    // Cleanup: stop music if the component is unmounted
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const toggleMusic = () => {
    if (isPlaying) {
      console.log("Pausing music...");
      audio.pause(); // Pause the audio
    } else {
      console.log("Playing music...");
      audio.play(); // Play the audio
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-portfolio">
      <Header />
      <main>
        <HeroSection />
        <AboutMe />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />

      {/* Music Player Button */}
      <div className="music-player-btn">
        <button
          onClick={toggleMusic}
          className="bg-purple-600 text-white py-2 px-4 rounded-full mt-6"
        >
          {isPlaying ? "Pause Music" : "Play Music"}
        </button>
      </div>
    </div>
  );
};

export default App;
