import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import HeatMap from "./HeatMap";
import { light, retro, dark } from "@/config/MapStyles";
import UserLocMarker from "./UserLocMarker";

const libraries = ["places", "visualization"];
const mapApiKey = process.env.NEXT_PUBLIC_FB_API_KEY;

// Set Map size
const mapContainerStyle = {
    height: "100%",
    width: "100%",
};

let zoomIn = 17;

export const InitMap = ({
    restaurantList,
    setRestaurantSelected,
    setCenter,
    center,
    mapZoom,
    setMapZoom,
    restaurantSelected,
    activeDashboard,
    heatmapToggle,
    mapMarkerToggle,
    mapTheme,
    setMapTheme,
    userLocation,
    userGeo,
    setUserGeo,
}) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: mapApiKey,
        libraries,
    });

    const [map, setMap] = useState(null);

    const mapStyles = {
        styles: (() => {
            if (mapTheme === "light") return light;
            else if (mapTheme === "dark") return dark;
            else if (mapTheme === "retro") return retro;
        })(),
    };

    const handleMapLoad = (map) => {
        setMap(map);
    };

    const [isMarkerClicked, setIsMarkerClicked] = useState(false);

    const handleMarkerClick = (restaurant) => {
        setRestaurantSelected(restaurant);
        setCenter({
            lat: restaurant.latitude,
            lng: restaurant.longitude,
        });
        setMapZoom(20);
    };

    // displays loading or loading error for map
    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    // Returns GoogleMap centered on AUT with restaurants highlighted by a marker
    return (
        <GoogleMap
            zoom={mapZoom}
            center={center} // need set this to change, update based on selection
            mapContainerStyle={mapContainerStyle}
            options={mapStyles}
        >
            {/* <HeatMap
                restaurantList={restaurantList}
                heatmapToggle={heatmapToggle}
            /> */}

            <UserLocMarker userGeo={userGeo} userLocation={userLocation} />

            {mapMarkerToggle &&
                restaurantList.map((restaurant) => (
                    <Marker
                        key={restaurant.id}
                        position={{
                            lat: restaurant.latitude,
                            lng: restaurant.longitude,
                        }}
                        title={restaurant.name} // Display the restaurant name on marker hover
                        icon={
                            restaurantSelected?.id === restaurant.id
                                ? "/pink-dot-bite.png" // Use a different icon for the selected marker
                                : activeDashboard === "all"
                                ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" // Use the default marker icon for others
                                : activeDashboard === "favourite"
                                ? "http://maps.google.com/mapfiles/ms/icons/purple-dot.png" // icon for favorites
                                : "http://maps.google.com/mapfiles/ms/icons/green-dot.png" // icon for toVisit
                        }
                        onClick={() => handleMarkerClick(restaurant)}
                    />
                ))}
        </GoogleMap>
    );
};

export default InitMap;
