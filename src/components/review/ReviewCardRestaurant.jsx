import React from "react";
import ReviewCard from "./ReviewCard";
import Link from "next/link";
import { formatTimestamp } from "../../util/dateFunctions";
import Avatar from "../account/Avatar";
import FlagButton from "../moderation/FlagButton";
import AdminButton from "../moderation/AdminButton";
import { checkAdmin } from "@/database/firebase/firestore/userDB";

export default function ReviewCardRestaurant({ review }) {
    const [isAdmin, setIsAdmin] = React.useState(false);

    React.useEffect(() => {
        const fetchAdminStatus = async () => {
            try {
                setIsAdmin(await checkAdmin());
            } catch (error) {
                console.error("Error checking admin status:", error);
            }
        };
        fetchAdminStatus();
    }, []);

    return (
        <ReviewCard>
            <Link href={`/profile/${review.userID}`}>
                <Avatar maxW={"w-[75px]"} photoURL={review.photoURL} />
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
                <p>{review.reviewText}</p>
            </div>
            <FlagButton review={review} />
            {isAdmin && <AdminButton review={review} />}
        </ReviewCard>
    );
}
