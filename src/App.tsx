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
import { useSmoothScroll } from './hooks/useSmoothScroll';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useSmoothScroll();

  useGSAP(() => {
    // Scroll reveal animations for sections
    const sections = ['#about', '#services', '#why-us', '#projects', '#testimonials', '#team', '#contact'];
    
    sections.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
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
        <Contact />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

