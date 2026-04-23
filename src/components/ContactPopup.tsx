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

            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 z-[101]">
                <DialogPanel
                    transition
                    className="relative w-full max-w-[650px] max-h-[90dvh] bg-surface p-6 md:p-14 border border-border shadow-2xl flex flex-col transition duration-500 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    <button
                        onClick={() => setIsOpen(false)}
                        className="sticky lg:absolute top-0 lg:top-6 right-0 lg:right-6 shrink-0 ml-auto bg-surface w-fit text-text-base/40 hover:text-accent transition-colors z-20"
                    >
                        <X size={32} strokeWidth={1} />
                    </button>

                    <div className="flex-1 overflow-y-auto scrollbar-hide relative z-10 w-full mt-[-32px] pt-8 lg:mt-0 lg:pt-0">
                        <div className="mb-6 lg:mb-8">
                            <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">CONSULTATION</span>
                            <h2 className="mt-4 text-2xl md:text-3xl font-bold leading-tight">Start Your Design Journey</h2>
                            <p className="mt-2 text-sm text-text-base/50">Fill in the details below and we'll get back to you shortly.</p>
                        </div>

                        <ContactForm compact />
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};
