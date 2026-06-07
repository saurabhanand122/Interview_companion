'use client';

import { motion } from 'framer-motion';
import { Search, PenTool, Mic, BarChart, Trophy, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: '1. Explore AI Tutors',
    desc: 'Browse our specialized AI Interviewer Avatars across Coding, System Design, Behavioral scenarios, Maths, and Economics.',
    color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
  },
  {
    icon: PenTool,
    title: '2. Build Custom Companions',
    desc: 'Design and customize your own AI Interviewer. Define specific topics, speech pacing, speaking styles, and voices.',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: Mic,
    title: '3. Speak to Your Tutor',
    desc: 'Begin a real-time spoken conversation. Practice logic flow, mock prompts, and answers with low WebRTC latency.',
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: BarChart,
    title: '4. Get Telemetry Feedback',
    desc: 'Review transcript diagnostic cards immediately after sessions, checking pacing, STAR format, and logic accuracy.',
    color: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
  },
  {
    icon: Trophy,
    title: '5. Land Your Target Offer',
    desc: 'Improve your speech cues, correct common coding explanations, and secure offer letters at top-tier software firms.',
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  },
];

export default function JourneyPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <main className="flex flex-col gap-16 pb-20 relative overflow-hidden">
      {/* Background Aura Glows */}
      <div className="absolute top-[10%] right-[5%] size-96 rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] size-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <section className="text-center flex flex-col items-center gap-4 max-w-3xl mx-auto px-4 mt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-xs font-semibold text-primary backdrop-blur-md">
          <Sparkles className="size-3.5 text-violet-400" />
          <span>Interactive Milestones</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground bg-none">
          Your Preparation Journey
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          How AI Interview Companion works from your first mock session to interview success.
        </p>
      </section>

      {/* Timeline Steps */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto w-full px-4 flex flex-col gap-8 relative"
      >
        {/* Central Vertical Line (hidden on small screen) */}
        <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-border -translate-x-1/2 hidden md:block" />

        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`flex flex-col md:flex-row items-center w-full justify-between gap-6 md:gap-0 ${
                isEven ? '' : 'md:flex-row-reverse'
              }`}
            >
              {/* Card Container */}
              <div className="w-full md:w-[45%]">
                <div className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-md shadow-sm hover:border-primary/20 transition-all flex flex-col gap-3 group">
                  <div className={`size-10 rounded-lg border flex items-center justify-center ${step.color} shrink-0`}>
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-extrabold text-lg text-foreground group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Timeline Center Point */}
              <div className="size-8 rounded-full border-4 border-background bg-primary shadow-xs z-10 shrink-0 hidden md:flex items-center justify-center text-white text-[10px] font-bold">
                {idx + 1}
              </div>

              {/* Blank Spacing Helper */}
              <div className="w-[45%] hidden md:block" />
            </motion.div>
          );
        })}
      </motion.section>
    </main>
  );
}
