'use client';

import { motion } from 'framer-motion';
import { Mic, FileText, Award, BarChart3 } from 'lucide-react';

const features = [
    {
        title: "AI Mock Interviews",
        desc: "Conduct vocal, low-latency mock interviews with intelligent AI avatars specializing in coding, design, and product roles.",
        icon: Mic,
        color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    },
    {
        title: "Resume Analysis",
        desc: "Receive deep evaluations of your CV highlights, alignment with target roles, and advice on crafting impact points.",
        icon: FileText,
        color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
        title: "Instant Audio Feedback",
        desc: "Review logs detailing your vocal pacing, filler-word counts, speech structures (STAR format), and logical accuracy.",
        icon: Award,
        color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
        title: "Analytics Dashboard",
        desc: "Track completed mocks, streak consistency, scoring progressions, and tailored recommendations on next steps.",
        icon: BarChart3,
        color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    }
];

export default function FeaturesGrid() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' }
        }
    };

    return (
        <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-1.5 border-b border-border/40 pb-4 text-center md:text-left">
                <h2 className="text-3xl font-extrabold tracking-tight text-white">Platform Core Features</h2>
                <p className="text-muted-foreground text-sm font-medium">Equipped with everything you need to master your interview performance</p>
            </div>

            <motion.section 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-2"
            >
                {features.map((feat, idx) => {
                    const Icon = feat.icon;
                    return (
                        <motion.div
                            key={idx}
                            variants={cardVariants}
                            whileHover={{ scale: 1.02, y: -4 }}
                            className="bg-slate-900/40 border border-border/80 rounded-2xl p-6 shadow-md backdrop-blur-md hover:border-violet-500/20 transition-all flex flex-col gap-4 group"
                        >
                            <div className={`size-10 rounded-xl flex items-center justify-center border shrink-0 ${feat.color}`}>
                                <Icon className="size-5" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h3 className="font-extrabold text-sm text-white group-hover:text-violet-300 transition-colors">
                                    {feat.title}
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed mt-1 font-medium">
                                    {feat.desc}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.section>
        </div>
    );
}
