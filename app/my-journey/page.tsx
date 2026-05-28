import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getUserCompanions,
  getUserSessions,
  getBookmarkedCompanions,
} from "@/lib/actions/companion.actions";
import Image from "next/image";
import JourneyDashboard from "@/components/JourneyDashboard";
import { Trophy, Award } from "lucide-react";

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);
  const bookmarkedCompanions = await getBookmarkedCompanions(user.id);

  return (
    <main className="min-lg:w-3/4 max-w-4xl mx-auto flex flex-col gap-8">
      {/* Premium Passport Layout Header */}
      <section className="relative overflow-hidden flex justify-between gap-6 max-sm:flex-col items-center max-sm:items-start border border-border/80 bg-card/60 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-md w-full">
        {/* Glow decorations */}
        <div className="absolute top-[-50px] left-[-50px] size-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
        
        <div className="flex gap-5 items-center flex-wrap relative z-10">
          <div className="relative size-24 rounded-full overflow-hidden border-2 border-primary/50 shadow-md shrink-0">
            <Image
              src={user.imageUrl}
              alt={user.firstName!}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-extrabold text-2xl tracking-tight text-foreground bg-none -webkit-text-fill-color-initial">
                {user.firstName} {user.lastName}
              </h1>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                <Award className="size-3" />
                <span>Pro Student</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-semibold">
              {user.emailAddresses[0].emailAddress}
            </p>
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-500 mt-0.5">
              <Trophy className="size-3.5" />
              <span>⚡ 5 Day Streak</span>
            </div>
          </div>
        </div>
        
        {/* Statistics Cards */}
        <div className="flex gap-4 flex-wrap max-sm:w-full max-sm:justify-between relative z-10">
          <div className="border border-border/70 bg-card/70 backdrop-blur-md rounded-2xl p-4 gap-1 flex flex-col min-w-[130px] shadow-xs group hover:border-primary/20 transition-all duration-300">
            <div className="flex gap-2 items-center">
              <div className="size-8 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                <Image
                  src="/icons/check.svg"
                  alt="checkmark"
                  width={16}
                  height={16}
                />
              </div>
              <p className="text-2xl font-extrabold text-foreground">{sessionHistory.length}</p>
            </div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1.5">Lessons Done</div>
          </div>
          <div className="border border-border/70 bg-card/70 backdrop-blur-md rounded-2xl p-4 gap-1 flex flex-col min-w-[130px] shadow-xs group hover:border-primary/20 transition-all duration-300">
            <div className="flex gap-2 items-center">
              <div className="size-8 rounded-lg bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
                <Image src="/icons/cap.svg" alt="cap" width={16} height={16} />
              </div>
              <p className="text-2xl font-extrabold text-foreground">{companions.length}</p>
            </div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1.5">Companions</div>
          </div>
        </div>
      </section>

      {/* Tabs Dashboard */}
      <JourneyDashboard
        bookmarkedCompanions={bookmarkedCompanions}
        sessionHistory={sessionHistory}
        companions={companions}
      />
    </main>
  );
};

export default Profile;
