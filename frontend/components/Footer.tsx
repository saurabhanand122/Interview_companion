import Link from "next/link";
import { Github, Linkedin, Mail, ShieldAlert } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border/80 bg-card/45 backdrop-blur-xl mt-12 py-10 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative Aura Glow */}
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 size-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
        
        {/* Left Side: Brand and Description */}
        <div className="flex flex-col gap-3.5 max-w-sm">
          <div className="flex items-center gap-2.5">
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-300">
              AI Interview Companion
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Elevate your interview preparation with natural, low-latency, voice-to-voice AI companions. Customised mock interviews, real-time feedback, and comprehensive analytics.
          </p>
        </div>

        {/* Center-Left: Quick Links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest">Navigation</h4>
          <div className="flex flex-col gap-1.5 text-xs font-bold text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/companions" className="hover:text-primary transition-colors">Features</Link>
            <Link href="/my-journey" className="hover:text-primary transition-colors">Dashboard</Link>
          </div>
        </div>

        {/* Center: Developer Profiles */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest">Designed & Developed</h4>
          <p className="text-xs font-bold text-foreground">Saurabh Anand</p>
          <div className="flex gap-4 items-center">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-lg bg-muted/40 hover:bg-muted border border-border"
              aria-label="GitHub Profile"
            >
              <Github className="size-4" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-lg bg-muted/40 hover:bg-muted border border-border"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="size-4" />
            </a>
            <a 
              href="mailto:saurabh.anand@example.com" 
              className="text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-lg bg-muted/40 hover:bg-muted border border-border"
              aria-label="Email Contact"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>

        {/* Right Side: Contact Details & Platform Status */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest">Support & Contact</h4>
          <p className="text-xs font-semibold text-foreground/80">Email: info@aiinterviewcompanion.com</p>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase rounded-full w-fit mt-1">
            <div className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Systems fully operational</span>
          </div>
        </div>

      </div>

      {/* Copyright Line */}
      <div className="max-w-6xl mx-auto border-t border-border/40 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-semibold text-muted-foreground relative z-10">
        <p>© {new Date().getFullYear()} AI Interview Companion. All rights reserved.</p>
        <p>Created by Saurabh Anand</p>
      </div>
    </footer>
  );
};

export default Footer;
