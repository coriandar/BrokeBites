import { getAuth } from "firebase/auth";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/FirebaseApp";

export async function AddReview({ selectedRestaurant, review }) {
    const auth = getAuth();
    const currentUserId = auth.currentUser?.uid;
    const reviewsCollectionRef = collection(
        db,
        "restaurantDB",
        selectedRestaurant.id,
        "reviews"
    );

    try {
        await addDoc(reviewsCollectionRef, {
            userId: currentUserId,
            review: review,
            timestamp: serverTimestamp(),
        });

        console.log("Review added to db");
    } catch (error) {
        console.error("Error adding review:", error);
    }
}
