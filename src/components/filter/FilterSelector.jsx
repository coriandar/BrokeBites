import React from "react";
import { getFilteredCusine } from "./logic/getFilteredCusine";
import { getFilteredDietary } from "./logic/getFilteredDietary";
import { getFilteredFillingFactor } from "./logic/getFilteredFillingFactor";
import { getFilteredPriceRating } from "./logic/getFilteredPriceRating";
import { getFilteredSearch } from "./logic/getFilteredSearch";
import { getFilteredStarRating } from "./logic/getFilteredStarRating";
import { getSortedDistance } from "./logic/getSortedDistance";
import { getSortedPriceRating } from "./logic/getSortedPriceRating";
import { getSortedStarRating } from "./logic/getSortedStarRating";
import { optCuisine } from "./options/optCuisine";
import { optDietary } from "./options/optDietary";
import { optFilling } from "./options/optFilling";
import FilterSearch from "./components/FilterSearch";
import FilterSlider from "./components/FilterSlider";
import FilterType from "./components/FilterType";
import SortBy from "./components/SortBy";

export default function FilterSelector({
    activeFilter,
    setActiveFilter,
    restaurantMasterList, // master list
    setRestaurantList, // setRestaurant function
    userGeo,
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
                <FilterSearch
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    filterLogic={getFilteredSearch}
                />
            );
        } else if (activeFilter === "priceRange") {
            return (
                <FilterSlider
                    sliderLabel="Price Range:"
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    filterLogic={getFilteredPriceRating}
                />
            );
        } else if (activeFilter === "sortPrice") {
            return (
                <SortBy
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    sortLogic={getSortedPriceRating}
                />
            );
        } else if (activeFilter === "fillingFactor") {
            return (
                <FilterType
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    options={optFilling}
                    filterLogic={getFilteredFillingFactor}
                />
            );
        } else if (activeFilter === "cuisine") {
            return (
                <FilterType
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    options={optCuisine}
                    filterLogic={getFilteredCusine}
                />
            );
            a;
        } else if (activeFilter === "dietary") {
            return (
                <FilterType
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    options={optDietary}
                    filterLogic={getFilteredDietary}
                />
            );
        } else if (activeFilter === "starRatingSort") {
            return (
                <SortBy
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    sortLogic={getSortedStarRating}
                />
            );
        } else if (activeFilter === "starRating") {
            return (
                <FilterSlider
                    sliderLabel="Star Range:"
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    filterLogic={getFilteredStarRating}
                />
            );
        } else if (activeFilter === "nearestSort") {
            return (
                <SortBy
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    sortLogic={getSortedDistance}
                    userGeo={userGeo}
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
            <ul id="row3" className="flex items-center justify-start">
                <li className="p-2 cursor-pointer">
                    <button
                        className={`text-xs px-4 py-1 rounded-md ${changeColour(
                            "nearestSort"
                        )}`}
                        onClick={() => handleClick("nearestSort")}
                    >
                        Sort by Nearest
                    </button>
                </li>
            </ul>
            <div>{changeFilter(activeFilter)}</div>
        </div>
    );
}
