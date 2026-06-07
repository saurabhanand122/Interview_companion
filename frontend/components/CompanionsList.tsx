import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {cn, getSubjectColor} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";

interface CompanionsListProps {
    title: string;
    companions?: Companion[];
    classNames?: string;
    emptyText?: string;
    emptyLink?: string;
    emptyLinkText?: string;
}

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

const CompanionsList = ({ 
    title, 
    companions, 
    classNames,
    emptyText,
    emptyLink,
    emptyLinkText
}: CompanionsListProps) => {
    return (
        <article className={cn('companion-list border border-border/80 backdrop-blur-md bg-card/60', classNames)}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-extrabold text-2xl tracking-tight text-foreground">{title}</h2>
                <span className="text-xs font-semibold px-2.5 py-1 bg-muted text-muted-foreground border border-border rounded-full">
                    {companions?.length || 0} Total
                </span>
            </div>

            {companions && companions.length > 0 ? (
                <div className="overflow-hidden rounded-xl border border-border/40">
                    <Table>
                        <TableHeader className="bg-muted/40">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5 pl-4">Lesson & Topic</TableHead>
                                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5 hidden md:table-cell">Subject</TableHead>
                                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5 text-right pr-4">Duration</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {companions.map(({id, subject, name, topic, duration}, idx) => {
                                const styles = getSubjectStyles(subject);

                                return (
                                    <TableRow 
                                        key={`${id}-${idx}`} 
                                        className="group hover:bg-muted/30 transition-colors border-b border-border/40 last:border-0"
                                    >
                                        <TableCell className="py-4 pl-4">
                                            <Link href={`/companions/${id}`}>
                                                <div className="flex items-center gap-3">
                                                    <div 
                                                        className={cn(
                                                            "size-12 flex items-center justify-center rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-105 border",
                                                            styles.badge
                                                        )}
                                                    >
                                                        <Image
                                                            src={`/icons/${subject}.svg`}
                                                            alt={subject}
                                                            width={24}
                                                            height={24} 
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-0.5">
                                                        <p className="font-bold text-base text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                                                            {name}
                                                            <ArrowRight className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                                                        </p>
                                                        <p className="text-sm text-muted-foreground break-words line-clamp-1 max-w-[280px] sm:max-w-[400px]">
                                                            {topic}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="py-4 hidden md:table-cell">
                                            <div 
                                                className={cn("text-[10px] font-bold border py-1 px-2.5 rounded-full inline-flex items-center uppercase tracking-wider", styles.badge)}
                                            >
                                                {subject}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 text-right pr-4">
                                            <div className="flex items-center gap-1.5 justify-end text-foreground font-semibold">
                                                <span className="text-base">{duration}</span>
                                                <span className="text-xs text-muted-foreground font-medium">mins</span>
                                                <Clock className="size-3.5 text-muted-foreground ml-1" />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border/85 rounded-xl">
                    <p className="text-muted-foreground text-sm font-medium">{emptyText || "No sessions found"}</p>
                    <Link href={emptyLink || "/companions"} className="text-xs text-primary font-semibold hover:underline mt-1.5">
                        {emptyLinkText || "Browse library"}
                    </Link>
                </div>
            )}
        </article>
    )
}

export default CompanionsList;