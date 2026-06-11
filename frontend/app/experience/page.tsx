'use client';

import { motion } from 'framer-motion';
import { Bot, Sparkles, Volume2, ShieldCheck, Flame } from 'lucide-react';
import Image from 'next/image';

const mockAvatars = [
  {
    name: 'Codey the Tech Architect',
    subject: 'Coding',
    desc: 'Specializes in algorithmic complexity, language features, and code structural integrity. Uses a direct, structured style.',
    icon: '/icons/coding.svg',
    color: '#3b82f6',
  },
  {
    name: 'Olivia the Behavioral Lead',
    subject: 'Language & HR',
    desc: 'Evaluates your behavioral questions using the STAR framework. Focuses on leadership cues and speech pacing.',
    icon: '/icons/language.svg',
    color: '#8b5cf6',
  },
  {
    name: 'Marcus the Econ Analyst',
    subject: 'Economics & Finance',
    desc: 'Tests microeconomics, market models, and macroeconomic inflation puzzles. Encourages mathematical reasoning.',
    icon: '/icons/economics.svg',
    color: '#10b981',
  },
];

export default function ExperiencePage() {
  return (
    <main className="flex flex-col gap-16 pb-20 relative overflow-hidden">
      {/* Background Aura Glows */}
      <div className="absolute top-[10%] left-[5%] size-96 rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] size-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <section className="text-center flex flex-col items-center gap-4 max-w-3xl mx-auto px-4 mt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-xs font-semibold text-primary backdrop-blur-md">
          <Sparkles className="size-3.5 text-violet-400" />
          <span>Natural Mock Environment</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground bg-none">
          The Mock Interview Experience
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Discover a lifelike oral practice session driven by real-time speech telemetry.
        </p>
      </section>

      {/* Interactive visualizer section */}
      <section className="max-w-5xl mx-auto w-full px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary w-fit">
            <Volume2 className="size-3.5" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Zero-Latency Spoken Dialogues
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-semibold">
            When you launch a mock session, our WebRTC media pipeline connects your browser microphone to our AI Avatars. Speak, explain your logic, or sketch your thoughts verbally just like a real interview.
          </p>
          <div className="flex flex-col gap-3.5 mt-2">
            <div className="flex gap-3 items-center">
              <div className="size-5 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-500 font-extrabold text-[10px]">✓</div>
              <span className="text-xs font-bold text-foreground/90">Low WebRTC streaming latency</span>
            </div>
            <div className="flex gap-3 items-center">
              <div className="size-5 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-500 font-extrabold text-[10px]">✓</div>
              <span className="text-xs font-bold text-foreground/90">Mute controls and guide prompts</span>
            </div>
            <div className="flex gap-3 items-center">
              <div className="size-5 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-500 font-extrabold text-[10px]">✓</div>
              <span className="text-xs font-bold text-foreground/90">Automatic session history logs</span>
            </div>
          </div>
        </motion.div>

        {/* Visual Simulated Wave Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="w-full max-w-sm border border-border bg-card/60 rounded-3xl p-6 shadow-lg backdrop-blur-md relative overflow-hidden flex flex-col gap-6">
            <div className="absolute top-0 right-0 size-32 bg-violet-600/5 blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <div className="flex items-center gap-3">
                <div className="relative size-10 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-primary font-bold">
                  <Bot className="size-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-foreground">AI Speech Pipeline</h4>
                  <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Stream active
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 border border-border bg-muted/50 rounded-lg text-[9px] font-bold text-muted-foreground uppercase">WebRTC</span>
            </div>

            {/* Pulse Wave lines */}
            <div className="flex justify-center items-center py-6 h-20 relative">
              <div className="flex items-center gap-1.5 h-10">
                {[0.4, 0.7, 0.5, 0.9, 0.3, 0.8, 0.4, 0.6, 0.8, 0.3, 0.7, 0.5].map((scale, i) => (
                  <span 
                    key={i} 
                    className="w-1 bg-primary rounded-full animate-pulse" 
                    style={{ 
                      height: `${scale * 100}%`,
                      animationDelay: `${i * 0.15}s`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Simulated Score metrics */}
            <div className="grid grid-cols-2 gap-3 mt-1 text-xs">
              <div className="p-3 bg-muted/40 border border-border rounded-xl flex items-center gap-2">
                <Flame className="size-4 text-red-500" />
                <div>
                  <span className="block text-[8px] uppercase font-bold text-muted-foreground">Pacing Rate</span>
                  <span className="font-bold text-foreground">125 WPM</span>
                </div>
              </div>
              <div className="p-3 bg-muted/40 border border-border rounded-xl flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald-500" />
                <div>
                  <span className="block text-[8px] uppercase font-bold text-muted-foreground">Logic Check</span>
                  <span className="font-bold text-foreground">Good</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Meet the Avatars Section */}
      <section className="flex flex-col gap-8 max-w-5xl mx-auto w-full px-4">
        <div className="flex flex-col gap-1 text-center md:text-left border-b border-border/40 pb-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Meet Your AI Interviewers</h2>
          <p className="text-muted-foreground text-sm font-semibold">Specialized avatars configured for technical and behavioral panels.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockAvatars.map((av, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-md shadow-sm flex flex-col gap-4 group transition-all"
            >
              <div className="size-12 rounded-xl flex items-center justify-center border shrink-0 bg-muted/50 border-border/60">
                <Image src={av.icon} alt={av.subject} width={26} height={26} />
              </div>
              <div className="flex flex-col gap-1.5 flex-grow">
                <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">{av.name}</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{av.subject}</span>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">{av.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}
