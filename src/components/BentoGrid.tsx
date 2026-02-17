import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Atom, Coffee, Leaf, Sparkles, Brain } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

// --- Card Component with Spotlight, Tilt & Staggered Animation ---
interface BentoCardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number; // Added delay prop for staggered animation
}

const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = "",
  onClick,
  delay = 0
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // Staggered Entrance Animation
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut"
      }}
      // Subtle 3D Tilt Effect on Hover
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.2 }
      }}
      onClick={onClick}
      className={`relative rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] backdrop-blur-md overflow-hidden group cursor-default shadow-sm hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      {/* Spotlight Effect Layer */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-30"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />

      {/* Content */}
      <div className="relative h-full w-full z-20">
        {children}
      </div>
    </motion.div>
  );
};

const BentoGrid: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative z-10 py-24 px-4 md:px-8 max-w-6xl mx-auto bg-transparent">
      {/* Safety Rule: Container is transparent, no backdrop filter here */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[250px] md:auto-rows-[280px]">

        {/* 1. Location (Large: 2x1) - Delay 0s */}
        <BentoCard className="md:col-span-2 md:row-span-1 min-h-[250px]" delay={0}>
          <div className="absolute inset-0 z-10">
            {/* Dark Map Background - Cordoba/Argentina focused */}
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop"
              alt="Map Background"
              className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500 grayscale brightness-75 contrast-125"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent opacity-80" />
          </div>

          <div className="relative z-20 p-8 flex flex-col justify-end h-full">
            {/* Radar Dot for Rio Cuarto approx position */}
            <div className="absolute top-[40%] left-[30%] md:left-[45%] flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 shadow-[0_0_15px_#06b6d4]"></span>
              </span>
              <div className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-cyan-300 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md shadow-xl">
                {t.bento.locationSub}
              </div>
            </div>

            <h3 className="text-3xl font-bold text-white tracking-tight drop-shadow-lg">{t.bento.location}</h3>
          </div>
        </BentoCard>

        {/* 2. Tech Arsenal (Medium: 1x1) - Delay 0.1s */}
        <BentoCard className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-white/[0.05] to-transparent" delay={0.1}>
          <div className="p-6 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{t.bento.techTitle}</h3>
              <p className="text-xs text-neutral-400 mb-2 leading-relaxed border-b border-white/5 pb-4">
                {t.bento.techSub}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                <Atom className="w-6 h-6 text-blue-400 mb-1" />
                <span className="text-[10px] text-neutral-300">React</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                <Leaf className="w-6 h-6 text-green-400 mb-1" />
                <span className="text-[10px] text-neutral-300">Spring</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                <Coffee className="w-6 h-6 text-orange-400 mb-1" />
                <span className="text-[10px] text-neutral-300">Java</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                <Sparkles className="w-6 h-6 text-purple-400 mb-1" />
                <span className="text-[10px] text-neutral-300">Gemini AI</span>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* 3. Hobby / Moto (Square 1x1) - Delay 0.2s */}
        <BentoCard className="md:col-span-1 md:row-span-1 group/moto" delay={0.2}>
          <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover/moto:opacity-100 transition-opacity duration-500">
            {/* Updated SVG: Line Art Sport Bike (Matching Image Reference) */}
            <svg
              viewBox="0 0 24 24"
              className="w-32 h-32 text-neutral-500 group-hover/moto:text-white transition-all duration-500 transform group-hover/moto:scale-105 group-hover/moto:-rotate-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Rear Wheel */}
              <circle cx="5.5" cy="17.5" r="3.5" />
              {/* Front Wheel */}
              <circle cx="18.5" cy="17.5" r="3.5" />
              {/* Body Chassis & Seat */}
              <path d="M15 6C15 6 17 5 19 7C19 7 21 10 20 12" /> {/* Windscreen Line */}
              <path d="M5.5 17.5 L9 17.5 L12 13 L15 13 L18.5 17.5" /> {/* Main Frame connection */}
              <path d="M12 13 L14 9 H16 L20 12" /> {/* Tank & Nose Top */}
              <path d="M2 11 L5 11 L9 14" /> {/* Tail Section */}
              {/* Engine / Center Detail Pill */}
              <line x1="10" y1="14.5" x2="13" y2="14.5" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="absolute top-6 left-6 z-10">
            <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">{t.bento.motoSub}</span>
          </div>
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <h4 className="text-lg font-bold text-white group-hover/moto:translate-x-1 transition-transform">{t.bento.motoTitle}</h4>
          </div>
        </BentoCard>

        {/* 4. Focus / Music (Square 1x1) - Delay 0.3s */}
        <BentoCard className="md:col-span-1 md:row-span-1 flex items-center justify-center relative" delay={0.3}>
          <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors duration-500" />

          <div className="text-center z-10 flex flex-col items-center justify-center h-full gap-4">
            {/* Equalizer Visualization */}
            <div className="flex gap-2 items-end h-16 mb-2">
              <div className="w-2 bg-blue-500 rounded-full animate-[equalizer_1s_ease-in-out_infinite]" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 bg-blue-400 rounded-full animate-[equalizer_1s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 bg-indigo-500 rounded-full animate-[equalizer_1s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-2 bg-violet-500 rounded-full animate-[equalizer_1s_ease-in-out_infinite]" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 bg-purple-500 rounded-full animate-[equalizer_1s_ease-in-out_infinite]" style={{ animationDelay: '0.3s' }}></div>
            </div>

            <div>
              <h4 className="text-white font-bold">{t.bento.musicTitle}</h4>
              <p className="text-xs text-neutral-500 mt-1">{t.bento.musicSub}</p>
            </div>
          </div>
        </BentoCard>

        {/* 5. Philosophy (Rectangular 1x1) - Delay 0.4s */}
        <BentoCard className="md:col-span-1 md:row-span-1 bg-white/[0.02]" delay={0.4}>
          <div className="p-8 h-full flex flex-col justify-between">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/5">
              <Brain className="w-5 h-5 text-white/80" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{t.bento.philTitle}</h3>
              <p className="text-neutral-400 text-xs leading-relaxed text-pretty">
                {t.bento.philSub}
              </p>
            </div>
          </div>
        </BentoCard>

      </div>
    </section>
  );
};

export default BentoGrid;