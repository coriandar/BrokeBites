import {
    flagReview,
    unflagReview,
    deleteReview,
} from "@/database/firebase/firestore/reviewDB";
import { deleteReport } from "@/database/firebase/firestore/reportDB";

export const reviewFlag = async ({ review, setIsReported, toast }) => {
    console.log("reported", review.id);
    await flagReview(review);
    setIsReported(true);
    toast({ description: "Review reported" });
};

export const reviewUnflag = async ({ review, toast }) => {
    console.log("unflag", review.id);
    await unflagReview(review);
    toast({ description: "Review unflagged" });
};

export const reviewDelete = async ({ review, toast }) => {
    console.log("delete", review.id);
    await deleteReview(review);
    toast({ description: "Review deleted" });
};

export const reportDelete = async ({ review, toast }) => {
    console.log("delete", review.id);
    await deleteReport(review);
    toast({ description: "Report deleted" });
};
