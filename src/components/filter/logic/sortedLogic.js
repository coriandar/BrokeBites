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
