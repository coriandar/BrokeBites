import React from "react";
import Head from "next/head";
import Navbar from "@/components/navbar/Navbar";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>BrokeBites</title>
            </Head>
            <div className="flex h-screen w-screen flex-col">
                <header className="h-5% bg-slate-300">
                    <Navbar />
                </header>
                <main className="h-95% bg-slate-100">{children}</main>
            </div>
        </>
    );
};

export default Layout;
