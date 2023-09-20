import React, { useState } from "react";
import { MapCog } from "./MapCog";
import MapTheme from "./MapTheme";
import MapMarkers from "./MapMarkers";
import MapHeat from "./MapHeat";
import MapUserLocation from "./MapUserLocation";

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
                <div className="bg-slate-300 w-80 bg-opacity-90 absolute top-0 right-0 rounded-2xl p-4 mr-14 mt-2">
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
                        <MapTheme
                            mapTheme={mapTheme}
                            setMapTheme={setMapTheme}
                        />
                    </div>
                </div>
            ) : (
                <div className="bg-slate-300 bg-opacity-90 absolute top-0 right-0 rounded-2xl p-4 mr-14 mt-2">
                    <MapCog
                        showOptions={showOptions}
                        setShowOptions={setShowOptions}
                    />
                </div>
            )}
        </>
    );
}
