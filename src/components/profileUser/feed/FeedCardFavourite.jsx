import React, { useState, useEffect } from "react";
import Link from "next/link"; // Correct import
import { fetchRestaurant } from "@/database/firebase/firestore/restaurantDB";

export default function FavouriteContainer({ postData, displayName }) {
    const [postRestaurant, setPostRestaurant] = useState(null);

    useEffect(() => {
        async function fetchFavouriteRestaurant() {
            try {
                const restaurant = await fetchRestaurant(postData.recipient);
                setPostRestaurant(restaurant);
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
            }
        }

        fetchFavouriteRestaurant();
    }, [postData.recipient]);

    return (
        <div>
            <ul key={postData.id} className="w-full">
                {displayName} added{" "}
                {postRestaurant ? (
                    <Link
                        href={`/restaurant/${postRestaurant.id}`}
                        className="text-primary"
                    >
                        {postRestaurant.name}
                    </Link>
                ) : (
                    "a restaurant"
                )}{" "}
                to their favorites list
            </ul>
        </div>
    );
}
