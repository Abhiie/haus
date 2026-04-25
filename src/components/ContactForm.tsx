import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactFormProps {
    compact?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ compact = false }) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        city: '',
        projectType: 'residential',
        bhkPlanning: '',
        siteLocation: '',
        message: '',
        company: '' // Honeypot field
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    city: '',
                    projectType: 'residential',
                    bhkPlanning: '',
                    siteLocation: '',
                    message: '',
                    company: ''
                });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-text-base/60 max-w-[300px]">
                    Your enquiry has been received securely. Our team will get back to you shortly.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-xs font-bold uppercase tracking-widest text-accent hover:underline"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={cn("space-y-6 md:space-y-8", compact && "space-y-4 md:space-y-6")}>
            {/* Honeypot Field - Hidden from users */}
            <div className="hidden" aria-hidden="true">
                <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

            <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8", compact && "gap-4 md:gap-6")}>
                <div className="space-y-2">
                    <label className="text-[10px] text-text-base/30 uppercase tracking-widest font-bold">Full Name</label>
                    <input
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="E.g. Rajesh Shah"
                        className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-accent transition-colors text-text-base font-medium"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] text-text-base/30 uppercase tracking-widest font-bold">Phone Number</label>
                    <input
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
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
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="rajesh@company.com"
                        className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-accent transition-colors text-text-base font-medium"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] text-text-base/30 uppercase tracking-widest font-bold">City</label>
                    <input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        type="text"
                        placeholder="Ahmedabad"
                        className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-accent transition-colors text-text-base font-medium"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] text-text-base/30 uppercase tracking-widest font-bold">Project Type</label>
                    <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full bg-surface border-b border-border py-4 px-0 focus:outline-none focus:border-accent transition-colors text-text-base font-medium appearance-none cursor-pointer"
                    >
                        <option value="residential">Residential Interior</option>
                        <option value="commercial">Commercial Space</option>
                        <option value="turnkey">Complete Turnkey Solution</option>
                        <option value="others">Other Inquiries</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] text-text-base/30 uppercase tracking-widest font-bold">BHK Planning</label>
                    <select
                        name="bhkPlanning"
                        value={formData.bhkPlanning}
                        onChange={handleChange}
                        className="w-full bg-surface border-b border-border py-4 px-0 focus:outline-none focus:border-accent transition-colors text-text-base font-medium appearance-none cursor-pointer"
                    >
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
                    name="siteLocation"
                    value={formData.siteLocation}
                    onChange={handleChange}
                    type="text"
                    placeholder="E.g. Bodakdev, Ahmedabad"
                    className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-accent transition-colors text-text-base font-medium"
                />
            </div>

            {!compact && (
                <div className="space-y-2">
                    <label className="text-[10px] text-text-base/30 uppercase tracking-widest font-bold">Brief About Your Project</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about the space you're envisioning..."
                        className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-accent resize-none transition-colors text-text-base font-medium"
                    />
                </div>
            )}

            {status === 'error' && (
                <div className="flex items-center gap-2 text-red-500 text-xs font-medium animate-in fade-in slide-in-from-top-1">
                    <AlertCircle size={14} />
                    <p>Submission failed. Please try again or contact us directly.</p>
                </div>
            )}

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full h-16 bg-accent text-white uppercase font-bold hover:bg-white hover:text-black disabled:bg-accent/50 disabled:cursor-not-allowed transition-all duration-500 group flex items-center justify-center gap-4 shadow-xl shadow-accent/20"
            >
                <span className="tracking-[0.3em] mr-[-0.3em] leading-none">
                    {status === 'loading' ? 'Sending...' : 'Send Enquiry'}
                </span>
                {status === 'loading' ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : (
                    <Send size={16} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                )}
            </button>
        </form>
    );
};
