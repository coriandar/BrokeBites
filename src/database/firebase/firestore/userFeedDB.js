import { db } from "../firebaseApp";
import { getDocs, collection, query, where } from "firebase/firestore";

export const fetchFeed = async (userID) => {
    // Reference the userFeedDB collection
    const userFeedCollectionRef = collection(db, "userFeedDB");

    // Create a query to filter documents by userID
    const q = query(userFeedCollectionRef, where("userID", "==", userID));

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
