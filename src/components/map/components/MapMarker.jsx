import React from "react";
import { Marker } from "@react-google-maps/api";

export default function MapMarker({
    restaurantList,
    setRestaurantSelected,
    setCenter,
    setMapZoom,
    restaurantSelected,
    activeDashboard,
    mapMarkerToggle,
}) {
    const handleMarkerClick = (restaurant) => {
        setRestaurantSelected(restaurant);
        setCenter({
            lat: restaurant.latitude,
            lng: restaurant.longitude,
        });
        setMapZoom(20);
    };

    return (
        <>
            {mapMarkerToggle &&
                restaurantList.map((restaurant) => (
                    <Marker
                        key={restaurant?.id}
                        position={{
                            lat: restaurant?.latitude,
                            lng: restaurant?.longitude,
                        }}
                        title={restaurant?.name} // Display the restaurant name on marker hover
                        icon={
                            restaurantSelected?.id === restaurant?.id
                                ? "/pink-dot-bite.png" // Use a different icon for the selected marker
                                : activeDashboard === "all"
                                ? "/blue-dot.png" // Use the default marker icon for others
                                : activeDashboard === "favourite"
                                ? "/purple-dot.png" // icon for favorites
                                : "/green-dot.png" // icon for toVisit
                        }
                        onClick={() => handleMarkerClick(restaurant)}
                    />
                ))}
        </>
    );
}
