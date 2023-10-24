import React from "react";
import { getSortedPriceRating, getSortedStarRating } from "./logic/sortedLogic";
import { getSortedDistance } from "./logic/getSortedDistance";
import SortBy from "./components/SortBy";
import { BottomTooltip } from "../ui/tooltip/Tooltip";
import { ButtonCircleIcon } from "../ui/buttons/ButtonCircleIcon";
import { CircleDollarSign, LandPlot, Star } from "lucide-react";

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
        <div className="-m-2 -mt-3 space-x-8">
            <ul id="sort1" className="flex items-center">
                <div className="flex items-center space-x-3 px-10">
                    <div className="group relative cursor-pointer py-2">
                        <BottomTooltip text={"Sort by Price"} />
                        <ButtonCircleIcon
                            action={() => handleClick("sortPrice")}
                        >
                            <CircleDollarSign />
                        </ButtonCircleIcon>
                    </div>

                    <div className="group relative cursor-pointer py-2">
                        <BottomTooltip text={"Sort by Stars"} />
                        <ButtonCircleIcon
                            action={() => handleClick("starRatingSort")}
                        >
                            <Star />
                        </ButtonCircleIcon>
                    </div>

                    {/* <button
                        className={`rounded-md px-4 py-1 text-xs ${changeColour(
                            "nearestSort",
                        )}`}
                        onClick={() => handleClick("nearestSort")}
                    >
                        Sort by Nearest
                    </button> */}

                    <div className="group relative cursor-pointer py-2">
                        <BottomTooltip text={"Sort by Nearest"} />
                        <ButtonCircleIcon
                            action={() => handleClick("nearestSort")}
                        >
                            <LandPlot />
                        </ButtonCircleIcon>
                    </div>
                </div>
            </ul>
            <div>{changeFilter(activeFilter)}</div>
        </div>
    );
}
