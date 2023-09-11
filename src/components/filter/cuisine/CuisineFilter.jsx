import React, { useState } from "react";

const CuisineFilter = ({ onFilterChange }) => {
    const [selectedCuisine, setSelectedCuisine] = useState(null);

    const handleCuisineChange = (event) => {
        const cuisine = event.target.value;
        setSelectedCuisine(cuisine);
        onFilterChange(cuisine);
    };

    return (
        <div>
            <label htmlFor="cuisine">Filter by Cuisine:</label>
            <select
                id="cuisine"
                onChange={handleCuisineChange}
                value={selectedCuisine || ""}
            >
                <option value="">All</option>
                <option value="italian">Italian</option>
                <option value="japanese">Japanese</option>
                {/* Add more cuisine options */}
            </select>
        </div>
    );
};

export default CuisineFilter;
