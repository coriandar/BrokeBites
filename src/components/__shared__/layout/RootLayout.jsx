import React from "react";
import Head from "next/head";
import Navbar from "@/components/navbar/Navbar";

import { Inter as FontSans } from "next/font/google";

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
            <main
                className={`bg-background min-h-screen font-sans antialiased ${fontSans.variable}`}
            >
                {children}
            </main>
        </>
        // <>
        //     <Head>
        //         <title>BrokeBites</title>
        //     </Head>
        //     <main
        //         className={cn(
        //             "bg-background min-h-screen font-sans antialiased",
        //             fontSans.variable,
        //         )}
        //     >
        //         {children}
        //     </main>
        // </>
    );
}
