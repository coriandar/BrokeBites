import React, { useState, useEffect } from "react";
import { getAllRestaurants } from "./firebase/FirebaseApp";
import { fetchSavedBitesList } from "./savedBites/SavedBitesList";
import Dashboard from "./Dashboard";

export default function DashboardLoader({ dashboardType }) {
    const [restaurantList, setRestaurantList] = useState([]);
    const [restaurantMasterList, setRestaurantMasterList] = useState([]);
    const [activeDashboard, setActiveDashboard] = useState(null);

    let restaurants = null;

    useEffect(() => {
        const fetchData = async () => {
            if (dashboardType === "all") {
                restaurants = await getAllRestaurants();
                setActiveDashboard("all");
            } else if (dashboardType === "favourite") {
                restaurants = await fetchSavedBitesList("favourite");
                setActiveDashboard("favourite");
            } else if (dashboardType === "toVisit") {
                restaurants = await fetchSavedBitesList("toVisit");
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
        />
    );
}
