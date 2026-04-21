import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, MessageCircle, ArrowUp } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Wait for intro loader to finish before showing buttons
  useEffect(() => {
    const timer = setTimeout(() => setLoaderDone(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {loaderDone && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed bottom-8 right-8 z-[60] flex flex-col items-center gap-3"
        >
          {/* Scroll to top */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                onClick={scrollToTop}
                className="w-11 h-11 bg-white text-black flex items-center justify-center rounded-full shadow-lg hover:bg-accent hover:text-white transition-all duration-300"
              >
                <ArrowUp size={18} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/918141021215"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <MessageCircle size={24} />
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://www.instagram.com/haus___atelier/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Instagram size={24} />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
