import React, { useState } from "react";
import { getFilteredCuisine } from "../firebase/FirebaseApp";

export default function CuisineButtons({
    setRestaurantList,
    masterRestaurantList,
    getFilteredFillingFactor,
}) {
    const [filterValue, setFilterValue] = useState("All"); // Corrected

    // Handler for button clicks
    const handleButtonClick = (category) => {
        setFilterValue(category);
        // Filter the restaurant list based on the selected category and update it
        setRestaurantList(getFilteredCuisine(masterRestaurantList, category));
    };

    // Array of categories
    const categories = [
        "All",
        "Japanese",
        "Chinese",
        "Indian",
        "Taiwanese",
        "Western",
        "Drinks",
    ];

    return (
        <div>
            {/* Buttons for each category */}
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => handleButtonClick(category)}
                    className={`button ${
                        filterValue === category ? "active" : ""
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
