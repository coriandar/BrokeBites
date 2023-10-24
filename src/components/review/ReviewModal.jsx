import React, { useState, useEffect, useRef } from "react";
import { submitReview } from "@/database/firebase/firestore/reviewDB";
import Modal from "../__shared__/layout/Modal";
import ReviewContainer from "./ReviewContainer";
import { fetchRestaurantReviews } from "@/database/firebase/firestore/reviewDB";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/database/firebase/firebaseApp";
import { addReviewPost } from "@/database/firebase/firestore/userFeedDB";
import { ButtonCircleIcon } from "../ui/buttons/ButtonCircleIcon";
import { MessageSquare } from "lucide-react";
import { TopTooltip } from "../ui/tooltip/Tooltip";
import ReviewCardModal from "./ReviewCardModal";
import { fetchUserRestaurantReviews } from "@/database/firebase/firestore/reviewDB";
import { Button } from "../ui/shadcn-ui/button";
import { Textarea } from "@/components/ui/textarea";

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
    }, [open, selectedRestaurant?.id]);

    const handleReviewSubmit = async (reviewText) => {
        const userRestaurantReviews = await fetchUserRestaurantReviews(
            auth.currentUser.uid,
            selectedRestaurant.id,
        );

        if (userRestaurantReviews.length > 0) {
            alert(
                "User is only allowed to review restaurants once. Please report your review to request deletion.",
            );
        } else {
            await submitReview({ selectedRestaurant, reviewText });
            await addReviewPost(auth.currentUser.uid, selectedRestaurant.id);
            reviewInputRef.current.value = ""; // Clear the input field
            await loadReviews();
            alert("Review submitted");
        }
    };

    return (
        <div className="flex">
            <div className="group relative cursor-pointer py-2">
                <TopTooltip text={"Review"} />
                <ButtonCircleIcon action={() => setOpen(true)}>
                    <MessageSquare />
                </ButtonCircleIcon>
            </div>

            <Modal
                open={open}
                maxW={"w-1/3"}
                maxH={"h-70%"}
                onClose={() => setOpen(false)}
            >
                <div className="flex h-full w-full flex-col rounded-lg p-2 dark:bg-black">
                    <h3 className="text-lg font-bold">
                        {selectedRestaurant?.name}'s Reviews
                    </h3>

                    <ReviewContainer
                        reviewsData={reviewsData}
                        reviewCardType={ReviewCardModal}
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
                                <Textarea
                                    className="m-2 h-24 w-full rounded-lg"
                                    ref={reviewInputRef}
                                    style={{ resize: "none" }}
                                    placeholder="Write review..."
                                ></Textarea>
                                <div className="flex justify-end">
                                    <Button>Submit Review</Button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
}
