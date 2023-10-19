import { db } from "../firebaseApp";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

export const fetchFeed = async (userID) => {
    // Create a reference to the restaurant document in Firestore
    const userFeedDocRef = doc(db, "userFeedDB", userID);

    console.log(userID);
    // Fetch the restaurants data
    const userFeedDocSnapshot = await getDoc(userFeedDocRef);

    if (!userFeedDocSnapshot.exists()) return null;

    console.log("in userFeedDB");
    const userFeedData = {
        ...userFeedDocSnapshot.data(),
        id: userID,
    };

    console.log("in userFeedDB: " + userFeedData);

    return userFeedData;
};
