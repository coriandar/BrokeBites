import React, { useState, useEffect } from "react";
import { HeatmapLayer } from "@react-google-maps/api";

export default function HeatMap({ restaurantList, heatmapToggle }) {
    const [heatmapData, setHeatMapData] = useState([]);

    useEffect(() => {
        function createDataPoints() {
            return restaurantList.map((restaurant) => ({
                location: new google.maps.LatLng(
                    restaurant.latitude,
                    restaurant.longitude,
                ),
                weight: restaurant.priceRating, // Assuming priceRating is a property of your restaurant object
            }));
        }
        if (heatmapToggle) setHeatMapData(createDataPoints(restaurantList));
        else setHeatMapData([]);
    }, [restaurantList, heatmapToggle]);

    // Define heatmap options
    const heatmapOptions = {
        radius: 50, // Adjust the radius as needed
        opacity: 0.7,
    };

    return (
        <>
            {heatmapToggle && (
                <HeatmapLayer data={heatmapData} options={heatmapOptions} />
            )}
        </>
    );
}
