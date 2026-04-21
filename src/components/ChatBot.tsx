import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Send, User, Maximize2, Minimize2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

// ── Types ──
interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    showConsultCTA?: boolean;
}

type Theme = 'dark' | 'light';

// ── Theme palette ──
const getThemeColors = (theme: Theme) => {
    const isDark = theme === 'dark';
    return {
        // Shell
        bg: isDark ? '#0E0E0E' : '#FFFFFF',
        shadow: isDark
            ? '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)'
            : '0 20px 60px -15px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)',
        border: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',

        // Header
        headerBg: isDark
            ? 'linear-gradient(135deg, #1a1a1a 0%, #0E0E0E 100%)'
            : 'linear-gradient(135deg, #FAFAFA 0%, #F0F0F0 100%)',
        headerBorder: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
        headerTitle: isDark ? '#FFFFFF' : '#1A1A1A',
        headerSub: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)',
        headerIconBg: isDark ? 'rgba(204,38,38,0.15)' : 'rgba(204,38,38,0.1)',
        closeBtnBorder: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        closeBtnIcon: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
        closeBtnHover: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',

        // Messages
        botBubbleBg: isDark ? 'rgba(255,255,255,0.06)' : '#F4F4F5',
        botBubbleBorder: isDark ? 'rgba(255,255,255,0.06)' : '#E8E8EA',
        botText: isDark ? 'rgba(255,255,255,0.8)' : '#374151',
        userBubbleBg: '#CC2626',
        userText: '#FFFFFF',
        disclaimerText: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.35)',

        // Typing indicator
        typingDotBg: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',

        // Quick questions
        quickBg: isDark ? 'rgba(255,255,255,0.03)' : '#FAFAFA',
        quickBorder: isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB',
        quickText: isDark ? 'rgba(255,255,255,0.5)' : '#6B7280',
        quickHoverBorder: isDark ? 'rgba(204,38,38,0.3)' : 'rgba(204,38,38,0.4)',
        quickHoverText: isDark ? 'rgba(255,255,255,0.8)' : '#CC2626',

        // Input
        inputBg: isDark ? 'rgba(255,255,255,0.04)' : '#F4F6F8',
        inputBorder: isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB',
        inputFocusBorder: isDark ? 'rgba(204,38,38,0.4)' : 'rgba(204,38,38,0.5)',
        inputText: isDark ? '#FFFFFF' : '#1A1A1A',
        inputPlaceholder: isDark ? 'rgba(255,255,255,0.3)' : '#9CA3AF',
        inputAreaBorder: isDark ? 'rgba(255,255,255,0.06)' : '#F0F0F0',
        sendDisabledBg: isDark ? 'rgba(255,255,255,0.06)' : '#E5E7EB',
        sendDisabledIcon: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',

        // Footer
        footerText: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)',

        // CTA
        ctaBg: isDark ? 'rgba(204,38,38,0.12)' : 'rgba(204,38,38,0.08)',
        ctaBorder: isDark ? 'rgba(204,38,38,0.25)' : 'rgba(204,38,38,0.2)',
        ctaText: '#CC2626',
        ctaHoverBg: '#CC2626',
        ctaHoverText: '#FFFFFF',

        // FAB
        fabShadow: isDark ? '0 8px 32px rgba(204,38,38,0.4)' : '0 8px 32px rgba(204,38,38,0.25)',

        // Scrollbar
        scrollThumb: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    };
};

// ── System Context ──
const SYSTEM_CONTEXT = `You are the AI design assistant for Haus Atelier — a premium, turnkey interior design studio based in Ahmedabad, Gujarat, India.

ABOUT THE COMPANY:
- Haus Atelier specializes in complete turnkey interior solutions for residential and commercial spaces.
- They handle everything from design concept to final execution including material sourcing, civil work, furniture, electrical, plumbing, false ceiling, painting, and installation.
- Over 10+ years of design experience.
- Serve Ahmedabad and surrounding Gujarat regions.

SERVICES:
- Residential Interior Design (apartments, villas, bungalows)
- Commercial Interior Design (offices, retail, hospitality)
- Turnkey Execution (end-to-end project management)
- Bespoke Furniture Design (custom modular kitchens, wardrobes, storage)
- Space Planning & Consultation
- Renovation & Remodeling

PRICING (approximate):
- 2BHK: Starting from ₹4 Lakhs
- 3BHK: Starting from ₹6 Lakhs
- 4BHK: Starting from ₹8 Lakhs
- Modular Kitchen: Starting from ₹1.5 Lakhs
- Single Room: Starting from ₹1 Lakh

TIMELINES:
- Full home interiors: 45-90 days
- Single room renovation: 3-4 weeks
- Design consultation: Free, no obligation

PREVIOUS PROJECTS:
The portfolio includes luxurious residential and commercial projects such as:
- The Obsidian Suite (Residential bedroom)
- Vanguard Kitchen (Modern kitchen design)
- Executive Hub (Commercial office space)
- Multiple bedroom, living room, dining, and kitchen designs

GUIDELINES FOR RESPONSES:
1. BE PRECISE AND CONCISE. Give short, direct answers. Do not output essays.
2. Be warm, professional, and knowledgeable about interior design.
3. If asked about bookings or consultations, suggest they can **book a free consultation** directly on the website.
4. Use Markdown for formatting. Use bold for key treatments, terms, or prices. Use bullet points for lists.
5. If asked questions outside interior design scope, politely redirect to design topics.
6. Suggest booking a free consultation when appropriate.
7. Always maintain the premium, sophisticated tone matching the brand.`;


// ── useTheme hook ──
function useTheme(): Theme {
    const [theme, setTheme] = useState<Theme>(() => {
        const attr = document.documentElement.getAttribute('data-theme');
        return attr === 'light' ? 'light' : 'dark';
    });

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const attr = document.documentElement.getAttribute('data-theme');
            setTheme(attr === 'light' ? 'light' : 'dark');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    return theme;
}


// ── Subcomponents ──

const ChatMessage = ({ message, colors }: { message: Message; colors: ReturnType<typeof getThemeColors> }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} gap-1.5`}
    >
        {message.role === 'assistant' ? (
            <>
                {/* Bot bubble */}
                <div className="flex gap-2.5 items-start max-w-[88%]">
                    <div
                        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
                        style={{ background: colors.headerIconBg }}
                    >
                        <Sparkles size={13} color="#CC2626" />
                    </div>
                    <div
                        className="px-4 py-3 rounded-2xl rounded-tl-sm text-[13px] leading-relaxed"
                        style={{
                            background: colors.botBubbleBg,
                            border: `1px solid ${colors.botBubbleBorder}`,
                            color: colors.botText,
                        }}
                    >
                        <div className="markdown-body prose prose-sm max-w-none prose-p:my-0.5 prose-ul:my-1 prose-li:my-0 prose-strong:font-bold">
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                    </div>
                </div>
                {/* AI disclaimer */}
                <p className="text-[9px] font-medium ml-10 tracking-wide" style={{ color: colors.disclaimerText }}>
                    AI-generated response
                </p>
            </>
        ) : (
            <div
                className="max-w-[82%] px-4 py-3 rounded-2xl rounded-tr-sm text-[13px] leading-relaxed shadow-md"
                style={{ background: colors.userBubbleBg, color: colors.userText }}
            >
                {message.content}
            </div>
        )}
    </motion.div>
);


const TypingIndicator = ({ colors }: { colors: ReturnType<typeof getThemeColors> }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5 items-start">
        <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: colors.headerIconBg }}>
            <Sparkles size={13} color="#CC2626" />
        </div>
        <div
            className="px-4 py-3.5 rounded-2xl rounded-tl-sm flex gap-1.5 items-center"
            style={{ background: colors.botBubbleBg, border: `1px solid ${colors.botBubbleBorder}` }}
        >
            {[0, 1, 2].map(i => (
                <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: '#CC2626' }}
                />
            ))}
        </div>
    </motion.div>
);


// ── Main Component ──

export const ChatBot: React.FC = () => {
    const theme = useTheme();
    const colors = getThemeColors(theme);

    const [isOpen, setIsOpen] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [loaderDone, setLoaderDone] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Welcome to **Haus Atelier!** ✦\nHow can I help you today?\n- Need help with **pricing or timelines?**\n- Want to **book a free consultation?**\n- Have an **interior design question?**\n\nShare a few details and I'll guide you.",
            timestamp: new Date(),
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Wait for IntroLoader to finish (3500ms + 1200ms exit = ~4700ms, add buffer)
    useEffect(() => {
        const timer = setTimeout(() => setLoaderDone(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    const quickQuestions = [
        'What are your pricing plans?',
        'How long does a project take?',
        'Book a free consultation',
    ];

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    // Focus input on open
    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
    }, [isOpen]);

    // ── Send message ──
    const sendMessage = useCallback(async (overrideText?: string) => {
        const textToSend = typeof overrideText === 'string' ? overrideText.trim() : input.trim();
        if (!textToSend || isLoading) return;

        const userMessage: Message = { role: 'user', content: textToSend, timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        if (typeof overrideText !== 'string') setInput('');
        setIsLoading(true);

        try {
            const apiKey = (process.env as any).GEMINI_API_KEY;

            if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
                // Fallback without API
                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        role: 'assistant',
                        content: 'Thank you for your interest! To get personalized assistance, please reach out via the **Contact** section below or call our team directly. We\'d love to help with your project! ✦',
                        timestamp: new Date(),
                        showConsultCTA: true,
                    }]);
                    setIsLoading(false);
                }, 1200);
                return;
            }

            const ai = new GoogleGenAI({ apiKey });

            const response = await ai.s.generateContent({
                model: 'gemini-2.0-flash',
                contents: textToSend,
                config: { systemInstruction: SYSTEM_CONTEXT },
            });

            const botResponse = response.text || "I'm having trouble connecting. Please reach out via the **Contact** section below.";

            // Detect consultation intent
            const showConsultCTA = /consult|book|appointment|schedule|visit|meet|call/i.test(botResponse) ||
                /consult|book|appointment|schedule|visit|meet|call/i.test(textToSend);

            let finalResponse = botResponse;
            if (showConsultCTA && !botResponse.toLowerCase().includes('contact section')) {
                finalResponse += '\n\nWould you like to schedule a **free consultation** now?';
            }

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: finalResponse,
                timestamp: new Date(),
                showConsultCTA,
            }]);
        } catch (err) {
            console.error('Gemini Error:', err);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm having trouble connecting right now. Please try again or reach out via the **Contact** section below. ✦",
                timestamp: new Date(),
            }]);
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading]);


    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const scrollToContact = () => {
        setIsOpen(false);
        setTimeout(() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    };

    return createPortal(
        <>
            {/* ── FAB ── */}
            <AnimatePresence>
                {!isOpen && loaderDone && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed z-[9998] w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center cursor-pointer"
                        style={{ bottom: 172, right: 32, boxShadow: colors.fabShadow }}
                    >
                        <Sparkles size={22} />
                        <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* ── Chat Window ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        layout
                        transition={{ layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
                        className={`fixed z-[9999] pointer-events-none ${isMaximized
                            ? 'inset-4 sm:inset-6 lg:inset-8'
                            : 'bottom-5 right-5 lg:bottom-8 lg:right-8 w-[calc(100%-40px)] sm:w-[400px]'
                            }`}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 30 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            layout
                            className={`pointer-events-auto relative w-full flex flex-col ml-auto overflow-hidden ${isMaximized ? 'h-full' : 'h-[560px] sm:h-[600px] max-h-[calc(100vh-80px)]'
                                }`}
                            style={{
                                background: colors.bg,
                                borderRadius: 28,
                                border: `1px solid ${colors.border}`,
                                boxShadow: colors.shadow,
                                transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
                            }}
                        >
                            {/* ── HEADER ── */}
                            <div
                                className="flex-shrink-0 flex items-center justify-between px-5 py-4"
                                style={{
                                    background: colors.headerBg,
                                    borderBottom: `1px solid ${colors.headerBorder}`,
                                    transition: 'background 0.4s ease, border-color 0.4s ease',
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{ background: colors.headerIconBg }}
                                    >
                                        <Sparkles size={18} color="#CC2626" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold tracking-wide" style={{ color: colors.headerTitle }}>
                                                Haus AI
                                            </span>
                                            <span
                                                className="text-[8px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded"
                                                style={{
                                                    background: 'rgba(204,38,38,0.12)',
                                                    color: '#CC2626',
                                                    border: '1px solid rgba(204,38,38,0.2)',
                                                }}
                                            >
                                                AI
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: colors.headerSub }}>
                                                Design Assistant
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setIsMaximized(v => !v)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                                        style={{
                                            border: `1px solid ${colors.closeBtnBorder}`,
                                            background: 'transparent',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={e => (e.currentTarget.style.background = colors.closeBtnHover)}
                                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                        title={isMaximized ? 'Minimize' : 'Maximize'}
                                    >
                                        {isMaximized
                                            ? <Minimize2 size={14} color={colors.closeBtnIcon} />
                                            : <Maximize2 size={14} color={colors.closeBtnIcon} />
                                        }
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                                        style={{
                                            border: `1px solid ${colors.closeBtnBorder}`,
                                            background: 'transparent',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={e => (e.currentTarget.style.background = colors.closeBtnHover)}
                                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                    >
                                        <X size={15} color={colors.closeBtnIcon} />
                                    </button>
                                </div>
                            </div>


                            {/* ── MESSAGES ── */}
                            <div
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto px-4 py-5 space-y-4 overscroll-contain"
                                style={{ scrollbarWidth: 'thin', scrollbarColor: `${colors.scrollThumb} transparent` }}
                                data-lenis-prevent
                            >
                                {messages.map((msg, i) => (
                                    <React.Fragment key={i}>
                                        <ChatMessage message={msg} colors={colors} />

                                        {/* Consult CTA */}
                                        {msg.showConsultCTA && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="ml-10"
                                            >
                                                <button
                                                    onClick={scrollToContact}
                                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[12px] font-bold tracking-wide uppercase cursor-pointer"
                                                    style={{
                                                        background: colors.ctaBg,
                                                        border: `1px solid ${colors.ctaBorder}`,
                                                        color: colors.ctaText,
                                                        transition: 'all 0.25s ease',
                                                    }}
                                                    onMouseEnter={e => {
                                                        e.currentTarget.style.background = colors.ctaHoverBg;
                                                        e.currentTarget.style.color = colors.ctaHoverText;
                                                        e.currentTarget.style.borderColor = colors.ctaHoverBg;
                                                    }}
                                                    onMouseLeave={e => {
                                                        e.currentTarget.style.background = colors.ctaBg;
                                                        e.currentTarget.style.color = colors.ctaText;
                                                        e.currentTarget.style.borderColor = colors.ctaBorder;
                                                    }}
                                                >
                                                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                        <line x1="16" y1="2" x2="16" y2="6" />
                                                        <line x1="8" y1="2" x2="8" y2="6" />
                                                        <line x1="3" y1="10" x2="21" y2="10" />
                                                    </svg>
                                                    Book Free Consultation
                                                </button>
                                            </motion.div>
                                        )}
                                    </React.Fragment>
                                ))}

                                {/* Typing indicator */}
                                {isLoading && <TypingIndicator colors={colors} />}

                                {/* Quick questions — only on initial state */}
                                {messages.length === 1 && !isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="flex flex-col gap-2 pt-1 ml-10"
                                    >
                                        {quickQuestions.map((q, i) => (
                                            <motion.button
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.5 + i * 0.1 }}
                                                onClick={() => sendMessage(q)}
                                                className="text-left w-full px-4 py-3 rounded-xl text-[12px] font-medium cursor-pointer"
                                                style={{
                                                    background: colors.quickBg,
                                                    border: `1px solid ${colors.quickBorder}`,
                                                    color: colors.quickText,
                                                    transition: 'all 0.2s',
                                                }}
                                                onMouseEnter={e => {
                                                    e.currentTarget.style.borderColor = colors.quickHoverBorder;
                                                    e.currentTarget.style.color = colors.quickHoverText;
                                                }}
                                                onMouseLeave={e => {
                                                    e.currentTarget.style.borderColor = colors.quickBorder;
                                                    e.currentTarget.style.color = colors.quickText;
                                                }}
                                            >
                                                {q}
                                            </motion.button>
                                        ))}
                                    </motion.div>
                                )}
                            </div>


                            {/* ── INPUT AREA ── */}
                            <div
                                className="flex-shrink-0 px-4 py-3.5"
                                style={{
                                    borderTop: `1px solid ${colors.inputAreaBorder}`,
                                    transition: 'border-color 0.4s ease',
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="flex-1 rounded-2xl px-4 py-3"
                                        style={{
                                            background: colors.inputBg,
                                            border: `1px solid ${colors.inputBorder}`,
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={e => setInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Ask about our design services..."
                                            className="w-full bg-transparent focus:outline-none text-[13px] font-medium"
                                            style={{ color: colors.inputText }}
                                            onFocus={e => {
                                                const wrapper = e.target.parentElement;
                                                if (wrapper) wrapper.style.borderColor = colors.inputFocusBorder;
                                            }}
                                            onBlur={e => {
                                                const wrapper = e.target.parentElement;
                                                if (wrapper) wrapper.style.borderColor = colors.inputBorder;
                                            }}
                                        />
                                    </div>
                                    <button
                                        onClick={() => sendMessage()}
                                        disabled={!input.trim() || isLoading}
                                        className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center cursor-pointer"
                                        style={{
                                            background: input.trim() ? '#CC2626' : colors.sendDisabledBg,
                                            transition: 'all 0.2s',
                                            border: 'none',
                                            cursor: input.trim() ? 'pointer' : 'not-allowed',
                                            boxShadow: input.trim() ? '0 4px 16px rgba(204,38,38,0.3)' : 'none',
                                        }}
                                    >
                                        <Send size={16} color={input.trim() ? 'white' : colors.sendDisabledIcon} />
                                    </button>
                                </div>

                                {/* Footer */}
                                <p className="text-center text-[9px] font-medium mt-2.5 tracking-widest uppercase" style={{ color: colors.footerText }}>
                                    Powered by Haus Atelier
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>,
        document.body
    );
};
