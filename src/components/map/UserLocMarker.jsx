import React from "react";
import { Marker } from "@react-google-maps/api";

export default function UserLocMarker({ userGeo, userLocation }) {
    return (
        <Marker
            key="user"
            position={userGeo}
            icon={userLocation ? "/currentLocation.png" : ""}
        />
    );
}
