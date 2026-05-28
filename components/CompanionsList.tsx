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
                            {companions.map(({id, subject, name, topic, duration}) => {
                                const subjColor = getSubjectColor(subject) || "#7c3aed";
                                const badgeBg = `${subjColor}15`;
                                const badgeBorder = `${subjColor}35`;

                                return (
                                    <TableRow 
                                        key={id} 
                                        className="group hover:bg-muted/30 transition-colors border-b border-border/40 last:border-0"
                                    >
                                        <TableCell className="py-4 pl-4">
                                            <Link href={`/companions/${id}`}>
                                                <div className="flex items-center gap-3">
                                                    <div 
                                                        className="size-12 flex items-center justify-center rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-105 border" 
                                                        style={{ backgroundColor: badgeBg, borderColor: badgeBorder }}
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
                                                className="subject-badge text-[10px] font-bold border"
                                                style={{ backgroundColor: badgeBg, borderColor: badgeBorder, color: subjColor }}
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