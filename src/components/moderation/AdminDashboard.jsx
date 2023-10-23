import React from "react";
import { fetchFlaggedReviews } from "@/database/firebase/firestore/reviewDB";
import ReviewCardRestaurant from "../review/ReviewCardRestaurant";
import ReviewContainer from "../review/ReviewContainer";

export default function AdminDashboard() {
    const [flaggedReviews, setFlaggedReviews] = React.useState([]);

    React.useEffect(() => {
        const fetchFlagged = async () => {
            const reviewCollection = await fetchFlaggedReviews();
            setFlaggedReviews(reviewCollection);
            console.log("Fetching from admin dash");
        };
        fetchFlagged();
    }, []);

    return (
        <div className="m-12 flex h-[700px] w-screen items-center justify-between">
            <div className="m-4 h-full w-1/3">
                <h3 className="text-lg font-bold">Flagged Reviews</h3>
                <ReviewContainer
                    reviewsData={flaggedReviews}
                    reviewCardType={ReviewCardRestaurant}
                />
            </div>
            <div className="m-4 h-full w-1/3">
                <h3 className="text-lg font-bold">Bug Reports</h3>
                <ReviewContainer
                    reviewsData={flaggedReviews}
                    reviewCardType={ReviewCardRestaurant}
                />
            </div>
            <div className="m-4 h-full w-1/3">
                <h3 className="text-lg font-bold">Feedback Reports</h3>
                <ReviewContainer
                    reviewsData={flaggedReviews}
                    reviewCardType={ReviewCardRestaurant}
                />
            </div>
        </div>
    );
}
