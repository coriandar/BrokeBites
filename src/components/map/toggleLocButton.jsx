import React, { useState } from "react";

const ToggleLocButton = ({ locationEnabled, setLocationEnabled }) => {
    const HandleToggleUserLocation = () => {
        setLocationEnabled(!locationEnabled);
    };

    return (
        <button
            onClick={HandleToggleUserLocation}
            className="map-button"
            title="Toggle User Location"
        >
            Toggle User Location
        </button>
    );
};

export default ToggleLocButton;
