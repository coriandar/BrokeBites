import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import InitPriceSlider from "./PriceSlider";

export default function FilterSelector({
    setQuery,
    restaurantMasterList,
    setRestaurantList,
    getFilteredPriceRating,
}) {
    const [activeFilter, setActiveFilter] = useState("search");

    const handleClick = (buttonName) => {
        setActiveFilter(buttonName);
    };

    const changeColour = (buttonName) => {
        return activeFilter == buttonName ? "bg-slate-400" : "bg-slate-200";
    };

    const changeFilter = (activeFilter) => {
        if (activeFilter === "search") {
            return <SearchBar setQuery={setQuery} />;
        } else if (activeFilter === "priceRange") {
            return (
                <InitPriceSlider
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    getFilteredPriceRating={getFilteredPriceRating}
                />
            );
        }
    };

    return (
        <div className="-m-2 -mt-3">
            <ul className="flex items-center justify-start">
                <li className="p-2 cursor-pointer">
                    <button
                        className={`text-xs px-4 py-1 rounded-s-md ${changeColour(
                            "search"
                        )}`}
                        onClick={() => handleClick("search")}
                    >
                        Search
                    </button>
                    <button
                        className={`text-xs px-4 py-1 ${changeColour(
                            "priceRange"
                        )}`}
                        onClick={() => handleClick("priceRange")}
                    >
                        Price Range
                    </button>
                    <button
                        className={`text-xs px-4 py-1 rounded-e-md ${changeColour(
                            "sortPrice"
                        )}`}
                        onClick={() => handleClick("sortPrice")}
                    >
                        Sort by Price
                    </button>
                </li>
            </ul>
            <div>{changeFilter(activeFilter)}</div>
        </div>
    );
}
