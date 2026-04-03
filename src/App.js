import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
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
  return (
    <ThemeProvider>
      <div className="relative noise-overlay" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)' }}>
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
    </ThemeProvider>
  );
};

export default App;
