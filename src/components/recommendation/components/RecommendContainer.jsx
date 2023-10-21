import React, { useState, useEffect } from "react";
import RecommendCard from "./RecommendCard";
import { auth } from "@/database/firebase/firebaseApp";

export default function RecommendContainer({ restaurants }) {
    // const [restaurants, setRestaurants] = useState(null);

    // useEffect(() => {
    //     (async () => {
    //         setFollowing(await fetchFollowingList(auth.currentUser?.uid));
    //     })();
    // }, []);

    return (
        <div className="m-8 flex h-full w-full flex-col items-center justify-center rounded-lg">
            <h3 className="text-lg font-bold">Recommendations</h3>
            <ul>
                {restaurants ? (
                    restaurants.map((restaurant) => (
                        <li key={`${restaurant.id}`}>
                            <RecommendCard restaurant={restaurant} />
                        </li>
                    ))
                ) : (
                    <p>loading...</p>
                )}
            </ul>
        </div>
    );
}
