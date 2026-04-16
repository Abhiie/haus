import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

const categories = ['All', 'Residential', 'Commercial'];

const projects = [
  { id: 1, type: 'Residential', title: 'Minimalist Penthouse', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80', size: 'large' },
  { id: 2, type: 'Commercial', title: 'Tech Hub Office', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80', size: 'small' },
  { id: 3, type: 'Residential', title: 'Serene Villa', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80', size: 'medium' },
  { id: 4, type: 'Commercial', title: 'Artisanal Cafe', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80', size: 'small' },
  { id: 5, type: 'Residential', title: 'Modern Estate', image: 'https://images.unsplash.com/photo-1600566753190-17f0bbc2249b?auto=format&fit=crop&q=80', size: 'medium' },
  { id: 6, type: 'Commercial', title: 'Luxury Retail', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80', size: 'large' },
];

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = projects.filter(p => filter === 'All' || p.type === filter);

  return (
    <section id="projects" className="py-24 md:py-40 bg-surface">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-bold text-accent uppercase tracking-[0.4em]"
            >
              OUR WORK
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-6 text-4xl md:text-5xl font-bold"
            >
              Selected Projects
            </motion.h2>
          </div>

          <div className="flex gap-4 md:gap-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 relative py-2",
                  filter === cat ? "text-accent" : "text-white/40 hover:text-white"
                )}
              >
                {cat}
                {filter === cat && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[1px] bg-accent" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "relative overflow-hidden group border border-border/30",
                  project.size === 'large' && "lg:col-span-8 lg:row-span-2",
                  project.size === 'medium' && "lg:col-span-4 lg:row-span-2",
                  project.size === 'small' && "lg:col-span-4 lg:row-span-1"
                )}
              >
                <div className="absolute inset-0 bg-primary-bg" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[10px] text-accent uppercase tracking-[0.3em] font-bold">{project.type}</span>
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-white/60 uppercase tracking-widest font-bold">
                      View Details
                      <div className="w-8 h-[1px] bg-accent" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 text-[10px] text-white/20 uppercase tracking-[0.2em] group-hover:opacity-0 transition-opacity">
                  {project.type} 0{project.id}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
