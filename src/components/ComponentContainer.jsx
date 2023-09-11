//parent container for components
import React from "react";
import InitList from "./Restaurants/RestaurantList";
import { Inter } from "next/font/google";
import InitMap from "./map/Map";
import { Auth } from "./Auth";
import Login from "@/components/account/Login";
import styles from "./ComponentContainer.module.css";

// Export the Components component
export default function Components() {
    return (
        <div className={styles["parent-container"]}>
            <Login />
            <div className={styles["map-and-list-overlay"]}>
                <div className="map-overlay">
                    <InitMap />
                </div>
                <div className={styles["restaurant-list-overlay"]}>
                    <InitList />
                </div>
            </div>
        </div>
    );
}
