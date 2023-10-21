import React from "react";
import RecommendCard from "./RecommendCard";

export default function RecommendContainer({ restaurants }) {
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
