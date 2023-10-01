import { fetchAllRestaurants } from "./firebase/firestore/restaurantDB";
import {
    fetchFavouritesList,
    fetchToVisitList,
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
