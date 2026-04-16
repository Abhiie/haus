import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, MessageCircle, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 md:py-40 bg-primary-bg overflow-hidden relative">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[40vw] h-full bg-surface/50 -z-10 translate-x-1/4 skew-x-[15deg]" />

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-24 lg:items-start">
          {/* Left Column - Info */}
          <div className="flex-1 space-y-12">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-bold text-accent uppercase tracking-[0.4em]"
              >
                GET IN TOUCH
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                Let's Build <br /> Something Beautiful
              </motion.h2>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="mt-1 w-12 h-12 flex items-center justify-center rounded-full bg-surface text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] text-text-base/30 uppercase tracking-[0.2em] font-bold mb-2">Our Address</h4>
                  <p className="text-xl font-medium text-text-base">Ahmedabad, Gujarat, India</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="mt-1 w-12 h-12 flex items-center justify-center rounded-full bg-surface text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] text-text-base/30 uppercase tracking-[0.2em] font-bold mb-2">Phone Number</h4>
                  <p className="text-xl font-medium leading-none text-text-base">+91 [Placeholder]</p>
                  <p className="text-sm text-text-base/40 mt-1 italic">Mon–Sat, 10am–7pm</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="mt-1 w-12 h-12 flex items-center justify-center rounded-full bg-surface text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] text-text-base/30 uppercase tracking-[0.2em] font-bold mb-2">Email Us</h4>
                  <p className="text-xl font-medium text-text-base">hello@hausatelier.in</p>
                </div>
              </div>
            </div>

            <div className="pt-8 flex gap-6">
              {[
                { icon: <Instagram size={20} />, label: 'Instagram', color: 'bg-surface' },
                { icon: <MessageCircle size={20} />, label: 'WhatsApp', color: 'bg-green-600/20 text-green-500' }
              ].map((social, i) => (
                <button 
                  key={i}
                  className={cn(
                    "w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110",
                    social.color
                  )}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-[1.5] w-full bg-surface p-8 md:p-12 border border-border"
          >
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] text-text-base/30 uppercase tracking-widest font-bold">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="E.g. Rajesh Shah"
                    className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-accent transition-colors text-text-base font-medium" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-text-base/30 uppercase tracking-widest font-bold">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="91-XXXXX-XXXXX"
                    className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-accent transition-colors text-text-base font-medium" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] text-text-base/30 uppercase tracking-widest font-bold">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="rajesh@company.com"
                    className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-accent transition-colors text-text-base font-medium" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-text-base/30 uppercase tracking-widest font-bold">City</label>
                  <input 
                    type="text" 
                    placeholder="Ahmedabad"
                    className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-accent transition-colors text-text-base font-medium" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-text-base/30 uppercase tracking-widest font-bold">Project Type</label>
                <select className="w-full bg-surface border-b border-border py-4 px-0 focus:outline-none focus:border-accent transition-colors text-text-base font-medium appearance-none cursor-pointer">
                  <option value="residential">Residential Interior</option>
                  <option value="commercial">Commercial Space</option>
                  <option value="turnkey">Complete Turnkey Solution</option>
                  <option value="others">Other Inquiries</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-text-base/30 uppercase tracking-widest font-bold">Brief About Your Project</label>
                <textarea 
                  rows={4} 
                  placeholder="Tell us about the space you're envisioning..."
                  className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-accent resize-none transition-colors text-text-base font-medium"
                />
              </div>

              <button className="w-full py-5 bg-accent text-white uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all duration-500 group flex items-center justify-center gap-4">
                Send Enquiry
                <Send size={16} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
