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
    if (!query) {
        return items;
    }
    const lowercaseQuery = query.toLowerCase().trim(); // Convert the query to lowercase

    return items.filter((restaurant) =>
        restaurant.cuisine.toLowerCase().includes(lowercaseQuery)
    );
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

export const optCuisine = [
    { value: "", text: "All", selected: "selected" },
    ...cuisineNames.map((cuisine) => ({ value: cuisine, text: cuisine })),
];
