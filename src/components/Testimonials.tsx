import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const testimonials = [
  { id: 1, name: 'Anjali Sharma', role: 'Creative Director', project: 'Skyline Penthouse', text: 'Haus Atelier doesn\'t just design rooms; they curate experiences. The way they manipulated natural light is masterclass architectural storytelling.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 2, name: 'Rajiv Malhotra', role: 'Luxury Homeowner', project: 'The Concrete Pavilion', text: 'The transition from concept to turnkey reality was seamless. Their team in Ahmedabad handled every detail with international precision.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 3, name: 'Kabir Vohra', role: 'Tech Entrepreneur', project: 'Minimalist Loft', text: 'Finding a studio that understands "less is more" in India is rare. Haus Atelier delivered a space that breathes—minimalist yet warm.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 4, name: 'Meera Kapur', role: 'Art Collector', project: 'Serene Sanctuary', text: 'They transformed our ancestral home into a modern sanctuary without losing its soul. Truly bespoke craftsmanship.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 5, name: 'Siddharth Jain', role: 'CFO, Tech Corp', project: 'Executive Suite', text: 'A professional team that respects timelines as much as they respect aesthetics. The turnkey solution was flawlessly executed.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 6, name: 'Zoya Khan', role: 'Fashion Designer', project: 'Concept Studio', text: 'A rhythmic balance of textures. As a designer, I appreciate their uncompromising pursuit of the perfect material palette.', avatar: '/assets/images/avatars/female-1.png' }, // Fallback to local if it works, but I'll use Unsplash
  { id: 7, name: 'Arjun Mehta', role: 'Real Estate Developer', project: 'Emerald Heights', text: 'Their design sensibility adds immense value to our premium properties. A partner who understands luxury market dynamics.', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 8, name: 'Leila D\'Souza', role: 'Restaurateur', project: 'Indigo Bistro', text: 'Functional, aesthetic, and atmospheric. They captured our brand essence perfectly in the restaurant\'s interior.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150' },
];

// Better to replace Zoya's too for consistency
testimonials[5].avatar = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150';

const col1 = [...testimonials, ...testimonials];
const col2 = [...testimonials.slice().reverse(), ...testimonials.slice().reverse()];
const col3 = [...testimonials.slice(2), ...testimonials.slice(0, 2), ...testimonials.slice(2), ...testimonials.slice(0, 2)];

const Column = ({ items, speed, reverse = false }: { items: typeof testimonials, speed: number, reverse?: boolean }) => {
  return (
    <div className="flex flex-col gap-6 relative">
      <motion.div
        animate={{
          y: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-col gap-6"
      >
        {items.map((t, i) => (
          <div
            key={`${t.id}-${i}`}
            className="bg-surface blueprint-grid p-10 border border-border/20 relative group hover:border-accent/40 transition-all duration-500 rounded-3xl shrink-0"
          >
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} size={14} className="fill-accent text-accent" />
              ))}
            </div>
            {/* ABSOLUTE CONTRAST GUARANTEE */}
            <p
              style={{ color: 'var(--text-color)' }}
              className="text-lg md:text-xl leading-relaxed font-light mb-8 !opacity-100"
            >
              "{t.text}"
            </p>
            <div className="flex items-center gap-5 border-t border-border/20 pt-8 mt-auto">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-accent/20 group-hover:border-accent/40 transition-colors duration-500 bg-primary-bg">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-full h-full object-cover grayscale brightness-95 group-hover:brightness-105 group-hover:grayscale-0 transition-all duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=CC2626&color=fff&size=150`;
                  }}
                />
              </div>
              <div>
                <h4
                  style={{ color: 'var(--text-color)' }}
                  className="text-sm font-bold"
                >
                  {t.name}
                </h4>
                <span className="text-[10px] text-accent font-black uppercase tracking-widest">{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 md:py-40 bg-primary-bg overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold text-accent uppercase tracking-[0.5em]"
          >
            TESTIMONIALS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            style={{ color: 'var(--text-color)' }}
            className="mt-6 text-5xl md:text-7xl font-bold tracking-tight"
          >
            Stories of <span className="font-serif italic text-accent font-normal underline decoration-accent/20 underline-offset-8">Excellence</span>
          </motion.h2>
        </div>

        <div className="relative h-[900px] overflow-hidden">
          {/* Enhanced Fade Masks */}
          <div className="absolute top-0 left-0 w-full h-52 bg-gradient-to-b from-primary-bg via-primary-bg to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-52 bg-gradient-to-t from-primary-bg via-primary-bg to-transparent z-20 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
            <Column items={col1} speed={45} />
            <div className="hidden md:block">
              <Column items={col2} speed={55} reverse={true} />
            </div>
            <div className="hidden lg:block">
              <Column items={col3} speed={50} />
            </div>
          </div>
        </div>
      </div>

      {/* High-Elegance Watermark */}
      <div
        style={{ color: 'var(--text-color)', opacity: 0.05 }}
        className="absolute bottom-0 left-0 text-[18vw] font-black pointer-events-none select-none tracking-tighter uppercase translate-y-1/2"
      >
        Reviews
      </div>
    </section>
  );
};
