'use client';

import * as React from 'react';
import { useState } from 'react';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Sparkles, Mic, Brain, Github, Mail, Lock, ArrowRight, UserCheck, ShieldAlert, BadgeCheck } from 'lucide-react';

const getErrorMessage = (err: unknown, fallback: string) => {
    if (err instanceof Error) return err.message;
    if (typeof err === 'object' && err !== null) {
        const maybeErrors = (err as { errors?: Array<{ message?: string }> }).errors;
        if (Array.isArray(maybeErrors) && maybeErrors[0]?.message) {
            return maybeErrors[0].message;
        }
    }
    return fallback;
};

export default function Page() {
    const { isLoaded: isSignInLoaded, signIn, setActive: setSignInActive } = useSignIn();
    const { isLoaded: isSignUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Verification state for signing up
    const [pendingVerification, setPendingVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');

    const validateEmail = (val: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    };

    const handleOAuth = async (strategy: 'oauth_google' | 'oauth_github') => {
        setError('');
        try {
            if (activeTab === 'signin') {
                if (!isSignInLoaded) return;
                await signIn.authenticateWithRedirect({
                    strategy,
                    redirectUrl: '/sso-callback',
                    redirectUrlComplete: '/',
                });
            } else {
                if (!isSignUpLoaded) return;
                await signUp.authenticateWithRedirect({
                    strategy,
                    redirectUrl: '/sso-callback',
                    redirectUrlComplete: '/',
                });
            }
        } catch (err: unknown) {
            setError(getErrorMessage(err, 'OAuth redirect failed. Please try again.'));
        }
    };

    const handleSignInSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSignInLoaded) return;

        setError('');
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        try {
            const result = await signIn.create({
                identifier: email,
                password: password,
            });

            if (result.status === 'complete') {
                await setSignInActive({ session: result.createdSessionId });
                router.push('/my-journey');
            } else {
                setError('Sign-in requires extra steps (e.g. MFA). Please complete on the Clerk panel or try Google/GitHub.');
            }
        } catch (err: unknown) {
            setError(getErrorMessage(err, 'Incorrect email or password. Please try again.'));
        } finally {
            setLoading(false);
        }
    };

    const handleSignUpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSignUpLoaded) return;

        setError('');
        if (!email || !password) {
            setError('Please choose both email and password.');
            return;
        }
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        setLoading(true);
        try {
            await signUp.create({
                emailAddress: email,
                password: password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            setPendingVerification(true);
        } catch (err: unknown) {
            setError(getErrorMessage(err, 'Sign-up failed. The email might be already taken.'));
        } finally {
            setLoading(false);
        }
    };

    const handleVerificationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSignUpLoaded) return;

        setError('');
        if (!verificationCode) {
            setError('Please enter the verification code sent to your email.');
            return;
        }

        setLoading(true);
        try {
            const result = await signUp.attemptEmailAddressVerification({
                code: verificationCode,
            });

            if (result.status === 'complete') {
                await setSignUpActive({ session: result.createdSessionId });
                router.push('/my-journey');
            } else {
                setError('Verification did not complete. Please check the code and try again.');
            }
        } catch (err: unknown) {
            setError(getErrorMessage(err, 'Invalid verification code. Please check and try again.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-140px)] flex flex-col lg:flex-row w-full max-w-6xl mx-auto items-stretch p-4 sm:p-6 gap-8 mt-4 mb-8">
            
            {/* Left Showcase Pane (Hidden on Mobile) */}
            <div className="flex-1 rounded-3xl bg-slate-950 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden border border-border/80 shadow-2xl max-lg:hidden">
                {/* Radiant grids & blobs */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(167,139,250,0.08)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-80" />
                <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-violet-500/10 blur-[130px] pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />
                
                {/* Top Branding / Version Tag */}
                <div className="flex flex-col gap-3 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/25 rounded-full text-xs font-semibold w-fit backdrop-blur-md text-violet-300">
                        <Sparkles className="size-3.5 text-violet-400 animate-pulse" />
                        <span>AI Interview Companion v2.5</span>
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tight leading-tight mt-2 text-gradient-primary">
                        Master Technical & Soft-Skill Interviews
                    </h2>
                    <p className="text-muted-foreground text-sm max-w-md leading-relaxed mt-2">
                        Get live, real-time vocal feedback from responsive AI Avatars specializing in Software Engineering, System Design, Behavioral scenarios, and Economics.
                    </p>
                </div>

                {/* Animated SVG Visualizer Simulation */}
                <div className="my-8 flex justify-center items-center h-44 relative z-10">
                    <div className="absolute size-36 bg-violet-600/10 rounded-full blur-2xl animate-pulse" />
                    <svg className="w-64 h-32" viewBox="0 0 250 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Audio Sine Wave simulation */}
                        <path d="M10 50 C 30 20, 50 80, 70 50 C 90 20, 110 80, 130 50 C 150 20, 170 80, 190 50 C 210 20, 230 80, 240 50" 
                              stroke="url(#waveGradient)" strokeWidth="4" strokeLinecap="round" className="ambient-pulse" />
                        
                        <path d="M10 50 C 40 80, 60 20, 80 50 C 100 80, 120 20, 140 50 C 160 80, 180 20, 200 50 C 220 80, 230 20, 240 50" 
                              stroke="url(#emeraldGradient)" strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round" opacity="0.6" />

                        <defs>
                            <linearGradient id="waveGradient" x1="0" y1="0" x2="250" y2="0" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#8b5cf6" />
                                <stop offset="50%" stopColor="#d946ef" />
                                <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                            <linearGradient id="emeraldGradient" x1="0" y1="0" x2="250" y2="0" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Key Value Highlights */}
                <div className="flex flex-col gap-3 relative z-10 max-w-md">
                    <div className="flex items-center gap-3.5 bg-slate-900/60 border border-border/80 rounded-2xl p-4.5 backdrop-blur-md hover:border-violet-500/20 hover:bg-slate-900/80 transition-all">
                        <div className="size-9 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20 shrink-0">
                            <Mic className="size-4.5 text-violet-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-xs text-white">Vocal Mock Sessions</h4>
                            <p className="text-[11px] text-muted-foreground mt-0.5">Zero-latency dialogs matching real-life interview patterns.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3.5 bg-slate-900/60 border border-border/80 rounded-2xl p-4.5 backdrop-blur-md hover:border-emerald-500/20 hover:bg-slate-900/80 transition-all">
                        <div className="size-9 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
                            <Brain className="size-4.5 text-emerald-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-xs text-white">AI Response Diagnostics</h4>
                            <p className="text-[11px] text-muted-foreground mt-0.5">Comprehensive transcripts, scoring charts, and improvement goals.</p>
                        </div>
                    </div>
                </div>

                {/* Developer Credit footer */}
                <div className="border-t border-border/40 pt-6 relative z-10 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2.5">
                        <div className="size-8 rounded-full bg-slate-900 border border-border flex items-center justify-center">
                            <BadgeCheck className="size-4.5 text-violet-400 animate-pulse" />
                        </div>
                        <div>
                            <span className="block text-[10px] uppercase font-bold text-muted-foreground/60 leading-none">Designed & Developed by</span>
                            <span className="font-extrabold text-white mt-1 block">Saurabh Anand</span>
                        </div>
                    </div>
                    <span>© 2026</span>
                </div>
            </div>

            {/* Right Form Card Pane */}
            <div className="flex-1 flex items-center justify-center bg-card/75 backdrop-blur-xl border border-border/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 size-48 rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 size-48 rounded-full bg-emerald-600/5 blur-3xl pointer-events-none" />
                
                <div className="w-full max-w-md z-10 flex flex-col gap-6">
                    {/* Responsive Title for Mobile only */}
                    <div className="lg:hidden text-center flex flex-col gap-2 mb-2">
                        <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-300 bg-clip-text text-transparent">
                            AI Interview Companion
                        </h2>
                        <p className="text-xs text-muted-foreground font-semibold">Voice-to-voice mock prep with real feedback</p>
                    </div>

                    {!pendingVerification ? (
                        <>
                            {/* Card Header & Switcher */}
                            <div className="flex flex-col gap-2">
                                <h3 className="text-2xl font-extrabold text-foreground tracking-tight">
                                    {activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}
                                </h3>
                                <p className="text-xs text-muted-foreground font-medium">
                                    {activeTab === 'signin' 
                                        ? 'Access your analytics, streaks, and simulated interviews.' 
                                        : 'Unlock premium AI interviewers, feedback templates, and tracking charts.'
                                    }
                                </p>
                            </div>

                            {/* Custom tab headers */}
                            <div className="grid grid-cols-2 p-1 bg-muted border border-border rounded-xl">
                                <button
                                    onClick={() => { setActiveTab('signin'); setError(''); }}
                                    className={`py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                                        activeTab === 'signin' 
                                            ? 'bg-card text-foreground shadow-xs' 
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => { setActiveTab('signup'); setError(''); }}
                                    className={`py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                                        activeTab === 'signup' 
                                            ? 'bg-card text-foreground shadow-xs' 
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    Register
                                </button>
                            </div>

                            {/* Error Alert */}
                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 rounded-xl text-xs flex items-start gap-2.5">
                                    <ShieldAlert className="size-4 shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Credentials Form */}
                            <form onSubmit={activeTab === 'signin' ? handleSignInSubmit : handleSignUpSubmit} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-muted-foreground" htmlFor="email">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            required
                                            className="w-full bg-background border border-border hover:border-border/80 focus:border-violet-500 focus:outline-none rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-foreground transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-muted-foreground" htmlFor="password">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            required
                                            className="w-full bg-background border border-border hover:border-border/80 focus:border-violet-500 focus:outline-none rounded-xl py-2.5 pl-10 pr-10 text-xs font-medium text-foreground transition-colors"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground cursor-pointer"
                                        >
                                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                        </button>
                                    </div>
                                    {activeTab === 'signup' && (
                                        <p className="text-[10px] text-muted-foreground font-medium">Minimum 8 characters containing letters and numbers.</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer flex items-center justify-center gap-2 transition-all shadow-md shadow-violet-500/10 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-75 disabled:pointer-events-none mt-2"
                                >
                                    {loading ? (
                                        <div className="size-4.5 rounded-full border-2 border-t-white border-white/20 animate-spin" />
                                     ) : (
                                         <>
                                             <span>{activeTab === 'signin' ? 'Sign In with Email' : 'Register Account'}</span>
                                             <ArrowRight className="size-4" />
                                         </>
                                     )}
                                </button>
                                {/* Container for Clerk Smart CAPTCHA */}
                                <div id="clerk-captcha" className="mt-2" />
                            </form>

                            {/* Divider */}
                            <div className="flex items-center gap-3 my-2">
                                <div className="h-px bg-border flex-1" />
                                <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">or continue with</span>
                                <div className="h-px bg-border flex-1" />
                            </div>

                            {/* OAuth Social Buttons */}
                            <div className="grid grid-cols-2 gap-3.5">
                                <button
                                    type="button"
                                    onClick={() => handleOAuth('oauth_google')}
                                    className="flex items-center justify-center gap-2 py-2.5 border border-border hover:bg-muted rounded-xl text-xs font-bold text-foreground cursor-pointer transition-all hover:border-violet-500/20"
                                >
                                    {/* Google SVG */}
                                    <svg className="size-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                                    </svg>
                                    <span>Google</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleOAuth('oauth_github')}
                                    className="flex items-center justify-center gap-2 py-2.5 border border-border hover:bg-muted rounded-xl text-xs font-bold text-foreground cursor-pointer transition-all hover:border-violet-500/20"
                                >
                                    <Github className="size-4 shrink-0" />
                                    <span>GitHub</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        /* Verification OTP View */
                        <form onSubmit={handleVerificationSubmit} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                                    <UserCheck className="size-6 text-violet-500 dark:text-violet-400" />
                                    <span>Verify Email</span>
                                </h3>
                                <p className="text-xs text-muted-foreground font-semibold">
                                    We sent a verification code to <span className="font-bold text-foreground">{email}</span>. Please enter it below.
                                </p>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 rounded-xl text-xs flex items-start gap-2.5">
                                    <ShieldAlert className="size-4 shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-muted-foreground" htmlFor="code">Verification Code</label>
                                <input
                                    id="code"
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    placeholder="123456"
                                    required
                                    className="w-full bg-background border border-border hover:border-border/80 focus:border-violet-500 focus:outline-none rounded-xl py-3 text-center text-lg font-bold tracking-widest text-foreground transition-colors"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer flex items-center justify-center gap-2 transition-all disabled:opacity-75 disabled:pointer-events-none"
                              >
                                {loading ? (
                                    <div className="size-4.5 rounded-full border-2 border-t-white border-white/20 animate-spin" />
                                ) : (
                                    <>
                                        <span>Confirm Verification</span>
                                        <ArrowRight className="size-4" />
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setPendingVerification(false);
                                    setError('');
                                }}
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors text-center cursor-pointer font-bold"
                            >
                                Back to Registration
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}