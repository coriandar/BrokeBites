import React, { useState } from "react";

//this file is used to get the user's location
const GetUserPosition = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    //get user location
    const userPos = () => {
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

    // Return the user's location as an object
    return {
        latitude,
        longitude,
        getLocation: userPos,
    };
};

export default GetUserPosition;
