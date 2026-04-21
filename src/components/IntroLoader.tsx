import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

export const IntroLoader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const tagline = "The allure of timeless beauty.";
  const words = tagline.split(" ");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3500); // 1.2s logo + ~1s tagline + pause

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary-bg"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <Logo showText={false} size="lg" className="mb-8" />
            </motion.div>

            <div className="flex flex-wrap justify-center gap-x-2 overflow-hidden px-4">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.8 + (i * 0.15),
                    ease: [0.33, 1, 0.68, 1]
                  }}
                  className="font-serif text-xl md:text-2xl text-text-base italic opacity-80"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>

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
