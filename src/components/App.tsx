//parent container for components
import React from "react";
import InitList from "./Restaurants/RestaurantList";
import { Inter } from "next/font/google";
import InitMap from "./map/Map";
import { Auth } from "./Auth";
import Login from "@/components/account/Login";
const inter = Inter({ subsets: ["latin"] });

//export the components
export default function Components() {
    return (
        <div className="parent-container">
            <Login />
            <InitMap />
            <InitList />
        </div>
    );
}
