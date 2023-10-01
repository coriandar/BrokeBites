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
