import React, { useState, useEffect } from "react";
import { fetchRestaurant } from "@/database/firebase/firestore/userDB";

export default function FavouriteContainer({ post, displayName }) {
    const [recipientDisplayName, setRecipientDisplayName] = useState(null);

    useEffect(() => {
        const fetchRecipientDisplayName = async () => {
            try {
                const restaurant = await fetchRestaurant(post.recipient);
                if (restaurant) {
                    setRecipientDisplayName(restaurant.name);
                } else {
                    setRecipientDisplayName("Display Name Not Found");
                }
            } catch (error) {
                console.error(
                    "Error fetching recipient's display name:",
                    error,
                );
                setRecipientDisplayName("Display Name Error");
            }
        };

        fetchRecipientDisplayName();
    }, [post.recipient]);

    return (
        <div>
            <ul key={post.id} className="w-full">
                {displayName} reviewed {recipientDisplayName}
            </ul>
        </div>
    );
}
