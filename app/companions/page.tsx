import {getAllCompanions, getBookmarkedCompanions} from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import {getSubjectColor} from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import {currentUser} from "@clerk/nextjs/server";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
    const user = await currentUser();
    const filters = await searchParams;
    const subject = filters.subject ? (filters.subject as string) : '';
    const topic = filters.topic ? (filters.topic as string) : '';

    const companions = await getAllCompanions({ subject, topic });

    // Get user's bookmarked companion IDs if logged in
    let bookmarkedIds = new Set<string>();
    if (user) {
        try {
            const bookmarks = await getBookmarkedCompanions(user.id);
            bookmarkedIds = new Set(bookmarks.map((c: any) => c?.id).filter(Boolean));
        } catch (err) {
            console.error("Failed to load user bookmarks on library page", err);
        }
    }

    return (
        <main className="flex flex-col gap-8">
            <section className="flex justify-between gap-4 items-center max-sm:items-start max-sm:flex-col border-b border-border/40 pb-5">
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-3xl font-extrabold tracking-tight">Companion Library</h1>
                    <p className="text-muted-foreground text-sm font-medium">Search and filter companions by topic or subject</p>
                </div>
                <div className="flex gap-3 items-center w-full sm:w-auto">
                    <SearchInput />
                    <SubjectFilter />
                </div>
            </section>
            <section className="companions-grid">
                {companions.length > 0 ? (
                    companions.map((companion) => (
                        <CompanionCard
                            key={companion.id}
                            {...companion}
                            bookmarked={bookmarkedIds.has(companion.id)}
                            color={getSubjectColor(companion.subject)}
                        />
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center border border-dashed border-border/85 rounded-2xl bg-card/40 backdrop-blur-md">
                        <p className="text-lg font-bold text-foreground">No Companions Found</p>
                        <p className="text-sm text-muted-foreground mt-1">Try resetting your filters or search query to find more companions</p>
                    </div>
                )}
            </section>
        </main>
    )
}

export default CompanionsLibrary;
