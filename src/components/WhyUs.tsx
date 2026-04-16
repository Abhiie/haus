import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const whyUsPoints = [
  { id: '01', title: 'End-to-End Turnkey Expertise', desc: 'We handle everything from civil work and plumbing to carpentry and final painting, making us your single point of contact.' },
  { id: '02', title: '10+ Years of Proven Experience', desc: 'A decade of hands-on experience in the Ahmedabad market means we understand local nuances and quality standards.' },
  { id: '03', title: 'Design + Execution Balance', desc: 'Many firms design but can\'t execute. We maintain absolute balance between aesthetic vision and buildable reality.' },
  { id: '04', title: 'Transparent Process', desc: 'No hidden costs. Detailed BOQs and regular updates keep you informed at every stage of the project life cycle.' },
  { id: '05', title: 'On-Time Project Delivery', desc: 'Our systematic project management ensures that your handover happen exactly when we promised.' },
  { id: '06', title: 'Quality That Lasts', desc: 'We only source premium materials and curated finishes that withstand the test of time and usage.' },
  { id: '07', title: 'Fully Customized Solutions', desc: 'Your space shouldn\'t look like everyone else\'s. Every design is built from scratch for your lifestyle.' },
  { id: '08', title: 'Client-Centric Approach', desc: 'We listen more than we talk. Your requirements drive our design decisions, not our own personal style.' },
  { id: '09', title: 'Strong Local Presence', desc: 'Being based in Ahmedabad, we have a trusted network of craftsmen and vendors ensuring top-tier results.' },
  { id: '10', title: 'Post-Project Support', desc: 'Our commitment stays strong even after handover. Reliable maintenance and upgrade support when you need it.' },
  { id: '11', title: 'A Stress-Free Experience', desc: 'We take the headache out of building a home. You enjoy the process while we manage the complexity.' }
];

export const WhyUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 md:py-40 bg-primary-bg">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-20">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold text-accent uppercase tracking-[0.4em]"
          >
            WHY HAUS ATELIER
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-4xl md:text-5xl font-bold"
          >
            The Haus Atelier Difference
          </motion.h2>
        </div>

        <div className="flex flex-col border-t border-border/50">
          {whyUsPoints.map((point, i) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group flex flex-col md:flex-row items-start md:items-center py-8 border-b border-border/50 hover:bg-surface/30 transition-all duration-300 relative px-4"
            >
              <div className="absolute left-0 top-0 w-[2px] h-0 bg-accent group-hover:h-full transition-all duration-300" />
              
              <div className="font-serif italic text-4xl text-text-base/10 group-hover:text-text-base/30 transition-colors w-20">
                {point.id}
              </div>
              
              <div className="flex-1 md:pr-12">
                <h3 className="text-xl font-bold text-text-base group-hover:text-accent transition-colors">
                  {point.title}
                </h3>
              </div>
              
              <div className="flex-[1.5] mt-4 md:mt-0">
                <p className="text-text-base/40 group-hover:text-text-base/70 transition-colors font-light leading-relaxed">
                  {point.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
