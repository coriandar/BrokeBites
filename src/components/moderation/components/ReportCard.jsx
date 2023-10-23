import React from "react";
import Link from "next/link";
import { formatTimestamp } from "@/util/dateFunctions";
import ReviewCard from "@/components/review/ReviewCard";
import Avatar from "@/components/account/Avatar";
// import FlagButton from "../moderation/FlagButton";
// import AdminButton from "../moderation/AdminButton";

export default function ReportCard({ review }) {
    return (
        <ReviewCard key={review.id}>
            <Link href={`/profile/${review?.userID}`}>
                <Avatar maxW={"w-[75px]"} photoURL={review?.photoURL} />
            </Link>
            <div className="ml-4 w-full">
                <div className="flex h-8 w-full items-center justify-between">
                    <Link href={`/profile/${review.userID}`}>
                        {review.userName || "Anonymous"}
                    </Link>
                    <p className="text-xs font-light">
                        {formatTimestamp(review.timestamp)}
                    </p>
                </div>
                <p>{review.report}</p>
            </div>
            {/* <FlagButton review={review} />
            {isAdmin && <AdminButton review={review} />} */}
        </ReviewCard>
    );
}
