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
    <section id="about" className="py-24 md:py-40 bg-primary-bg overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          {/* Left Column - Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 w-full relative group"
          >
            <div className="relative aspect-[4/5] bg-surface overflow-hidden border-l border-accent">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-black/20" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 flex justify-center bg-gradient-to-t from-black/80 to-transparent">
                <span className="font-serif italic text-white/60 text-sm tracking-widest">About Image — Studio / Team</span>
              </div>
            </div>
            
            {/* Geometric accent */}
            <div className="absolute -top-12 -left-12 w-48 h-48 border border-white/5 -z-10 rounded-full" />
          </motion.div>

          {/* Right Column - Content */}
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-[11px] font-bold text-accent uppercase tracking-[0.3em]">WHO WE ARE</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
                Crafting Spaces With <br className="hidden md:block" /> Purpose & Precision
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6 text-text-base/70 font-light leading-relaxed text-lg"
            >
              <p>
                At our firm, we specialize in delivering complete turnkey interior solutions across Ahmedabad, Gujarat. With over 10 years of hands-on experience in the industry, we bring together thoughtful design, quality craftsmanship, and seamless execution to create spaces that truly reflect our clients' vision.
              </p>
              <p>
                From concept to completion, we manage every aspect of the project—design, planning, material selection, and execution—ensuring a smooth and hassle-free experience.
              </p>
              <p>
                Whether it's a residential home or a commercial space, we are committed to delivering projects on time, within budget, and with attention to every detail.
              </p>
              <p className="font-serif italic text-text-base text-xl">
                "We don't just design interiors — we create spaces you'll enjoy living in."
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="pt-12 grid grid-cols-3 gap-8"
            >
              <StatCounter end="10+" label="Years Experience" />
              <StatCounter end="200+" label="Projects Delivered" />
              <StatCounter end="100%" label="Client Satisfaction" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
