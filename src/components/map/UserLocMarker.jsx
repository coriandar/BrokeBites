import React from "react";
import { Marker } from "@react-google-maps/api";

export default function UserLocMarker({ center, userLocation }) {
    return (
        <Marker
            key="user"
            position={center}
            icon={userLocation ? "/currentLocation.png" : ""}
        />
    );
}
