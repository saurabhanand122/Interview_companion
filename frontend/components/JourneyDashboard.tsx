"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import CompanionsList from "@/components/CompanionsList";
import { Bookmark, Clock, Bot, BarChart3, User, Sparkles, Trophy, CheckCircle, Brain, Calendar, ArrowUpRight, Flame, Mic } from "lucide-react";

interface JourneyDashboardProps {
  bookmarkedCompanions: any[];
  sessionHistory: any[];
  companions: any[];
}

const JourneyDashboard = ({
  bookmarkedCompanions,
  sessionHistory,
  companions,
}: JourneyDashboardProps) => {
  const [activeTab, setActiveTab] = useState<"bookmarks" | "recent" | "companions" | "analytics" | "developer">("bookmarks");

  const tabs = [
    {
      id: "bookmarks" as const,
      label: "Bookmarked Tutors",
      icon: Bookmark,
      count: bookmarkedCompanions.length,
      color: "text-violet-400 bg-violet-500/10",
      activeBg: "bg-violet-600 text-white shadow-violet-500/15"
    },
    {
      id: "recent" as const,
      label: "Recent Lessons",
      icon: Clock,
      count: sessionHistory.length,
      color: "text-emerald-400 bg-emerald-500/10",
      activeBg: "bg-emerald-600 text-white shadow-emerald-500/15"
    },
    {
      id: "companions" as const,
      label: "My Companions",
      icon: Bot,
      count: companions.length,
      color: "text-amber-400 bg-amber-500/10",
      activeBg: "bg-amber-600 text-white shadow-amber-500/15"
    },
    {
      id: "analytics" as const,
      label: "Performance Analytics",
      icon: BarChart3,
      count: null,
      color: "text-pink-400 bg-pink-500/10",
      activeBg: "bg-pink-600 text-white shadow-pink-500/15"
    },
    {
      id: "developer" as const,
      label: "About Developer",
      icon: User,
      count: null,
      color: "text-blue-400 bg-blue-500/10",
      activeBg: "bg-blue-600 text-white shadow-blue-500/15"
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full px-4 sm:px-0">
      {/* Dynamic Tab Switchers */}
      <div className="flex gap-3 border-b border-border/40 pb-2 overflow-x-auto no-scrollbar w-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-bold tracking-wide transition-all border border-transparent cursor-pointer shrink-0 hover:bg-slate-900/40",
                isActive 
                  ? tab.activeBg + " border-white/5"
                  : "text-muted-foreground bg-slate-900/20 border-border/80"
              )}
            >
              <div className={cn("size-6 rounded-lg flex items-center justify-center border border-border/10", isActive ? "bg-white/20 text-white" : tab.color)}>
                <Icon className="size-3.5" />
              </div>
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={cn(
                  "text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-border/20",
                  isActive ? "bg-white/20 text-white" : "bg-slate-900 text-muted-foreground"
                )}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="mt-2 animate-in fade-in duration-300">
        {activeTab === "bookmarks" && (
          <CompanionsList
            companions={bookmarkedCompanions}
            title="Bookmarked Tutors"
            classNames="border border-border/80 shadow-sm"
            emptyText="You haven't bookmarked any tutors yet."
            emptyLink="/companions"
            emptyLinkText="Browse tutors to bookmark"
          />
        )}
        {activeTab === "recent" && (
          <CompanionsList
            companions={sessionHistory}
            title="Recent Sessions"
            classNames="border border-border/80 shadow-sm"
            emptyText="No recent tutoring sessions found."
            emptyLink="/companions"
            emptyLinkText="Start your first lesson"
          />
        )}
        {activeTab === "companions" && (
          <CompanionsList
            companions={companions}
            title="My Created Tutors"
            classNames="border border-border/80 shadow-sm"
            emptyText="You haven't created any custom tutors yet."
            emptyLink="/companions/new"
            emptyLinkText="Build your first custom tutor"
          />
        )}
        
        {/* Performance & AI Suggestions Tab */}
        {activeTab === "analytics" && (
          <section className="flex flex-col gap-6">
            
            {/* Metric Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Metric Card 1: Score breakdown */}
              <div className="border border-border bg-card/45 backdrop-blur-md rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-border/40 pb-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="size-4.5 text-amber-400 animate-pulse" />
                    <h3 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest">Mock Accuracy</h3>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-0.5">
                    <ArrowUpRight className="size-3" />
                    +4.2%
                  </span>
                </div>
                <div className="flex justify-between items-baseline mt-1">
                  <span className="text-4xl font-extrabold text-foreground">84.5%</span>
                  <span className="text-xs text-muted-foreground font-semibold">Goal: 90%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-1">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '84.5%' }} />
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed font-semibold">
                  Evaluated on grammar structure, technical correctness, STAR format adherence, and pacing rate.
                </p>
              </div>

              {/* Metric Card 2: Practice duration */}
              <div className="border border-border bg-card/45 backdrop-blur-md rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-border/40 pb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="size-4.5 text-violet-500" />
                    <h3 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest">Practice Minutes</h3>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-500 border border-violet-500/20">
                    64% of Target
                  </span>
                </div>
                <div className="flex justify-between items-baseline mt-1">
                  <span className="text-4xl font-extrabold text-foreground">128m</span>
                  <span className="text-xs text-muted-foreground font-semibold">Goal: 200m</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-1">
                  <div className="bg-violet-500 h-2 rounded-full" style={{ width: '64%' }} />
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed font-semibold">
                  Total cumulative vocal speaking time with companions across all session topics.
                </p>
              </div>

              {/* Metric Card 3: Streak Tracker */}
              <div className="border border-border bg-card/45 backdrop-blur-md rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-border/40 pb-3">
                  <div className="flex items-center gap-2">
                    <Flame className="size-4.5 text-red-500" />
                    <h3 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest">Streak Consistency</h3>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                    Record: 12 days
                  </span>
                </div>
                <div className="flex justify-between items-baseline mt-1">
                  <span className="text-4xl font-extrabold text-foreground">5 Days</span>
                  <span className="text-xs text-muted-foreground font-semibold">Active</span>
                </div>
                {/* 7 day streak blocks */}
                <div className="grid grid-cols-7 gap-1.5 mt-1">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                    const isPracticed = idx < 5;
                    return (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        <div className={cn("w-full h-2 rounded-full", isPracticed ? "bg-red-500" : "bg-muted")} />
                        <span className="text-[8px] font-bold text-muted-foreground">{day}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed font-semibold">
                  Streaks remain active if at least one mock interviewer session is logged every 24 hours.
                </p>
              </div>

            </div>

            {/* Performance Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Chart 1: SVG Line Chart (Accuracy Trend) */}
              <div className="border border-border bg-card/45 backdrop-blur-md rounded-2xl p-6 shadow-sm flex flex-col gap-4 text-foreground">
                <div className="flex items-center justify-between border-b border-border/40 pb-3">
                  <h4 className="text-xs font-bold text-foreground tracking-wide">Mock Accuracy Progression</h4>
                  <span className="text-[9px] text-muted-foreground font-bold">Last 5 Sessions</span>
                </div>
                <div className="relative w-full h-48 flex items-center justify-center">
                  <svg className="w-full h-full text-foreground" viewBox="0 0 300 150">
                    {/* Grid Lines */}
                    <line x1="20" y1="20" x2="290" y2="20" stroke="currentColor" strokeOpacity="0.05" strokeDasharray="4 4" />
                    <line x1="20" y1="60" x2="290" y2="60" stroke="currentColor" strokeOpacity="0.05" strokeDasharray="4 4" />
                    <line x1="20" y1="100" x2="290" y2="100" stroke="currentColor" strokeOpacity="0.05" strokeDasharray="4 4" />
                    <line x1="20" y1="130" x2="290" y2="130" stroke="currentColor" strokeOpacity="0.1" />

                    {/* Area Gradient fill */}
                    <path d="M20 130 Q 80 110 80 110 T 140 80 T 200 65 T 260 40 L 260 130 Z" fill="url(#areaGrad)" opacity="0.15" />

                    {/* Line path */}
                    <path d="M20 130 Q 80 110 80 110 T 140 80 T 200 65 T 260 40" fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" />

                    {/* Coordinates Dots */}
                    <circle cx="20" cy="130" r="3.5" fill="#a78bfa" stroke="var(--card)" strokeWidth="1" />
                    <circle cx="80" cy="110" r="3.5" fill="#a78bfa" stroke="var(--card)" strokeWidth="1" />
                    <circle cx="140" cy="80" r="3.5" fill="#f472b6" stroke="var(--card)" strokeWidth="1" />
                    <circle cx="200" cy="65" r="3.5" fill="#f472b6" stroke="var(--card)" strokeWidth="1" />
                    <circle cx="260" cy="40" r="4.5" fill="#38bdf8" stroke="var(--card)" strokeWidth="1.5" className="animate-ping pointer-events-none" />
                    <circle cx="260" cy="40" r="3.5" fill="#38bdf8" stroke="var(--card)" strokeWidth="1" />

                    {/* Labels */}
                    <text x="18" y="145" fill="currentColor" opacity="0.5" fontSize="8" fontWeight="bold">S1 (62%)</text>
                    <text x="78" y="145" fill="currentColor" opacity="0.5" fontSize="8" fontWeight="bold">S2 (68%)</text>
                    <text x="138" y="145" fill="currentColor" opacity="0.5" fontSize="8" fontWeight="bold">S3 (76%)</text>
                    <text x="198" y="145" fill="currentColor" opacity="0.5" fontSize="8" fontWeight="bold">S4 (80%)</text>
                    <text x="258" y="145" fill="currentColor" opacity="0.75" fontSize="8" fontWeight="bold">S5 (84%)</text>

                    <defs>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="50%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#0ea5e9" />
                      </linearGradient>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="150" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Chart 2: SVG Bar Chart (Practice Minutes Breakdown) */}
              <div className="border border-border bg-card/45 backdrop-blur-md rounded-2xl p-6 shadow-sm flex flex-col gap-4 text-foreground">
                <div className="flex items-center justify-between border-b border-border/40 pb-3">
                  <h4 className="text-xs font-bold text-foreground tracking-wide">Weekly Practice Duration</h4>
                  <span className="text-[9px] text-muted-foreground font-bold">Minutes per Day</span>
                </div>
                <div className="relative w-full h-48 flex items-center justify-center">
                  <svg className="w-full h-full text-foreground" viewBox="0 0 300 150">
                    <line x1="20" y1="130" x2="290" y2="130" stroke="currentColor" strokeOpacity="0.1" />

                    {/* Bar pillars */}
                    {/* Mon: 20m */}
                    <rect x="35" y="90" width="16" height="40" rx="4" fill="url(#barGrad1)" />
                    <text x="35" y="82" fill="currentColor" opacity="0.75" fontSize="8" fontWeight="bold">20m</text>
                    <text x="38" y="142" fill="currentColor" opacity="0.5" fontSize="8" fontWeight="bold">Mon</text>

                    {/* Tue: 15m */}
                    <rect x="75" y="100" width="16" height="30" rx="4" fill="url(#barGrad1)" />
                    <text x="75" y="92" fill="currentColor" opacity="0.75" fontSize="8" fontWeight="bold">15m</text>
                    <text x="78" y="142" fill="currentColor" opacity="0.5" fontSize="8" fontWeight="bold">Tue</text>

                    {/* Wed: 30m */}
                    <rect x="115" y="70" width="16" height="60" rx="4" fill="url(#barGrad1)" />
                    <text x="115" y="62" fill="currentColor" opacity="0.75" fontSize="8" fontWeight="bold">30m</text>
                    <text x="118" y="142" fill="currentColor" opacity="0.5" fontSize="8" fontWeight="bold">Wed</text>

                    {/* Thu: 25m */}
                    <rect x="155" y="80" width="16" height="50" rx="4" fill="url(#barGrad1)" />
                    <text x="155" y="72" fill="currentColor" opacity="0.75" fontSize="8" fontWeight="bold">25m</text>
                    <text x="158" y="142" fill="currentColor" opacity="0.5" fontSize="8" fontWeight="bold">Thu</text>

                    {/* Fri: 38m */}
                    <rect x="195" y="54" width="16" height="76" rx="4" fill="url(#barGrad2)" />
                    <text x="195" y="46" fill="#10b981" fontSize="8" fontWeight="extrabold">38m</text>
                    <text x="198" y="142" fill="currentColor" opacity="0.75" fontSize="8" fontWeight="bold">Fri</text>

                    {/* Sat: 0m */}
                    <rect x="235" y="127" width="16" height="3" rx="1" fill="currentColor" fillOpacity="0.08" />
                    <text x="238" y="142" fill="currentColor" opacity="0.3" fontSize="8" fontWeight="bold">Sat</text>

                    {/* Sun: 0m */}
                    <rect x="275" y="127" width="16" height="3" rx="1" fill="currentColor" fillOpacity="0.08" />
                    <text x="278" y="142" fill="currentColor" opacity="0.3" fontSize="8" fontWeight="bold">Sun</text>

                    <defs>
                      <linearGradient id="barGrad1" x1="0" y1="0" x2="0" y2="130" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#4f46e5" />
                      </linearGradient>
                      <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="130" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

            </div>

            {/* Smart AI Suggestions */}
            <div className="border border-border bg-card/45 backdrop-blur-md rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-border/40 pb-3">
                <Sparkles className="size-4.5 text-primary animate-pulse" />
                <h3 className="text-xs font-extrabold text-foreground uppercase tracking-widest">Smart AI Recommendations</h3>
              </div>
              <div className="flex flex-col gap-3.5">
                <div className="flex gap-3.5 items-start p-4 rounded-xl bg-violet-500/5 border border-violet-500/10">
                  <Brain className="size-5 text-violet-500 dark:text-violet-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Focus on Coding Scenarios</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mt-1 font-semibold">
                      Your diagnostic history reports high soft-skills and behavioral scores (88%). We recommend focusing on Coding scenarios with Codey the Architect to bolster logic articulation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <Mic className="size-5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Pacing & Pause Control</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mt-1 font-semibold">
                      Your speech pacing is averaging 128 words per minute (excellent range). Focus on keeping pauses structured rather than using fillers during system design mock panels.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Developer / About Saurabh Anand Tab */}
        {activeTab === "developer" && (
          <section className="border border-border bg-card/45 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-[-50px] right-[-50px] size-40 rounded-full bg-violet-500/5 blur-2xl pointer-events-none" />
            
            {/* Left Column: Image/Avatar & Title */}
            <div className="flex flex-col items-center text-center gap-4 shrink-0">
              <div className="size-28 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white text-4xl font-extrabold shadow-md border border-white/10">
                SA
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-foreground">Saurabh Anand</h3>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1 block">Full-Stack Developer</p>
              </div>
            </div>

            {/* Right Column: Bio & Skills */}
            <div className="flex-1 flex flex-col gap-5">
              <div>
                <h4 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest border-b border-border/40 pb-2 mb-3">About Developer</h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                  Saurabh Anand is a software engineer focused on building responsive, high-performance web applications using modern Javascript frameworks and conversational AI. 
                  He created the **AI Interview Companion** using Next.js, Vapi voice streams, Supabase, and Clerk to enable voice-to-voice mock prep with automatic telemetry feedback.
                </p>
              </div>

              <div>
                <h4 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest border-b border-border/40 pb-2 mb-3">Core Stack & Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {["Next.js 15 App Router", "React 19", "Tailwind CSS v4", "Vapi AI Speech Integration", "Supabase DB & Postgres", "Clerk Authentication"].map((skill) => (
                    <span key={skill} className="px-2.5 py-1 bg-background border border-border text-[10px] font-bold rounded-lg text-muted-foreground">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest border-b border-border/40 pb-2 mb-3">Get in Touch</h4>
                <div className="flex gap-4 text-xs font-bold text-primary">
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
                  <a href="mailto:saurabh.anand@example.com" className="hover:underline">Contact Email</a>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default JourneyDashboard;
