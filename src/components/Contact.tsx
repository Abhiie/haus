import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ContactForm } from './ContactForm';

const WhatsAppIcon = ({ size = 24, className }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

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
                  <p className="text-xl font-medium text-text-base leading-snug">
                    FF-01 Haus Atelier Pvt Ltd,<br />
                    Swarnim Dharti, behind Sardardham,<br />
                    near Vaishnodevi circle,<br />
                    Ahmedabad, Gujarat 382421
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="mt-1 w-12 h-12 flex items-center justify-center rounded-full bg-surface text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] text-text-base/30 uppercase tracking-[0.2em] font-bold mb-2">Phone Number</h4>
                  <p className="text-xl font-medium leading-none text-text-base">+91 8141021215</p>
                  <p className="text-sm text-text-base/40 mt-1 italic">Mon–Sat, 10am–7pm</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="mt-1 w-12 h-12 flex items-center justify-center rounded-full bg-surface text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] text-text-base/30 uppercase tracking-[0.2em] font-bold mb-2">Email Us</h4>
                  <p className="text-xl font-medium text-text-base">info@hausatelier.in</p>
                </div>
              </div>
            </div>

            <div className="pt-8 flex gap-6">
              {[
                { icon: <Instagram size={20} />, label: 'Instagram', color: 'bg-surface text-text-base', href: 'https://www.instagram.com/haus___atelier/' },
                { icon: <WhatsAppIcon size={20} />, label: 'WhatsApp', color: 'bg-green-600/20 text-[#25D366]', href: 'https://wa.me/918141021215' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110",
                    social.color
                  )}
                >
                  {social.icon}
                </a>
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
            <ContactForm />
          </motion.div>
        </div>

        {/* Map Feature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 w-full h-[350px] md:h-[450px] rounded-2xl md:rounded-3xl overflow-hidden border border-border grayscale hover:grayscale-0 transition-all duration-700"
        >
          <iframe
            title="Haus Atelier Ahmedabad Location Map"
            src="https://maps.google.com/maps?q=Swarnim+Dharti,+behind+Sardardham,+near+Vaishnodevi+circle,+Ahmedabad,+Gujarat+382421&t=&z=14&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full object-cover"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};
