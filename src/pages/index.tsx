import Dashboard from "../components/Dashboard";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";

import Login from "@/components/account/Login";
import InitMap from "@/components/map/Map";
const inter = Inter({ subsets: ["latin"] });

import React, { useState, useEffect } from "react";
import { getAllRestaurants } from "@/components/firebase/FirebaseApp";

export default function index() {
    const router = useRouter();

    const [restaurantList, setRestaurantList] = useState<any>([]);
    const [restaurantSelected, setRestaurantSelected] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const restaurants = await getAllRestaurants();
            setRestaurantList(restaurants);
        };

        fetchData();
    }, []);

    return (
        <main className={`flex min-h-screen flex-col ${inter.className}`}>
            {/* <div className="bg-slate-200">
                <Login />
            </div>
            <div className="bg-slate-500">
                <Dashboard />
            </div> */}
            {/* <Login /> */}
            <Dashboard />
        </main>
    );
}
