'use client';

import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

export default function SSOCallbackPage() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-transparent text-white p-4">
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="size-10 rounded-full border-4 border-t-violet-500 border-violet-500/20 animate-spin" />
                <h3 className="text-base font-bold tracking-wide text-foreground">Completing authentication...</h3>
                <p className="text-xs text-muted-foreground max-w-xs">You are being securely redirected back to the companion.</p>
                <div className="mt-2 opacity-0 pointer-events-none">
                    <AuthenticateWithRedirectCallback />
                </div>
            </div>
        </div>
    );
}
