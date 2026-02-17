import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle } from 'lucide-react';
import { Project } from '../types';
import { useLanguage } from '../LanguageContext';

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLDivElement>(null);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Apply style to body to prevent scrolling and compensate for scrollbar removal
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      // Reset styles
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen]);

  useEffect(() => {
    // Reset video state when project changes
    setShouldPlayVideo(false);

    if (!project.videoUrl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setShouldPlayVideo(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: '50px' // Start slightly before it enters if scrolling fast
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [project.videoUrl]);

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop with Sophisticated Blur Animation */}
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />

      {/* Modal Container with Slide-Up Spring Animation */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.95 }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.6
        }}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl no-scrollbar flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 text-neutral-400 hover:text-white bg-black/50 hover:bg-white/10 rounded-full transition-colors backdrop-blur-sm border border-white/5"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Media Header (Video or Image) */}
        <div ref={videoRef} className="relative h-64 md:h-96 w-full shrink-0 overflow-hidden bg-black">
          {/* Gradient Overlay for Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
          {/* Top Gradient for Close Button Visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10 h-32 pointer-events-none" />

          {project.videoUrl && shouldPlayVideo ? (
            <video
              key={project.videoUrl} // Key forces re-render when URL changes
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-90"
              poster={project.imageUrl}
            >
              <source src={project.videoUrl} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">{project.title}</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium text-blue-200 bg-blue-950/50 rounded-full border border-blue-500/30 backdrop-blur-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-10 space-y-10 bg-[#0a0a0a]">

          {/* About Section */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              {t.modal.about}
            </h3>
            <p className="text-neutral-300 leading-relaxed text-lg text-pretty">
              {project.longDescription}
            </p>
          </section>

          {/* Grid Layout: Stacked on mobile, 2 columns on tablet/desktop */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Impact Section */}
            <section className="bg-white/5 rounded-xl p-6 border border-white/5 h-full hover:bg-white/[0.07] transition-colors duration-300">
              <h4 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                {t.modal.features}
              </h4>
              <ul className="space-y-4">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="text-neutral-300 text-sm leading-relaxed flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Challenges Section */}
            <section className="bg-white/5 rounded-xl p-6 border border-white/5 h-full hover:bg-white/[0.07] transition-colors duration-300">
              <h4 className="text-lg font-semibold text-violet-400 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {t.modal.challenges}
              </h4>
              <ul className="space-y-4">
                {project.challenges.map((challenge, idx) => (
                  <li key={idx} className="text-neutral-300 text-sm leading-relaxed flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10 mt-auto">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3.5 px-6 rounded-lg font-medium transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] group"
            >
              <ExternalLink className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              {t.modal.btnLive}
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-3.5 px-6 rounded-lg font-medium transition-colors border border-white/10 hover:border-white/20"
            >
              <Github className="w-5 h-5" />
              {t.modal.btnCode}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ProjectModal;