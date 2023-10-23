import React from "react";
import ReviewCard from "./ReviewCard";
import { formatTimestamp } from "../../util/dateFunctions";
import Link from "next/link";
import FlagButton from "../moderation/FlagButton";
import AdminButton from "../moderation/components/AdminButton";
import { checkAdmin } from "@/database/firebase/firestore/userDB";

export default function ReviewCardProfile({ review }) {
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
            {isAdmin && <AdminButton review={review} />}
        </ReviewCard>
    );
}
