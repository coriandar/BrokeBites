import React, { useState, useEffect } from "react";
import {
    getFilteredPriceRating,
    getFilteredStarRating,
} from "../firebase/FirebaseApp";
import SearchBar from "./SearchBar";
import FilterSlider from "./FilterSlider";

export default function FilterSelector({
    activeFilter,
    setActiveFilter,
    restaurantMasterList, // master list
    setRestaurantList, // setRestaurant function
}) {
    const handleClick = (buttonName) => {
        setActiveFilter(buttonName);
    };

    const changeColour = (buttonName) => {
        return activeFilter == buttonName ? "bg-slate-400" : "bg-slate-200";
    };

    const changeFilter = (activeFilter) => {
        if (activeFilter === "search") {
            return (
                <SearchBar
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                />
            );
        } else if (activeFilter === "priceRange") {
            return (
                <FilterSlider
                    sliderLabel="Price Range:"
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    getFilteredList={getFilteredPriceRating} // price filter function
                />
            );
        } else if (activeFilter === "sortPrice") {
        } else if (activeFilter === "fillingFactor") {
        } else if (activeFilter === "starRating") {
            return (
                <FilterSlider
                    sliderLabel="Star Range:"
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    getFilteredList={getFilteredStarRating} // star filter function
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
                        className={`text-xs px-4 py-1 ${changeColour(
                            "sortPrice"
                        )}`}
                        onClick={() => handleClick("sortPrice")}
                    >
                        Sort by Price
                    </button>
                    <button
                        className={`text-xs px-4 py-1 ${changeColour(
                            "fillingFactor"
                        )}`}
                        onClick={() => handleClick("fillingFactor")}
                    >
                        Filling Factor
                    </button>
                    <button
                        className={`text-xs px-4 py-1 rounded-e-md ${changeColour(
                            "starRating"
                        )}`}
                        onClick={() => handleClick("starRating")}
                    >
                        Stars
                    </button>
                </li>
            </ul>
            <div>{changeFilter(activeFilter)}</div>
        </div>
    );
}
