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
