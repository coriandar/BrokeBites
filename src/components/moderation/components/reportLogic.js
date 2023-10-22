import {
    flagReview,
    unflagReview,
} from "@/database/firebase/firestore/reviewDB";

export const reportFlag = async ({ review, setIsReported, toast }) => {
    console.log("reported", review.id);
    await flagReview(review);
    setIsReported(true);
    toast({ description: "Review reported" });
};

export const reportUnflag = async ({ review, toast }) => {
    console.log("unflag", review.id);
    await unflagReview(review);
    toast({ description: "Review unflagged" });
};
