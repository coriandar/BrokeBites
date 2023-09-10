// "user client";
import React, { PropsWithChildren } from "react";
import Nav from "./Nav";
import Dashboard from "../components/Dashboard";
import Head from "next/head";

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Head>
                <title>BrokeBites</title>
            </Head>
            <div className="h-screen w-screen flex flex-col">
                <header className="bg-slate-300 h-5%">
                    <Nav />
                </header>
                <main className="bg-slate-100 h-95%">
                    {children}
                </main>
            </div>
        </>
    );
};

export default Layout;
