import { db } from "@/database/firebase/firebaseApp";
import { collection, addDoc } from "firebase/firestore";

export const submitBug = async (report, user) => {
    const collectionName = "bugDB";

    await addDoc(collection(db, collectionName), {
        displayName: user.displayName,
        email: user.email,
        uuid: user.uid,
        bug: report,
    });
};

export const submitFeedback = async (report, user) => {
    const collectionName = "feedbackDB";
    await addDoc(collection(db, collectionName), {
        displayName: user.displayName,
        email: user.email,
        uuid: user.uid,
        feedback: report,
    });
};
