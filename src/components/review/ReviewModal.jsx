import React, { useState, useEffect, useRef } from "react";
import { submitReview } from "@/database/firebase/firestore/reviewDB";
import Modal from "../__shared__/layout/Modal";
import ReviewContainer from "./ReviewContainer";
import { fetchRestaurantReviews } from "@/database/firebase/firestore/reviewDB";
import ButtonSmall from "../__shared__/ui/ButtonSmall";
import ReviewCardRestaurant from "./ReviewCardRestaurant";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/database/firebase/firebaseApp";

export default function ReviewModal({ selectedRestaurant }) {
    const [open, setOpen] = useState(false);
    const [reviewsData, setReviewsData] = useState([]);
    const reviewInputRef = useRef(null);
    const [user] = useAuthState(auth);

    const loadReviews = async () => {
        const reviewsData = await fetchRestaurantReviews(selectedRestaurant.id);
        setReviewsData(reviewsData);
    };

    useEffect(() => {
        if (open) loadReviews();
        else setReviewsData([]);
    }, [open, selectedRestaurant.id]);

    const handleReviewSubmit = async (reviewText) => {
        await submitReview({ selectedRestaurant, reviewText });
        reviewInputRef.current.value = ""; // Clear the input field
        loadReviews();
        alert("Review submitted");
    };

    return (
        <div className="flex">
            <ButtonSmall label={"Reviews"} action={() => setOpen(true)} />

            <Modal
                open={open}
                maxW={"w-1/3"}
                maxH={"h-70%"}
                onClose={() => setOpen(false)}
            >
                <div className="flex h-full w-full flex-col rounded-lg bg-slate-300 p-2">
                    <h3 className="text-lg font-bold">
                        {selectedRestaurant.name}'s Reviews
                    </h3>

                    <ReviewContainer
                        reviewsData={reviewsData}
                        reviewCardType={ReviewCardRestaurant}
                    />

                    {user && (
                        <div className="mt-2 flex h-25% w-full pl-4 pr-4">
                            <form
                                className="w-full"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const reviewText =
                                        reviewInputRef.current.value;
                                    if (reviewText) {
                                        handleReviewSubmit(reviewText);
                                    }
                                }}
                            >
                                <textarea
                                    className="h-24 w-full rounded-lg bg-slate-100 p-2 shadow-lg"
                                    ref={reviewInputRef}
                                    style={{ resize: "none" }}
                                    placeholder="Write review..."
                                />

                                <div className="flex justify-end">
                                    <button className="m-1 rounded-md bg-slate-400 p-1 shadow-lg">
                                        Submit Review
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
}
