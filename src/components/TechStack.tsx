import React from 'react';
import { TECH_STACK } from '../constants';
import { useLanguage } from '../LanguageContext';

const TechStack: React.FC = () => {
  const { t } = useLanguage();
  // Triple the array to ensure smooth infinite loop without gaps
  const marqueeItems = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];

  return (
    <section className="relative z-10 py-20 border-y border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <h3 className="text-xl text-neutral-400 uppercase tracking-[0.2em]">{t.stack.title}</h3>
      </div>
      
      <div className="relative w-full overflow-hidden mask-gradient">
         {/* Gradient masks for fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-20 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-20 bg-gradient-to-l from-[#0a0a0a] to-transparent" />

        {/* Added py-4 to accommodate scale animation without clipping */}
        <div className="flex w-max animate-scroll gap-12 hover:[animation-play-state:paused] py-4">
          {marqueeItems.map((item, idx) => (
            <div 
              key={`${item.name}-${idx}`} 
              className="group flex flex-col items-center gap-3 min-w-[100px] cursor-default"
            >
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-blue-500/50 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 ease-out transform-gpu">
                <item.icon className="w-8 h-8 text-neutral-400 group-hover:text-blue-400 transition-colors duration-300" />
              </div>
              <span className="text-sm font-medium text-neutral-500 group-hover:text-white transition-colors duration-300">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;