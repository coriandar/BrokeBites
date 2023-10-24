export const checkDuplicate = (reviews, userID, restaurantID) => {
    console.log(reviews);
    if (reviews === null) {
        return false; // Return false when reviews are null
    }

    for (const review of Object.values(reviews)) {
        if (!Array.isArray(review)) {
            continue; // Skip non-array entries
        }

        for (const entry of review) {
            if (
                entry.userID === userID &&
                entry.restaurantID === restaurantID
            ) {
                return true; // Found a duplicate
            }
        }
    }
    return false; // No duplicates found
};
