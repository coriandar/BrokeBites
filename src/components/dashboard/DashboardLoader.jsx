import React, { useState, useEffect } from "react";
import { auth } from "../../database/firebase/firebaseApp";
import Dashboard from "./Dashboard";
import {
    allRestaurants,
    favouriteRestaurants,
    toVisitRestaurants,
} from "@/database/restaurantData";

export default function DashboardLoader({ dashboardType }) {
    const [restaurantList, setRestaurantList] = useState([]);
    const [restaurantMasterList, setRestaurantMasterList] = useState([]);
    const [activeDashboard, setActiveDashboard] = useState(null);
    const [mapTheme, setMapTheme] = useState("light");
    const currentUser = auth.currentUser?.uid;

    let restaurants = null;

    useEffect(() => {
        const fetchData = async () => {
            if (dashboardType === "all") {
                restaurants = await allRestaurants();
                setActiveDashboard("all");
            } else if (dashboardType === "favourite") {
                restaurants = await favouriteRestaurants(currentUser);
                setActiveDashboard("favourite");
            } else if (dashboardType === "toVisit") {
                restaurants = await toVisitRestaurants(currentUser);
                setActiveDashboard("toVisit");
            }
            setRestaurantMasterList(restaurants);
            setRestaurantList(restaurants);
        };

        fetchData();
    }, []);

    return (
        <Dashboard
            restaurantList={restaurantList}
            setRestaurantList={setRestaurantList}
            restaurantMasterList={restaurantMasterList}
            setRestaurantMasterList={setRestaurantList}
            activeDashboard={activeDashboard}
            mapTheme={mapTheme}
            setMapTheme={setMapTheme}
        />
    );
}
