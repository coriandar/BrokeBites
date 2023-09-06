import React, { useState, useEffect } from "react";
import { getAllRestaurants } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import MarkerDetails from "./MarkerDetails";

const InitList = () => {
    const [restaurantList, setRestaurantList] = useState<any>([]);

    // use getRestaurantList method when the List first renders
    useEffect(() => {
        const fetchData = async () => {
            const restaurants = await getAllRestaurants();
            setRestaurantList(restaurants);
        };

        fetchData();
    }, []);

    return (
        <ul id="restaurantList">
            {restaurantList.map(
                (restaurant: {
                    id: React.Key | null | undefined;
                    latitude: any;
                    longitude: any;
                    name: string | undefined;
                    website: string | undefined;
                }) => (
                    <li>{restaurant.name}</li>
                )
            )}
        </ul>
    );
};

export default InitList;
