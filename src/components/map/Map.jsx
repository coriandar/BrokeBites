import React, { useState, useEffect } from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    HeatmapLayerF,
} from "@react-google-maps/api";
import HeatMap from "./HeatMap";

const libraries = ["places", "visualization"];
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
    heatmapToggle,
    mapMarkerToggle,
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

    const heatmapData = restaurantList.map((restaurant) => ({
        location: new window.google.maps.LatLng(
            restaurant.latitude,
            restaurant.longitude
        ),
        weight: restaurant.priceRating, // Assuming priceRating is a property of your restaurant object
    }));

    // Define heatmap options
    const heatmapOptions = {
        radius: 40, // Adjust the radius as needed
        opacity: heatmapToggle ? 0.7 : 0.0, // Set opacity based on heatmapToggle
        // gradient: ["rgba(255, 0, 0, 0)", "rgba(255, 0, 0, 1)"], // Customize the gradient colors
    };

    // displays loading or loading error for map
    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    // Returns GoogleMap centered on AUT with restaurants highlighted by a marker
    return (
        <>
            {heatmapToggle ? (
                <GoogleMap
                    zoom={mapZoom}
                    center={center} // need set this to change, update based on selection
                    mapContainerStyle={mapContainerStyle}
                    options={{ styles: mapStyles }}
                >
                    {heatmapToggle && (
                        <HeatMap restaurantList={restaurantList} />
                    )}

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
            ) : (
                <GoogleMap
                    zoom={mapZoom}
                    center={center} // need set this to change, update based on selection
                    mapContainerStyle={mapContainerStyle}
                    options={{ styles: mapStyles }}
                >
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
            )}
        </>
    );
};

export default InitMap;
