import React from "react";
import UserLocMarker from "./components/UserLocMarker";
import MapMarker from "./components/MapMarker";
import Map from "./components/Map";
import HeatMap from "./HeatMap";

export const InitMap = ({
    restaurantList,
    setRestaurantSelected,
    setCenter,
    center,
    mapZoom,
    setMapZoom,
    restaurantSelected,
    activeDashboard,
    mapMarkerToggle,
    mapTheme,
    setMapTheme,
    userLocation,
    userGeo,
    heatmapToggle,
}) => {
    return (
        <Map
            center={center}
            mapZoom={mapZoom}
            mapTheme={mapTheme}
            setMapTheme={setMapTheme}
        >
            <UserLocMarker userGeo={userGeo} userLocation={userLocation} />
            <MapMarker
                mapMarkerToggle={mapMarkerToggle}
                restaurantList={restaurantList}
                setRestaurantSelected={setRestaurantSelected}
                setCenter={setCenter}
                setMapZoom={setMapZoom}
                restaurantSelected={restaurantSelected}
                activeDashboard={activeDashboard}
            />
            <HeatMap
                restaurantList={restaurantList}
                heatmapToggle={heatmapToggle}
            />
        </Map>
    );
};

export default InitMap;
