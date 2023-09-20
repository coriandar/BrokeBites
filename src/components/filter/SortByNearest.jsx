import React from "react";

//calculate euclidean distance between user and restaurant
function calculateEuclideanDistance(lat1, lon1, lat2, lon2) {
    // Convert degrees to radians
    const lat1Rad = degreesToRadians(lat1);
    const lon1Rad = degreesToRadians(lon1);
    const lat2Rad = degreesToRadians(lat2);
    const lon2Rad = degreesToRadians(lon2);

    // Radius of the Earth in kilometers
    const earthRadius = 6371;

    // Calculate the differences in coordinates
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

    // Calculate the square of half the chord length between the points
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;

    // Calculate the angular distance in radians
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate the distance (Euclidean distance)
    const distance = earthRadius * c;

    return distance;
}

//convert deg to rad
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

//sort list
const SortByNearest = ({
    restaurantMasterList,
    userGeo,
    setRestaurantList,
}) => {
    const sortedList = [...restaurantMasterList].sort((a, b) => {
        const distanceA = calculateEuclideanDistance(
            userGeo.latitude,
            userGeo.longitude,
            a.lat,
            a.lng
        );
        const distanceB = calculateEuclideanDistance(
            userGeo.latitude,
            userGeo.longitude,
            b.lat,
            b.lng
        );
        return distanceA - distanceB;
    });

    setRestaurantList(sortedList);
};

export default SortByNearest;
