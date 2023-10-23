import React from "react";
import ReviewCard from "./ReviewCard";
import { formatTimestamp } from "../../util/dateFunctions";
import Link from "next/link";
import FlagButton from "../moderation/FlagButton";

export default function ReviewCardProfile({ review }) {
    return (
        <ReviewCard>
            <div className="ml-4 w-full">
                <div className="flex h-8 w-full items-center justify-between">
                    <Link href={`/restaurant/${review.restaurantID}`}>
                        {review.restaurantName}
                    </Link>

                    <p className="text-xs font-light">
                        {formatTimestamp(review.timestamp)}
                    </p>
                </div>
                <p>{review.reviewText}</p>
            </div>
            <FlagButton review={review} />
        </ReviewCard>
    );
}
