import React from "react";
import Head from "next/head";
import Nav from "./navigation/Nav";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>BrokeBites</title>
            </Head>
            <div className="h-screen w-screen flex flex-col">
                <header className="bg-slate-300 h-5%">
                    <Nav />
                </header>
                <main className="bg-slate-100 h-95%">{children}</main>
            </div>
        </>
    );
};

export default Layout;
