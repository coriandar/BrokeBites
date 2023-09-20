import React from "react";
import ToggleSwitch from "../navigation/ToggleSwitch";

export default function MapMarkers({ state, setState }) {
    return (
        <div className="m-1">
            <ToggleSwitch
                label={"Map Markers"}
                state={state}
                setState={setState}
            />
        </div>
    );
}
