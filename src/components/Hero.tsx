import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const featuredProjects = [
  { name: 'Obsidian Suite', image: '/assets/images/projects/b201_bedroom.webp' },
  { name: 'Thalivad Residence', image: '/assets/images/projects/b201_living.webp' },
  { name: 'Aurora Residence', image: '/assets/images/projects/kitchen.webp' },
  { name: 'Ivory Residence', image: '/assets/images/projects/bedroom_v1.webp' },
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
  // Wait for IntroLoader to finish (3.5s visible + 1.2s exit = ~4.7s)
  const [animationReady, setAnimationReady] = useState(false);

  useEffect(() => {
    // IntroLoader: 3500ms timeout + 1200ms exit animation = 4700ms total
    const timer = setTimeout(() => setAnimationReady(true), 4800);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);

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
        className="relative z-10 grid grid-cols-12 border-b border-border/30"
      >
        {/* Logo */}
        <div className="col-span-3 flex items-center px-6 lg:px-10 py-5 border-r border-border/30">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={animationReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={t(0.5)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img src="/assets/images/logo.png" alt="Haus Atelier" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-bold tracking-[0.15em] text-text-base hidden sm:block">HAUS ATELIER</span>
            </div>
          </motion.div>
        </div>

        {/* Nav Links */}
        <div className="col-span-5 hidden lg:flex items-center justify-center gap-14 px-10 py-7 border-r border-border/30">
          {['About', 'Services', 'Projects', 'Contact'].map((link, i) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={animationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={t(0.7 + i * 0.1)}
              className="text-[11px] uppercase tracking-[0.3em] text-text-base/40 hover:text-text-base transition-colors duration-300 font-medium"
            >
              {link}
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div className="col-span-4 flex items-center justify-end px-6 lg:px-10 py-7">
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={animationReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={t(1.1)}
            className="px-7 py-3.5 border border-border rounded-full text-[10px] uppercase tracking-[0.3em] text-text-base font-bold hover:bg-accent hover:text-white hover:border-accent transition-all duration-500"
          >
            Request a Call Back
          </motion.a>
        </div>
      </motion.div>

      {/* === HERO CONTENT AREA === */}
      <div className="relative z-10 grid grid-cols-12 min-h-[65vh]">
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
          <div className="col-span-12 lg:col-span-9 flex gap-5 px-6 lg:px-10 py-8 overflow-x-auto scrollbar-hide">
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
                className="flex-shrink-0 w-[260px] h-[180px] rounded-[20px] overflow-hidden relative group cursor-pointer"
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
              <span className="text-[11px] uppercase tracking-[0.5em] font-bold text-text-base/[0.08]">Residential Design</span>
              <div className="mx-10 w-1.5 h-1.5 border border-accent/30 rotate-45" />
              <span className="text-[11px] uppercase tracking-[0.5em] font-bold text-text-base/[0.08]">Turnkey Execution</span>
              <div className="mx-10 w-1.5 h-1.5 border border-accent/30 rotate-45" />
              <span className="text-[11px] uppercase tracking-[0.5em] font-bold text-text-base/[0.08]">Commercial Spaces</span>
              <div className="mx-10 w-1.5 h-1.5 border border-accent/30 rotate-45" />
              <span className="text-[11px] uppercase tracking-[0.5em] font-bold text-text-base/[0.08]">Bespoke Furniture</span>
              <div className="mx-10 w-1.5 h-1.5 border border-accent/30 rotate-45" />
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
