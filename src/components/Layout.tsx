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
                <header className="h-20">
                    <Nav />
                </header>
                <main className="h-full bg-slate-500">{children}</main>
            </div>
        </>
    );
};

export default Layout;
