import React from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactFormProps {
    compact?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ compact = false }) => {
    return (
        <form className={cn("space-y-6 md:space-y-8", compact && "space-y-4 md:space-y-6")}>
            <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8", compact && "gap-4 md:gap-6")}>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
                    <label className="text-[10px] text-text-base/30 uppercase tracking-widest font-bold">BHK Planning</label>
                    <select className="w-full bg-surface border-b border-border py-4 px-0 focus:outline-none focus:border-accent transition-colors text-text-base font-medium appearance-none cursor-pointer">
                        <option value="">Select BHK</option>
                        <option value="1bhk">1 BHK</option>
                        <option value="2bhk">2 BHK</option>
                        <option value="3bhk">3 BHK</option>
                        <option value="4bhk">4 BHK</option>
                        <option value="5bhk+">5 BHK+</option>
                        <option value="villa">Villa / Bungalow</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] text-text-base/30 uppercase tracking-widest font-bold">Site Location</label>
                <input
                    type="text"
                    placeholder="E.g. Bodakdev, Ahmedabad"
                    className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-accent transition-colors text-text-base font-medium"
                />
            </div>

            {!compact && (
                <div className="space-y-2">
                    <label className="text-[10px] text-text-base/30 uppercase tracking-widest font-bold">Brief About Your Project</label>
                    <textarea
                        rows={4}
                        placeholder="Tell us about the space you're envisioning..."
                        className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-accent resize-none transition-colors text-text-base font-medium"
                    />
                </div>
            )}

            <button className="w-full h-16 bg-accent text-white uppercase font-bold hover:bg-white hover:text-black transition-all duration-500 group flex items-center justify-center gap-4 shadow-xl shadow-accent/20">
                <span className="tracking-[0.3em] mr-[-0.3em] leading-none">Send Enquiry</span>
                <Send size={16} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
            </button>
        </form>
    );
};
