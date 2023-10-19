import { db, auth } from "../firebaseApp";
import {
    doc,
    getDoc,
    setDoc,
    arrayUnion,
    arrayRemove,
    updateDoc,
} from "firebase/firestore";
import { fetchRestaurant } from "./restaurantDB";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        checkUserDB();
        return true;
    } catch (error) {
        const errorCode = error.code;
        console.log(error.meessage);
        return false;
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        console.log(error.meessage);
        return false;
    }
};

async function checkUserDB() {
    const user = auth.currentUser;
    if (user) {
        console.log("User is signed in.");
        // User is signed in, proceed with Firestore operations

        const userRef = doc(db, "userDB", user.uid);

        try {
            console.log("Before Firestore operation");
            const userSnapshot = await getDoc(userRef);
            console.log("After Firestore operation");

            if (!userSnapshot.exists()) {
                // If the user document doesn't exist, add them to the userDB
                await setDoc(userRef, {
                    displayName: user.displayName,
                    email: user.email,
                    favourite: [], // Initialise favourite, and toVisit with empty array
                    toVisit: [],
                    visited: [],
                });
                console.log("User added to userDB successfully.");
            }
        } catch (error) {
            console.error("Error adding user to userDB:", error);
            // Handle the error as needed
        }
    } else {
        console.log("User is not signed in.");
    }
}

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
            photoURL: doc.photoURL,
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

export const fetchVisitedList = async (uid) => {
    return await fetchUserListData(uid, "visited", fetchRestaurant);
};

// follow
export const followSelectedUser = async (otherUser) => {
    const currentUserID = auth.currentUser?.uid;
    const userDocRef = doc(db, "userDB", currentUserID);
    try {
        await setDoc(
            userDocRef,
            { following: arrayUnion(otherUser) },
            { merge: true },
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
            { merge: true },
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
            { merge: true },
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
            { merge: true },
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
            { merge: true },
        );
    } catch (error) {
        console.error("Error adding to favorites:", error);
    }
};

export const removeRestaurantFavourite = async (selectedRestaurant) => {
    const currentUserID = auth.currentUser?.uid;
    const userDocRef = doc(db, "userDB", currentUserID);
    try {
        // Use arrayUnion to remove the restaurant to the array
        await setDoc(
            userDocRef,
            { favourite: arrayRemove(selectedRestaurant.id) },
            { merge: true },
        );
    } catch (error) {
        console.error("Error removing from favorites:", error);
    }
};

export const addRestaurantVisited = async (selectedRestaurant) => {
    const currentUserID = auth.currentUser?.uid;
    const userDocRef = doc(db, "userDB", currentUserID);
    try {
        await setDoc(
            userDocRef,
            { visited: arrayUnion(selectedRestaurant.id) },
            { merge: true },
        );
    } catch (error) {
        console.error("Error adding to visited list: ", error);
    }
};

export const removeRestaurantVisited = async (selectedRestaurant) => {
    const currentUserID = auth.currentUser?.uid;
    const userDocRef = doc(db, "userDB", currentUserID);
    try {
        await setDoc(
            userDocRef,
            { visited: arrayRemove(selectedRestaurant.id) },
            { merge: true },
        );
    } catch (error) {
        console.error("Error removing from visited list: ", error);
    }
};

export const updateAvatarUserDB = async (photoURL) => {
    const currentUserID = auth.currentUser?.uid;
    const userDocRef = doc(db, "userDB", currentUserID);
    try {
        await updateDoc(userDocRef, { photoURL: photoURL });
    } catch (error) {
        console.error("Error adding to photoURL:", error);
    }
};

export const appendUserAvatar = async (initialData) => {
    const fetchUserAvatar = async (uid) => {
        const userData = await fetchUser(uid);
        return userData?.photoURL;
    };

    return await Promise.all(
        initialData.map(async (data) => {
            const avatarURL = await fetchUserAvatar(data.userID);
            return {
                ...data,
                photoURL: avatarURL,
            };
        }),
    );
};
