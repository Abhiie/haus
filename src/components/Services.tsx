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
    <section id="services" className="py-24 md:py-48 bg-surface">
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="flex flex-col mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-[11px] font-black text-accent uppercase tracking-[0.6em] mb-6 block"
          >
            DISCIPLINES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-sans font-bold leading-[1.1] tracking-tighter"
          >
            Our Expertise <br />
            <span className="font-serif italic font-light lowercase">In</span> Execution
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-12 bg-primary-bg rounded-[40px] border border-border hover:border-accent/40 transition-all duration-700 hover:shadow-2xl hover:shadow-accent/5"
            >
              <div className="text-accent font-black text-xs tracking-[0.3em] mb-12 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full border border-accent/30 flex items-center justify-center text-[10px] group-hover:bg-accent group-hover:text-white transition-all">
                  {service.id}
                </span>
                <span>DISCIPLINE</span>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 group-hover:text-accent transition-colors duration-500">{service.title}</h3>
                <p className="text-text-base/40 font-light leading-relaxed text-lg group-hover:text-text-base/80 transition-colors duration-500">
                  {service.description}
                </p>
              </div>

              <div className="mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-12 h-[1px] bg-accent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
