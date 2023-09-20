import React, { useState } from "react";
import { MarkerF } from "@react-google-maps/api";

export default function UserLocMarker({ userGeo, userLocation }) {
    const user = "/currentLocation.png";
    const def = "";
    const [icon, setIcon] = useState(user);

    return <MarkerF key="user" position={userGeo} icon={icon} />;
}
