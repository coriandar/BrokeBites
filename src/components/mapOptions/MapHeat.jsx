import React from "react";
import ToggleSwitch from "../navigation/ToggleSwitch";

export default function MapHeat({ state, setState }) {
    return (
        <div className="m-1">
            <ToggleSwitch
                label={"Price Heatmap"}
                state={state}
                setState={setState}
            />
        </div>
    );
}
