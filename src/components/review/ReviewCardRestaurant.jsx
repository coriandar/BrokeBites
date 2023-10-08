import React from "react";
import ReviewCard from "./ReviewCard";
import Link from "next/link";
import { formatTimestamp } from "./formatTimestamp";
import Avatar from "../account/Avatar";

export default function ReviewCardRestaurant({ review }) {
    return (
        <ReviewCard>
            <Link href={`/profile/${review.userID}`}>
                <Avatar maxW={"w-[75px]"} photoURL={review.photoURL} />
            </Link>
            <div className="w-full ml-4">
                <div className="flex justify-between items-center w-full h-8">
                    <Link href={`/profile/${review.userID}`}>
                        {review.userName || "Anonymous"}
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
