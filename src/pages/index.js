import Dashboard from "../components/Dashboard";
<<<<<<< HEAD
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function index() {
    const router = useRouter();

    return (
        <main
            className={`flex max-h-screen h-screen w-screen flex-col ${inter.className}`}
        >
            <Navbar />
            <div className="flex-1 h-10">
                <Dashboard />
            </div>
        </main>
=======

export default function index() {
    return (
        <>
            <Dashboard />
        </>
>>>>>>> 1108444f33c6552f103e21d442bb347992e0a168
    );
}
