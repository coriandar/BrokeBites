import { db } from "../firebaseApp";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

export const fetchFeed = async (userID) => {
    // Create a reference to the restaurant document in Firestore
    const userFeedDocRef = doc(db, "userFeedDB", userID);

    // Fetch the restaurants data
    const userFeedDocSnapshot = await getDoc(restaurantDocRef);

    if (!userFeedDocSnapshot.exists()) return null;

    const userFeedData = {
        ...userFeedDocSnapshot.data(),
        id: userID,
    };
    return userFeedData;
};
