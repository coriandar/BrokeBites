import React, { useState, useEffect, useRef } from "react";
import { auth } from "../../database/firebase/firebaseApp";
import Dashboard from "./Dashboard";
import {
    allRestaurants,
    favouriteRestaurants,
    toVisitRestaurants,
    visitedRestaurants,
} from "@/database/restaurantData";

export default function DashboardLoader({ dashboardType }) {
    const [restaurantList, setRestaurantList] = useState([]);
    const [restaurantMasterList, setRestaurantMasterList] = useState([]);
    const [activeDashboard, setActiveDashboard] = useState(null);
    const [mapTheme, setMapTheme] = useState("light");
    const currentUser = auth.currentUser?.uid;
    const restaurants = useRef(null);

    // let restaurants = null;
    useEffect(() => {
        const fetchData = async () => {
            if (dashboardType === "all") {
                restaurants.current = await allRestaurants();
                setActiveDashboard("all");
            } else if (dashboardType === "favourite") {
                restaurants.current = await favouriteRestaurants(currentUser);
                setActiveDashboard("favourite");
            } else if (dashboardType === "toVisit") {
                restaurants.current = await toVisitRestaurants(currentUser);
                setActiveDashboard("toVisit");
            } else if (dashboardType === "visited") {
                restaurants.current = await visitedRestaurants(currentUser);
            }
            setRestaurantMasterList(restaurants.current);
            setRestaurantList(restaurants.current);
        };

        fetchData();
    }, [currentUser, dashboardType]);

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
