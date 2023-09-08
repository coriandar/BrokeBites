import Dashboard from "../components/Dashboard";
import { useRouter } from "next/router";
import InitList from "../components/RestaurantList";
import { Inter } from "next/font/google";
import InitMap from "../components/map/Map";
import { Auth } from "../components/Auth";
import { useState } from "react";

import Login from "@/components/account/Login";
const inter = Inter({ subsets: ["latin"] });

export default function index() {
    const router = useRouter();

    return (
        <main>
            <div>
                <Dashboard />
                <Login />
            </div>
        </main>
    );
}
