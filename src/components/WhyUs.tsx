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
    <section id="why-us" className="py-24 md:py-48 bg-primary-bg">
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-black text-accent uppercase tracking-[0.6em] mb-6 block"
            >
              PHILOSOPHY
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-sans font-bold leading-[1.1] tracking-tighter"
            >
              The Haus Atelier <br />
              Difference.
            </motion.h2>
          </div>
          <div className="max-w-md">
            <p className="text-xl text-text-base/40 font-light leading-relaxed">
              We define our studio through precise engineering and a commitment to delivery excellence that few can match.
            </p>
          </div>
        </div>

        <div className="flex flex-col border-t border-border">
          {whyUsPoints.map((point, i) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group flex flex-col md:grid md:grid-cols-12 items-start md:items-center py-12 border-b border-border hover:bg-surface transition-all duration-700 relative px-8"
            >
              <div className="col-span-1 font-serif italic text-4xl text-accent opacity-20 group-hover:opacity-100 transition-opacity">
                {point.id}
              </div>

              <div className="col-span-5 md:pr-12 mt-4 md:mt-0">
                <h3 className="text-2xl font-bold text-text-base group-hover:text-accent transition-colors duration-500 tracking-tight">
                  {point.title}
                </h3>
              </div>

              <div className="col-span-6 mt-4 md:mt-0">
                <p className="text-text-base/40 group-hover:text-text-base/80 transition-colors duration-500 font-light leading-relaxed text-lg">
                  {point.desc}
                </p>
              </div>

              {/* Sophisticated hover indicator */}
              <div className="absolute left-0 w-[4px] h-0 bg-accent group-hover:h-1/2 transition-all duration-500 top-1/4" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
