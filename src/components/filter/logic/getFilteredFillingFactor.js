export const getFilteredFillingFactor = (items, value) => {
    if (!value || value === "All") {
        return items;
    }
    return items.filter((restaurant) => restaurant.fillingFactor === value);
};
