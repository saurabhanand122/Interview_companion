'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, Sparkles, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      toast.success('Your message has been sent successfully!', {
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <main className="flex flex-col gap-12 pb-20 relative overflow-hidden">
      {/* Background Aura Glows */}
      <div className="absolute top-[10%] left-[5%] size-96 rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] size-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <section className="text-center flex flex-col items-center gap-4 max-w-3xl mx-auto px-4 mt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-xs font-semibold text-primary backdrop-blur-md">
          <Sparkles className="size-3.5 text-violet-400" />
          <span>Support Center</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground bg-none">
          Get in Touch
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Have questions about our AI companions or subscription models? Drop us a line.
        </p>
      </section>

      {/* Contact Layout */}
      <section className="max-w-5xl mx-auto w-full px-4 grid grid-cols-1 md:grid-cols-5 gap-8 items-stretch">
        {/* Left Side: Contact Information Cards */}
        <div className="md:col-span-2 flex flex-col gap-4.5 justify-between">
          <div className="flex flex-col gap-4">
            <div className="p-5 rounded-2xl border border-border bg-card/60 backdrop-blur-md shadow-sm flex items-start gap-4">
              <div className="size-9 rounded-xl bg-violet-500/10 border border-violet-500/20 text-primary flex items-center justify-center shrink-0">
                <Mail className="size-4.5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Email Us</span>
                <span className="text-xs font-bold text-foreground mt-0.5">support@aiinterviewcompanion.com</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-card/60 backdrop-blur-md shadow-sm flex items-start gap-4">
              <div className="size-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                <Phone className="size-4.5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Call Support</span>
                <span className="text-xs font-bold text-foreground mt-0.5">+1 (800) 555-MOCK</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-card/60 backdrop-blur-md shadow-sm flex items-start gap-4">
              <div className="size-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                <MapPin className="size-4.5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Office</span>
                <span className="text-xs font-bold text-foreground mt-0.5">Silicon Valley, California</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-slate-900/10 dark:bg-slate-900/40 backdrop-blur-md shadow-inner flex flex-col gap-3">
            <h4 className="font-extrabold text-xs text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="size-4 text-violet-400" />
              <span>AskMate AI Helpdesk</span>
            </h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-semibold">
              Our support team reviews diagnostic logs, billing tickets, and custom avatar feature requests daily. Expect detailed technical feedback.
            </p>
          </div>
        </div>

        {/* Right Side: Contact Form Card */}
        <div className="md:col-span-3">
          <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card/60 backdrop-blur-md shadow-md flex flex-col gap-6 h-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-muted-foreground">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-card border border-border hover:border-border/80 focus:border-violet-500 focus:outline-none rounded-xl py-2 px-3 text-xs font-medium text-foreground transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-muted-foreground">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-card border border-border hover:border-border/80 focus:border-violet-500 focus:outline-none rounded-xl py-2 px-3 text-xs font-medium text-foreground transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-xs font-semibold text-muted-foreground">Subject</label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Billing, Feature Request, Feedback..."
                  className="w-full bg-card border border-border hover:border-border/80 focus:border-violet-500 focus:outline-none rounded-xl py-2 px-3 text-xs font-medium text-foreground transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-semibold text-muted-foreground">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you need help with..."
                  className="w-full bg-card border border-border hover:border-border/80 focus:border-violet-500 focus:outline-none rounded-xl py-2.5 px-3 text-xs font-medium text-foreground transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-violet-500/10 cursor-pointer disabled:opacity-75 disabled:pointer-events-none mt-2"
              >
                {loading ? (
                  <div className="size-4 border-2 border-t-white border-white/20 rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="size-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
