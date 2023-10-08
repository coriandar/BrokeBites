import React from "react";
import MarkerDetails from "../map/components/MarkerDetails";
import ButtonClose from "../__shared__/ui/ButtonClose";
import RandomRestaurant from "./RandomRestaurant";

export default function RestaurantInfo({
    handleDeselect,
    restaurantList,
    setRestaurantSelected,
    restaurantSelected,
    setCenter,
    center,
    mapZoom,
    setMapZoom,
    userGeo,
}) {
    return (
        <div className="bg-slate-300 w-30% bg-opacity-90 absolute bottom-0 left-0 rounded-2xl p-6 m-8">
            {restaurantSelected && (
                <div className="relative">
                    <ButtonClose action={handleDeselect} />
                </div>
            )}
            <MarkerDetails selected={restaurantSelected} userGeo={userGeo} />
            <RandomRestaurant
                restaurantList={restaurantList}
                setRestaurantSelected={setRestaurantSelected}
                setCenter={setCenter}
                setMapZoom={setMapZoom}
            />
        </div>
    );
}
