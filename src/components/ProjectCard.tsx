import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { ProjectWithStyle } from '../types';
import ProjectModal from './ProjectModal';

interface ProjectCardProps {
  project: ProjectWithStyle;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 
          hover:scale-[1.02] hover:bg-white/[0.08] hover:border-white/30 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)]
          transition-all duration-500 ease-out backdrop-blur-sm cursor-pointer ${project.className || ''}`}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image Section with Brand Gradient */}
        <div className={`relative h-64 sm:h-72 w-full overflow-hidden bg-gradient-to-t ${project.brandColor || 'from-neutral-800/20'} to-transparent`}>
          {/* Subtle noise texture or overlay if needed, currently just the gradient */}

          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-contain object-bottom p-4 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2"
          />

          {/* Floating Action Button inside card */}
          <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="p-3 rounded-full bg-white text-black shadow-lg">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-6 relative z-20">
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>

            {/* Improved Typography: Lighter color and more line-height */}
            <p className="text-neutral-300 line-clamp-2 leading-relaxed text-sm mb-5">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-[11px] font-medium text-neutral-400 bg-white/5 rounded-md border border-white/5 tracking-wide group-hover:border-white/10 group-hover:bg-white/10 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Actions Footer - Push to bottom */}
          <div className="mt-auto pt-4 flex items-center gap-4 border-t border-white/5">
            {/* Live Demo */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} // Prevent modal open
                className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-blue-400 transition-colors group/link"
              >
                <ExternalLink className="w-4 h-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                <span>Demo</span>
              </a>
            )}

            {/* Github */}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} // Prevent modal open
                className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors group/gh"
              >
                <Github className="w-4 h-4 transition-transform group-hover/gh:scale-110" />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <ProjectModal
            project={project}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;