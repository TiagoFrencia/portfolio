import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github, Clock, Copy, Check } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [time, setTime] = useState(new Date());
  const [copied, setCopied] = useState(false);
  const email = "tiagoofrenciaa@gmail.com";

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { label: t.nav.home, href: '#' },
    { label: t.nav.work, href: '#projects' },
    { label: t.nav.stack, href: '#stack' },
  ];

  const socialLinks = [
    { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/tiagofrencia/' },
    { label: 'GitHub', icon: Github, href: 'https://github.com/TiagoFrencia' },
    { label: 'Email', icon: Mail, href: `mailto:${email}` },
  ];

  return (
    <footer className="relative z-10 pt-20 pb-32 overflow-hidden bg-[#050505] border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">

        {/* Massive CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center md:text-left"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-blue-400 mb-6">
            {t.footer.cta}
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 leading-[0.9]">
            {t.footer.subCta}
          </h2>

          {/* Interactive Copy Email */}
          <div className="relative inline-block group">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-3 text-xl md:text-2xl text-neutral-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
            >
              <span>{email}</span>
              <span className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </span>
            </button>

            {/* Tooltip */}
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none px-3 py-1.5 bg-[#1a1a1a] text-white text-xs font-medium rounded-lg border border-white/10 whitespace-nowrap shadow-xl">
              {copied ? t.footer.copiedText : t.footer.emailText}
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a1a1a] rotate-45 border-l border-t border-white/10" />
            </span>
          </div>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-12 border-b border-white/10">

          {/* Identity Column */}
          <div className="md:col-span-4 flex flex-col justify-between h-full space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Tiago Frencia</h3>
              {/* Updated Bio with dynamic translation */}
              <p className="text-neutral-500 text-sm max-w-xs leading-relaxed text-pretty">
                {t.footer.bio}
              </p>
            </div>

            {/* Local Time Display */}
            <div className="flex items-center gap-3 text-neutral-400 bg-white/5 w-fit px-4 py-2 rounded-xl border border-white/5">
              <Clock className="w-4 h-4 text-blue-400" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider opacity-60 font-semibold">{t.footer.time}</span>
                <span className="text-sm font-mono tabular-nums text-white">{formatTime(time)}</span>
              </div>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 opacity-40">
              {t.footer.nav}
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {/* Improved contrast: text-neutral-300 for better legibility */}
                  <a href={link.href} className="text-neutral-300 hover:text-white transition-colors text-lg block hover:translate-x-1 duration-300 font-light">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials Column */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 opacity-40">
              {t.footer.social}
            </h4>
            <ul className="space-y-4">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-neutral-300 hover:text-white transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/20 group-hover:bg-white/10 transition-colors">
                      <link.icon className="w-4 h-4" />
                    </div>
                    <span className="font-light">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600 font-medium tracking-wide">
          <p>© {new Date().getFullYear()} {t.footer.rights}</p>
          <p className="hover:text-neutral-400 transition-colors cursor-default">Designed & Developed by Tiago Frencia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;