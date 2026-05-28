import CompanionForm from "@/components/CompanionForm";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {newCompanionPermissions} from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";

const NewCompanion = async () => {
    const { userId } = await auth();
    if(!userId) redirect('/sign-in');

    const canCreateCompanion = await newCompanionPermissions();

    return (
        <main className="flex items-center justify-center py-6 min-h-[80vh] w-full">
            {canCreateCompanion ? (
                <article className="w-full max-w-lg border border-border/80 bg-card/60 backdrop-blur-md p-8 rounded-2xl shadow-md gap-6 flex flex-col">
                    <div className="flex flex-col gap-1 border-b border-border/40 pb-4">
                        <h1 className="text-3xl font-extrabold tracking-tight">Companion Builder</h1>
                        <p className="text-sm text-muted-foreground">Design your personalized vocal AI tutor</p>
                    </div>

                    <CompanionForm />
                </article>
                ) : (
                    <article className="companion-limit">
                        <Image src="/images/limit.svg" alt="Companion limit reached" width={360} height={230} />
                        <div className="cta-badge">
                            Upgrade your plan
                        </div>
                        <h1>You’ve Reached Your Limit</h1>
                        <p>You’ve reached your companion limit. Upgrade to create more companions and premium features.</p>
                        <Link href="/subscription" className="btn-primary w-full justify-center" >
                            Upgrade My Plan
                        </Link>
                    </article>
                )}
        </main>
    )
}

export default NewCompanion
