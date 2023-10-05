import React from "react";
import { CheckUserDB } from "../account/UserDB";
import { showSymbol } from "./printSymbol";

const RandomRestaurant = ({
    restaurantList,
    setRestaurantSelected,
    setCenter,
    setMapZoom,
}) => {
    const handleRandomRestaurantClick = () => {
        CheckUserDB(); // make implementation more elegant
        let restaurant =
            restaurantList[Math.floor(Math.random() * restaurantList.length)];

        setRestaurantSelected(restaurant);
        setCenter({
            lat: restaurant.latitude,
            lng: restaurant.longitude,
        });
        setMapZoom(20);
    };

    return (
        <button onClick={handleRandomRestaurantClick}>
            I'm feeling hungry
        </button>
    );
};

export default RandomRestaurant;
