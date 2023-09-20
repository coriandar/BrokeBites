import React, { useState, useEffect } from "react";
import { HeatmapLayerF } from "@react-google-maps/api";

export default function HeatMap({ restaurantList, heatmapToggle }) {
    const [heatmapData, setHeatMapData] = useState(getData());

    useEffect(() => {
        setHeatMapData(getData(restaurantList));
    }, [restaurantList, setHeatMapData, heatmapData]);

    function getData() {
        return restaurantList.map((restaurant) => ({
            location: new google.maps.LatLng(
                restaurant.latitude,
                restaurant.longitude
            ),
            weight: restaurant.priceRating, // Assuming priceRating is a property of your restaurant object
        }));
    }

    // Define heatmap options
    const heatmapOptions = {
        radius: 50, // Adjust the radius as needed
        opacity: 0.7, // Set opacity based on heatmapToggle
        // opacity: heatmapToggle ? 0.7 : 0.0, // Set opacity based on heatmapToggle
        // gradient: ["rgba(255, 0, 0, 0)", "rgba(255, 0, 0, 1)"], // Customize the gradient colors
    };

    return <HeatmapLayerF data={heatmapData} options={heatmapOptions} />;
}
