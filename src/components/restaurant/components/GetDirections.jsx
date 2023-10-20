import React from "react";
import { Button } from "@/components/ui/shadcn-ui/button";

export default function GetDirections({ selected, userGeo }) {
    const googleMapDirection = "https://www.google.com/maps/dir/";
    const origin = userGeo?.lat + "," + userGeo.lng + "/";
    const name = selected?.name + "/@";
    const destination = selected?.latitude + "," + selected?.longitude;

    const openDirections = () => {
        window.open(googleMapDirection + origin + name + destination);
    };

    return (
        <Button
            variant={"secondary"}
            className={"mr-1 h-6 rounded-full"}
            onClick={openDirections}
        >
            Directions
        </Button>
    );
}
