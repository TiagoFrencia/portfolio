import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, ProjectWithStyle } from './types';
import { PROJECTS_EN, PROJECTS_ES, UI_TEXT } from './constants';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  projects: ProjectWithStyle[];
  t: typeof UI_TEXT['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const projects = language === 'es' ? PROJECTS_ES : PROJECTS_EN;
  const t = UI_TEXT[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, projects, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};