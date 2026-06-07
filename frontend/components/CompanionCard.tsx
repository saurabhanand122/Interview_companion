"use client";

import { removeBookmark, addBookmark } from "@/lib/actions/companion.actions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Clock, 
  Bookmark, 
  ArrowRight,
  Code2,
  Calculator,
  FlaskConical,
  Globe,
  TrendingUp,
  Map,
  History,
  Briefcase,
  DollarSign,
  GraduationCap
} from "lucide-react";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  bookmarked: boolean;
}

const getSubjectIcon = (subject: string) => {
  switch (subject?.toLowerCase()) {
    case 'maths':
      return Calculator;
    case 'coding':
      return Code2;
    case 'science':
      return FlaskConical;
    case 'language':
      return Globe;
    case 'economics':
      return TrendingUp;
    case 'geography':
      return Map;
    case 'history':
      return History;
    case 'business':
      return Briefcase;
    case 'finance':
      return DollarSign;
    default:
      return GraduationCap;
  }
};

const getDifficulty = (name: string, topic: string) => {
  const text = `${name} ${topic}`.toLowerCase();
  if (text.includes('architect') || text.includes('expert') || text.includes('advanced') || text.includes('senior') || text.includes('10th') || text.includes('9th')) {
    return { level: 'Advanced', color: 'text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/30 dark:border-rose-900/50' };
  }
  if (text.includes('intermediate') || text.includes('mid') || text.includes('puzzle') || text.includes('logic') || text.includes('java')) {
    return { level: 'Intermediate', color: 'text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/30 dark:border-amber-900/50' };
  }
  return { level: 'Beginner', color: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-900/50' };
};

const subjectStyles: Record<string, { badge: string; text: string; border: string }> = {
  science: {
    badge: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800/50",
    text: "text-purple-600 dark:text-purple-400",
    border: "bg-purple-600 dark:bg-purple-400"
  },
  maths: {
    badge: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800/50",
    text: "text-amber-600 dark:text-amber-400",
    border: "bg-amber-600 dark:bg-amber-400"
  },
  language: {
    badge: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/30 dark:text-sky-300 dark:border-sky-800/50",
    text: "text-sky-600 dark:text-sky-400",
    border: "bg-sky-600 dark:bg-sky-400"
  },
  coding: {
    badge: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/30 dark:text-pink-300 dark:border-pink-800/50",
    text: "text-pink-600 dark:text-pink-400",
    border: "bg-pink-600 dark:bg-pink-400"
  },
  history: {
    badge: "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800/50",
    text: "text-orange-600 dark:text-orange-400",
    border: "bg-orange-600 dark:bg-orange-400"
  },
  economics: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800/50",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "bg-emerald-600 dark:bg-emerald-400"
  },
};

const defaultSubjectStyle = {
  badge: "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950/30 dark:text-slate-300 dark:border-slate-800/50",
  text: "text-slate-600 dark:text-slate-400",
  border: "bg-slate-600 dark:bg-slate-400"
};

const getSubjectStyles = (subject: string) => {
  const key = subject?.toLowerCase();
  if (key in subjectStyles) {
    return subjectStyles[key];
  }
  if (key === 'geography') {
    return {
      badge: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/30 dark:text-cyan-300 dark:border-cyan-800/50",
      text: "text-cyan-600 dark:text-cyan-400",
      border: "bg-cyan-600 dark:bg-cyan-400"
    };
  }
  if (key === 'business' || key === 'finance') {
    return {
      badge: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-800/50",
      text: "text-indigo-600 dark:text-indigo-400",
      border: "bg-indigo-600 dark:bg-indigo-400"
    };
  }
  return defaultSubjectStyle;
};

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  bookmarked,
}: CompanionCardProps) => {
  const pathname = usePathname();
  
  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (bookmarked) {
      await removeBookmark(id, pathname);
    } else {
      await addBookmark(id, pathname);
    }
  };

  const styles = getSubjectStyles(subject);
  const IconComponent = getSubjectIcon(subject);
  const diff = getDifficulty(name, topic);
  const textColor = color || "var(--primary)";

  return (
    <article className="companion-card group rounded-3xl border border-border/60 bg-gradient-to-b from-card/85 to-card/65 backdrop-blur-md shadow-xs p-6 flex flex-col justify-between gap-5 relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-border/95">
      {/* Subject Accent Top Border */}
      <div 
        className={`absolute top-0 left-0 right-0 h-[4px] transition-all duration-300 group-hover:h-[6px] ${styles.border}`}
      />
      
      {/* Top badges & actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 flex-wrap items-center">
          <div 
            className={`border text-[10px] font-bold py-1 px-2.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider ${styles.badge}`}
          >
            <IconComponent className={`size-3.5 ${styles.text}`} />
            <span>{subject}</span>
          </div>
          <span className={`text-[9px] font-bold py-1 px-2.5 rounded-full border uppercase tracking-wider ${diff.color}`}>
            {diff.level}
          </span>
        </div>
        
        <button 
          className="size-8 rounded-full border border-border/80 bg-background/50 hover:bg-background dark:bg-card/50 dark:hover:bg-card flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shrink-0 shadow-xs cursor-pointer" 
          onClick={handleBookmark}
          aria-label="Bookmark companion"
        >
          <Bookmark 
            className="size-3.5 transition-all" 
            style={{ 
              fill: bookmarked ? textColor : "transparent",
              color: bookmarked ? textColor : "var(--muted-foreground)" 
            }} 
          />
        </button>
      </div>

      {/* Main card info */}
      <div className="flex flex-col gap-2 flex-grow">
        <h2 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {name}
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 min-h-[36px] font-medium">
          {topic}
        </p>
      </div>

      {/* Bottom info & launch action */}
      <div className="flex flex-col gap-4 border-t border-border/40 pt-4">
        <div className="flex items-center gap-2 text-muted-foreground font-semibold">
          <Clock className="size-3.5 text-muted-foreground" />
          <span className="text-[11px]">{duration} minutes session</span>
        </div>

        <Link href={`/companions/${id}`} className="w-full">
          <button className="w-full text-center text-xs py-2.5 px-4 rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/95 hover:shadow-xs active:scale-[0.98] transition-all duration-200 border border-primary/20 group/btn">
            <span>Launch Lesson</span>
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </button>
        </Link>
      </div>
    </article>
  );
};

export default CompanionCard;
