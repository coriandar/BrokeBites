import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/FirebaseApp";
import {
    collection,
    getDocs,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
import Modal from "../modal/Modal";
import { getAuth } from "firebase/auth";

export default function ReviewModal({ selectedRestaurant }) {
    const [open, setOpen] = useState(false);
    const [reviewsData, setReviewsData] = useState([]);
    const reviewInputRef = useRef(null);

    const loadReview = async () => {
        try {
            const restaurantId = selectedRestaurant.id;
            const reviewsRef = collection(
                db,
                "restaurantDB",
                restaurantId,
                "reviews"
            );
            const reviewsSnapshot = await getDocs(reviewsRef);
            const reviewsData = await Promise.all(
                reviewsSnapshot.docs.map(async (doc) => {
                    const data = doc.data();
                    const userDocRef = collection(db, "userDB"); // Reference to user document
                    const userDocSnapshot = await getDocs(userDocRef);
                    const userData = userDocSnapshot.docs[0].data();
                    return {
                        ...data,
                        id: doc.id,
                        userName: userData.displayName,
                    };
                })
            );
            const reviews = await Promise.all(reviewsData);
            setReviewsData(reviews);
        } catch (error) {
            console.error("Error loading subcollection: ", error);
        }
    };

    useEffect(() => {
        if (open) loadReview();
        else setReviewsData([]);
    }, [open]);

    const formatTimestamp = (timestamp) => {
        const date = timestamp.toDate();
        return date.toLocaleString();
    };

    const handleReviewSubmit = async (reviewText) => {
        const auth = getAuth();
        const currentUserId = auth.currentUser.uid;

        try {
            const reviewsCollectionRef = collection(
                db,
                "restaurantDB",
                selectedRestaurant.id,
                "reviews"
            );

            await addDoc(reviewsCollectionRef, {
                userID: currentUserId,
                review: reviewText,
                timestamp: serverTimestamp(),
            });

            console.log("Review added to db");
            reviewInputRef.current.value = ""; // Clear the input field
            loadReview();
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };

    return (
        <div className="flex">
            <button
                className="font-light text-sm bg-slate-200 rounded-md p-1 shadow-lg m-1"
                onClick={() => setOpen(true)}
            >
                Reviews
            </button>

            <Modal
                open={open}
                maxW={"w-60%"}
                maxH={"h-60%"}
                onClose={() => setOpen(false)}
            >
                <div
                    className="w-full h-full bg-slate-300 rounded-lg"
                    style={{ padding: "10px 10px" }}
                >
                    <h3 className="font-bold text-lg">
                        {selectedRestaurant.name}'s Reviews
                    </h3>
                    {reviewsData.length > 0 ? (
                        <div id="review">
                            {reviewsData.map((review) => (
                                <ul
                                    className="flex justify-between"
                                    key={review.id}
                                >
                                    <li>
                                        <p>
                                            {review.userName}{" "}
                                            {formatTimestamp(review.timestamp)}
                                        </p>
                                        <p>{review.review}</p>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    ) : (
                        <div>No reviews</div>
                    )}
                    <br />
                    <p>Write a Review</p>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const reviewText = reviewInputRef.current.value;
                            if (reviewText) {
                                handleReviewSubmit(reviewText);
                            }
                        }}
                    >
                        <textarea
                            rows="5"
                            ref={reviewInputRef}
                            style={{
                                width: "90%",
                                fontSize: "16px",
                            }}
                        />

                        <button className="font-light text-sm bg-slate-200 rounded-md p-1 shadow-lg m-1">
                            Submit Review
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
