import React, { useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import "./App.css";

const App = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#fff";
  }, []);

  return (
    <div className="music-portfolio relative">
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
      <Chatbot />
    </div>
  );
};

export default App;