import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "@/components/navbar/Navbar";

import { auth } from "@/database/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "../theme/ThemeProvider";
import { Toaster } from "../shadcn-ui/toaster";

import BannerAd from "@/components/ads/BannerAd";
import { checkPremiumStatus } from "@/database/firebase/firestore/userDB";

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export default function RootLayout({ children }) {
    const [user] = useAuthState(auth);
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        // Call the checkPremiumStatus function to check the user's premium status
        checkPremiumStatus().then((premium) => {
            setIsPremium(premium);
            console.log("isPremium", isPremium);
        });
    }, [isPremium, user]);

    return (
        <>
            <Head>
                <title>BrokeBites</title>
            </Head>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
            >
                <main
                    className={cn(
                        "flex h-screen min-h-screen items-center justify-center font-sans antialiased",
                        fontSans.variable,
                    )}
                >
                    {user && <Navbar />}
                    <BannerAd isPremium={isPremium}></BannerAd>
                    {children}
                </main>
                <Toaster />
            </ThemeProvider>
        </>
    );
}
