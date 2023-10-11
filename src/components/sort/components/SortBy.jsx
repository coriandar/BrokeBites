import React, { useState } from "react";

export default function SortBy({
    restaurantMasterList,
    setRestaurantList,
    sortLogic,
    userGeo, // only used for sortby nearest
}) {
    const [activeButton, setActiveButton] = useState("default");

    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
        sortRestaurants(buttonName);
    };

    // Function to sort the restaurant list based on the order parameter
    const sortRestaurants = (order) => {
        const sortedRestaurants = sortLogic(
            restaurantMasterList,
            order,
            userGeo, // for sort by neearest
        );
        setRestaurantList(sortedRestaurants);
    };

    const changeColour = (buttonName) => {
        return activeButton == buttonName ? "bg-slate-400" : "bg-slate-200";
    };

    return (
        <div className="flex h-14 w-full items-center justify-center rounded-lg bg-slate-300 pl-2 shadow-lg">
            <button
                className={`m-1 rounded-md px-4 py-1 text-xs ${changeColour(
                    "default",
                )}`}
                onClick={() => handleClick("default")}
            >
                Default
            </button>
            <button
                className={`m-1 rounded-md px-4 py-1 text-xs ${changeColour(
                    "ascending",
                )}`}
                onClick={() => handleClick("ascending")}
            >
                Ascending
            </button>
            <button
                className={`m-1 rounded-md px-4 py-1 text-xs ${changeColour(
                    "descending",
                )}`}
                onClick={() => handleClick("descending")}
            >
                Descending
            </button>
        </div>
    );
}
