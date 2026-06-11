'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
    { 
        quote: "AI Interview Companion was a game changer for my Meta frontend loop. Practicing coding questions vocally helped me clarify my thought flow, and Codey's pacing feedback made me stop using filler words.", 
        author: "Arjun Mehta", 
        role: "Software Engineer at Google",
        placement: "Google & Meta Offers"
    },
    { 
        quote: "The system design and behavioral voice mock sessions were incredibly realistic. I got instant diagnostics on my architectural reasoning and STAR format usage. Highly recommended for senior prep.", 
        author: "Sarah Jenkins", 
        role: "Product Lead at Stripe",
        placement: "Stripe Placement Success"
    }
];

export default function Testimonials() {
    return (
        <section className="flex flex-col gap-8 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-1.5 border-b border-border/40 pb-4 text-center md:text-left">
                <h2 className="text-3xl font-extrabold tracking-tight text-white">Candidate Placement Reviews</h2>
                <p className="text-muted-foreground text-sm font-medium">How software developers are mastering interview rounds using our voice avatars</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                {testimonials.map((t, idx) => (
                    <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: idx * 0.15, ease: 'easeOut' }}
                        whileHover={{ y: -3, border: '1px solid rgba(139,92,246,0.15)' }}
                        className="border border-border/80 bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 shadow-md flex flex-col justify-between gap-5 transition-all"
                    >
                        <p className="text-xs italic leading-relaxed text-muted-foreground font-semibold flex items-start gap-2">
                            <Quote className="size-4.5 text-violet-400 shrink-0 rotate-180 mt-0.5" />
                            <span>&quot;{t.quote}&quot;</span>
                        </p>
                        <div className="flex items-center justify-between border-t border-border/30 pt-4 mt-1">
                            <div className="flex items-center gap-3">
                                <div className="size-8.5 rounded-full bg-slate-900 border border-border flex items-center justify-center font-extrabold text-xs text-violet-400 shadow-inner">
                                    {t.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-xs font-extrabold text-white">{t.author}</p>
                                    <p className="text-[10px] text-muted-foreground font-bold">{t.role}</p>
                                </div>
                            </div>
                            <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                {t.placement}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
