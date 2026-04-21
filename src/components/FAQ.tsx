import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: 'How much does interior design cost in Ahmedabad?',
        answer: 'Interior design costs vary based on scope, materials, and complexity. At Haus Atelier, our turnkey solutions for a 2BHK start from ₹4 Lakhs, 3BHK from ₹6 Lakhs, and 4BHK from ₹8 Lakhs. We offer transparent pricing with no hidden costs and ensure premium quality at every budget level.',
    },
    {
        question: 'What is a turnkey interior design solution?',
        answer: 'A turnkey solution means we handle everything from design concept to final execution — including material sourcing, civil work, furniture, electrical, plumbing, false ceiling, painting, and installation. You simply hand us the keys and we deliver your dream space ready to move in.',
    },
    {
        question: 'How long does a full home interior project take?',
        answer: 'Our standard timeline for full home interiors is 45–90 days depending on project scale. A single room renovation can be completed within 3–4 weeks. We follow strict project management timelines and keep you updated at every milestone.',
    },
    {
        question: 'Do you offer customized furniture and modular solutions?',
        answer: 'Absolutely. We specialize in bespoke furniture tailored to your space and lifestyle. Our modular kitchens, wardrobes, and storage solutions are factory-finished for precision and durability, with hundreds of finish options to choose from.',
    },
    {
        question: 'What areas in Gujarat do you serve?',
        answer: 'We primarily serve Ahmedabad and surrounding Gujarat regions. Our team handles projects across the metropolitan area and can also take on destination projects in other major cities. Contact us to discuss your location.',
    },
    {
        question: 'Can I see your previous work before committing?',
        answer: 'Yes! Browse our Projects section to see our completed residential and commercial interiors. We also arrange site visits to our completed projects so you can experience our craftsmanship firsthand. Book a free consultation to get started.',
    },
    {
        question: 'What is included in the free design consultation?',
        answer: 'Our complimentary consultation includes understanding your requirements, space analysis, style preferences discussion, preliminary design concepts, a rough budget estimate, and a project timeline. There\'s absolutely no obligation to proceed.',
    },
    {
        question: 'Do you handle both residential and commercial interiors?',
        answer: 'Yes, Haus Atelier handles both residential and commercial projects. From luxury apartments and villas to offices, retail spaces, and hospitality venues — our team delivers premium interiors across all categories.',
    },
];

const FAQItem = ({ faq, index, isOpen, onToggle }: { faq: typeof faqs[0]; index: number; isOpen: boolean; onToggle: () => void }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.05 }}
        viewport={{ once: true }}
        className="border-b border-white/[0.06]"
    >
        <button
            onClick={onToggle}
            className="w-full flex items-center justify-between py-7 md:py-9 text-left group"
        >
            <div className="flex items-start gap-6 flex-1 pr-6">
                <span className="text-[11px] font-black text-accent/40 tracking-wider mt-1 min-w-[28px]">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className={`text-base md:text-lg font-semibold transition-colors duration-300 leading-relaxed ${isOpen ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                    {faq.question}
                </h3>
            </div>
            <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen
                        ? 'bg-accent border-accent text-white'
                        : 'border-white/15 text-white/40 group-hover:border-white/30'
                    }`}
            >
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
            </motion.div>
        </button>

        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                >
                    <div className="pl-[52px] pb-8 pr-16">
                        <p className="text-white/40 text-[15px] leading-[1.9] font-light">
                            {faq.answer}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
);

export const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(prev => prev === index ? null : index);
    };

    return (
        <section id="faq" className="py-24 md:py-40 bg-[#060606]">
            <div className="max-w-[1000px] mx-auto px-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[11px] font-black text-accent uppercase tracking-[0.6em] mb-6 block"
                        >
                            FAQ
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-sans font-bold leading-[1.1] tracking-tighter"
                        >
                            Common <br />
                            <span className="font-serif italic font-light lowercase">Questions</span>
                        </motion.h2>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-white/30 text-sm leading-[1.8] max-w-[320px]"
                    >
                        Everything you need to know about our interior design process, pricing, and timelines.
                    </motion.p>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-white/[0.06] mb-2" />

                {/* FAQ Items */}
                <div>
                    {faqs.map((faq, i) => (
                        <FAQItem
                            key={i}
                            faq={faq}
                            index={i}
                            isOpen={openIndex === i}
                            onToggle={() => toggleFAQ(i)}
                        />
                    ))}
                </div>

                {/* CTA at bottom */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-white/30 text-sm mb-6">Still have questions?</p>
                    <a
                        href="#contact"
                        className="inline-block px-10 py-4 border border-white/20 text-[10px] uppercase tracking-[0.3em] text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-500"
                    >
                        Get in Touch
                    </a>
                </motion.div>
            </div>
        </section>
    );
};
