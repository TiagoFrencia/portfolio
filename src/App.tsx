import React, { useState, useEffect } from 'react';
import SpotlightBackground from './components/SpotlightBackground';
import Hero from './components/Hero';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import CommandPalette from './components/CommandPalette';
import KonamiEasterEgg from './components/KonamiEasterEgg';
import BentoGrid from './components/BentoGrid';
import { LanguageProvider } from './LanguageContext';

const App: React.FC = () => {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-[#030303] selection:bg-white/20 selection:text-white overflow-hidden">
        <CustomCursor />
        <KonamiEasterEgg />
        <SpotlightBackground />
        
        {/* Navbar receives the open function to trigger via button */}
        <Navbar onOpenCommandPalette={() => setIsPaletteOpen(true)} />
        
        {/* Command Palette Component */}
        <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
        
        <main className="relative z-10">
          <Hero />
          
          {/* Tech Stack is now part of the flow between hero and projects */}
          <div id="stack" className="scroll-mt-20">
            <TechStack />
          </div>
          
          <Projects />

          {/* About Me / Bento Grid Section */}
          <BentoGrid />
        </main>

        <div id="contact">
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default App;