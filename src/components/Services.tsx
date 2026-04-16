import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const services = [
  {
    id: '01',
    title: 'Residential Interiors',
    description: 'Complete home interior solutions — from modular kitchens and wardrobes to living rooms, bedrooms, and bathrooms.'
  },
  {
    id: '02',
    title: 'Commercial Spaces',
    description: 'Office interiors, retail outlets, and hospitality spaces designed for productivity, brand identity, and experience.'
  },
  {
    id: '03',
    title: 'Space Planning & Design',
    description: 'Thoughtful spatial layouts that maximize functionality while maintaining aesthetic balance.'
  },
  {
    id: '04',
    title: 'Material & Finish Selection',
    description: 'Curated selection of premium materials, textures, and finishes tailored to your style and budget.'
  },
  {
    id: '05',
    title: 'Project Management',
    description: 'End-to-end coordination of vendors, timelines, and quality — so you don\'t have to.'
  },
  {
    id: '06',
    title: 'Post-Handover Support',
    description: 'Our relationship doesn\'t end at delivery. We provide ongoing support for modifications and upgrades.'
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 md:py-40 bg-surface">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold text-accent uppercase tracking-[0.4em]"
          >
            WHAT WE DO
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-4xl md:text-5xl font-bold"
          >
            Our Expertise
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-8 w-16 h-[2px] bg-accent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 bg-primary-bg/50 border border-border/50 hover:border-accent/40 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 font-serif italic text-text-base/5 text-6xl group-hover:text-accent/10 transition-colors">
                {service.id}
              </div>
              
              <div className="relative z-10">
                <div className="text-accent font-bold text-sm tracking-widest mb-6 flex items-center gap-4">
                  <span>SERVICE</span>
                  <div className="w-8 h-[1px] bg-accent/30 group-hover:w-12 group-hover:bg-accent transition-all duration-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors duration-300 transition-colors">{service.title}</h3>
                <p className="text-text-base/50 font-light leading-relaxed group-hover:text-text-base/80 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
              
              {/* Bottom line accent */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
