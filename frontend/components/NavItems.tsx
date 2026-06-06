'use client';

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Interviewers', href: '/companions' },
    { label: 'My Journey', href: '/my-journey' },
]

const NavItems = () => {
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-6 max-sm:gap-3">
            {navItems.map(({ label, href }) => {
                const isActive = pathname === href;
                return (
                    <Link
                        href={href}
                        key={label}
                        className={cn(
                            'text-sm font-medium transition-colors py-1 relative hover:text-primary',
                            isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
                        )}
                    >
                        {label}
                        {isActive && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
                        )}
                    </Link>
                );
            })}
        </div>
    )
}

export default NavItems;
