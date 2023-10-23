import { db } from "../firebaseApp";
import { getDocs, collection, query, where } from "firebase/firestore";

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

export const fetchDisplayName = async (userID) => {
    // Reference the userDB collection
    const userCollectionRef = collection(db, "userDB");

    // Create a query to filter documents by userID
    const q = query(userCollectionRef, where("uid", "==", userID));

    try {
        // Fetch the documents that match the query
        const userQuerySnapshot = await getDocs(q);

        if (!userQuerySnapshot.empty) {
            // Assuming there is only one document with the given userID
            const userDoc = userQuerySnapshot.docs[0];
            const userData = userDoc.data();
            return userData.displayName; // Retrieve the displayName from the user document
        } else {
            console.log("User not found or does not exist.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};
