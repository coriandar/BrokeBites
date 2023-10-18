import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { light, dark, retro } from "../config/MapStyles.config";

const libraries = ["places", "visualization"];
const mapApiKey = process.env.NEXT_PUBLIC_FB_API_KEY;

// Set Map size
const mapContainerStyle = {
    height: "100%",
    width: "100%",
};

export default function Map({ center, mapZoom, mapTheme, children }) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: mapApiKey,
        libraries,
    });

    const mapUIOptions = {
        disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true,
        streetViewControl: true,
    };

    const mapStyles = {
        styles: (() => {
            if (mapTheme === "light") return light;
            else if (mapTheme === "dark") return dark;
            else if (mapTheme === "retro") return retro;
        })(),
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
            options={{
                ...mapUIOptions,
                ...mapStyles,
            }}
        >
            {children}
        </GoogleMap>
    );
}
