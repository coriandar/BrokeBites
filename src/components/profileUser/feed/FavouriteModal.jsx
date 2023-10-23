import React, { useState, useEffect } from "react";
import { fetchRestaurant } from "@/database/firebase/firestore/restaurantDB"; // Updated import

export default function FavouriteContainer({ postData, displayName }) {
    const [favouriteRestaurant, setFavouriteRestaurant] = useState(null);

    useEffect(() => {
        async function fetchFavouriteRestaurant() {
            try {
                const restaurant = await fetchRestaurant(postData.recipient);
                if (restaurant) {
                    setFavouriteRestaurant(restaurant.name);
                } else {
                    setFavouriteRestaurant("Restaurant Not Found");
                }
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
                setFavouriteRestaurant("Restaurant Error");
            }
        }

        fetchFavouriteRestaurant(); // Call the async function within useEffect
    }, [postData.recipient]);

    return (
        <div>
            <ul key={postData.id} className="w-full">
                {displayName} added {favouriteRestaurant} to their favorites
                list
            </ul>
        </div>
    );
}
