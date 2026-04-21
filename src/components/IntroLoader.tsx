import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

interface IntroLoaderProps {
  isFinished?: boolean;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ isFinished = false }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isFinished) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500); // Small buffer for smoothness
      return () => clearTimeout(timer);
    }
  }, [isFinished]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          className="fixed -top-[10px] -left-[10px] -right-[10px] -bottom-[10px] z-[100] flex flex-col items-center justify-center bg-[#000000]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Logo image already contains brand name and tagline */}
            <Logo size="lg" />
          </motion.div>

          <motion.div
            className="absolute bottom-12 w-32 h-[1px] bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
