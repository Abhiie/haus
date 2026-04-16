import React from 'react';
import { Logo } from './Logo';
import { Instagram, MessageCircle, Phone, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-bg pt-24 pb-12 border-t border-accent/20 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Logo Column */}
          <div className="space-y-8">
            <Logo compact={false} />
            <p className="font-serif italic text-text-base/50 text-xl">"The allure of timeless beauty."</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-[10px] text-accent uppercase tracking-[0.3em] font-bold">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Why Us', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-text-base/40 hover:text-accent transition-colors uppercase text-[10px] tracking-widest font-bold">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="space-y-8">
            <h4 className="text-[10px] text-accent uppercase tracking-[0.3em] font-bold">Services</h4>
            <ul className="space-y-4 text-text-base/40 uppercase text-[10px] tracking-widest font-bold">
              <li>Residential</li>
              <li>Commercial</li>
              <li>Turnkey Solutions</li>
              <li>Space Planning</li>
              <li>Material Selection</li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="space-y-8">
            <h4 className="text-[10px] text-accent uppercase tracking-[0.3em] font-bold">Connect</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-text-base/40 hover:text-accent transition-colors cursor-pointer group">
                <Instagram size={18} className="text-accent group-hover:scale-125 transition-transform" />
                <span className="text-[10px] tracking-widest font-bold uppercase">Instagram</span>
              </li>
              <li className="flex items-center gap-3 text-text-base/40 hover:text-accent transition-colors cursor-pointer group">
                <MessageCircle size={18} className="text-green-500 group-hover:scale-125 transition-transform" />
                <span className="text-[10px] tracking-widest font-bold uppercase">WhatsApp</span>
              </li>
              <li className="flex items-center gap-3 text-text-base/40 hover:text-accent transition-colors group">
                <Phone size={18} className="text-accent group-hover:scale-125 transition-transform" />
                <span className="text-[10px] tracking-widest font-bold uppercase">+91 [Phone]</span>
              </li>
              <li className="flex items-center gap-3 text-text-base/40 hover:text-accent transition-colors group">
                <Mail size={18} className="text-accent group-hover:scale-125 transition-transform" />
                <span className="text-[10px] tracking-widest font-bold uppercase">hello@hausatelier.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-border/30 gap-6">
          <p className="text-[10px] text-text-base/30 uppercase tracking-[0.2em]">
            © 2025 Haus Atelier. All rights reserved. Premium Interior Design Ahmedabad
          </p>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-4 text-[10px] text-text-base uppercase tracking-[0.3em] font-bold hover:text-accent transition-colors"
          >
            Back to top
            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:scale-110 transition-all">
              <ArrowUp size={16} className="text-text-base group-hover:text-white" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
