"user client";
import React, { PropsWithChildren } from "react";
import Nav from "./Nav";
import Navbar from "./Navbar";
import Head from "next/head";

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Head>
                <title>BrokeBites</title>
            </Head>
            <div className="h-screen flex flex-col">
                <header>
                    <Nav />
                </header>
                {children}
            </div>
        </>
    );
};

export default Layout;
