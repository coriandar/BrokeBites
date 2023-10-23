import React, { useState, useEffect } from "react";
import { fetchRestaurant } from "@/database/firebase/firestore/restaurantDB";

export default function ReviewContainer({ postData, displayName }) {
    const [reviewedRestaurantName, setReviewedRestaurantName] = useState(null);

    useEffect(() => {
        async function fetchFavouriteRestaurant() {
            try {
                const restaurant = await fetchRestaurant(postData.recipient);
                if (restaurant) {
                    setReviewedRestaurantName(restaurant.name);
                } else {
                    setReviewedRestaurantName("Restaurant Not Found");
                }
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
                setReviewedRestaurantName("Restaurant Error");
            }
        }

        fetchFavouriteRestaurant(); // Call the async function within useEffect
    }, [postData.recipient]);

    return (
        <div>
            <ul key={postData.id} className="w-full">
                {displayName} reviewed {reviewedRestaurantName}
            </ul>
        </div>
    );
}
