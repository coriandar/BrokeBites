import React from "react";
import { CheckUserDB } from "../account/UserDB";
import { showSymbol } from "./printSymbol";

const RandomRestaurant = ({
    restaurantList,
    setRestaurantSelected,
    restaurantSelected,
    setCenter,
    setMapZoom,
}) => {
    const handleRandomRestaurantClick = () => {
        CheckUserDB(); // make implementation more elegant
        let random =
            restaurantList[Math.floor(Math.random() * restaurantList.length)];

        setRestaurantSelected(random);
        setCenter({
            lat: restaurantSelected.latitude,
            lng: restaurantSelected.longitude,
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
