import { db } from "@/components/firebase/FirebaseApp";
import {
    collection,
    getDocs,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";

const colName = "restaurantDB"; // Replace with the name of your restaurants collection

const createReviewSubcollection = async (restaurantRef, userId, reviewText) => {
    try {
        // Reference to the "reviews" subcollection inside the restaurant's document
        const reviewsCollectionRef = collection(restaurantRef, "reviews");

        // Create a new review document with user ID, review text, and a timestamp
        await addDoc(reviewsCollectionRef, {
            userId,
            review: reviewText,
            timestamp: serverTimestamp(),
        });

        console.log(`Review added for restaurant: ${restaurantRef.id}`);
    } catch (error) {
        console.error(
            `Error adding review for restaurant: ${restaurantRef.id}`,
            error
        );
    }
};

const addReviewsToRestaurants = async () => {
    const querySnapshot = await getDocs(collection(db, colName));

    for (const doc of querySnapshot.docs) {
        // Replace 'userId' and 'reviewText' with actual user ID and review text
        const userId = "user123";
        const reviewText = "This is a great restaurant!";

        await createReviewSubcollection(doc.ref, userId, reviewText);
    }

    console.log("Reviews added to all restaurants.");
};

export default function AddReviewsToRestaurants() {
    addReviewsToRestaurants();
    return <div>Adding Reviews to Restaurants...</div>;
}
