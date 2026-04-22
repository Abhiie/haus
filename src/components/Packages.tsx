import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronRight, ChevronLeft } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import type { Swiper as SwiperType } from 'swiper';

const packages = [
    {
        id: '2bhk',
        type: '2BHK',
        price: 'Starting at 10L*',
        image: '/assets/images/projects/b201_living.webp', // using a known image for fallback
        realImage: '/assets/images/package_2bhk.webp',
    },
    {
        id: '3bhk',
        type: '3BHK',
        price: 'Starting at 12L*',
        image: '/assets/images/projects/b201_bedroom.webp',
        realImage: '/assets/images/package_3bhk.webp',
    },
    {
        id: '4bhk',
        type: '4BHK',
        price: 'Starting at 14L*',
        image: '/assets/images/projects/kitchen.webp',
        realImage: '/assets/images/package_4bhk.webp',
    }
];

export const Packages: React.FC = () => {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <section id="packages" className="py-20 md:py-32 bg-surface text-text-base relative overflow-hidden">
            <div className="container-custom relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="mb-10 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-text-base"
                    >
                        Homes for every budget
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-6 text-text-base/70 text-lg md:text-xl leading-relaxed max-w-2xl"
                    >
                        Our interior designers work with you keeping in mind your requirements and budget
                    </motion.p>
                </div>

                <div className="relative w-full">
                    <Swiper
                        modules={[Navigation]}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        spaceBetween={16}
                        slidesPerView={1.1}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 24 }
                        }}
                        className="w-full !overflow-visible md:!overflow-hidden"
                    >
                        {packages.map((pkg) => (
                            <SwiperSlide key={pkg.id}>
                                <div className="group relative w-full aspect-[3/4] sm:aspect-[4/5] md:h-[450px] rounded-xl md:rounded-2xl overflow-hidden cursor-pointer">
                                    {/* Background Image Setup */}
                                    <img
                                        src={pkg.realImage}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = pkg.image; // fallback if image missing
                                        }}
                                        alt={pkg.type}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Bottom Gradient for text visibility */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                                    {/* Top-left Badge */}
                                    <div className="absolute top-4 left-4 z-10 bg-accent text-white text-xs md:text-sm font-semibold px-3 md:px-4 py-1.5 rounded-full shadow-lg">
                                        {pkg.price}
                                    </div>

                                    {/* Bottom-left Title */}
                                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-10">
                                        <h3 className="text-white text-xl md:text-2xl font-bold tracking-wide">
                                            {pkg.type}
                                        </h3>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Buttons (visible mostly on desktop/tablet) */}
                    <div className="hidden md:flex absolute top-1/2 -right-6 lg:-right-12 -translate-y-1/2 z-20">
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="bg-white text-black p-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:scale-110 transition-transform active:scale-95"
                            aria-label="Next slide"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="mt-8 text-center md:text-left">
                    <p className="text-sm text-text-base/50 italic">
                        *The prices include only modular interiors for new homes.
                    </p>
                </div>
            </div>
        </section>
    );
};
