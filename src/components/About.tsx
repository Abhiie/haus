import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { cn } from '@/lib/utils';

const StatCounter = ({ end, label }: { end: string, label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const numericEnd = parseInt(end);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const stepTime = 10;
      const steps = duration / stepTime;
      const increment = numericEnd / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= numericEnd) {
          setCount(numericEnd);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, numericEnd]);

  return (
    <div ref={ref} className="flex flex-col items-center lg:items-start">
      <div className="flex items-baseline">
        <span className="text-4xl md:text-5xl font-bold text-text-base mb-2">{count}{end.replace(/[0-9]/g, '')}</span>
      </div>
      <span className="text-[10px] uppercase tracking-[0.2em] text-text-base/40">{label}</span>
      <div className="w-8 h-[1px] bg-accent mt-4" />
    </div>
  );
};

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-48 bg-primary-bg overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-20 lg:gap-32 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-6 w-full relative group"
          >
            <div className="relative aspect-[4/5] rounded-[48px] overflow-hidden">
              <img
                src="/assets/images/projects/b201_living.webp"
                alt="Our Studio - Haus Atelier Project"
                className="absolute inset-0 w-full h-full object-cover scale-[1.01] grayscale hover:grayscale-0 transition-all duration-1000"
              />

              <div className="absolute top-8 right-8 w-24 h-24 rounded-full bg-accent/90 backdrop-blur-xl flex items-center justify-center border border-white/20 -rotate-12">
                <span className="text-[10px] font-black text-white text-center leading-tight tracking-[0.2em]">10+ YEARS<br />OF DESIGN</span>
              </div>
            </div>

            {/* Elegant detail label */}
            <div className="mt-8 flex items-center gap-6">
              <div className="w-12 h-[1px] bg-accent" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-text-base/40">Studio Interior Ahmedabad</span>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <div className="lg:col-span-6 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-[11px] font-bold text-accent uppercase tracking-[0.6em] mb-6 block tracking-[0.5em]">THE STUDIO</span>
              <h2 className="text-5xl md:text-7xl font-sans font-bold leading-[1.1] tracking-tighter">
                Crafting Spaces <br />
                <span className="font-serif italic font-light lowercase">With</span> Precision
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8 text-text-base/60 font-light leading-relaxed text-xl"
            >
              <p>
                At Haus Atelier, we translate architectural visions into tangible realities. Based in Ahmedabad, we specialize in complete turnkey solutions that bridge the gap between abstract design and flawless execution.
              </p>
              <p>
                From massive residential estates to boutique commercial hubs, our team of dedicated designers and site engineers manage every nuance of the build process.
              </p>

              <div className="pt-8 border-t border-border mt-12 grid grid-cols-2 md:grid-cols-3 gap-12">
                <StatCounter end="10+" label="EXPERIENCE" />
                <StatCounter end="200+" label="PROJECTS" />
                <StatCounter end="100%" label="SUCCESS" />
              </div>

              <div className="mt-12">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-4 text-xs uppercase tracking-[0.4em] font-black group"
                >
                  Work With Us
                  <div className="w-12 h-[1px] bg-accent group-hover:w-20 transition-all duration-500" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
