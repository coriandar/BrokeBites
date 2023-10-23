import React, { useState } from "react";
import InitMap from "../map/MapContainer";
import InitList from "../restaurant/RestaurantList";
import CenterToUserButton from "../map/components/CenterButton";
import MapSetings from "../mapOptions/MapSettings";
import FilterSelector from "../filter/FilterSelector";
import SortSelector from "../sort/SortSelector";
import RestaurantInfo from "../restaurant/RestaurantInfo";
import defaultCenter from "../__shared__/defaultCenter";
import Layer from "../__shared__/layout/Layer";
import { ListToggle } from "../restaurant/components/ListToggle";
import { checkPremiumStatus } from "@/database/firebase/firestore/userDB";

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
    const [showList, setShowList] = useState(true);
    const isPremium = checkPremiumStatus();

    //map markers
    const handleDeselect = () => {
        setRestaurantSelected(null);
    };

    //parent component
    return (
        <div className="flex h-full">
            {showList && (
                <div className="m-4 flex w-1/4 flex-col justify-start bg-slate-100">
                    <SortSelector
                        restaurantMasterList={restaurantMasterList}
                        setRestaurantList={setRestaurantList}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        userGeo={userGeo}
                    />
                    <div className="no-scrollbar m-4 h-90% overflow-y-auto">
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
            )}
            <div className="relative w-full bg-slate-300">
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
                <Layer position={"top-72 left-8"}>
                    <ListToggle
                        showOptions={showList}
                        setShowOptions={setShowList}
                    />
                </Layer>
                <Layer position={"top-16 left-8"}>
                    <FilterSelector
                        restaurantMasterList={restaurantMasterList}
                        setRestaurantList={setRestaurantList}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        userGeo={userGeo}
                    />
                </Layer>

                <Layer position={"bottom-8 left-8"}>
                    {/* if premium, display ads here */}
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
                </Layer>
                <Layer position={"top-2 right-14"}>
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
                </Layer>
                <Layer position={"bottom-48 right-2"}>
                    <CenterToUserButton
                        setCenter={setCenter}
                        userLocation={userLocation}
                        userGeo={userGeo}
                        setUserGeo={setUserGeo}
                    />
                </Layer>
            </div>
        </div>
    );
}
