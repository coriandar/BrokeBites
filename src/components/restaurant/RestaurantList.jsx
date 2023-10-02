import React from "react";
import { CheckUserDB } from "../account/UserDB";
import { showSymbol } from "./printSymbol";

const InitList = ({
    restaurantList,
    setRestaurantSelected,
    setCenter,
    setMapZoom,
    activeFilter,
    restaurantSelected,
}) => {
    const handleListItemClick = (restaurant) => {
        CheckUserDB(); // make implementation more elegant
        setRestaurantSelected(restaurant);
        setCenter({
            lat: restaurant.latitude,
            lng: restaurant.longitude,
        });
        setMapZoom(20);
    };

    return (
        <ul id="restaurantList">
            {restaurantList.map((restaurant) => (
                <li
                    key={restaurant.id}
                    onClick={() => handleListItemClick(restaurant)}
                >
                    <div
                        className={`flex justify-between m-2 p-4 rounded-lg shadow-lg hover:bg-slate-200 ${
                            restaurantSelected?.id === restaurant.id
                                ? "bg-slate-300 font-bold"
                                : "bg-white"
                        }`}
                    >
                        <p>{restaurant.name}</p>
                        <p className="font-light text-sm">
                            {showSymbol({ restaurant, activeFilter })}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default InitList;
