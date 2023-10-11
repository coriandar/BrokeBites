import { fetchAllRestaurants } from "./firebase/firestore/restaurantDB";
import {
    fetchFavouritesList,
    fetchToVisitList,
    fetchVisitedList,
} from "./firebase/firestore/userDB";

// facade pattern
export const allRestaurants = async () => {
    return await fetchAllRestaurants();
};

export const favouriteRestaurants = async (uid) => {
    return await fetchFavouritesList(uid);
};

export const toVisitRestaurants = async (uid) => {
    return await fetchToVisitList(uid);
};

export const visitedRestaurants = async (uid) => {
    return await fetchVisitedList(uid);
};
