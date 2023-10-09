import React from "react";
import ReviewCard from "./ReviewCard";
import { formatTimestamp } from "./formatTimestamp";
import Link from "next/link";

export default function ReviewCardProfile({ review }) {
    return (
        <ReviewCard>
            <div className="w-full ml-4">
                <div className="flex justify-between items-center w-full h-8">
                    <Link href={`/restaurant/${review.restaurantID}`}>
                        {review.restaurantName}
                    </Link>

                    <p className="font-light text-xs">
                        {formatTimestamp(review.timestamp)}
                    </p>
                </div>
                <p>{review.reviewText}</p>
            </div>
        </ReviewCard>
    );
}
