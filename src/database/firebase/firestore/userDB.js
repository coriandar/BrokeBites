import { db, auth } from "../firebaseApp";
import {
    doc,
    getDoc,
    setDoc,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
import { fetchRestaurant } from "./restaurantDB";

// fetch a users data
export const fetchUser = async (userID) => {
    const userDocRef = doc(db, "userDB", userID);
    const userDocSnapshot = await getDoc(userDocRef);
    if (!userDocSnapshot.exists()) return null;

    const userData = {
        ...userDocSnapshot.data(),
        id: userID,
    };
    return userData;
};

// fetch a specific list from users data
export const fetchUserList = async (currentUserId, listName) => {
    // Create a reference to the user's document in Firestore
    const userDocRef = doc(db, "userDB", currentUserId);

    // Fetch the user's data
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
        console.error("No document");
        return [];
    }
    return userDocSnapshot.data()[listName];
};

// map fetched data to another list
const fetchUserListData = async (uid, listName, listToMap) => {
    const currentUserId = uid;
    if (!currentUserId) return [];

    try {
        const list = await fetchUserList(currentUserId, listName);
        const promises = list.map(listToMap);
        return await Promise.all(promises);
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

// fetch users following list data
export const fetchFollowingList = async (uid) => {
    try {
        const list = await fetchUserListData(uid, "following", fetchUser);
        // parse to only contain display name and id
        const followingList = list.map((doc) => ({
            displayName: doc.displayName,
            id: doc.id,
        }));
        followingList.sort((a, b) => a.displayName - b.displayName);
        return followingList;
    } catch (error) {
        console.error(error);
    }
};

// fetch users favourites list data
export const fetchFavouritesList = async (uid) => {
    return await fetchUserListData(uid, "favourite", fetchRestaurant);
};

// fetch users favourites list data
export const fetchToVisitList = async (uid) => {
    return await fetchUserListData(uid, "toVisit", fetchRestaurant);
};

// follow
export const followSelectedUser = async (otherUser) => {
    const currentUserID = auth.currentUser?.uid;
    const userDocRef = doc(db, "userDB", currentUserID);
    try {
        await setDoc(
            userDocRef,
            { following: arrayUnion(otherUser) },
            { merge: true }
        );
    } catch (error) {
        console.error("Error adding to favorites:", error);
    }
};

// unfollow
export const unfollowSelectedUser = async (otherUser) => {
    const currentUserID = auth.currentUser?.uid;
    const userDocRef = doc(db, "userDB", currentUserID);
    try {
        await setDoc(
            userDocRef,
            { following: arrayRemove(otherUser) },
            { merge: true }
        );
    } catch (error) {
        console.error("Error removing from favorites:", error);
    }
};

export const addRestaurantToVisit = async (selectedRestaurant) => {
    const currentUserID = auth.currentUser?.uid;
    const userDocRef = doc(db, "userDB", currentUserID);
    try {
        // Use arrayUnion to add the restaurant to the array
        await setDoc(
            userDocRef,
            { toVisit: arrayUnion(selectedRestaurant.id) },
            { merge: true }
        );
    } catch (error) {
        console.error("Error adding to To Visit:", error);
    }
};

export const removeRestaurantToVisit = async (selectedRestaurant) => {
    const currentUserID = auth.currentUser?.uid;
    const userDocRef = doc(db, "userDB", currentUserID);
    try {
        // Use arrayUnion to add the restaurant to the array
        await setDoc(
            userDocRef,
            { toVisit: arrayRemove(selectedRestaurant.id) },
            { merge: true }
        );
    } catch (error) {
        console.error("Error removing from To Visit:", error);
    }
};

export const addRestaurantFavourite = async (selectedRestaurant) => {
    const currentUserID = auth.currentUser?.uid;
    const userDocRef = doc(db, "userDB", currentUserID);
    try {
        // Use arrayUnion to add the restaurant to the array
        await setDoc(
            userDocRef,
            { favourite: arrayUnion(selectedRestaurant.id) },
            { merge: true }
        );
    } catch (error) {
        console.error("Error adding to favorites:", error);
    }
};

export const removeRestaurantFavourite = async (selectedRestaurant) => {
    const currentUserID = auth.currentUser?.uid;
    const userDocRef = doc(db, "userDB", currentUserID);
    try {
        // Use arrayUnion to add the restaurant to the array
        await setDoc(
            userDocRef,
            { favourite: arrayRemove(selectedRestaurant.id) },
            { merge: true }
        );
    } catch (error) {
        console.error("Error removing from favorites:", error);
    }
};
