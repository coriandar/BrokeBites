import React from "react";
import Head from "next/head";
import Navbar from "@/components/navbar/Navbar";

import { auth } from "@/database/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "../theme/ThemeProvider";
import { Toaster } from "../shadcn-ui/toaster";

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export default function RootLayout({ children }) {
    const [user] = useAuthState(auth);

    return (
        <>
            <Head>
                <title>BrokeBites</title>
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2060929608189026"
                    crossorigin="anonymous"
                ></script>
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
                    {children}
                </main>
                <Toaster />
            </ThemeProvider>
        </>
    );
}
