/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { IntroLoader } from './components/IntroLoader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { Projects } from './components/Projects';
import { Testimonials } from './components/Testimonials';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { FAQ } from './components/FAQ';
import { ChatBot } from './components/ChatBot';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useImagePreloader } from './hooks/useImagePreloader';

const CRITICAL_IMAGES = [
  '/assets/images/logo.webp',
  '/assets/images/projects/b201_bedroom.webp',
  '/assets/images/projects/b201_living.webp',
  '/assets/images/projects/kitchen.webp',
  '/assets/images/projects/bedroom_v1.webp',
  '/assets/images/projects/hero.webp',
];

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useSmoothScroll();
  const { imagesPreloaded } = useImagePreloader(CRITICAL_IMAGES);

  // Robust Scroll-to-Top on initial load/refresh
  useEffect(() => {
    if (imagesPreloaded) {
      // Delay slightly to match IntroLoader's exit or just trigger immediately
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
        (window as any).lenis?.scrollTo(0, { immediate: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [imagesPreloaded]);

  useGSAP(() => {
    // Section fade-in reveals with parallax
    const sections = ['#about', '#services', '#why-us', '#projects', '#testimonials', '#team', '#faq', '#contact'];

    sections.forEach((section) => {
      const el = document.querySelector(section);
      if (!el) return;

      gsap.from(el, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power3.out",
        clearProps: 'overflow',
        onComplete: () => { (el as HTMLElement).style.overflow = 'visible'; },
      });

    });

    // Horizontal dividers reveal
    gsap.utils.toArray('.divider').forEach((divider: any) => {
      gsap.from(divider, {
        scrollTrigger: {
          trigger: divider,
          start: "top 90%",
        },
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "power3.inOut"
      });
    });
  }, []);

  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="relative">
      <IntroLoader isFinished={imagesPreloaded} />
      <Navbar />

      <main>
        <Hero />

        <div className="divider h-[1px] w-full bg-accent/20" />
        <About />

        <div className="divider h-[1px] w-full bg-accent/20" />
        <Services />

        <div className="divider h-[1px] w-full bg-accent/20" />
        <WhyUs />

        <div className="divider h-[1px] w-full bg-accent/20" />
        <Projects />

        <div className="divider h-[1px] w-full bg-accent/20" />
        <Testimonials />

        <div className="divider h-[1px] w-full bg-accent/20" />
        <Team />

        <div className="divider h-[1px] w-full bg-accent/20" />
        <FAQ />

        <div className="divider h-[1px] w-full bg-accent/20" />
        <Contact />
      </main>

      <Footer />
      <FloatingActions
        isChatOpen={isChatOpen}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
      />
      <ChatBot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}

