import {getCompanion} from "@/lib/actions/companion.actions";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getSubjectColor} from "@/lib/utils";
import Image from "next/image";
import CompanionComponent from "@/components/CompanionComponent";

interface CompanionSessionPageProps {
    params: Promise<{ id: string}>;
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
    const { id } = await params;
    const companion = await getCompanion(id);
    const user = await currentUser();

    const { name, subject, title, topic, duration } = companion;

    if(!user) redirect('/sign-in');
    if(!name) redirect('/companions')

    return (
        <main>
            <article className="flex border border-border/80 bg-card/60 backdrop-blur-md rounded-2xl justify-between p-6 max-md:flex-col items-center max-md:items-start gap-4 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="size-16 flex items-center justify-center rounded-xl shrink-0 max-md:hidden border" style={{ backgroundColor: `${getSubjectColor(subject)}20`, borderColor: `${getSubjectColor(subject)}35` }}>
                        <Image src={`/icons/${subject}.svg`} alt={subject} width={32} height={32} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                            <p className="font-extrabold text-2xl tracking-tight text-foreground">
                                {name}
                            </p>
                            <div className="subject-badge text-[10px] font-bold border" style={{ backgroundColor: `${getSubjectColor(subject)}20`, borderColor: `${getSubjectColor(subject)}35`, color: getSubjectColor(subject) }}>
                                {subject}
                            </div>
                        </div>
                        <p className="text-base text-muted-foreground">{topic}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-foreground font-bold text-lg max-md:hidden bg-muted/50 border border-border rounded-xl px-4 py-2">
                    <span>{duration} minutes lesson</span>
                </div>
            </article>

            <CompanionComponent
                {...companion}
                companionId={id}
                userName={user.firstName!}
                userImage={user.imageUrl!}
            />
        </main>
    )
}

export default CompanionSession
