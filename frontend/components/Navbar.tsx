'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useTheme } from '@/components/ThemeProvider';
import { Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Interviewers', href: '/companions' },
    { label: 'About', href: '/about' },
    { label: 'Journey', href: '/journey' },
    { label: 'Experience', href: '/experience' },
    { label: 'Contact Us', href: '/contact' },
];

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                
                {/* Logo and Branding */}
                <Link href="/">
                    <div className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity">
                        <Image
                            src="/images/logo.svg"
                            alt="logo"
                            width={32}
                            height={32}
                        />
                        <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-300 bg-clip-text text-transparent">
                            AI Interview Companion
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation Items */}
                <nav className="hidden lg:flex items-center gap-6">
                    {navItems.map(({ label, href }) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                href={href}
                                key={label}
                                className={cn(
                                    'text-xs font-bold transition-colors py-1 relative hover:text-primary tracking-wide uppercase',
                                    isActive ? 'text-primary font-extrabold' : 'text-muted-foreground'
                                )}
                            >
                                {label}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
                                )}
                            </Link>
                        );
                    })}
                    <SignedIn>
                        <Link
                            href="/my-journey"
                            className={cn(
                                'text-xs font-bold transition-colors py-1 relative hover:text-primary tracking-wide uppercase',
                                pathname === '/my-journey' ? 'text-primary font-extrabold' : 'text-muted-foreground'
                            )}
                        >
                            Dashboard
                            {pathname === '/my-journey' && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
                            )}
                        </Link>
                    </SignedIn>
                </nav>

                {/* Right Controls & Auth buttons */}
                <div className="hidden lg:flex items-center gap-4">
                    <button 
                        onClick={toggleTheme}
                        className="p-2 rounded-xl bg-card border border-border hover:bg-muted transition-all duration-300 flex items-center justify-center cursor-pointer text-foreground shadow-xs"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <Sun className="size-4.5 text-yellow-400 transition-transform duration-500 hover:rotate-45" />
                        ) : (
                            <Moon className="size-4.5 text-slate-500 transition-transform duration-500 hover:-rotate-12" />
                        )}
                    </button>

                    <SignedOut>
                        <Link href="/sign-in">
                            <button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-violet-500/10 cursor-pointer">
                                <span>Get Started</span>
                                <ArrowRight className="size-3.5" />
                            </button>
                        </Link>
                    </SignedOut>
                    
                    <SignedIn>
                        <UserButton appearance={{
                            elements: {
                                avatarBox: "size-8.5 border border-border"
                            }
                        }} />
                    </SignedIn>
                </div>

                {/* Mobile Menu Actions */}
                <div className="flex lg:hidden items-center gap-3">
                    <button 
                        onClick={toggleTheme}
                        className="p-2 rounded-xl bg-card border border-border flex items-center justify-center cursor-pointer text-foreground"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <Sun className="size-4 text-yellow-400" />
                        ) : (
                            <Moon className="size-4 text-slate-500" />
                        )}
                    </button>

                    <SignedIn>
                        <UserButton appearance={{
                            elements: {
                                avatarBox: "size-8 border border-border"
                            }
                        }} />
                    </SignedIn>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-xl bg-card border border-border flex items-center justify-center cursor-pointer text-muted-foreground hover:text-foreground"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu Drawer */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl px-4 py-5 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-3 duration-250">
                    <nav className="flex flex-col gap-3">
                        {navItems.map(({ label, href }) => {
                            const isActive = pathname === href;
                            return (
                                <Link
                                    href={href}
                                    key={label}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                        'text-sm font-bold py-2 px-3.5 rounded-xl transition-all',
                                        isActive 
                                            ? 'bg-violet-600/10 text-primary font-extrabold border-l-2 border-primary' 
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    )}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                        <SignedIn>
                            <Link
                                href="/my-journey"
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                    'text-sm font-bold py-2 px-3.5 rounded-xl transition-all',
                                    pathname === '/my-journey'
                                        ? 'bg-violet-600/10 text-primary font-extrabold border-l-2 border-primary'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                )}
                            >
                                Dashboard
                            </Link>
                        </SignedIn>
                    </nav>

                    <SignedOut>
                        <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                            <button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-violet-500/10">
                                <span>Get Started</span>
                                <ArrowRight className="size-4" />
                            </button>
                        </Link>
                    </SignedOut>
                </div>
            )}
        </header>
    );
};

export default Navbar;
