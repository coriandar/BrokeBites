import React, { useState, useEffect } from "react";
import { getAllRestaurants } from "../config/firebase";
import InitMap from "../components/Map";
import InitList from "../components/RestaurantList";
import MarkerDetails from "../components/MarkerDetails";

export default function Dashboard() {
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
        <div>
            <InitMap
                restaurantList={restaurantList}
                setRestaurantSelected={setRestaurantSelected}
            />
            <InitList
                restaurantList={restaurantList}
                setRestaurantSelected={setRestaurantSelected}
            />
            <MarkerDetails selected={restaurantSelected} />
        </div>
    );
}
