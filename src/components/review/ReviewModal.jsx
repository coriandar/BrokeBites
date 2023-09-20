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
import Link from "next/link";

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

    const handleReviewSubmit = async (reviewText) => {
        const auth = getAuth();
        const currentUserId = auth.currentUser.uid;
        const currentDisplayName = auth.currentUser.displayName;

        try {
            const reviewsCollectionRef = collection(
                db,
                "restaurantDB",
                selectedRestaurant.id,
                "reviews"
            );

            await addDoc(reviewsCollectionRef, {
                userID: currentUserId,
                userName: currentDisplayName,
                review: reviewText,
                timestamp: serverTimestamp(),
            });

            console.log("Review added to db");
            reviewInputRef.current.value = ""; // Clear the input field
            loadReview();
            alert("Review submitted");
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
                maxW={"w-1/3"}
                maxH={"h-70%"}
                onClose={() => setOpen(false)}
            >
                <div className="w-full h-full bg-slate-300 rounded-lg flex flex-col p-2">
                    <h3 className="font-bold text-lg">
                        {selectedRestaurant.name}'s Reviews
                    </h3>
                    <div className="flex h-75% mt-2 mb-2 overflow-y-auto no-scrollbar">
                        {reviewsData.length > 0 ? (
                            <div
                                id="review"
                                className="w-full flex flex-col justify-center items-center"
                            >
                                {reviewsData.map((review) => (
                                    <ul key={review.id} className="w-full">
                                        <li className="m-4 bg-slate-50 p-4 rounded-lg shadow-lg w-95%">
                                            <div className="flex justify-between items-center w-full h-8">
                                                <Link
                                                    href={`/profile/${review.userID}`}
                                                >
                                                    {review.userName ||
                                                        "Anonymous"}
                                                </Link>

                                                <p className="font-light text-xs"></p>
                                            </div>
                                            <p>{review.review}</p>
                                        </li>
                                    </ul>
                                ))}
                            </div>
                        ) : (
                            <div>No reviews</div>
                        )}
                    </div>

                    <div className="flex h-25% w-full mt-2 pl-4 pr-4">
                        <form
                            className="w-full"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const reviewText = reviewInputRef.current.value;
                                if (reviewText) {
                                    handleReviewSubmit(reviewText);
                                }
                            }}
                        >
                            <textarea
                                className="w-full h-24 rounded-lg p-2 shadow-lg bg-slate-100"
                                ref={reviewInputRef}
                                style={{ resize: "none" }}
                                placeholder="Write review..."
                            />

                            <div className="flex justify-end">
                                <button className="bg-slate-400 rounded-md p-1 shadow-lg m-1">
                                    Submit Review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
