import React, { useState } from "react";
import Image from "next/image";
import center from "../../__assets__/center-icon.svg";

const CenterToUserButton = ({
    setCenter,
    userLocation,
    defaultCenter,
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

    const HandleCenterToUser = () => {
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
        <div className="bg-slate-300 bg-opacity-90 absolute bottom-48 right-0 rounded-2xl p-4 mr-2 mt-2">
            <div className="relative flex flex-col justify-center">
                <Image
                    className="opacity-30 hover:opacity-70"
                    src={center}
                    alt="center"
                    width={20}
                    height={20}
                    priority
                    onClick={HandleCenterToUser}
                />
            </div>
        </div>
    );
};

export default CenterToUserButton;
