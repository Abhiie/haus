import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { ContactForm } from './ContactForm';

export const ContactPopup: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleHeroLoaded = () => {
            // Show popup after 5 seconds of Hero being loaded
            setTimeout(() => {
                setIsOpen(true);
            }, 5000);
        };

        window.addEventListener('hero-loaded', handleHeroLoaded);
        return () => window.removeEventListener('hero-loaded', handleHeroLoaded);
    }, []);

    useEffect(() => {
        const lenis = (window as any).lenis;
        if (isOpen) {
            if (lenis) lenis.stop();
        } else {
            if (lenis) lenis.start();
        }
        return () => {
            if (lenis) lenis.start();
        };
    }, [isOpen]);

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-[100]"
        >
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 ease-out data-[closed]:opacity-0"
            />

            <div data-lenis-prevent className="fixed inset-0 z-[101] overflow-y-auto scrollbar-hide overscroll-none">
                <div className="flex min-h-[100dvh] items-start justify-center p-4 pt-12 md:items-center py-10 md:p-8">
                    <DialogPanel
                        transition
                        className="relative w-full max-w-[650px] bg-surface border border-border shadow-2xl transition duration-500 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 my-auto"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 text-text-base/40 hover:text-accent transition-colors z-20 bg-surface rounded-full p-1"
                        >
                            <X size={32} strokeWidth={1} />
                        </button>

                        <div className="p-6 md:p-14 w-full">
                            <div className="mb-6 md:mb-8 pr-10">
                                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">CONSULTATION</span>
                                <h2 className="mt-2 md:mt-4 text-2xl md:text-3xl font-bold leading-tight">Start Your Design Journey</h2>
                                <p className="mt-1 md:mt-2 text-sm text-text-base/50">Fill in the details below and we'll get back to you shortly.</p>
                            </div>

                            <ContactForm compact />
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};
