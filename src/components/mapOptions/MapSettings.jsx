import React, { useState } from "react";
import { MapCog } from "./components/MapCog";
import MapTheme from "./components/MapTheme";
import MapMarkers from "./components/MapMarkers";
import MapHeat from "./components/MapHeat";
import MapUserLocation from "./components/MapUserLocation";

export default function MapSetings({
    mapTheme,
    setMapTheme,
    mapMarkerToggle,
    setMapMarkerToggle,
    heatmapToggle,
    setHeatmapToggle,
    userLocation,
    setUserLocation,
}) {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <>
            {showOptions ? (
                <div className="relative flex flex-col justify-center">
                    <div className="flex justify-end">
                        <MapCog
                            showOptions={showOptions}
                            setShowOptions={setShowOptions}
                        />
                    </div>
                    <MapHeat
                        state={heatmapToggle}
                        setState={setHeatmapToggle}
                    />
                    <MapMarkers
                        state={mapMarkerToggle}
                        setState={setMapMarkerToggle}
                    />
                    <MapUserLocation
                        state={userLocation}
                        setState={setUserLocation}
                    />
                    <MapTheme mapTheme={mapTheme} setMapTheme={setMapTheme} />
                </div>
            ) : (
                <MapCog
                    showOptions={showOptions}
                    setShowOptions={setShowOptions}
                />
            )}
        </>
    );
}
