import React, { useState } from "react";

export default function SortBy({
    restaurantMasterList,
    setRestaurantList,
    getSortedBy,
}) {
    const [activeButton, setActiveButton] = useState("default");

    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
        sortRestaurants(buttonName);
    };

    // Function to sort the restaurant list based on the order parameter
    const sortRestaurants = (order) => {
        const sortedRestaurants = getSortedBy(restaurantMasterList, order);
        setRestaurantList(sortedRestaurants);
    };

    const changeColour = (buttonName) => {
        return activeButton == buttonName ? "bg-slate-400" : "bg-slate-200";
    };

    return (
        <div className="w-full bg-slate-300 shadow-lg h-14 flex justify-center items-center pl-2 rounded-lg">
            <button
                className={`text-xs px-4 py-1 rounded-md m-1 ${changeColour(
                    "default"
                )}`}
                onClick={() => handleClick("default")}
            >
                Default
            </button>
            <button
                className={`text-xs px-4 py-1 rounded-md m-1 ${changeColour(
                    "ascending"
                )}`}
                onClick={() => handleClick("ascending")}
            >
                Ascending
            </button>
            <button
                className={`text-xs px-4 py-1 rounded-md m-1 ${changeColour(
                    "descending"
                )}`}
                onClick={() => handleClick("descending")}
            >
                Descending
            </button>
        </div>
    );
}
