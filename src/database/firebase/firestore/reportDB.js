import { db } from "@/database/firebase/firebaseApp";
import { collection, addDoc } from "firebase/firestore";

const collectionName = "reportDB";

export const submitBug = async (report, user) => {
    await addDoc(collection(db, collectionName), {
        displayName: user.displayName,
        email: user.email,
        uuid: user.uid,
        reportBug: report,
        type: "bug",
    });
};

export const submitFeedback = async (report, user) => {
    await addDoc(collection(db, collectionName), {
        displayName: user.displayName,
        email: user.email,
        uuid: user.uid,
        reportFeedback: report,
        type: "feedback",
    });
};
