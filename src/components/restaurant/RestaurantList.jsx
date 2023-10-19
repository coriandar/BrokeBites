import React from "react";
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
        setRestaurantSelected(restaurant);
        setCenter({
            lat: restaurant.latitude,
            lng: restaurant.longitude,
        });
        setMapZoom(20);
    };

    return (
        <ul id="restaurantList">
            {restaurantList.map((restaurant) =>
                restaurant ? (
                    <li
                        key={restaurant?.id}
                        onClick={() => handleListItemClick(restaurant)}
                    >
                        <div
                            className={`m-2 flex justify-between rounded-lg p-4 shadow-lg hover:bg-slate-200 ${
                                restaurantSelected?.id === restaurant?.id
                                    ? "bg-slate-300 font-bold"
                                    : "bg-white"
                            }`}
                        >
                            <p>{restaurant?.name}</p>
                            <p className="text-sm font-light">
                                {showSymbol({ restaurant, activeFilter })}
                            </p>
                        </div>
                    </li>
                ) : (
                    <></>
                ),
            )}
        </ul>
    );
};

export default InitList;
