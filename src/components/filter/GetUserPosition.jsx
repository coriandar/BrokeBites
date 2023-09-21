import React, { useState, useEffect } from "react";

// This component is used to get the user's location
function GetUserPosition() {
    const [lat, setLat] = useState(0);
    const [lng, setLang] = useState(0);

    useEffect(() => {
        // Use useEffect to fetch user location

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                setLat(lat);
                setLang(lng);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }, []);

    //return const lat and lng
    return { lat, lng };
}

export default GetUserPosition;
