import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-700",
        isScrolled
          ? "bg-primary-bg/95 backdrop-blur-2xl py-6 border-b border-border translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none py-10"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-10 flex items-center justify-between">
        <a href="#home" className="hover:opacity-80 transition-opacity">
          <Logo compact showText={true} />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-12 bg-surface/50 backdrop-blur-md px-10 py-4 rounded-full border border-border">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-base/60 hover:text-accent transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-8">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden sm:block px-8 py-4 bg-accent text-white text-[10px] uppercase tracking-[0.4em] font-black rounded-full hover:bg-white hover:text-accent transition-all duration-500 shadow-lg shadow-accent/20"
          >
            Consult Now
          </a>

          <button
            className="lg:hidden text-text-base p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} strokeWidth={1} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-primary-bg flex flex-col items-center justify-center lg:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-3xl hover:text-accent transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 px-8 py-4 bg-accent text-white text-xs uppercase tracking-widest font-bold"
              >
                Get a Free Consultation
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
