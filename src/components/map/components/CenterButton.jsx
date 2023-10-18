import React, { useState } from "react";
import defaultCenter from "@/components/__shared__/util/defaultCenter";
import { ButtonCircleIcon } from "@/components/ui/buttons/ButtonCircleIcon";
import { Locate } from "lucide-react";

const CenterToUserButton = ({
    setCenter,
    userLocation,
    setUserGeo,
    userGeo,
}) => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const getUserPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                setLatitude(lat);
                setLongitude(lng);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleCenterToUser = () => {
        //check if user location is enabled, if not use default location (AUT)
        if (userLocation) {
            getUserPosition();
            setUserGeo({
                lat: latitude,
                lng: longitude,
            });
            setCenter({
                lat: latitude,
                lng: longitude,
            });
        } else {
            setUserGeo(defaultCenter);
            setCenter(defaultCenter);
        }
    };

    return (
        <ButtonCircleIcon action={handleCenterToUser}>
            <Locate className="h-[1.2rem] w-[1.2rem]" />
        </ButtonCircleIcon>
    );
};

export default CenterToUserButton;
