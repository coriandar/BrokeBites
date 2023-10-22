import React from "react";
import { ButtonCircleIcon } from "@/components/ui/buttons/ButtonCircleIcon";
import { Navigation2 } from "lucide-react";
import Tooltip from "@/components/ui/tooltip/Tooltip";

export default function GetDirections({ selected, userGeo }) {
    const googleMapDirection = "https://www.google.com/maps/dir/";
    const origin = userGeo?.lat + "," + userGeo.lng + "/";
    const name = selected?.name + "/@";
    const destination = selected?.latitude + "," + selected?.longitude;

    const openDirections = () => {
        window.open(googleMapDirection + origin + name + destination);
    };

    return (
        <div className="group relative cursor-pointer py-2">
            <Tooltip text={"Get Directions"} />
            <ButtonCircleIcon action={() => openDirections()}>
                <Navigation2 />
            </ButtonCircleIcon>
        </div>
    );
}
