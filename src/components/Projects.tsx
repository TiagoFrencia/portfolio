import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { useLanguage } from '../LanguageContext';

const Projects: React.FC = () => {
  const { projects, t } = useLanguage();

  return (
    <section id="projects" className="relative z-10 py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{t.projects.title}</h2>
          <p className="text-neutral-400 text-lg max-w-md">
            {t.projects.subtitle}
          </p>
        </div>
        <div className="hidden md:block w-32 h-px bg-white/20 mb-4" />
      </motion.div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[500px]">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;