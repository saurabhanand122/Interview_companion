'use client';

import { motion } from 'framer-motion';
import { Brain, Cpu, MessageSquare, ShieldCheck, Sparkles, Star } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Advanced AI Avatars',
    desc: 'Each companion features an isolated behavioral prompt representing mock panel interviewers with specific styles.',
  },
  {
    icon: MessageSquare,
    title: 'Zero-Latency Voice Stream',
    desc: 'Simulated voice streams with WebRTC client streaming to minimize delays and support natural conversation.',
  },
  {
    icon: Cpu,
    title: 'Performance Diagnostics',
    desc: 'Instantly processes spoken language and records scores for pacing rate, structural clarity, and filler usage.',
  },
  {
    icon: ShieldCheck,
    title: 'Candidate Progress passports',
    desc: 'Allows users to bookmark favorites, track streaks, and review mock transcript progression over time.',
  },
];

export default function AboutPage() {
  return (
    <main className="flex flex-col gap-16 pb-20 relative overflow-hidden">
      {/* Ambient background aura glows */}
      <div className="absolute top-[15%] left-[5%] size-96 rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] size-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* 1. Header Section */}
      <section className="text-center flex flex-col items-center gap-4 max-w-3xl mx-auto px-4 mt-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-xs font-semibold text-primary backdrop-blur-md"
        >
          <Sparkles className="size-3.5 text-violet-400" />
          <span>Our Vision & Values</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground bg-none"
        >
          Mastering Interviews through Conversational AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-sm sm:text-base leading-relaxed"
        >
          AI Interview Companion is designed to replace stressful and expensive mock interviews with natural, spoken conversations with intelligent AI Avatars. We build software to help students, developers, and candidates gain confidence.
        </motion.p>
      </section>

      {/* 2. Platform Value Propositions Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full px-4">
        {features.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-md shadow-sm flex gap-5 group transition-all"
            >
              <div className="size-11 rounded-xl bg-violet-500/10 border border-violet-500/20 text-primary flex items-center justify-center shrink-0">
                <Icon className="size-5" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </motion.article>
          );
        })}
      </section>

      {/* 3. Tech Stack Architecture Show */}
      <section className="max-w-5xl mx-auto w-full px-4 flex flex-col md:flex-row items-center gap-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex-1 flex flex-col gap-5"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400 w-fit">
            <Star className="size-3.5 fill-emerald-500" />
            <span>Architecture</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Modern SaaS Engineering
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-semibold">
            Our app leverages high-performance libraries and integrations to ensure responsive voice feedback:
          </p>
          <ul className="grid grid-cols-2 gap-3 mt-1 text-xs font-bold text-foreground/90">
            {['Next.js 15 App Router', 'React 19 Hooks', 'Vapi AI voice API', 'Tailwind CSS v4', 'Supabase Real-Time DB', 'Clerk Auth Middleware'].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <div className="size-1.5 rounded-full bg-violet-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex-1 w-full flex justify-center"
        >
          <div className="relative border border-border/80 bg-slate-900/10 dark:bg-slate-900/40 rounded-3xl p-8 backdrop-blur-md max-w-sm w-full shadow-lg flex flex-col gap-5 overflow-hidden">
            <div className="absolute top-[-20%] right-[-20%] size-28 rounded-full bg-violet-500/10 blur-2xl" />
            
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
                SA
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-foreground">Saurabh Anand</h4>
                <p className="text-[10px] text-muted-foreground font-semibold">Lead Developer</p>
              </div>
            </div>
            
            <blockquote className="text-xs italic text-muted-foreground leading-relaxed">
              &quot;We wanted to build an interviewer tool that feels like a real human dialogue. By combining low-latency WebRTC streams with precise text-evaluation LLMs, we provide instant telemetry diagnostics.&quot;
            </blockquote>
            
            <div className="border-t border-border pt-4 flex gap-4 text-xs font-bold text-primary">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
