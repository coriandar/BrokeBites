import { db } from "../firebaseApp";
import {
    getDocs,
    collection,
    query,
    where,
    serverTimestamp,
    addDoc,
} from "firebase/firestore";

export const fetchFeed = async (userID) => {
    // Reference the userFeedDB collection
    const userFeedCollectionRef = collection(db, "userFeedDB");

    // Create a query to filter documents by userID
    const q = query(userFeedCollectionRef, where("user", "==", userID));

    try {
        // Fetch the documents that match the query
        const userFeedQuerySnapshot = await getDocs(q);

        const userFeedData = [];

        userFeedQuerySnapshot.forEach((docSnapshot) => {
            userFeedData.push({
                ...docSnapshot.data(),
                id: docSnapshot.id,
            });
        });

        return userFeedData;
    } catch (error) {
        console.error("Error fetching user feed data:", error);
        return null;
    }
};

export const addFollow = async (userID, recipient) => {
    try {
        const feedCollectionRef = collection(db, "userFeedDB");
        await addDoc(feedCollectionRef, {
            postType: "follow",
            user: userID,
            recipient: recipient,
            time: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error adding to favorites:", error);
    }
};

export const addFavouritePost = async (userID, recipient) => {
    try {
        const feedCollectionRef = collection(db, "userFeedDB");
        await addDoc(feedCollectionRef, {
            postType: "favourite",
            user: userID,
            recipient: recipient,
            time: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error adding to favorites:", error);
    }
};

export const addReviewPost = async (userID, recipient) => {
    try {
        const feedCollectionRef = collection(db, "userFeedDB");
        await addDoc(feedCollectionRef, {
            contentID: "placeholder",
            postType: "review",
            user: userID,
            recipient: recipient,
            time: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error adding to favorites:", error);
    }
};
