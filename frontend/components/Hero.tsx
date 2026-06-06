'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Bot, ArrowRight, Mic, Brain, Sparkle, Trophy } from 'lucide-react';

export default function Hero() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    return (
        <section className="relative overflow-hidden w-full max-w-6xl mx-auto py-12 md:py-20 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 mt-2">
            
            {/* Background Glow Ambiance */}
            <div className="absolute top-[-100px] left-[-100px] size-[350px] rounded-full bg-violet-600/10 blur-[130px] pointer-events-none" />
            <div className="absolute bottom-[-100px] right-[100px] size-[350px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />

            {/* Left Content Column */}
            <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex-1 flex flex-col items-start text-left gap-6 z-10"
            >
                <motion.div 
                    variants={fadeInUp}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/25 rounded-full text-xs font-semibold text-violet-300 backdrop-blur-md"
                >
                    <Sparkles className="size-3.5 text-violet-400 animate-pulse" />
                    <span>Real-Time Voice AI Interview Prep</span>
                </motion.div>

                <motion.h1 
                    variants={fadeInUp}
                    className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white"
                >
                    Ace Your Next Tech Interview with <span className="text-gradient-primary">Voice AI Avatars</span>
                </motion.h1>

                <motion.p 
                    variants={fadeInUp}
                    className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl"
                >
                    Practice programming logic, system design fundamentals, and behavioral questions. Experience low-latency spoken conversations with custom AI interviewers and receive instant visual performance analytics.
                </motion.p>

                <motion.div 
                    variants={fadeInUp}
                    className="flex gap-4 flex-wrap mt-2 w-full sm:w-auto"
                >
                    <Link href="/companions" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold px-6 py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-500/15 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer glow-btn">
                            <span>Start Mock Interview</span>
                            <ArrowRight className="size-4" />
                        </button>
                    </Link>
                    <Link href="/companions/new" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto border border-border/80 bg-slate-950 hover:bg-slate-900 text-white font-bold px-6 py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer">
                            <Bot className="size-4 text-violet-400" />
                            <span>Build Custom Interviewer</span>
                        </button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Right Simulation Mockup Column */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="flex-1 w-full flex justify-center items-center z-10"
            >
                <div className="relative w-full max-w-md bg-slate-900/60 border border-border/80 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col gap-6 overflow-hidden">
                    {/* Glowing card highlights */}
                    <div className="absolute -top-12 -right-12 size-36 bg-violet-600/10 rounded-full blur-2xl pointer-events-none animate-pulse" />
                    
                    {/* Mock Avatar State header */}
                    <div className="flex items-center justify-between border-b border-border/40 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-violet-500/20 rounded-full animate-ping pointer-events-none" />
                                <div className="size-11 rounded-full bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center border border-white/10 relative">
                                    <Bot className="size-5.5 text-white" />
                                </div>
                            </div>
                            <div>
                                <h4 className="font-extrabold text-sm text-white">Codey the Architect</h4>
                                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1.5">
                                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Active voice session
                                </span>
                            </div>
                        </div>
                        <div className="px-2.5 py-1 bg-slate-950 border border-border rounded-lg text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            Vapi AI
                        </div>
                    </div>

                    {/* Speech / Audio Pulsing Visualizer */}
                    <div className="flex flex-col items-center py-6 gap-4 relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(139,92,246,0.06)_0%,_transparent_70%)]" />
                        
                        <div className="size-20 rounded-full bg-violet-500/10 border border-violet-500/25 flex items-center justify-center relative">
                            <div className="absolute inset-2 bg-violet-500/15 rounded-full animate-pulse" />
                            <Mic className="size-8 text-violet-400" />
                        </div>
                        
                        {/* Audio Wave lines simulating response */}
                        <div className="flex items-center gap-1 h-8 mt-2">
                            {[0.4, 0.7, 0.5, 0.9, 0.3, 0.8, 0.4, 0.6, 0.8, 0.3, 0.7, 0.5, 0.9, 0.4].map((scale, i) => (
                                <span 
                                    key={i} 
                                    className="w-1 bg-violet-500 rounded-full transition-all duration-300"
                                    style={{ 
                                        height: `${scale * 100}%`,
                                        opacity: 0.3 + (scale * 0.7),
                                        animation: `pulseGlow 1.2s ease-in-out infinite alternate`,
                                        animationDelay: `${i * 0.1}s`
                                    }} 
                                />
                            ))}
                        </div>
                    </div>

                    {/* Telemetry diagnostics cards */}
                    <div className="grid grid-cols-2 gap-3 mt-1">
                        <div className="p-3 bg-slate-950 border border-border/80 rounded-xl flex items-center gap-2.5">
                            <Brain className="size-4.5 text-pink-400 shrink-0" />
                            <div>
                                <span className="block text-[8px] uppercase tracking-wider text-muted-foreground font-bold">Logic check</span>
                                <span className="font-extrabold text-xs text-white">94% Score</span>
                            </div>
                        </div>
                        <div className="p-3 bg-slate-950 border border-border/80 rounded-xl flex items-center gap-2.5">
                            <Trophy className="size-4.5 text-amber-400 shrink-0" />
                            <div>
                                <span className="block text-[8px] uppercase tracking-wider text-muted-foreground font-bold">Pacing rate</span>
                                <span className="font-extrabold text-xs text-white">Stable</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

        </section>
    );
}
