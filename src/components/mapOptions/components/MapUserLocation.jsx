import React from "react";
import ToggleSwitch from "../../__shared__/ui/ToggleSwitch";

export default function MapUserLocation({ state, setState }) {
    return (
        <div className="m-1">
            <ToggleSwitch
                label={"User location"}
                state={state}
                setState={setState}
            />
        </div>
    );
}
