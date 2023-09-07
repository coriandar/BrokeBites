import Image from "next/image";
import Dashboard from "../components/Dashboard";
import { Inter } from "next/font/google";
import { Auth } from "../components/Auth";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main>
            <div>
                <Auth />
                <Dashboard />
            </div>
        </main>
    );
}
