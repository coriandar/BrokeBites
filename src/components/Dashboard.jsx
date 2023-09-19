import React, { useState, useEffect } from "react";
import InitMap from "./map/Map";
import InitList from "./restaurant/RestaurantList";
import MarkerDetails from "./map/MarkerDetails";
import FilterSelector from "./filter/FilterSelector";
import CenterToUserButton from "./map/CenterButton";

export default function Dashboard({
    restaurantList,
    setRestaurantList,
    restaurantMasterList,
    activeDashboard,
}) {
    const [restaurantSelected, setRestaurantSelected] = useState(null);
    const [activeFilter, setActiveFilter] = useState("search");

    //default center position
    const [center, setCenter] = useState({
        lat: -36.8537761039407,
        lng: 174.7658246985396,
    });

    const [mapZoom, setMapZoom] = useState(17);

    const handleDeselect = () => {
        setRestaurantSelected(null);
    };

    return (
        <div className="flex h-full">
            <div className="bg-slate-100 m-4 flex flex-col justify-start w-1/4">
                <FilterSelector
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                />

                <div className="overflow-y-auto no-scrollbar h-90% m-4">
                    <InitList
                        restaurantList={restaurantList}
                        setRestaurantSelected={setRestaurantSelected}
                        restaurantSelected={restaurantSelected}
                        setCenter={setCenter}
                        setMapZoom={setMapZoom}
                        activeFilter={activeFilter}
                    />
                </div>
            </div>

            <div className="bg-slate-300 w-3/4 relative">
                <InitMap
                    restaurantList={restaurantList}
                    setRestaurantSelected={setRestaurantSelected}
                    restaurantSelected={restaurantSelected}
                    setCenter={setCenter}
                    center={center}
                    mapZoom={mapZoom}
                    setMapZoom={setMapZoom}
                    activeDashboard={activeDashboard}
                />
                <div className="bg-slate-300 w-30% bg-opacity-90 absolute bottom-0 left-0 rounded-2xl p-6 m-8">
                    {restaurantSelected && (
                        <div className="relative">
                            <button
                                className="w-4 h-4 absolute right-0 top-0 text-xs"
                                onClick={handleDeselect}
                            >
                                ✖
                            </button>
                        </div>
                    )}
                    <MarkerDetails selected={restaurantSelected} />
                </div>
            </div>
            <CenterToUserButton setCenter={setCenter} />
        </div>
    );
}
