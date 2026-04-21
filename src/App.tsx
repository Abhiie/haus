/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
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

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useSmoothScroll();

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

      // Stagger child headings (h2, h3) within each section
      gsap.from(`${section} h2, ${section} h3`, {
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });

      // Stagger paragraphs
      gsap.from(`${section} p`, {
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
      });
    });

    // Parallax effect on images inside sections
    gsap.utils.toArray('section:not(#projects) img').forEach((img: any) => {
      gsap.fromTo(img,
        { y: 30 },
        {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
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

  return (
    <div className="relative">
      <IntroLoader />
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
      <FloatingActions />
      <ChatBot />
    </div>
  );
}

