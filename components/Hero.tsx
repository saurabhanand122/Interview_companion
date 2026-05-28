"use client";

import Link from "next/link";
import { Sparkles, Bot, Zap, ArrowRight, Mic } from "lucide-react";
import Image from "next/image";

const Hero = () => {
    return (
        <section className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/40 backdrop-blur-md p-8 md:p-12 flex flex-col items-center text-center gap-6 shadow-md max-w-5xl mx-auto mt-2">
            {/* Ambient Background Aura Glows */}
            <div className="absolute -top-40 -left-40 size-80 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 size-80 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/25 rounded-full text-xs font-semibold text-primary animate-pulse">
                <Sparkles className="size-3.5" />
                <span>Introducing Live Vocal Learning</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                Learn Anything Smarter With AI Companions
            </h1>

            <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
                Experience natural, low-latency, voice-to-voice sessions with customized virtual tutors. Practice coding, solve maths problems, explore science, or build your vocabulary in real-time.
            </p>

            <div className="flex gap-4 flex-wrap justify-center mt-2">
                <Link href="/companions">
                    <button className="btn-primary flex items-center gap-2 group px-6 py-3 cursor-pointer">
                        <span>Explore Companions</span>
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </Link>
                <Link href="/companions/new">
                    <button className="border border-border bg-card hover:bg-muted hover:border-muted-foreground/30 text-foreground rounded-2xl font-bold text-sm px-6 py-3 transition-all flex items-center gap-2 shadow-xs cursor-pointer">
                        <Bot className="size-4 text-primary" />
                        <span>Build Your Tutor</span>
                    </button>
                </Link>
            </div>

            {/* Feature Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mt-8 border-t border-border/40 pt-8">
                <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 hover:border-primary/20 transition-all duration-300 group">
                    <div className="size-10 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/25 group-hover:scale-105 transition-transform duration-300">
                        <Mic className="size-5 text-violet-500" />
                    </div>
                    <h3 className="font-bold text-base text-foreground mt-1">Real-time Vocal AI</h3>
                    <p className="text-xs text-muted-foreground text-center">Low-latency conversational voice agent powered by Vapi</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 hover:border-primary/20 transition-all duration-300 group">
                    <div className="size-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/25 group-hover:scale-105 transition-transform duration-300">
                        <Zap className="size-5 text-amber-500" />
                    </div>
                    <h3 className="font-bold text-base text-foreground mt-1">Personalized Styling</h3>
                    <p className="text-xs text-muted-foreground text-center">Customize tutoring style from casual conversation to formal guide</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 hover:border-primary/20 transition-all duration-300 group">
                    <div className="size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/25 group-hover:scale-105 transition-transform duration-300">
                        <Image src="/icons/cap.svg" alt="Academic specialist" width={20} height={20} className="filter dark:brightness-125" />
                    </div>
                    <h3 className="font-bold text-base text-foreground mt-1">Diverse Subjects</h3>
                    <p className="text-xs text-muted-foreground text-center">Specialized knowledge in Coding, Maths, Languages, and more</p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
