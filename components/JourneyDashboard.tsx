"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import CompanionsList from "@/components/CompanionsList";
import { Bookmark, Clock, Bot } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<"bookmarks" | "recent" | "companions">("bookmarks");

  const tabs = [
    {
      id: "bookmarks" as const,
      label: "Bookmarked Tutors",
      icon: Bookmark,
      count: bookmarkedCompanions.length,
      color: "text-violet-500 bg-violet-500/10",
      activeBg: "bg-violet-600 text-white shadow-violet-500/15"
    },
    {
      id: "recent" as const,
      label: "Recent Lessons",
      icon: Clock,
      count: sessionHistory.length,
      color: "text-emerald-500 bg-emerald-500/10",
      activeBg: "bg-emerald-600 text-white shadow-emerald-500/15"
    },
    {
      id: "companions" as const,
      label: "My Companions",
      icon: Bot,
      count: companions.length,
      color: "text-amber-500 bg-amber-500/10",
      activeBg: "bg-amber-600 text-white shadow-amber-500/15"
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
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
                "flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all border border-transparent cursor-pointer shrink-0 hover:bg-muted/40",
                isActive 
                  ? tab.activeBg + " border-white/5"
                  : "text-muted-foreground bg-card/40 border-border/80"
              )}
            >
              <div className={cn("size-6 rounded-lg flex items-center justify-center border border-border/10", isActive ? "bg-white/20 text-white" : tab.color)}>
                <Icon className="size-3.5" />
              </div>
              <span>{tab.label}</span>
              <span className={cn(
                "text-[10px] font-extrabold px-1.5 py-0.5 rounded-full border border-border/20",
                isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
              )}>
                {tab.count}
              </span>
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
      </div>
    </div>
  );
};

export default JourneyDashboard;
