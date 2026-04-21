import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const categories = ['All', 'Residential', 'Commercial'];

const projects = [
  { id: 1, type: 'Residential', title: 'The Obsidian Suite', image: '/assets/images/projects/b201_bedroom.webp', size: 'large' },
  { id: 2, type: 'Residential', title: 'Luxe Living', image: '/assets/images/projects/b201_living.webp', size: 'small' },
  { id: 3, type: 'Residential', title: 'Sanctuary Master', image: '/assets/images/projects/bedroom_v1.webp', size: 'medium' },
  { id: 4, type: 'Residential', title: 'Sculptural Dining', image: '/assets/images/projects/dining.webp', size: 'small' },
  { id: 5, type: 'Residential', title: 'Ivory Bedroom', image: '/assets/images/projects/bedroom_v2.webp', size: 'medium' },
  { id: 6, type: 'Residential', title: 'Vanguard Kitchen', image: '/assets/images/projects/kitchen.webp', size: 'large' },
  { id: 7, type: 'Residential', title: 'Urban Retreat', image: '/assets/images/projects/living_1.webp', size: 'small' },
  { id: 8, type: 'Residential', title: 'Ethereal Space', image: '/assets/images/projects/kaushalbhai_bedroom.webp', size: 'medium' },
  { id: 9, type: 'Residential', title: 'Signature Lounge', image: '/assets/images/projects/whatsapp_image_2026_04_13_at_7_52_10_pm.webp', size: 'small' },
  { id: 10, type: 'Residential', title: 'Monolith Interior', image: '/assets/images/projects/whatsapp_image_2026_04_13_at_7_52_11_pm.webp', size: 'medium' },
  { id: 11, type: 'Residential', title: 'Atmospheric Corner', image: '/assets/images/projects/whatsapp_image_2026_04_13_at_7_52_11_pm_1.webp', size: 'small' },
  { id: 12, type: 'Commercial', title: 'Executive Hub', image: '/assets/images/projects/whatsapp_image_2026_04_13_at_7_55_29_pm.webp', size: 'large' },
  { id: 13, type: 'Commercial', title: 'Designers Atelier', image: '/assets/images/projects/whatsapp_image_2026_04_13_at_7_56_27_pm_1.webp', size: 'small' },
  { id: 22, type: 'Residential', title: 'Bespoke Living', image: '/assets/images/projects/whatsapp_image_2026_04_13_at_7_55_30_pm_2.webp', size: 'small' },
  { id: 23, type: 'Residential', title: 'Modern Vibe', image: '/assets/images/projects/whatsapp_image_2026_04_13_at_7_56_27_pm.webp', size: 'medium' },
  { id: 24, type: 'Commercial', title: 'Boutique Studio', image: '/assets/images/projects/whatsapp_image_2026_04_13_at_7_56_27_pm_1.webp', size: 'small' },
  { id: 25, type: 'Residential', title: 'Signature Style', image: '/assets/images/projects/whatsapp_image_2026_04_13_at_7_56_28_pm.webp', size: 'large' },
  { id: 26, type: 'Residential', title: 'Serene Space', image: '/assets/images/projects/whatsapp_image_2026_04_13_at_7_56_28_pm_1.webp', size: 'small' },
  { id: 28, type: 'Residential', title: 'Artful Living', image: '/assets/images/projects/whatsapp_image_2026_04_13_at_7_56_29_pm.webp', size: 'small' },
  { id: 29, type: 'Residential', title: 'Classic Modern', image: '/assets/images/projects/whatsapp_image_2026_04_13_at_7_57_25_pm.webp', size: 'large' },
  { id: 30, type: 'Residential', title: 'Dream Home', image: '/assets/images/projects/whatsapp_image_2026_04_13_at_7_57_25_pm_1.webp', size: 'small' },
  { id: 31, type: 'Residential', title: 'Sophisticated Living', image: '/assets/images/projects/whatsapp_image_2026_04_13_at_7_57_25_pm_2.webp', size: 'medium' },
  { id: 32, type: 'Residential', title: 'Creative Corner', image: '/assets/images/projects/whatsapp_image_2026_04_13_at_7_57_26_pm.webp', size: 'small' },
  { id: 33, type: 'Residential', title: 'Luxe Apartment', image: '/assets/images/projects/whatsapp_image_2026_04_13_at_7_57_26_pm_1.webp', size: 'large' },
  { id: 34, type: 'Residential', title: 'Bespoke Residence', image: '/assets/images/projects/whatsapp_image_2026_04_13_at_7_57_26_pm_2.webp', size: 'small' },
];

// ========== LIGHTBOX — rendered via React Portal to document.body ==========
const LightboxOverlay = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev
}: {
  images: typeof projects;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const current = images[currentIndex];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="lightbox-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.96)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Close Button */}
      <motion.button
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 0.15 }}
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: 'absolute', top: 28, right: 28, zIndex: 100000,
          width: 52, height: 52, borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.3s',
        }}
        whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.2)' }}
      >
        <X size={22} color="white" />
      </motion.button>

      {/* Counter */}
      <div style={{ position: 'absolute', top: 36, left: 36, zIndex: 100000 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase' }}>
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '88vw', maxHeight: '88vh' }}
        >
          <img
            src={current.image}
            alt={current.title}
            style={{
              maxWidth: '100%', maxHeight: '72vh', objectFit: 'contain',
              borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{ marginTop: 20, textAlign: 'center' }}
          >
            <span style={{ fontSize: 10, color: '#CC2626', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 800, display: 'block', marginBottom: 4 }}>
              {current.type}
            </span>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>{current.title}</h3>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Left Arrow */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        whileHover={{ scale: 1.1 }}
        style={{
          position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', zIndex: 100000,
          width: 52, height: 52, borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}
      >
        <ChevronLeft size={22} color="rgba(255,255,255,0.7)" />
      </motion.button>

      {/* Right Arrow */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        whileHover={{ scale: 1.1 }}
        style={{
          position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', zIndex: 100000,
          width: 52, height: 52, borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}
      >
        <ChevronRight size={22} color="rgba(255,255,255,0.7)" />
      </motion.button>
    </motion.div>,
    document.body
  );
};

// ========== PROJECTS SECTION ==========
export const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredProjects = projects.filter(p => filter === 'All' || p.type === filter);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev + 1) % filteredProjects.length : null);
  }, [filteredProjects.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev - 1 + filteredProjects.length) % filteredProjects.length : null);
  }, [filteredProjects.length]);

  return (
    <>
      <section id="projects" className="py-24 md:py-48 bg-surface overflow-visible" style={{ overflow: 'visible' }}>
        <div className="max-w-[1400px] mx-auto px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-black text-accent uppercase tracking-[0.6em] mb-6 block"
              >
                PORTFOLIO
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-sans font-bold leading-[1.1] tracking-tighter"
              >
                Selected <br />
                <span className="font-serif italic font-light lowercase">Projects</span>
              </motion.h2>
            </div>

            <div className="flex gap-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 relative py-2 px-4",
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[350px] overflow-visible">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.04 }}
                  viewport={{ once: true }}
                  onClick={() => openLightbox(i)}
                  className={cn(
                    "relative group rounded-[20px] overflow-hidden cursor-pointer",
                    project.size === 'large' && "lg:col-span-8 lg:row-span-2",
                    project.size === 'medium' && "lg:col-span-4 lg:row-span-2",
                    project.size === 'small' && "lg:col-span-4 lg:row-span-1"
                  )}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover scale-[1.01] group-hover:scale-[1.08] transition-transform duration-1000 ease-out"
                    referrerPolicy="no-referrer"
                  />

                  {/* Hover Overlay with VIEW icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 scale-75 group-hover:scale-100 transition-transform">
                      <ZoomIn size={24} className="text-white" />
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div>
                      <span className="text-[10px] text-accent uppercase tracking-[0.3em] font-bold mb-2 block">{project.type}</span>
                      <h3 className="text-xl font-bold text-white leading-tight">{project.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox — rendered via portal to body so it's above EVERYTHING */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <LightboxOverlay
            images={filteredProjects}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>
    </>
  );
};
