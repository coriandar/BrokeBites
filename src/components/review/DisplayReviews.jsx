import { getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function DisplayReviews({ selectedRestaurant }) {
    const firestore = getFirestore();
    const path = "restaurantDB/" + selectedRestaurant.id + "/review";
    const [reviewsData, setReviewsData] = useState("");

    useEffect(() => {
        const reviewDocRef = doc(firestore, path);

        getDoc(reviewDocRef);
    });
}
