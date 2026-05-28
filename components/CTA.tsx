import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

const Cta = () => {
    return (
        <section className="cta-section">
            <div className="cta-badge">Start learning your way.</div>
            <h2 className="text-2xl font-extrabold tracking-tight">
                Build & Personalize Your Companion
            </h2>
            <p className="text-sm opacity-90 leading-relaxed">
                Pick a name, subject, voice, & style—and start learning through real-time voice sessions that feel natural and engaging.
            </p>
            <div className="relative w-full max-w-[280px] h-[160px] my-2 shrink-0">
                <Image 
                    src="/images/cta.svg" 
                    alt="cta banner" 
                    fill 
                    className="object-contain"
                />
            </div>
            
            <Link href="/companions/new" className="w-full">
                <button className="btn-primary w-full gap-2">
                    <Plus className="size-4" />
                    <span>Build Companion</span>
                </button>
            </Link>
        </section>
    )
}
export default Cta;
