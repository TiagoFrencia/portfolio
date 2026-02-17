import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, FolderGit2, Cpu, Mail, Search } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const { t, language, toggleLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { icon: Home, label: t.nav.home, href: '#home', id: 'home' },
    { icon: FolderGit2, label: t.nav.work, href: '#projects', id: 'projects' },
    { icon: Cpu, label: t.nav.stack, href: '#stack', id: 'stack' },
    { icon: Mail, label: t.nav.contact, href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Logic to detect active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3; // Trigger slightly earlier

      for (const section of sections) {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // Prevent default anchor jump
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id); // Set active immediately for UI feedback
    }
  };

  return (
    // Container: Centered Bottom on Mobile, Centered Left on Desktop
    <div className="fixed z-50 
      bottom-6 left-1/2 -translate-x-1/2 
      md:bottom-auto md:left-6 md:top-1/2 md:-translate-y-1/2 md:translate-x-0
      flex md:flex-col gap-4 items-center"
    >
      <motion.nav
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        className="flex md:flex-col items-center gap-1 p-2 rounded-full bg-black/20 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50"
      >
        {/* Main Navigation Links */}
        <div className="flex md:flex-col gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className="group relative flex items-center justify-center w-12 h-12 rounded-full"
                animate={{
                  scale: isActive ? 1.15 : 1,
                  backgroundColor: isActive ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0)",
                  color: isActive ? "#ffffff" : "#a3a3a3",
                  boxShadow: isActive ? "0 0 20px rgba(255, 255, 255, 0.3)" : "none"
                }}
                whileHover={{
                  scale: isActive ? 1.15 : 1.1,
                  backgroundColor: isActive ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff"
                }}
                transition={{ duration: 0.3 }}
              >
                <item.icon className="w-5 h-5 relative z-10" />
                
                {/* Tooltip - Context Aware (Top on mobile, Right on Desktop) */}
                <span className="absolute px-3 py-1.5 bg-[#1a1a1a] text-white text-[11px] font-medium rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl
                  /* Mobile Positioning */
                  -top-12 left-1/2 -translate-x-1/2
                  /* Desktop Positioning */
                  md:top-1/2 md:-translate-y-1/2 md:left-full md:ml-4 md:translate-x-0
                ">
                  {item.label}
                  {/* Tiny arrow for tooltip */}
                  <span className="absolute w-2 h-2 bg-[#1a1a1a] rotate-45 border-l border-b border-white/10
                    /* Mobile Arrow */
                    -bottom-1 left-1/2 -translate-x-1/2
                    /* Desktop Arrow */
                    md:top-1/2 md:-translate-y-1/2 md:-left-1 md:bottom-auto md:border-l-0 md:border-b-0 md:border-r md:border-b
                  "/>
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-px h-8 md:w-8 md:h-px bg-white/10 mx-1 md:my-1" />

        {/* Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-all duration-300"
        >
          <Search className="w-5 h-5" />
          
          {/* Tooltip with Shortcut Hint */}
          <span className="absolute px-3 py-1.5 bg-[#1a1a1a] text-white text-[11px] font-medium rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl flex items-center gap-2
            /* Mobile Positioning */
            -top-12 left-1/2 -translate-x-1/2
            /* Desktop Positioning */
            md:top-1/2 md:-translate-y-1/2 md:left-full md:ml-4 md:translate-x-0
          ">
            Search <span className="text-white/50 bg-white/10 px-1 rounded text-[9px] border border-white/10">⌘K</span>
             <span className="absolute w-2 h-2 bg-[#1a1a1a] rotate-45 border-l border-b border-white/10
                  /* Mobile Arrow */
                  -bottom-1 left-1/2 -translate-x-1/2
                  /* Desktop Arrow */
                  md:top-1/2 md:-translate-y-1/2 md:-left-1 md:bottom-auto md:border-l-0 md:border-b-0 md:border-r md:border-b
                "/>
          </span>
        </button>

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-all duration-300"
        >
          <span className="text-xs font-bold tracking-wider font-mono">
            {language === 'es' ? 'EN' : 'ES'}
          </span>
          
           {/* Tooltip */}
           <span className="absolute px-3 py-1.5 bg-[#1a1a1a] text-white text-[11px] font-medium rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl
            /* Mobile Positioning */
            -top-12 left-1/2 -translate-x-1/2
            /* Desktop Positioning */
            md:top-1/2 md:-translate-y-1/2 md:left-full md:ml-4 md:translate-x-0
          ">
            {language === 'es' ? 'English' : 'Español'}
             <span className="absolute w-2 h-2 bg-[#1a1a1a] rotate-45 border-l border-b border-white/10
                  /* Mobile Arrow */
                  -bottom-1 left-1/2 -translate-x-1/2
                  /* Desktop Arrow */
                  md:top-1/2 md:-translate-y-1/2 md:-left-1 md:bottom-auto md:border-l-0 md:border-b-0 md:border-r md:border-b
                "/>
          </span>
        </button>
      </motion.nav>
    </div>
  );
};

export default Navbar;