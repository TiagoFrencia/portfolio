import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

const KonamiEasterEgg: React.FC = () => {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiInstance = useRef<any>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      setInputSequence((prev) => {
        const updated = [...prev, key];
        if (updated.length > KONAMI_CODE.length) {
          return updated.slice(updated.length - KONAMI_CODE.length);
        }
        return updated;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Check for match
    if (inputSequence.join(',') === KONAMI_CODE.join(',')) {
      celebrate();
      setInputSequence([]); // Reset sequence immediately
    }
  }, [inputSequence]);

  const celebrate = async () => {
    if (isActive) return; // Prevent double trigger
    setIsActive(true);

    try {
      // Lazy load confetti
      // @ts-ignore
      const confettiModule = await import('https://esm.sh/canvas-confetti@1.9.2');
      const confetti = confettiModule.default;

      if (canvasRef.current) {
        // Initialize confetti on our controlled canvas
        const myConfetti = confetti.create(canvasRef.current, {
          resize: true,
          useWorker: true,
        });
        confettiInstance.current = myConfetti;

        // Fire Effect
        const duration = 5000;
        const end = Date.now() + duration;

        const frame = () => {
          // Launch confetti from corners
          myConfetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 },
            colors: ['#06b6d4', '#8b5cf6', '#ffffff'] // Cyan, Violet, White
          });
          myConfetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.8 },
            colors: ['#06b6d4', '#8b5cf6', '#ffffff']
          });

          if (Date.now() < end && canvasRef.current) {
            requestAnimationFrame(frame);
          } else {
            // Cleanup phase
            handleCleanup();
          }
        };

        frame();
      }
    } catch (error) {
      console.error("Confetti failed to load:", error);
      handleCleanup();
    }
  };

  const handleCleanup = () => {
    setIsActive(false);
    if (confettiInstance.current) {
      confettiInstance.current.reset();
    }
  };

  return (
    <>
      {/* 
        SAFETY CANVAS: 
        1. Fixed position covering screen.
        2. pointer-events-none ensures clicks pass through to the app.
        3. bg-transparent prevents black screen.
        4. z-index switches from -1 (hidden) to 100 (visible) only when active.
      */}
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 w-full h-full pointer-events-none bg-transparent transition-all duration-300 ${
          isActive ? 'z-[100] opacity-100' : 'z-[-1] opacity-0'
        }`}
      />

      {/* Achievement Toast */}
      <AnimatePresence>
        {isActive && (
          <div className="fixed top-10 left-0 right-0 flex justify-center z-[110] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              className="bg-[#0a0a0a]/90 border border-yellow-500/50 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-[0_0_30px_rgba(234,179,8,0.4)] flex items-center gap-3"
            >
              <div className="bg-yellow-500/20 p-2 rounded-full">
                <Trophy className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest">Achievement Unlocked</p>
                <p className="font-semibold text-sm">Modo Dios Activado</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default KonamiEasterEgg;