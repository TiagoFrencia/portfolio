import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for raw mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configuration for the "inertia/lag" effect
  // mass: weight of the object (higher = slower to start/stop)
  // stiffness: tension of the spring (higher = snaps faster)
  // damping: friction (higher = less oscillation)
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device has a fine pointer (mouse/trackpad)
    // We don't want this on touch devices
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      // Center the cursor (subtract half of width/height approx 10px)
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if the target or any of its parents are interactive
      // This covers buttons, links, inputs, and elements with explicit role="button"
      const isInteractive = 
        target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer') !== null;
      
      setIsHovering(isInteractive);
    };

    // Hide cursor when leaving the window
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', checkHover);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', checkHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        {/* The Ring Cursor */}
        <motion.div
          animate={{
            scale: isHovering ? 1.5 : 1,
            // Visual feedback on hover: thicker border, subtle blue tint
            borderColor: isHovering ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.4)',
            backgroundColor: isHovering ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
            borderWidth: isHovering ? '2px' : '1px',
          }}
          transition={{
            duration: 0.2, // 200ms smooth transition
            ease: "easeInOut"
          }}
          className="w-5 h-5 rounded-full border border-white/40 backdrop-blur-[1px]"
        />
        
        {/* Optional: Tiny center dot for precision (can remove if preferred purely ring) */}
        <motion.div 
          animate={{ scale: isHovering ? 0 : 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full opacity-50"
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;