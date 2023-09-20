import React, { useState, useEffect } from "react";
import InitMap from "./map/Map";
import InitList from "./restaurant/RestaurantList";
import MarkerDetails from "./map/MarkerDetails";
import FilterSelector from "./filter/FilterSelector";
import CenterToUserButton from "./map/CenterButton";
import MapSetings from "./mapOptions/MapSettings";

export default function Dashboard({
    restaurantList,
    setRestaurantList,
    restaurantMasterList,
    activeDashboard,
    mapTheme,
    setMapTheme,
}) {
    const [restaurantSelected, setRestaurantSelected] = useState(null);
    const [activeFilter, setActiveFilter] = useState("search");
    const [heatmapToggle, setHeatmapToggle] = useState(false);
    const [mapMarkerToggle, setMapMarkerToggle] = useState(true);
    const [userLocation, setUserLocation] = useState(true);
    const [mapZoom, setMapZoom] = useState(17);
    const [userGeo, setUserGeo] = useState(null);

    //default center position(AUT)
    const defaultCenter = {
        lat: -36.8537761039407,
        lng: 174.7658246985396,
    };

    const [center, setCenter] = useState(defaultCenter);

    //map markers
    const handleDeselect = () => {
        setRestaurantSelected(null);
    };

    //parent component
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
                    heatmapToggle={heatmapToggle}
                    mapMarkerToggle={mapMarkerToggle}
                    mapTheme={mapTheme}
                    setMapTheme={setMapTheme}
                    userLocation={userLocation}
                    userGeo={userGeo}
                    setUserGeo={setUserGeo}
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
                <MapSetings
                    mapTheme={mapTheme}
                    setMapTheme={setMapTheme}
                    mapMarkerToggle={mapMarkerToggle}
                    setMapMarkerToggle={setMapMarkerToggle}
                    heatmapToggle={heatmapToggle}
                    setHeatmapToggle={setHeatmapToggle}
                    userLocation={userLocation}
                    setUserLocation={setUserLocation}
                />
                <CenterToUserButton
                    defaultCenter={defaultCenter}
                    setCenter={setCenter}
                    userLocation={userLocation}
                    userGeo={userGeo}
                    setUserGeo={setUserGeo}
                />
            </div>
        </div>
    );
}
