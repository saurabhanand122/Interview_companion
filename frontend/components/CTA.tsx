import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

const Cta = () => {
    return (
        <section className="cta-section relative overflow-hidden">
            <div className="cta-badge z-10">Ace Interviews Your Way</div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white z-10">
                Build & Customize Your AI Interviewer
            </h2>
            <p className="text-sm opacity-90 leading-relaxed text-white/90 z-10">
                Select a name, voice, style, and interview topic—and launch a low-latency vocal practice session immediately.
            </p>
            <div className="relative w-full max-w-[280px] h-[160px] my-2 shrink-0 z-10">
                <Image 
                    src="/images/cta.svg" 
                    alt="cta banner" 
                    fill 
                    className="object-contain filter brightness-110 drop-shadow-lg"
                />
            </div>
            
            <Link href="/companions/new" className="w-full z-10">
                <button className="btn-primary w-full gap-2 hover:scale-[1.02] transition-transform glow-btn">
                    <Plus className="size-4" />
                    <span>Create Custom Interviewer</span>
                </button>
            </Link>
        </section>
    );
};
export default Cta;
