'use client';

import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItems from "@/components/NavItems";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar">
            <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity">
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={42}
                        height={40}
                    />
                    <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-300">
                        AskMate.AI
                    </span>
                </div>
            </Link>
            <div className="flex items-center gap-6">
                <NavItems />
                
                <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-xl bg-muted border border-border hover:bg-border transition-all duration-300 flex items-center justify-center cursor-pointer text-foreground"
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? (
                        <Sun className="size-5 text-yellow-400 transition-transform duration-500 hover:rotate-45" />
                    ) : (
                        <Moon className="size-5 text-slate-700 transition-transform duration-500 hover:-rotate-12" />
                    )}
                </button>

                <SignedOut>
                    <SignInButton>
                        <button className="btn-signin">Sign In</button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton appearance={{
                        elements: {
                            avatarBox: "size-9 border border-border"
                        }
                    }} />
                </SignedIn>
            </div>
        </nav>
    )
}

export default Navbar;
