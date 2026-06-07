import Link from "next/link";
import { Github, Linkedin, Mail, ShieldCheck, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-card/45 backdrop-blur-xl mt-16 py-12 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative Gradient Glow */}
      <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 size-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 relative z-10">
        
        {/* Column 1: Brand & Bio */}
        <div className="lg:col-span-2 flex flex-col gap-4 max-w-sm">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-300 bg-clip-text text-transparent">
              AI Interview Companion
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Master your technical mock interviews with conversational AI Avatars. Get real-time analysis on logic correctness, pacing rate, and star structure, simulated in a low-latency voice environment.
          </p>
          <div className="flex gap-3 mt-1.5">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-xl bg-card border border-border hover:bg-muted"
              aria-label="GitHub Profile"
            >
              <Github className="size-4" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-xl bg-card border border-border hover:bg-muted"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="size-4" />
            </a>
            <a 
              href="mailto:info@aiinterviewcompanion.com" 
              className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-xl bg-card border border-border hover:bg-muted"
              aria-label="Email Contact"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-extrabold text-foreground tracking-wider uppercase">Product</h4>
          <div className="flex flex-col gap-2.5 text-xs font-bold text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/companions" className="hover:text-primary transition-colors">AI Library</Link>
            <Link href="/companions/new" className="hover:text-primary transition-colors">Custom Builder</Link>
            <Link href="/my-journey" className="hover:text-primary transition-colors">Dashboard</Link>
          </div>
        </div>

        {/* Column 3: Platform Links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-extrabold text-foreground tracking-wider uppercase">Platform</h4>
          <div className="flex flex-col gap-2.5 text-xs font-bold text-muted-foreground">
            <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
            <Link href="/journey" className="hover:text-primary transition-colors">Our Journey</Link>
            <Link href="/experience" className="hover:text-primary transition-colors">Experience</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
          </div>
        </div>

        {/* Column 4: Status & Developer */}
        <div className="flex flex-col gap-4.5">
          <h4 className="text-xs font-extrabold text-foreground tracking-wider uppercase">Status & Details</h4>
          <div className="flex flex-col gap-2 text-xs font-medium text-muted-foreground">
            <p className="font-bold text-foreground">Developed by Saurabh Anand</p>
            <p className="text-[10px] leading-relaxed">Built with Next.js 15, React 19, Tailwind CSS v4, Vapi AI, Clerk and Supabase.</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 dark:text-emerald-400 text-[10px] font-bold uppercase rounded-full w-fit">
            <ShieldCheck className="size-3.5" />
            <span>Systems Online</span>
          </div>
        </div>

      </div>

      {/* Copyright Line */}
      <div className="max-w-7xl mx-auto border-t border-border mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-muted-foreground relative z-10">
        <p>© {new Date().getFullYear()} AI Interview Companion. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="size-3.5 text-red-500 fill-red-500" /> by Saurabh Anand
        </p>
      </div>
    </footer>
  );
};

export default Footer;
