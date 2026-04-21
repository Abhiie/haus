import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const featuredProjects = [
  { name: 'Obsidian Suite', image: '/assets/images/projects/b201_bedroom.webp' },
  { name: 'Thalivad Residence', image: '/assets/images/projects/b201_living.webp' },
  { name: 'Aurora Residence', image: '/assets/images/projects/kitchen.webp' },
  { name: 'Ivory Residence', image: '/assets/images/projects/bedroom_v1.webp' },
  { name: 'Celestial Loft', image: '/assets/images/projects/hero.webp' },
  { name: 'Onyx Villa', image: '/assets/images/projects/b201_bedroom.webp' },
];

// Animated text component — reveals characters one by one
const AnimatedText = ({ text, className, delay = 0, duration = 0.05, startAnimation }: { text: string; className?: string; delay?: number; duration?: number; startAnimation: boolean }) => (
  <span className={className}>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 60, rotateX: -90 }}
        animate={startAnimation ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: -90 }}
        transition={{
          duration: 0.6,
          delay: delay + i * duration,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ display: 'inline-block', transformOrigin: 'bottom' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </span>
);

// Grid line that draws itself in
const GridLine = ({ orientation, position, delay, startAnimation }: { orientation: 'vertical' | 'horizontal'; position: string; delay: number; startAnimation: boolean }) => (
  <motion.div
    initial={orientation === 'vertical' ? { scaleY: 0 } : { scaleX: 0 }}
    animate={startAnimation
      ? (orientation === 'vertical' ? { scaleY: 1 } : { scaleX: 1 })
      : (orientation === 'vertical' ? { scaleY: 0 } : { scaleX: 0 })
    }
    transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`absolute bg-text-base/[0.06] ${orientation === 'vertical'
      ? `w-px top-0 bottom-0 origin-top ${position}`
      : `h-px left-0 right-0 origin-left ${position}`
      }`}
  />
);

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsRef = useRef<HTMLDivElement>(null);
  // Wait for IntroLoader to finish (3.5s visible + 1.2s exit = ~4.7s)
  const [animationReady, setAnimationReady] = useState(false);

  useEffect(() => {
    // IntroLoader: 3500ms timeout + 1200ms exit animation = 4700ms total
    const timer = setTimeout(() => setAnimationReady(true), 4800);
    return () => clearTimeout(timer);
  }, []);

  const scrollCards = (direction: 'left' | 'right') => {
    if (!cardsRef.current) return;
    const scrollAmount = 280;
    cardsRef.current.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  };
  const nextSlide = () => scrollCards('right');
  const prevSlide = () => scrollCards('left');

  // Shorthand to only animate after loader is done
  const a = (props: any, delay: number = 0) => animationReady ? { ...props } : {};
  const t = (delay: number, extra: any = {}) => ({ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as number[], ...extra });

  return (
    <section id="home" className="relative min-h-screen bg-primary-bg overflow-hidden transition-colors duration-500">
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <GridLine orientation="vertical" position="left-[5%]" delay={0.1} startAnimation={animationReady} />
        <GridLine orientation="vertical" position="left-[25%]" delay={0.3} startAnimation={animationReady} />
        <GridLine orientation="vertical" position="left-[50%]" delay={0.2} startAnimation={animationReady} />
        <GridLine orientation="vertical" position="left-[75%]" delay={0.4} startAnimation={animationReady} />
        <GridLine orientation="vertical" position="right-[5%]" delay={0.5} startAnimation={animationReady} />
        <GridLine orientation="horizontal" position="top-[90px]" delay={0.6} startAnimation={animationReady} />
      </div>

      {/* === TOP NAV ROW === */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={animationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={t(0.3)}
        className={cn(
          "relative z-10 flex lg:grid lg:grid-cols-12 items-center justify-between border-b border-border/30 bg-primary-bg transition-colors duration-500",
          !animationReady && "hidden"
        )}
      >
        <div className="flex-shrink-0 lg:col-span-3 flex items-center gap-2 lg:gap-3 px-3 lg:px-10 py-3 border-r border-border/30">
          <img src="/assets/images/logo.webp" alt="Haus Atelier" className="h-8 lg:h-14 w-auto object-contain" />
          <span className="font-serif font-black tracking-[0.1em] lg:tracking-[0.15em] text-text-base text-[13px] sm:text-lg whitespace-nowrap">
            HAUS ATELIER
          </span>
        </div>

        {/* Nav Links - Desktop only */}
        <div className="hidden lg:col-span-6 lg:flex items-center justify-center gap-10 px-6 py-7 border-r border-border/30">
          {['Home', 'About', 'Services', 'Why Us', 'Projects', 'Contact'].map((link, i) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              initial={{ opacity: 0, y: -10 }}
              animate={animationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={t(0.7 + i * 0.1)}
              className="text-[10px] uppercase tracking-[0.3em] text-text-base/40 hover:text-text-base transition-colors duration-300 font-bold"
            >
              {link}
            </motion.a>
          ))}
        </div>

        {/* CTA & Mobile Menu */}
        <div className="flex-shrink-0 lg:col-span-3 flex items-center justify-end gap-2 px-3 lg:px-10 py-3 lg:py-7">
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={animationReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={t(1.1)}
            className="px-3 lg:px-8 py-2.5 lg:py-4 bg-accent text-white text-[8px] lg:text-[10px] uppercase tracking-[0.2em] lg:tracking-[0.4em] font-black rounded-full hover:bg-white hover:text-accent transition-all duration-500 shadow-lg shadow-accent/20 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Consult Now</span>
            <span className="sm:hidden px-1">CTA</span>
          </motion.a>

          <button
            className="lg:hidden text-text-base p-2 hover:text-accent transition-colors"
            onClick={() => {
              // Trigger the global navbar menu state if possible, 
              // or handle it here. Since the global Navbar listens 
              // for scroll, we can just use a global event or window state.
              (window as any).toggleMobileMenu?.();
            }}
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </motion.div>

      {/* === HERO CONTENT AREA === */}
      <div className="relative z-10 grid grid-cols-12 min-h-[45vh]">
        {/* LEFT: Tagline */}
        <div className="col-span-12 lg:col-span-3 flex flex-col justify-between px-6 lg:px-10 py-12 border-r border-border/30">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={animationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={t(1.4)}
            className="text-text-base/30 text-sm font-light leading-[1.8] max-w-[260px]"
          >
            Complete turnkey interior solutions across Ahmedabad, Gujarat — where design meets flawless execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={animationReady ? { opacity: 1 } : { opacity: 0 }}
            transition={t(2.2)}
            className="mt-auto pt-12"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={animationReady ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-2 h-2 rounded-full bg-accent"
              />
              <span className="text-[9px] uppercase tracking-[0.4em] text-text-base/25 font-bold">Available for Projects</span>
            </div>
          </motion.div>
        </div>

        {/* CENTER: Massive Typography with character animation */}
        <div className="col-span-12 lg:col-span-6 flex flex-col items-center justify-center px-6 lg:px-10 py-16 border-r border-border/30 relative overflow-hidden">
          {/* Background glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={animationReady ? { opacity: 0.08 } : { opacity: 0 }}
            transition={{ duration: 2, delay: 1.5 }}
            className="absolute inset-0"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(204,38,38,0.08), transparent 70%)' }}
          />

          <div className="relative z-10 text-center" style={{ perspective: '1000px' }}>
            <h1 className="text-[60px] sm:text-[80px] md:text-[120px] lg:text-[150px] leading-[0.85] tracking-[-0.03em]">
              <AnimatedText
                text="Elegance"
                className="block font-serif font-bold text-text-base"
                delay={0.8}
                duration={0.06}
                startAnimation={animationReady}
              />
              <AnimatedText
                text="Living"
                className="block font-serif font-light italic text-accent mt-2"
                delay={1.4}
                duration={0.08}
                startAnimation={animationReady}
              />
            </h1>
          </div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={animationReady ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 1.2, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-24 h-px bg-text-base/15 mt-10 origin-center"
          />
        </div>

        {/* RIGHT: Featured Image with clip-path reveal */}
        <motion.div
          initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
          animate={animationReady
            ? { opacity: 1, clipPath: 'inset(0% 0 0 0)' }
            : { opacity: 0, clipPath: 'inset(100% 0 0 0)' }
          }
          transition={{ duration: 1.2, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-12 lg:col-span-3 relative overflow-hidden"
        >
          <div className="h-full w-full min-h-[400px]">
            <img
              src="/assets/images/projects/hero.webp"
              alt="Featured Interior"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={animationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={t(2.6)}
              className="absolute bottom-8 left-8 right-8"
            >
              <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-bold">Featured</span>
              <h3 className="text-base font-bold text-white mt-1">Premium Interior</h3>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* === BOTTOM: Project Cards Row === */}
      <div className="relative z-10 border-t border-border/30 bg-primary-bg transition-colors duration-500">
        <div className="grid grid-cols-12 items-stretch">
          {/* Project cards */}
          <div ref={cardsRef} className="col-span-12 lg:col-span-9 flex gap-5 px-6 lg:px-10 py-6 overflow-x-auto scrollbar-hide">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={animationReady
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 40, scale: 0.95 }
                }
                transition={{
                  duration: 0.8,
                  delay: 2.2 + i * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -8 }}
                className="flex-shrink-0 w-[220px] h-[140px] rounded-[20px] overflow-hidden relative group cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover scale-[1.01] group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-white/60 font-bold">{project.name}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Navigation arrows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={animationReady ? { opacity: 1 } : { opacity: 0 }}
            transition={t(2.8)}
            className="col-span-12 lg:col-span-3 flex flex-col items-center justify-center px-8 py-8 border-l border-border/30 gap-6"
          >
            <p className="text-[11px] text-text-base/25 font-light leading-relaxed text-center max-w-[200px]">
              A collection of exclusive spaces designed for those who value privacy
            </p>
            <div className="flex items-center gap-4">
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:bg-accent/10 transition-all group"
              >
                <ArrowLeft size={16} className="text-text-base/40 group-hover:text-text-base transition-colors" />
              </motion.button>
              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:bg-accent/10 transition-all group"
              >
                <ArrowRight size={16} className="text-text-base/40 group-hover:text-text-base transition-colors" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={animationReady ? { opacity: 1 } : { opacity: 0 }}
        transition={t(3.0)}
        className="w-full py-6 border-t border-border/30 overflow-hidden bg-primary-bg relative z-10 transition-colors duration-500"
      >
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center mx-16">
              <span className="text-[14px] uppercase tracking-[0.5em] font-bold text-text-base/70">Residential Design</span>
              <div className="mx-10 w-2 h-2 border border-accent/80 rotate-45" />
              <span className="text-[14px] uppercase tracking-[0.5em] font-bold text-text-base/70">Turnkey Execution</span>
              <div className="mx-10 w-2 h-2 border border-accent/80 rotate-45" />
              <span className="text-[14px] uppercase tracking-[0.5em] font-bold text-text-base/70">Commercial Spaces</span>
              <div className="mx-10 w-2 h-2 border border-accent/80 rotate-45" />
              <span className="text-[14px] uppercase tracking-[0.5em] font-bold text-text-base/70">Bespoke Furniture</span>
              <div className="mx-10 w-2 h-2 border border-accent/80 rotate-45" />
            </div>
          ))}
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
};
