import GetUserPosition from "./UserLoc";

// TODO: Sprint2: Increase performance/lower memory, store index in list, then iterate based on index.
export const getFilteredSearch = (items, query) => {
    if (!query) {
        return items;
    }
    const lowercaseQuery = query.toLowerCase(); // Convert the query to lowercase

    return items.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(lowercaseQuery)
    );
};

export const getFilteredCusine = (items, query) => {
    if (!query || query === "All") {
        return items;
    }
    const lowercaseQuery = query.toLowerCase().trim(); // Convert the query to lowercase

    return items.filter((restaurant) =>
        restaurant.cuisine.toLowerCase().includes(lowercaseQuery)
    );
};

export const getFilteredDietary = (items, query) => {
    if (!query || query === "All") {
        return items;
    }
    const lowercaseQuery = query.toLowerCase().trim(); // Convert the query to lowercase

    return items.filter((restaurant) =>
        restaurant.dietary.toLowerCase().includes(lowercaseQuery)
    );
};

export const getFilteredFillingFactor = (items, value) => {
    if (!value || value === "All") {
        return items;
    }
    return items.filter((restaurant) => restaurant.fillingFactor === value);
};

export const getSortedPriceRating = (items, order) => {
    // Use the sort() method to sort the items based on price rating
    let sortedItems;

    if (order === "descending") {
        sortedItems = [...items].sort((a, b) => b.priceRating - a.priceRating);
    } else if (order === "ascending") {
        sortedItems = [...items].sort((a, b) => a.priceRating - b.priceRating);
    } else {
        return items; //return original list
    }
    return sortedItems;
};

export const getSortedStarRating = (items, order) => {
    let sortedItems;
    if (order === "descending") {
        sortedItems = [...items].sort((a, b) => b.starRating - a.starRating);
    } else if (order === "ascending") {
        sortedItems = [...items].sort((a, b) => a.starRating - b.starRating);
    } else {
        return items;
    }
    return sortedItems;
};

export const getFilteredPriceRating = (items, values) => {
    if (!values) {
        return items;
    }
    return items.filter(
        (restaurant) =>
            restaurant.priceRating >= values[0] &&
            restaurant.priceRating <= values[1]
    );
};

export const getFilteredStarRating = (items, values) => {
    if (!values) {
        return items;
    }
    return items.filter(
        (restaurant) =>
            restaurant.starRating >= values[0] &&
            restaurant.starRating <= values[1]
    );
};

// Calculate euclidean distance between user and restaurant
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

    console.log(lat1, lon1, lat2, lon2, distance);
    return distance;
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// sort by nearest
export const getSortedDistance = (items, order) => {
    const defaultPos = {
        lat: -36.8537761039407,
        lng: 174.7658246985396,
    };

    let sortedItems;
    if (order === "descending") {
        sortedItems = [...items].sort((a, b) => {
            //calculate the distance
            console.log(a.lat, a.lon, b.lat, b.lon);
            const distanceA = calculateEuclideanDistance(
                defaultPos.lat,
                defaultPos.lng,
                a.lat,
                a.lon
            );
            const distanceB = calculateEuclideanDistance(
                defaultPos.lat,
                defaultPos.lng,
                b.lat,
                b.lon
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

const cuisineNames = [
    "Chinese",
    "Indian",
    "Japanese",
    "Korean",
    "Taiwanese",
    "Western",
];

const fillingFactor = ["Dessert", "Light", "Filling"];

const dietary = [
    "Dairy-free",
    "Gluten-free",
    "Halal",
    "Low-carb",
    "Vegan",
    "Vegetarian",
];

export const optCuisine = [
    { value: "", text: "All", selected: "selected" },
    ...cuisineNames.map((cuisine) => ({ value: cuisine, text: cuisine })),
];

export const optFilling = [
    { value: "", text: "All", selected: "selected" },
    ...fillingFactor.map((fillFac) => ({ value: fillFac, text: fillFac })),
];

export const optDietary = [
    { value: "", text: "None", selected: "selected" },
    ...dietary.map((fillFac) => ({ value: fillFac, text: fillFac })),
];
