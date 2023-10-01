export const getFilteredCusine = (items, query) => {
    if (!query || query === "All") {
        return items;
    }
    const lowercaseQuery = query.toLowerCase().trim(); // Convert the query to lowercase

    return items.filter((restaurant) =>
        restaurant.cuisine.toLowerCase().includes(lowercaseQuery)
    );
};
