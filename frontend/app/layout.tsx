import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Interview Companion",
  description: "Real-time voice-to-voice AI mock interviews and learning assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bricolage.variable} antialiased`}>
        <ClerkProvider 
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_ZGVlcC1odW1wYmFjay05My5jbGVyay5hY2NvdW50cy5kZXYk"}
          appearance={{ variables: { colorPrimary: '#7c3aed' }} }
        >
          <ThemeProvider>
            <Toaster position="top-center" richColors theme="dark" />
            <div className="flex flex-col min-h-screen justify-between">
              <div className="w-full">
                <Navbar />
                {children}
              </div>
              <Footer />
            </div>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
