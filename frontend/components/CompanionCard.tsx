"use client";
import { removeBookmark } from "@/lib/actions/companion.actions";
import { addBookmark } from "@/lib/actions/companion.actions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Bookmark, ArrowRight } from "lucide-react";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  bookmarked: boolean;
}

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

  // Safe color parsing: add transparency for badges
  const badgeBg = color ? `${color}20` : "rgba(124, 58, 237, 0.1)";
  const badgeBorder = color ? `${color}40` : "rgba(124, 58, 237, 0.2)";
  const textColor = color || "var(--primary)";

  return (
    <article className="companion-card group">
      {/* Visual top bar of subject color */}
      <div 
        className="absolute top-0 left-0 right-0 h-[4px] transition-all duration-300 group-hover:h-[6px]"
        style={{ backgroundColor: textColor }}
      />
      
      <div className="flex justify-between items-center mt-1">
        <div 
          className="subject-badge border text-xs" 
          style={{ backgroundColor: badgeBg, borderColor: badgeBorder, color: textColor }}
        >
          {subject}
        </div>
        <button 
          className="companion-bookmark hover:bg-muted" 
          onClick={handleBookmark}
          aria-label="Bookmark companion"
        >
          <Bookmark 
            className="size-4 transition-colors" 
            style={{ 
              fill: bookmarked ? textColor : "transparent",
              color: bookmarked ? textColor : "var(--muted-foreground)" 
            }} 
          />
        </button>
      </div>

      <div className="flex flex-col gap-1.5 flex-grow">
        <h2 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {name}
        </h2>
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
          {topic}
        </p>
      </div>

      <div className="flex items-center gap-2 text-muted-foreground border-t border-border/50 pt-3 mt-1">
        <Clock className="size-4" />
        <span className="text-xs font-semibold">{duration} minutes session</span>
      </div>

      <Link href={`/companions/${id}`} className="w-full mt-2">
        <button className="btn-primary w-full text-center text-sm py-2.5 flex items-center justify-center gap-1.5 group/btn cursor-pointer">
          <span>Launch Lesson</span>
          <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;
