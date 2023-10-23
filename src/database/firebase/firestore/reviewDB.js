import { auth, db } from "../firebaseApp";
import {
    doc,
    setDoc,
    updateDoc,
    addDoc,
    getDocs,
    collection,
    serverTimestamp,
    arrayUnion,
    deleteField,
    deleteDoc,
} from "firebase/firestore";
import { appendUserAvatar } from "./userDB";

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

        // appends user photoURl
        return await appendUserAvatar(reviewData);
    } catch (err) {
        console.error(err);
    }
};

export const fetchFlaggedReviews = async () => {
    try {
        const restaurantReviewCollectionRef = collection(db, "reviewDB");
        const data = await getDocs(restaurantReviewCollectionRef);

        const reviewData = data.docs
            .map((doc) => ({
                ...doc.data(),
                reportCount: doc.reporters?.length,
                id: doc.id,
            }))
            .filter((review) => review?.flagged === true);

        reviewData.sort((a, b) => b.reportCount - a.reportCount);
        // // appends user photoURl
        return await appendUserAvatar(reviewData);
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

export const flagReview = async (review) => {
    const currentUserID = auth.currentUser?.uid;
    const reviewDocRef = doc(db, "reviewDB", review.id);
    try {
        await updateDoc(reviewDocRef, { flagged: true });
        await setDoc(
            reviewDocRef,
            { reporter: arrayUnion(currentUserID) },
            { merge: true }, // update fields in the document or create it if it doesn't exists
        );
    } catch (error) {
        console.error("Error flagging:", error);
    }
};

export const unflagReview = async (review) => {
    const reviewDocRef = doc(db, "reviewDB", review.id);
    try {
        await updateDoc(reviewDocRef, { flagged: false });
        await updateDoc(reviewDocRef, { reporter: deleteField() });
    } catch (error) {
        console.error("Error unflagging:", error);
    }
};

export const deleteReview = async (review) => {
    const reviewDocRef = doc(db, "reviewDB", review.id);
    try {
        await deleteDoc(reviewDocRef);
    } catch (error) {
        console.error("Error deleting:", error);
    }
};
