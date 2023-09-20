import React, { useState, useEffect } from "react";

// This component is used to get the user's location
const GetUserPosition = () => {
    useEffect(() => {
        const [lat, setLat] = useState(0);
        const [lng, setLng] = useState(0);
        // Use useEffect to fetch user location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                setLat(lat);
                setLng(lng);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }, []);
    return lat, lng;
};

export default GetUserPosition;
