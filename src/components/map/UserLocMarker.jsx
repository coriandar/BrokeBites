import React from "react";
import { MarkerF } from "@react-google-maps/api";

export default function UserLocMarker({ userGeo, userLocation }) {
    return (
        <MarkerF
            key="user"
            position={userGeo}
            icon={userLocation ? "/currentLocation.png" : ""}
        />
    );
}
