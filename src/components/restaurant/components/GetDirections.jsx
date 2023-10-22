import React from "react";
import { Button } from "@/components/ui/shadcn-ui/button";
import { ButtonCircleIcon } from "@/components/ui/buttons/ButtonCircleIcon";
import { Navigation2 } from "lucide-react";

export default function GetDirections({ selected, userGeo }) {
    const googleMapDirection = "https://www.google.com/maps/dir/";
    const origin = userGeo?.lat + "," + userGeo.lng + "/";
    const name = selected?.name + "/@";
    const destination = selected?.latitude + "," + selected?.longitude;

    const openDirections = () => {
        window.open(googleMapDirection + origin + name + destination);
    };

    return (
        <ButtonCircleIcon action={() => openDirections()}>
            <Navigation2 />
        </ButtonCircleIcon>
    );
}
