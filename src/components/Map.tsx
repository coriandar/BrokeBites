import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"]; // Add any additional libraries you might need

const InitMap = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDZAwRjjNNAFiNwcEjkfvCFpSQmS7L5ZaI",
        libraries: libraries as any,
    });

    if (!isLoaded) return <div>Loading...</div>;

    const mapContainerStyle = {
        width: "100vw",
        height: "100vh",
    };

    return (
        <GoogleMap
            zoom={15}
            center={{ lat: -36.85, lng: 174.76 }}
            mapContainerStyle={mapContainerStyle} // Add this line
        >
            {/* Add markers or other map components here */}
        </GoogleMap>
    );
};

export default InitMap;
