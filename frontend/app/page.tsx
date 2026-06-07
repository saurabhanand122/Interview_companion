import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import DeveloperProfile from "@/components/DeveloperProfile";
import SuccessStories from "@/components/SuccessStories";
import Testimonials from "@/components/Testimonials";
import { getAllCompanions, getRecentSessions, getBookmarkedCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
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
        <main className="flex flex-col gap-16 pb-20 relative overflow-hidden bg-slate-950/5">
            {/* Ambient Background Aura Glows */}
            <div className="absolute top-[10%] left-[5%] size-96 rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[5%] size-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

            {/* 1. Hero Section */}
            <Hero />

            {/* 2. Statistics Section */}
            <StatsSection />

            {/* 3. Features Section */}
            <FeaturesGrid />

            {/* 4. Popular Interviewers Grid */}
            <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-1.5 border-b border-border/40 pb-4 text-center md:text-left">
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Popular AI Interviewers</h2>
                    <p className="text-muted-foreground text-sm font-medium">Select an interviewer avatar to begin your live vocal practice session</p>
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
            </div>

            {/* 5. Developer Section */}
            <DeveloperProfile />

            {/* 6. Success Stories Section */}
            <SuccessStories />

            {/* 7. Testimonials Section */}
            <Testimonials />

            {/* 8. Recent Activity & CTA */}
            <section className="home-section max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                <CompanionsList
                    title="Recent session activity logs"
                    companions={recentSessionsCompanions}
                    classNames="w-full border border-border bg-card/40 backdrop-blur-md"
                />
                <CTA />
            </section>
        </main>
    );
}