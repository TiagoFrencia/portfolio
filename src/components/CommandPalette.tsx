import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Home,
  FolderGit2,
  Cpu,
  Mail,
  FileText,
  Github,
  Linkedin,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setCopied(false);
    }
  }, [isOpen]);

  const handleNavigation = (id: string) => {
    onClose();
    // Small timeout to allow modal to close smoothly before scrolling
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank');
    onClose();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("tiagoofrenciaa@gmail.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1000);
  };

  // Define Commands
  const groups = useMemo(() => [
    {
      label: "Navigation",
      items: [
        { id: 'home', label: t.nav.home, icon: Home, action: () => handleNavigation('home') },
        { id: 'projects', label: t.nav.work, icon: FolderGit2, action: () => handleNavigation('projects') },
        { id: 'stack', label: t.nav.stack, icon: Cpu, action: () => handleNavigation('stack') },
        { id: 'contact', label: t.nav.contact, icon: Mail, action: () => handleNavigation('contact') },
      ]
    },
    {
      label: "Actions",
      items: [
        { id: 'cv', label: "Download CV", icon: FileText, action: () => handleExternalLink('#') }, // Placeholder
        { id: 'github', label: "GitHub", icon: Github, action: () => handleExternalLink('https://github.com/TiagoFrencia') },
        { id: 'linkedin', label: "LinkedIn", icon: Linkedin, action: () => handleExternalLink('https://www.linkedin.com/in/tiagofrencia/') },
        {
          id: 'email',
          label: copied ? t.footer.copiedText : "Copy Email",
          icon: copied ? Check : Copy,
          action: handleCopyEmail,
          highlight: copied
        },
      ]
    }
  ], [t, copied]);

  // Filter items based on query
  const filteredGroups = useMemo(() => {
    if (!query) return groups;
    const lowerQuery = query.toLowerCase();

    return groups.map(group => ({
      ...group,
      items: group.items.filter(item =>
        item.label.toLowerCase().includes(lowerQuery)
      )
    })).filter(group => group.items.length > 0);
  }, [query, groups]);

  // Flatten items for keyboard navigation index
  const flatItems = useMemo(() => {
    return filteredGroups.flatMap(group => group.items);
  }, [filteredGroups]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % flatItems.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + flatItems.length) % flatItems.length);
          break;
        case 'Enter':
          e.preventDefault();
          if (flatItems[selectedIndex]) {
            flatItems[selectedIndex].action();
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, flatItems, selectedIndex, onClose]);

  // Ensure selected index stays valid when filtering
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[60vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center px-4 py-4 border-b border-white/5 bg-white/[0.02]">
              <Search className="w-5 h-5 text-neutral-400 mr-3" />
              <input
                autoFocus
                type="text"
                placeholder="Where to? (e.g., Projects, Stack, GitHub...)"
                className="flex-1 bg-transparent text-lg text-white placeholder-neutral-500 focus:outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="hidden sm:flex gap-2">
                <span className="text-[10px] bg-white/10 border border-white/10 px-2 py-0.5 rounded text-neutral-400">Esc</span>
              </div>
            </div>

            {/* Results List */}
            <div className="overflow-y-auto py-2 custom-scrollbar">
              {filteredGroups.length === 0 ? (
                <div className="py-8 text-center text-neutral-500">
                  No results found.
                </div>
              ) : (
                filteredGroups.map((group, groupIdx) => (
                  <div key={group.label} className="mb-2 last:mb-0">
                    <h4 className="px-4 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      {group.label}
                    </h4>
                    <div>
                      {group.items.map((item) => {
                        // Calculate global index for highlight
                        const itemGlobalIndex = flatItems.indexOf(item);
                        const isSelected = itemGlobalIndex === selectedIndex;

                        return (
                          <div
                            key={item.id}
                            onClick={item.action}
                            onMouseEnter={() => setSelectedIndex(itemGlobalIndex)}
                            className={`mx-2 px-3 py-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors duration-200 group
                              ${isSelected
                                ? 'bg-blue-600/10 border border-blue-500/20'
                                : 'bg-transparent border border-transparent hover:bg-white/5'
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-1.5 rounded-md transition-colors ${isSelected ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 text-neutral-400'}`}>
                                <item.icon className="w-4 h-4" />
                              </div>
                              <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                                {item.label}
                              </span>
                            </div>

                            {isSelected && (
                              <motion.div layoutId="action-arrow" className="text-neutral-400">
                                <ArrowRight className="w-4 h-4" />
                              </motion.div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Legend */}
            <div className="px-4 py-2 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-500">
              <div className="flex gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="bg-white/10 px-1.5 rounded text-neutral-300">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="bg-white/10 px-1.5 rounded text-neutral-300">↵</kbd> Select
                </span>
              </div>
              <div>
                Power User Menu
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CommandPalette;