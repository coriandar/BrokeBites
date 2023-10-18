import React from "react";
import Head from "next/head";
import Navbar from "@/components/navbar/Navbar";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "./ThemeProvider";

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export default function RootLayout({ children }) {
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
                    <Navbar />
                    {children}
                </main>
            </ThemeProvider>
        </>
    );
}
