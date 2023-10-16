import React from "react";
import { getSortedPriceRating, getSortedStarRating } from "./logic/sortedLogic";
import { getSortedDistance } from "./logic/getSortedDistance";
import SortBy from "./components/SortBy";

export default function SortSelector({
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
        if (activeFilter === "sortPrice") {
            return (
                <SortBy
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    sortLogic={getSortedPriceRating}
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
            <ul id="sort1" className="flex items-center justify-start">
                <li className="cursor-pointer p-2">
                    <button
                        className={`px-4 py-1 text-xs ${changeColour(
                            "sortPrice",
                        )}`}
                        onClick={() => handleClick("sortPrice")}
                    >
                        Sort by Price
                    </button>
                    <button
                        className={`px-4 py-1 text-xs ${changeColour(
                            "starRatingSort",
                        )}`}
                        onClick={() => handleClick("starRatingSort")}
                    >
                        Sort by Stars
                    </button>
                    <button
                        className={`rounded-md px-4 py-1 text-xs ${changeColour(
                            "nearestSort",
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
