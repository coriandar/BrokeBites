import React, { useState } from "react";
import InitMap from "../map/Map";
import InitList from "../restaurant/RestaurantList";
import CenterToUserButton from "../map/components/CenterButton";
import MapSetings from "../mapOptions/MapSettings";
import FilterSelector from "../filter/FilterSelector";
import RestaurantInfo from "../restaurant/RestaurantInfo";
import defaultCenter from "../__shared__/defaultCenter";

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
    const [userGeo, setUserGeo] = useState(defaultCenter);
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
                    userGeo={userGeo}
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
                <RestaurantInfo
                    handleDeselect={handleDeselect}
                    restaurantList={restaurantList}
                    setRestaurantSelected={setRestaurantSelected}
                    restaurantSelected={restaurantSelected}
                    setCenter={setCenter}
                    center={center}
                    mapZoom={mapZoom}
                    setMapZoom={setMapZoom}
                    userGeo={userGeo}
                />
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
                    setCenter={setCenter}
                    userLocation={userLocation}
                    userGeo={userGeo}
                    setUserGeo={setUserGeo}
                />
            </div>
        </div>
    );
}
