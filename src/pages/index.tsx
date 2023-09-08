import Dashboard from "../components/Dashboard";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import React, { useState, useEffect } from "react";
import { getAllRestaurants } from "@/components/firebase/FirebaseApp";
import Navbar from "@/components/Navbar";

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
        <main
            className={`flex max-h-screen h-screen w-screen flex-col ${inter.className}`}
        >
            <div className="h-20 flex-shrink-0">
                <Navbar />
            </div>
            <div className="flex-1 h-10">
                <Dashboard />
            </div>
        </main>
    );
}
