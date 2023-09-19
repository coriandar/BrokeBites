import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapApiKey = process.env.NEXT_PUBLIC_FB_API_KEY;

// Set Map size
const mapContainerStyle = {
    height: "100%",
    width: "100%",
};

let zoomIn = 17;

// Set Map Styles (specifically, turn off points of interest)
const mapStyles = [
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
    },
];

export const InitMap = ({
    restaurantList,
    setRestaurantSelected,
    setCenter,
    center,
    mapZoom,
    setMapZoom,
    restaurantSelected,
    activeDashboard,
}) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: mapApiKey,
        libraries,
    });

    const [map, setMap] = useState(null);

    const handleMapLoad = (map) => {
        setMap(map);
    };

    const [isMarkerClicked, setIsMarkerClicked] = useState(false);

    const handleMarkerClick = (restaurant) => {
        console.log("Clicked restaurant:", restaurant); // Log the clicked restaurant
        setRestaurantSelected(restaurant);
        console.log("restaurantSelected after click:", restaurantSelected);
        setCenter({
            lat: restaurant.latitude,
            lng: restaurant.longitude,
        });
        setMapZoom(20);
    };

    console.log("restaurantSelected:", restaurantSelected);

    // displays loading or loading error for map
    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    // Returns GoogleMap centered on AUT with restaurants highlighted by a marker
    return (
        <GoogleMap
            zoom={mapZoom}
            center={center} // need set this to change, update based on selection
            mapContainerStyle={mapContainerStyle}
            options={{ styles: mapStyles }}
        >
            {/* marker to display user pos */}
            <Marker position={center} title="You are here" />
            {/* marker to display restaurant pos */}
            {restaurantList.map((restaurant) => (
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
