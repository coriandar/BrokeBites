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

const InitMap = ({
    restaurantList,
    setRestaurantSelected,
    setCenter,
    center,
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
        console.log(restaurant);
        setRestaurantSelected(restaurant);
        setCenter({
            lat: restaurant.latitude,
            lng: restaurant.longitude,
        });
        zoomIn = 19;
    };

    // displays loading or loading error for map
    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    // Returns GoogleMap centered on AUT with restaurants highlighted by a marker
    return (
        <GoogleMap
            zoom={zoomIn}
            center={center} // need set this to change, update based on selection
            mapContainerStyle={mapContainerStyle}
            options={{ styles: mapStyles }}
        >
            {restaurantList.map((restaurant) => (
                <Marker
                    key={restaurant.id}
                    position={{
                        lat: restaurant.latitude,
                        lng: restaurant.longitude,
                    }}
                    title={restaurant.name} // Display the restaurant name on marker hover
                    onClick={() => handleMarkerClick(restaurant)}
                />
            ))}
        </GoogleMap>
    );
};

export default InitMap;
