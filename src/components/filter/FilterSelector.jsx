import React from "react";
import {
    getFilteredCusine,
    getFilteredDietary,
    getFilteredFillingFactor,
    getFilteredPriceRating,
    getFilteredSearch,
    getFilteredStarRating,
    getFilteredPost,
    getFilteredPlace,
} from "./logic/filterLogic";
import { getSortedPriceRating, getSortedStarRating } from "./logic/sortedLogic";
import { getSortedDistance } from "./logic/getSortedDistance";
import { optCuisine } from "./options/optCuisine";
import { optDietary } from "./options/optDietary";
import { optFilling } from "./options/optFilling";
import { optPlace } from "./options/optPlace";
import { optPost } from "./options/optPost";
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
        } else if (activeFilter === "post") {
            return (
                <FilterType
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    options={optPost}
                    filterLogic={getFilteredPost}
                />
            );
        } else if (activeFilter === "place") {
            return (
                <FilterType
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    options={optPlace}
                    filterLogic={getFilteredPlace}
                />
            );
        }
    };

    return (
        <div className="-m-2 -mt-3">
            <ul id="filter1" className="flex items-center justify-start -mb-2">
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
                        className={`text-xs px-4 py-1 rounded-e-md ${changeColour(
                            "fillingFactor"
                        )}`}
                        onClick={() => handleClick("fillingFactor")}
                    >
                        Filter by Filling Factor
                    </button>
                </li>
            </ul>

            <ul id="filter2" className="flex items-center justify-start">
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
                        className={`text-xs px-4 py-1 rounded-e-md ${changeColour(
                            "starRating"
                        )}`}
                        onClick={() => handleClick("starRating")}
                    >
                        Filter by Stars
                    </button>
                </li>
            </ul>
            <ul id="filter3" className="flex items-center justify-start">
                <li className="p-2 cursor-pointer">
                    <button
                        className={`text-xs px-4 py-1 rounded-s-md ${changeColour(
                            "post"
                        )}`}
                        onClick={() => handleClick("post")}
                    >
                        Filter by Postcode
                    </button>
                    <button
                        className={`text-xs px-4 py-1 ${changeColour("place")}`}
                        onClick={() => handleClick("place")}
                    >
                        Filter by Place
                    </button>
                </li>
            </ul>
            <ul id="sort1" className="flex items-center justify-start">
                <li className="p-2 cursor-pointer">
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
                            "starRatingSort"
                        )}`}
                        onClick={() => handleClick("starRatingSort")}
                    >
                        Sort by Stars
                    </button>
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
