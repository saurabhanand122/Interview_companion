'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, Github, Linkedin, Mail, ExternalLink, Code } from 'lucide-react';

export default function DeveloperProfile() {
    return (
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="border border-border/80 bg-slate-900/40 backdrop-blur-md rounded-3xl p-6 md:p-8 max-w-5xl mx-auto w-full flex flex-col md:flex-row gap-8 items-center relative overflow-hidden shadow-md"
        >
            <div className="absolute top-[-50px] left-[-50px] size-40 rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-50px] right-[-50px] size-40 rounded-full bg-emerald-600/5 blur-3xl pointer-events-none" />

            {/* Profile Avatar Frame */}
            <div className="relative shrink-0 flex flex-col items-center">
                <div className="size-28 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white text-3xl font-extrabold shadow-md border border-white/10 relative">
                    SA
                    <span className="absolute -bottom-1 -right-1 bg-emerald-500 border-2 border-slate-950 rounded-full size-4.5 flex items-center justify-center">
                        <span className="size-2 rounded-full bg-white animate-ping" />
                    </span>
                </div>
                <div className="inline-flex items-center gap-1 mt-3.5 px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/25 rounded-full text-[10px] font-extrabold text-emerald-400">
                    <BadgeCheck className="size-3" />
                    <span>Open To Work</span>
                </div>
            </div>

            {/* Profile Context details */}
            <div className="flex-1 flex flex-col gap-3.5 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                        <h3 className="text-xl font-extrabold text-white tracking-tight">Saurabh Anand</h3>
                        <p className="text-xs text-primary font-bold uppercase tracking-widest mt-1">Lead Developer & UI/UX Craftsman</p>
                    </div>
                    
                    <div className="flex gap-2.5 justify-center">
                        <a 
                            href="https://github.com" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="size-8.5 rounded-xl bg-slate-950 border border-border flex items-center justify-center hover:bg-violet-600/10 hover:border-violet-500/20 text-muted-foreground hover:text-white transition-all cursor-pointer"
                            title="GitHub Profile"
                        >
                            <Github className="size-4.5" />
                        </a>
                        <a 
                            href="https://linkedin.com" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="size-8.5 rounded-xl bg-slate-950 border border-border flex items-center justify-center hover:bg-violet-600/10 hover:border-violet-500/20 text-muted-foreground hover:text-white transition-all cursor-pointer"
                            title="LinkedIn Profile"
                        >
                            <Linkedin className="size-4.5" />
                        </a>
                        <a 
                            href="mailto:saurabh.anand@example.com" 
                            className="size-8.5 rounded-xl bg-slate-950 border border-border flex items-center justify-center hover:bg-violet-600/10 hover:border-violet-500/20 text-muted-foreground hover:text-white transition-all cursor-pointer"
                            title="Send Email"
                        >
                            <Mail className="size-4.5" />
                        </a>
                    </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                    Saurabh is a final-year B.Tech Computer Science student at United Institute of Technology, Prayagraj. 
                    He created **AI Interview Companion** to replace static mock scripts with intelligent voice-to-voice interfaces. 
                    He previously built and shipped **EngineersMaterial.in**, an AI-enabled study resource platform actively helping engineering students. 
                    His design language blends dark cosmic palettes with lightweight micro-interactions.
                </p>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-border/40">
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-950 border border-border/80 text-muted-foreground">React & Next.js</span>
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-950 border border-border/80 text-muted-foreground">Tailwind CSS v4</span>
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-950 border border-border/80 text-muted-foreground">Vapi Voice AI</span>
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-950 border border-border/80 text-muted-foreground">Supabase PostgreSQL</span>
                </div>
            </div>
        </motion.section>
    );
}
