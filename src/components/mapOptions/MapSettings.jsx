import React from "react";
import MapTheme from "./MapTheme";
import MapMarkers from "./MapMarkers";
import MapHeat from "./MapHeat";

export default function MapSetings({
    mapTheme,
    setMapTheme,
    mapMarkerToggle,
    setMapMarkerToggle,
    heatmapToggle,
    setHeatmapToggle,
}) {
    return (
        <div className="bg-slate-300 w-80 bg-opacity-90 absolute top-0 right-0 rounded-2xl p-4 mr-14 mt-2">
            <div className="relative flex flex-col justify-center">
                <MapHeat state={heatmapToggle} setState={setHeatmapToggle} />
                <MapMarkers
                    state={mapMarkerToggle}
                    setState={setMapMarkerToggle}
                />
                <MapTheme mapTheme={mapTheme} setMapTheme={setMapTheme} />
            </div>
        </div>
    );
}
