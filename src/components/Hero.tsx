import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col pt-24">
      <div className="flex-1 max-w-[1400px] mx-auto w-full px-6 flex flex-col lg:flex-row items-center">
        {/* Left Content */}
        <div className="flex-1 py-12 lg:py-0 text-center lg:text-left z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.5 }}
            className="text-5xl md:text-7xl lg:text-8xl flex flex-col leading-[1.1] text-text-base"
          >
            <span className="font-light">Spaces That</span>
            <span className="font-bold">Tell Your <span className="text-accent underline decoration-accent/30 underline-offset-8">Story.</span></span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.7 }}
            className="mt-8 text-lg md:text-xl text-text-base/60 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed"
          >
            Complete turnkey interior solutions across Ahmedabad, Gujarat — where design meets flawless execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.9 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
          >
            <a
              href="#projects"
              className="group px-8 py-4 bg-accent text-white text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2 hover:bg-surface hover:text-accent border border-transparent hover:border-accent transition-all duration-300"
            >
              Start Your Project
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#projects"
              className="px-8 py-4 border border-text-base/20 text-text-base text-xs uppercase tracking-[0.2em] font-bold hover:bg-text-base/10 transition-all duration-300"
            >
              View Our Work
            </a>
          </motion.div>
        </div>

        {/* Right Image Placeholder */}
        <div className="flex-1 w-full h-[500px] lg:h-[80vh] relative group overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 3.8 }}
            className="absolute inset-0 bg-surface flex items-center justify-center border-l border-border"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700" />
            <div className="z-10 flex flex-col items-center">
              <div className="w-16 h-[1px] bg-accent mb-4" />
              <span className="font-serif italic text-2xl tracking-widest text-white/50 group-hover:text-white transition-colors">Hero Interior Image</span>
            </div>

            {/* Dynamic corner accents */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-accent/30" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-accent/30" />
          </motion.div>
        </div>
      </div>

      {/* Ticker */}
      <div className="w-full bg-surface border-y border-border py-4 overflow-hidden mt-auto">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-12">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-base/40">Residential</span>
              <span className="mx-8 w-1 h-1 bg-accent rounded-full" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-base/40">Commercial</span>
              <span className="mx-8 w-1 h-1 bg-accent rounded-full" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-base/40">Turnkey Solutions</span>
              <span className="mx-8 w-1 h-1 bg-accent rounded-full" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-base/40">10+ Years</span>
              <span className="mx-8 w-1 h-1 bg-accent rounded-full" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-base/40">Ahmedabad</span>
              <span className="mx-8 w-1 h-1 bg-accent rounded-full" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-base/40">Gujarat</span>
              <span className="mx-8 w-1 h-1 bg-accent rounded-full" />
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}} />
    </section>
  );
};
