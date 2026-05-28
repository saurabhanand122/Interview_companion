import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import { getAllCompanions, getRecentSessions, getBookmarkedCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

const Page = async () => {
    const user = await currentUser();
    const companions = await getAllCompanions({ limit: 3 });
    const recentSessionsCompanions = await getRecentSessions(10);

    // Get user's bookmarked companion IDs if logged in
    let bookmarkedIds = new Set<string>();
    if (user) {
        try {
            const bookmarks = await getBookmarkedCompanions(user.id);
            bookmarkedIds = new Set(bookmarks.map((c: any) => c?.id).filter(Boolean));
        } catch (err) {
            console.error("Failed to load user bookmarks on home page", err);
        }
    }

  return (
    <main className="flex flex-col gap-10">
      <Hero />

      <div className="flex flex-col gap-1.5 mt-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Popular Companions</h2>
        <p className="text-muted-foreground text-sm font-medium">Select a companion to begin a live vocal tutoring session</p>
      </div>

      <section className="companions-grid">
          {companions.map((companion) => (
              <CompanionCard
                  key={companion.id}
                  {...companion}
                  bookmarked={bookmarkedIds.has(companion.id)}
                  color={getSubjectColor(companion.subject)}
              />
          ))}
      </section>

      <section className="home-section gap-6">
          <CompanionsList
              title="Recently completed sessions"
              companions={recentSessionsCompanions}
              classNames="w-2/3 max-lg:w-full shrink-0"
          />
          <CTA />
      </section>
    </main>
  )
}

export default Page;