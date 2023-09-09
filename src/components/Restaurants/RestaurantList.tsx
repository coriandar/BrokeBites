import React, { useState, useEffect } from "react";
import { getAllRestaurants } from "../firebase/FirebaseApp";
import RestaurantCard from "./RestaurantCard";

const getFilteredRestaurants = (items, query) => {
    if (!query) {
        return items;
    }
    const lowercaseQuery = query.toLowerCase(); // Convert the query to lowercase

    return items.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(lowercaseQuery)
    );
};

export default function RestaurantSearch() {
    const [query, setQuery] = useState("");
    const [restaurantList, setRestaurantList] = useState([]);

    useEffect(() => {
        // Fetch the restaurants and set the state when the component mounts
        const fetchRestaurants = async () => {
            try {
                const restaurants = await getAllRestaurants();
                setRestaurantList(restaurants);
            } catch (error) {
                // Handle any errors here
                console.error("Error fetching restaurants:", error);
            }
        };

        fetchRestaurants();
    }, []); // The empty dependency array ensures this effect runs only once

    const filteredRestaurants = getFilteredRestaurants(restaurantList, query);

    return (
        <div>
            <label>Search</label>
            <input type="text" onChange={(e) => setQuery(e.target.value)} />
            <ul>
                {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                    />
                ))}
            </ul>
        </div>
    );
}
