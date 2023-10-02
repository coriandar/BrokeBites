import { auth, db } from "../firebaseApp";
import {
    addDoc,
    getDocs,
    collection,
    serverTimestamp,
} from "firebase/firestore";

export const fetchUserReviews = async (selectedUserID) => {
    try {
        const userReviewCollectionRef = collection(db, "reviewDB");
        const data = await getDocs(userReviewCollectionRef);

        const reviewData = data.docs
            .map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            .filter((review) => review.userID === selectedUserID);

        reviewData.sort((a, b) => a.timestamp - b.timestamp);
        return reviewData;
    } catch (err) {
        console.error(err);
    }
};

export const fetchRestaurantReviews = async (selectedRestaurantID) => {
    try {
        const restaurantReviewCollectionRef = collection(db, "reviewDB");
        const data = await getDocs(restaurantReviewCollectionRef);

        const reviewData = data.docs
            .map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            .filter((review) => review.restaurantID === selectedRestaurantID);

        reviewData.sort((a, b) => a.timestamp - b.timestamp);
        return reviewData;
    } catch (err) {
        console.error(err);
    }
};

export const submitReview = async ({ selectedRestaurant, reviewText }) => {
    const currentUserId = auth.currentUser.uid;
    const currentDisplayName = auth.currentUser.displayName;

    try {
        const reviewsCollectionRef = collection(db, "reviewDB");
        await addDoc(reviewsCollectionRef, {
            restaurantID: selectedRestaurant.id,
            restaurantName: selectedRestaurant.name,
            reviewText: reviewText,
            timestamp: serverTimestamp(),
            userID: currentUserId,
            userName: currentDisplayName,
        });
    } catch (error) {
        console.error("Error adding review:", error);
    }
};
