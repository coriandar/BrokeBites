import defaultCenter from "@/components/__shared__/defaultCenter";

// Calculate euclidean distance between user and restaurant
const calculateEuclideanDistance = (lat1, lon1, lat2, lon2) => {
    const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

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

    // Calculate & return the distance (Euclidean distance)
    return earthRadius * c;
};

// sort by nearest
export const getSortedDistance = (items, order, userGeo) => {
    let defaultPos = defaultCenter;

    if (userGeo) defaultPos = userGeo;

    let sortedItems;
    if (order === "descending") {
        sortedItems = [...items].sort((a, b) => {
            //calculate the distance
            console.log(a.lat, a.lon, b.lat, b.lon);
            const distanceA = calculateEuclideanDistance(
                defaultPos.lat,
                defaultPos.lng,
                a.latitude,
                a.longitude
            );
            const distanceB = calculateEuclideanDistance(
                defaultPos.lat,
                defaultPos.lng,
                b.latitude,
                b.longitude
            );
            return distanceB - distanceA;
        });
    } else if (order === "ascending") {
        sortedItems = [...items].sort((a, b) => {
            //calculate the distance
            const distanceA = calculateEuclideanDistance(
                defaultPos.lat,
                defaultPos.lng,
                a.latitude,
                a.longitude
            );
            const distanceB = calculateEuclideanDistance(
                defaultPos.lat,
                defaultPos.lng,
                b.latitude,
                b.longitude
            );

            return distanceA - distanceB;
        });
    } else {
        return items;
    }

    return sortedItems;
};
