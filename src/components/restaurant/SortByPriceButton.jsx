import React, { useState } from "react";

export default function SortPriceButton({
    setRestaurantList,
    masterRestaurantList,
    getSortedPriceRating,
}) {
    const [isAscending, setIsAscending] = useState(true);

    // Handler for button clicks to sort in ascending order
    const handleAscendingClick = () => {
        setIsAscending(true);
        sortRestaurants("ascending");
    };

    // Handler for button clicks to sort in descending order
    const handleDescendingClick = () => {
        setIsAscending(false);
        sortRestaurants("descending");
    };

    // Function to sort the restaurant list based on the order parameter
    const sortRestaurants = (order) => {
        const sortedRestaurants = getSortedPriceRating(
            masterRestaurantList,
            order
        );
        setRestaurantList(sortedRestaurants);
    };

    return (
        <div>
            <button onClick={handleAscendingClick}>
                Sort by Price Rating (Ascending)
            </button>
            <button onClick={handleDescendingClick}>
                Sort by Price Rating (Descending)
            </button>
        </div>
    );
}
