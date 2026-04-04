import React, { lazy, Suspense, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import LoadingScreen from "./components/LoadingScreen";
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

const CinematicScene = lazy(() => import("./components/CinematicScene"));

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div
        className={`relative noise-overlay transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)' }}
      >
        <Suspense fallback={null}>
          <CinematicScene />
        </Suspense>
        <Header />
        <main className="relative" style={{ zIndex: 1 }}>
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
