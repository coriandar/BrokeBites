import React, { useState } from "react";
import GetUserPosition from "./userLoc";

const CenterToUserButton = ({ setCenter }) => {
    const { latitude, longitude, getLocation } = GetUserPosition();

    const HandleCenterToUser = () => {
        getLocation();
        setCenter({
            lat: latitude,
            lng: longitude,
        });
    };

    return (
        <button
            onClick={HandleCenterToUser}
            className="map-button"
            title="Center to User"
        >
            Center to User
        </button>
    );
};

export default CenterToUserButton;
