import React, { useState } from "react";
import {
    getFilteredCusine,
    getFilteredDietary,
    getFilteredFillingFactor,
    getFilteredPriceRating,
    getFilteredSearch,
    getFilteredStarRating,
    getFilteredPost,
    getFilteredPlace,
    getFilteredCardinal,
} from "./logic/filterLogic";
import { optCuisine } from "./options/optCuisine";
import { optDietary } from "./options/optDietary";
import { optFilling } from "./options/optFilling";
import { optPlace } from "./options/optPlace";
import { optPost } from "./options/optPost";
import { optCardinal } from "./options/optCardinal";
import FilterSearch from "./components/FilterSearch";
import FilterSlider from "./components/FilterSlider";
import FilterType from "./components/FilterType";
import { FilterButton } from "./components/FilterButton";
import { ButtonCircleIcon } from "../ui/buttons/ButtonCircleIcon";
import {
    CircleDollarSign,
    Compass,
    Fuel,
    Globe2,
    Mailbox,
    Salad,
    Search,
    Star,
    Utensils,
} from "lucide-react";
import { TopTooltip } from "../ui/tooltip/Tooltip";

export default function FilterSelector({
    activeFilter,
    setActiveFilter,
    restaurantMasterList, // master list
    setRestaurantList, // setRestaurant function
}) {
    const [showOptions, setShowOptions] = useState(false);

    const handleClick = (buttonName) => {
        setActiveFilter(buttonName);
        changeColour(buttonName);
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
        } else if (activeFilter === "starRating") {
            return (
                <FilterSlider
                    sliderLabel="Star Range:"
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    filterLogic={getFilteredStarRating}
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
        } else if (activeFilter === "cardinal") {
            return (
                <FilterType
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    options={optCardinal}
                    filterLogic={getFilteredCardinal}
                />
            );
        }
    };

    return (
        <>
            {showOptions ? (
                <div className="-m-2 -mt-3">
                    <FilterButton
                        showOptions={showOptions}
                        setShowOptions={setShowOptions}
                    />
                    <ul
                        id="filter1"
                        className="-mb-2 flex items-center justify-start"
                    >
                        <div className="-ml-1 flex space-x-2">
                            <div className="group relative cursor-pointer py-2">
                                <TopTooltip text={"Search"} />
                                <ButtonCircleIcon
                                    action={() => handleClick("search")}
                                >
                                    <Search />
                                </ButtonCircleIcon>
                            </div>

                            <div className="group relative cursor-pointer py-2">
                                <TopTooltip text={"Price Range"} />
                                <ButtonCircleIcon
                                    action={() => handleClick("priceRange")}
                                >
                                    <CircleDollarSign />
                                </ButtonCircleIcon>
                            </div>

                            <div className="group relative cursor-pointer py-2">
                                <TopTooltip text={"Filling Factor"} />
                                <ButtonCircleIcon
                                    action={() => handleClick("fillingFactor")}
                                >
                                    <Fuel />
                                </ButtonCircleIcon>
                            </div>
                        </div>
                    </ul>

                    <ul
                        id="filter2"
                        className="flex items-center justify-start"
                    >
                        <div className="-ml-1 flex space-x-2">
                            <div className="group relative cursor-pointer py-2">
                                <TopTooltip text={"Cuisine"} />
                                <ButtonCircleIcon
                                    action={() => handleClick("cuisine")}
                                >
                                    <Globe2 />
                                </ButtonCircleIcon>
                            </div>

                            <div className="group relative cursor-pointer py-2">
                                <TopTooltip text={"Dietary"} />
                                <ButtonCircleIcon
                                    action={() => handleClick("dietary")}
                                >
                                    <Salad />
                                </ButtonCircleIcon>
                            </div>

                            <div className="group relative cursor-pointer py-2">
                                <TopTooltip text={"Star Rating"} />
                                <ButtonCircleIcon
                                    action={() => handleClick("starRating")}
                                >
                                    <Star />
                                </ButtonCircleIcon>
                            </div>
                        </div>
                    </ul>
                    <ul
                        id="filter3"
                        className="flex items-center justify-start"
                    >
                        <div className="-ml-1 flex space-x-2">
                            <div className="group relative cursor-pointer py-2">
                                <TopTooltip text={"Post Code"} />
                                <ButtonCircleIcon
                                    action={() => handleClick("post")}
                                >
                                    <Mailbox />
                                </ButtonCircleIcon>
                            </div>

                            <div className="group relative cursor-pointer py-2">
                                <TopTooltip text={"Place Type"} />
                                <ButtonCircleIcon
                                    action={() => handleClick("place")}
                                >
                                    <Utensils />
                                </ButtonCircleIcon>
                            </div>

                            <div className="group relative cursor-pointer py-2">
                                <TopTooltip text={"Cardinal"} />
                                <ButtonCircleIcon
                                    action={() => handleClick("cardinal")}
                                >
                                    <Compass />
                                </ButtonCircleIcon>
                            </div>
                        </div>
                    </ul>
                    <div>{changeFilter(activeFilter)}</div>
                </div>
            ) : (
                <FilterButton
                    showOptions={showOptions}
                    setShowOptions={setShowOptions}
                />
            )}
        </>
    );
}
