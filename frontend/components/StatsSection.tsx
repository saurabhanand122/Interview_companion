'use client';

import { motion } from 'framer-motion';
import { Trophy, Flame, ShieldCheck } from 'lucide-react';

const stats = [
    { 
        label: "Interviews Completed", 
        value: "24,800+", 
        desc: "Conducted by candidates globally", 
        icon: Trophy, 
        color: "text-amber-400 bg-amber-500/10 border-amber-500/20" 
    },
    { 
        label: "Practice Success Rate", 
        value: "92.6%", 
        desc: "Of users secure target job offers", 
        icon: ShieldCheck, 
        color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
    },
    { 
        label: "Active Daily Candidates", 
        value: "10,200+", 
        desc: "Practicing verbal and logic cues", 
        icon: Flame, 
        color: "text-red-400 bg-red-500/10 border-red-500/20" 
    }
];

export default function StatsSection() {
    return (
        <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                        whileHover={{ scale: 1.01, border: '1px solid rgba(139,92,246,0.15)' }}
                        className="border border-border/80 bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 shadow-md flex items-center gap-5 transition-all"
                    >
                        <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 border ${stat.color}`}>
                            <Icon className="size-6" />
                        </div>
                        <div>
                            <p className="text-2xl font-extrabold text-white tracking-tight">{stat.value}</p>
                            <p className="text-xs font-extrabold text-foreground/90 mt-0.5">{stat.label}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed font-semibold">{stat.desc}</p>
                        </div>
                    </motion.div>
                );
            })}
        </section>
    );
}
