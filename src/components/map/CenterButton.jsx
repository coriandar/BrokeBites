import React, { useState } from "react";
import GetUserPosition from "./userLoc";

const CenterToUserButton = ({ setCenter, userLocationEnabled }) => {
    const { latitude, longitude, getLocation } = GetUserPosition();
    const defaultCenter = {
        lat: -36.8537761039407,
        lng: 174.7658246985396,
    };

    const HandleCenterToUser = () => {
        //check if user location is enabled, if not use default location (AUT)
        if (userLocationEnabled) {
            getLocation();
            setCenter({
                lat: latitude,
                lng: longitude,
            });
        } else {
            setCenter(defaultCenter);
        }
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
