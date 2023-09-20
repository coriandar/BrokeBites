import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import {
    getFilteredPriceRating,
    getFilteredStarRating,
    getFilteredCusine,
    getFilteredFillingFactor,
    getFilteredDietary,
    getSortedPriceRating,
    getSortedStarRating,
    optCuisine,
    optFilling,
    optDietary,
} from "./FilterLogic";
import FilterSlider from "./FilterSlider";
import FilterType from "./FilterType";
import SortBy from "./SortBy";

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
                    getFilteredList={getFilteredPriceRating}
                />
            );
        } else if (activeFilter === "sortPrice") {
            return (
                <SortBy
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    getSortedBy={getSortedPriceRating}
                />
            );
        } else if (activeFilter === "fillingFactor") {
            return (
                <FilterType
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    options={optFilling}
                    getFilteredList={getFilteredFillingFactor}
                />
            );
        } else if (activeFilter === "cuisine") {
            return (
                <FilterType
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    options={optCuisine}
                    getFilteredList={getFilteredCusine}
                />
            );
        } else if (activeFilter === "dietary") {
            return (
                <FilterType
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    options={optDietary}
                    getFilteredList={getFilteredDietary}
                />
            );
        } else if (activeFilter === "starRatingSort") {
            return (
                <SortBy
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    getSortedBy={getSortedStarRating}
                />
            );
        } else if (activeFilter === "starRating") {
            return (
                <FilterSlider
                    sliderLabel="Star Range:"
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    getFilteredList={getFilteredStarRating}
                />
            );
        }
    };

    return (
        <div className="-m-2 -mt-3">
            <ul id="row1" className="flex items-center justify-start -mb-2">
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
                        Filter by Price Range
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
                        className={`text-xs px-4 py-1 rounded-e-md ${changeColour(
                            "fillingFactor"
                        )}`}
                        onClick={() => handleClick("fillingFactor")}
                    >
                        Filter by Filling Factor
                    </button>
                </li>
            </ul>
            <ul id="row2" className="flex items-center justify-start">
                <li className="p-2 cursor-pointer">
                    <button
                        className={`text-xs px-4 py-1 rounded-s-md ${changeColour(
                            "cuisine"
                        )}`}
                        onClick={() => handleClick("cuisine")}
                    >
                        Filter by Cuisine
                    </button>
                    <button
                        className={`text-xs px-4 py-1 ${changeColour(
                            "dietary"
                        )}`}
                        onClick={() => handleClick("dietary")}
                    >
                        Filter by Dietary
                    </button>
                    <button
                        className={`text-xs px-4 py-1 ${changeColour(
                            "starRatingSort"
                        )}`}
                        onClick={() => handleClick("starRatingSort")}
                    >
                        Sort by Stars
                    </button>
                    <button
                        className={`text-xs px-4 py-1 rounded-e-md ${changeColour(
                            "starRating"
                        )}`}
                        onClick={() => handleClick("starRating")}
                    >
                        Filter by Stars
                    </button>
                </li>
            </ul>
            <div>{changeFilter(activeFilter)}</div>
        </div>
    );
}
