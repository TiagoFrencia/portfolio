import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Layers, Code2, Layout, Zap } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  const handleScrollDown = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getIconForStat = (index: number) => {
    const icons = [Layers, Code2, Layout, Zap];
    const Icon = icons[index] || Layers;
    return <Icon className="w-6 h-6 text-blue-400 mb-3 group-hover:text-white transition-colors duration-300" />;
  };

  return (
    <section id="home" className="relative z-10 min-h-screen flex flex-col justify-center px-4 max-w-6xl mx-auto pt-20">

      {/* Central Spotlight Effect for Depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="w-full flex flex-col items-center text-center">

        {/* 1. Badge (Top Center) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-semibold text-green-400 mb-8 backdrop-blur-md hover:bg-green-500/20 transition-colors cursor-default"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          {t.hero.badge}
        </motion.div>

        {/* 2. Name (H2 - Subtle, Light Gray) */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl font-medium text-neutral-300 tracking-wide mb-4"
        >
          {t.hero.greeting}
        </motion.h2>

        {/* 3. Main Title (H1 - Value Proposition - Protagonist) */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-neutral-400 leading-tight drop-shadow-sm"
        >
          {t.hero.role}
        </motion.h1>

        {/* 4. Authority Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-neutral-400 font-light tracking-wide max-w-2xl leading-relaxed mb-10 text-pretty"
        >
          {t.hero.sub}
        </motion.p>

        {/* 5. CTA (Button) - High Conversion Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a
            href="#projects"
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-white px-10 font-medium text-black transition-all duration-300 hover:bg-blue-50 hover:scale-105 active:scale-95 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          >
            <span className="mr-2 text-base tracking-tight font-semibold">{t.hero.cta}</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* Technical Pillars (Replaced numeric stats) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          {t.hero.stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-white/10 transition-all duration-300 group hover:-translate-y-1"
            >
              {getIconForStat(index)}
              <span className="text-lg font-bold text-white mb-1 tracking-tight text-center">
                {stat.value}
              </span>
              <span className="text-xs font-medium text-neutral-400 text-center leading-snug max-w-[150px]">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator - Minimalist Bounce */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 1 },
          y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
        onClick={handleScrollDown}
        role="button"
        tabIndex={0}
        aria-label="Scroll to projects"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleScrollDown(); }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer p-4 hover:opacity-80 transition-opacity"
      >
        <ChevronDown className="w-8 h-8 text-gray-300" />
      </motion.div>

      {/* Bottom Blur Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;