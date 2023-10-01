import React from "react";
import Link from "next/link";

export default function ReviewCard({ review }) {
    const formatTimestamp = (timestamp) => {
        const date = timestamp.toDate();
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // sets 24hr
        };
        return date.toLocaleString(undefined, options);
    };

    return (
        <li className="m-4 bg-slate-50 p-4 rounded-lg shadow-lg w-95%">
            <div className="flex justify-between items-center w-full h-8">
                <Link href={`/profile/${review.userID}`}>
                    {review.userName || "Anonymous"}
                </Link>

                <p className="font-light text-xs">
                    {formatTimestamp(review.timestamp)}
                </p>
            </div>
            <p>{review.reviewText}</p>
        </li>
    );
}
