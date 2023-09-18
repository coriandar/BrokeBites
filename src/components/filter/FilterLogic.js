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
