import React from "react";
import ButtonSmall from "@/components/__shared__/ui/ButtonSmall";

export default function GetDirections({ selected, userGeo }) {
    const googleMapDirection = "https://www.google.com/maps/dir/";
    const origin = userGeo.lat + "," + userGeo.lng + "/";
    const name = selected.name + "/@";
    const destination = selected.latitude + "," + selected.longitude;

    const openDirections = () => {
        window.open(googleMapDirection + origin + name + destination);
    };

    return <ButtonSmall label={"Directions"} action={openDirections} />;
}
