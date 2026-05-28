import { SignIn } from '@clerk/nextjs';
import { Sparkles, Mic, Brain, GraduationCap } from 'lucide-react';

export default function Page() {
    return (
        <div className="min-h-[calc(100vh-100px)] flex flex-col md:flex-row w-full max-w-6xl mx-auto items-stretch p-4 md:p-6 gap-8 mt-4">
            {/* Left Showcase Pane */}
            <div className="flex-1 rounded-3xl bg-linear-to-br from-violet-600 to-indigo-900 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-xl border border-white/10 max-md:hidden">
                {/* Grid background layer */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-80" />
                
                {/* Glow Effects */}
                <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-violet-400/20 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-pink-500/10 blur-[120px] pointer-events-none" />
                
                {/* Top Branding / Tagline */}
                <div className="flex flex-col gap-3 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-semibold w-fit">
                        <Sparkles className="size-3.5 text-yellow-300" />
                        <span>Next-Gen Live Voice AI Tutoring</span>
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tight leading-tight mt-2 font-sans">
                        Learn Smarter, Speak Natural, Grow Faster.
                    </h2>
                    <p className="text-white/80 text-sm max-w-md leading-relaxed mt-1.5 font-medium">
                        Sign in to connect instantly with your customizable vocal companions. Ask questions, receive voice explanations, and master your subjects.
                    </p>
                </div>

                {/* Mid Showcase Tutors */}
                <div className="grid grid-cols-2 gap-4 my-8 relative z-10">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
                        <div className="size-8 rounded-lg bg-yellow-400/20 flex items-center justify-center border border-yellow-400/30 mb-2">
                            <Brain className="size-4 text-yellow-300" />
                        </div>
                        <h4 className="font-bold text-sm">Countsy</h4>
                        <p className="text-xs text-white/70 mt-0.5">Mathematics Wizard</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
                        <div className="size-8 rounded-lg bg-pink-500/20 flex items-center justify-center border border-pink-500/30 mb-2">
                            <GraduationCap className="size-4 text-pink-300" />
                        </div>
                        <h4 className="font-bold text-sm">Codey</h4>
                        <p className="text-xs text-white/70 mt-0.5">Coding Logic Coach</p>
                    </div>
                </div>

                {/* Bottom Testimonial/Metrics */}
                <div className="border-t border-white/10 pt-6 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                            <Mic className="size-5 text-yellow-300" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-white/70 tracking-wider">LOW LATENCY CONVERSATIONS</p>
                            <p className="text-sm font-bold mt-0.5">Ultra low latency voice agents powered by Deepgram & Vapi.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Auth Pane */}
            <div className="flex-1 flex items-center justify-center bg-card/60 backdrop-blur-md border border-border/80 rounded-3xl p-6 md:p-8 shadow-xl">
                <SignIn appearance={{
                    elements: {
                        card: "shadow-none border-0 bg-transparent dark:bg-transparent",
                        headerTitle: "text-foreground font-extrabold text-2xl tracking-tight dark:text-white",
                        headerSubtitle: "text-muted-foreground font-medium text-sm",
                        socialButtonsBlockButton: "border border-border hover:bg-muted dark:text-white transition-all rounded-xl",
                        formButtonPrimary: "btn-primary hover:bg-primary-hover transition-all text-sm rounded-xl py-2.5",
                        formFieldInput: "input h-10 border-border bg-card hover:border-muted-foreground/30 transition-all rounded-xl",
                        footerActionText: "text-muted-foreground",
                        footerActionLink: "text-primary hover:underline font-bold"
                    }
                }} />
            </div>
        </div>
    );
}