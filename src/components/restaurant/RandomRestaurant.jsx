import React from "react";
import ButtonLarge from "../__shared__/ui/ButtonLarge";

const RandomRestaurant = ({
    restaurantList,
    setRestaurantSelected,
    setCenter,
    setMapZoom,
}) => {
    const handleRandomRestaurantClick = () => {
        let restaurant =
            restaurantList[Math.floor(Math.random() * restaurantList.length)];

        if (!restaurant?.latitude || !restaurant?.longitude) return;

        setRestaurantSelected(restaurant);
        setCenter({
            lat: restaurant.latitude,
            lng: restaurant.longitude,
        });
        setMapZoom(20);
    };
    return (
        <ButtonLarge
            label={"I'm feeling hungry"}
            action={handleRandomRestaurantClick}
        />
    );
};

export default RandomRestaurant;
