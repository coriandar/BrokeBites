import { HeatmapLayerF } from "@react-google-maps/api";

export default function HeatmapComponent({ restaurantList }) {
    // Calculate the heatmap data based on restaurant price ratings
    const heatmapData = restaurantList.map((restaurant) => ({
        location: new window.google.maps.LatLng(
            restaurant.latitude,
            restaurant.longitude
        ),
        weight: restaurant.priceRating, // Assuming priceRating is a property of your restaurant object
    }));

    // Define heatmap options
    const heatmapOptions = {
        radius: 20, // Adjust the radius as needed
        opacity: 0.7,
        gradient: ["rgba(255, 0, 0, 0)", "rgba(255, 0, 0, 1)"], // Customize the gradient colors
    };

    return <HeatmapLayerF data={heatmapData} options={heatmapOptions} />;
}
