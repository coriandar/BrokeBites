import React from "react";
import MarkerDetails from "./components/MarkerDetails";
import ButtonClose from "../__shared__/ui/ButtonClose";
import RandomRestaurant from "./RandomRestaurant";

export default function RestaurantInfo({
    handleDeselect,
    restaurantList,
    setRestaurantSelected,
    restaurantSelected,
    setCenter,
    setMapZoom,
    userGeo,
}) {
    return (
        <>
            {restaurantSelected && <ButtonClose action={handleDeselect} />}
            <MarkerDetails selected={restaurantSelected} userGeo={userGeo} />
            <RandomRestaurant
                restaurantList={restaurantList}
                setRestaurantSelected={setRestaurantSelected}
                setCenter={setCenter}
                setMapZoom={setMapZoom}
            />
        </>
    );
}
