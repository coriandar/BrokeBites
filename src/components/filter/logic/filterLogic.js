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

export const getFilteredSearch = (items, query) => {
    if (!query) {
        return items;
    }
    const lowercaseQuery = query.toLowerCase(); // Convert the query to lowercase

    return items.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(lowercaseQuery)
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

export const getFilteredPlace = (items, query) => {
    if (!query || query === "All") {
        return items;
    }
    const lowercaseQuery = query.toLowerCase().trim(); // Convert the query to lowercase

    return items.filter((restaurant) =>
        restaurant.category.toLowerCase().includes(lowercaseQuery)
    );
};

export const getFilteredPost = (items, query) => {
    if (!query || query === "All") {
        return items;
    }
    const lowercaseQuery = query.toLowerCase().trim(); // Convert the query to lowercase

    return items.filter((restaurant) =>
        restaurant.postalCode.toLowerCase().includes(lowercaseQuery)
    );
};

export const getFilteredCardinal = (items, query) => {
    if (!query || query === "All") {
        return items;
    }
    const lowercaseQuery = query.toLowerCase().trim(); // Convert the query to lowercase
    let lowerBound = 0;
    let upperBound = 0;

    if (lowercaseQuery === "west") {
        lowerBound = 600;
        upperBound = 618;
    } else if (lowercaseQuery === "north") {
        lowerBound = 620;
        upperBound = 632;
    } else if (lowercaseQuery === "central") {
        lowerBound = 1000;
        upperBound = 1144;
    } else if (lowercaseQuery === "east") {
        lowerBound = 2000;
        upperBound = 2016;
    } else if (lowercaseQuery === "south") {
        lowerBound = 2019;
        upperBound = 2105;
    }

    return items.filter((restaurant) => {
        const postalCode = parseInt(restaurant.postalCode, 10); // Convert postalCode to an integer
        return lowerBound <= postalCode && postalCode <= upperBound;
    });
};
