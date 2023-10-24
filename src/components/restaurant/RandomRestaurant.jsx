import React from "react";
import ButtonLarge from "../__shared__/ui/ButtonLarge";
import { Button } from "../ui/shadcn-ui/button";

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
        <Button onClick={handleRandomRestaurantClick}>
            I'm feeling hungry
        </Button>
    );
};

export default RandomRestaurant;
