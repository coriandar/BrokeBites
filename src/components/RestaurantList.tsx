import React, { useState, useEffect } from "react";
import { getAllRestaurants } from "./firebase/FirebaseApp";
import RestaurantCard from "./RestaurantCard";
import { sortRestaurantsByFillingFactor } from "./SortedByPrice";

const InitList = () => {
    const [restaurantList, setRestaurantList] = useState<any>([]);

    // use getRestaurantList method when the List first renders
    useEffect(() => {
        const fetchData = async () => {
            const restaurants = await getAllRestaurants();
            const sortedRestaurants =
                sortRestaurantsByFillingFactor(restaurants);
            setRestaurantList(sortedRestaurants);
        };

        fetchData();
    }, []);

    return (
        <div id="restaurantList">
            {restaurantList.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
        </div>
    );
};

export default InitList;
