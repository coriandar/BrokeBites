import React from "react";
import ReviewCard from "./ReviewCard";
import { formatTimestamp } from "./formatTimestamp";

export default function ReviewCardProfile({ review }) {
    return (
        <ReviewCard>
            <div className="w-full ml-4">
                <div className="flex justify-between items-center w-full h-8">
                    {review.restaurantName}
                    <p className="font-light text-xs">
                        {formatTimestamp(review.timestamp)}
                    </p>
                </div>
                <p>{review.reviewText}</p>
            </div>
        </ReviewCard>
    );
}
