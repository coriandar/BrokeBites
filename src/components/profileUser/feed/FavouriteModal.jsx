import React, { useState, useEffect } from "react";
import { fetchRestaurant } from "@/database/firebase/firestore/userDB";

export default function FavouriteContainer({ followData, displayName }) {
    const [favouriteRestaurant, setfavouriteRestaurant] = useState(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const restaurant = await fetchRestaurant(followData.recipient);
                if (restaurant) {
                    setfavouriteRestaurant(restaurant.name);
                } else {
                    setfavouriteRestaurant("Display Name Not Found");
                }
            } catch (error) {
                console.error(
                    "Error fetching recipient's display name:",
                    error,
                );
                setfavouriteRestaurant("Display Name Error");
            }
        };
    }, [followData.recipient]);

    return (
        <div>
            <ul key={followData.id} className="w-full">
                {displayName} added {favouriteRestaurant.name} to their
                favourites list
            </ul>
        </div>
    );
}
