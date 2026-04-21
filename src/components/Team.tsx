import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const team = [
  { id: 1, name: 'Aarav Patel', role: 'Founder & Principal Designer', bio: 'With 15+ years of experience in luxury interiors.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80' },
  { id: 2, name: 'Ananya Mehta', role: 'Head of Design', bio: 'Expert in minimal and editorial aesthetics.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80' },
  { id: 3, name: 'Ishaan Singh', role: 'Lead Architect', bio: 'Specializes in structural integration and space planning.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80' },
  { id: 4, name: 'Kavya Shah', role: 'Project Manager', bio: 'Ensures seamless execution and on-time delivery.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80' }
];

export const Team: React.FC = () => {
  return (
    <section id="team" className="py-24 md:py-40 bg-surface">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <div className="mb-20">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold text-accent uppercase tracking-[0.4em]"
          >
            THE PEOPLE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-4xl md:text-5xl font-bold"
          >
            Meet The Team
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square bg-primary-bg rounded-full overflow-hidden mb-8 border border-border group-hover:border-accent group-hover:p-4 transition-all duration-500 shadow-2xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-[1px] bg-accent" />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-1 text-text-base">{member.name}</h3>
              <p className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] mb-4">{member.role}</p>
              <p className="text-text-base/40 text-sm font-light italic leading-snug px-4">
                {member.bio}
              </p>

              <div className="mt-6 w-0 h-[2px] bg-accent group-hover:w-8 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
