import React, { useState, useEffect } from "react";

export default function FillingFactorButtons({
    setRestaurantList,
    masterRestaurantList,
    getFilteredFillingFactor,
}) {
    const [filterValue, setFilterValue] = useState("All"); // Corrected

    // Handler for button clicks
    const handleButtonClick = (category) => {
        setFilterValue(category);
        // Filter the restaurant list based on the selected category and update it
        setRestaurantList(
            getFilteredFillingFactor(masterRestaurantList, category)
        );
    };

    // Array of categories
    const categories = ["Filling", "Light", "Dessert", "All"];

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
