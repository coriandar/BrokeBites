import { db } from "@/database/firebase/firebaseApp";
import {
    doc,
    addDoc,
    getDocs,
    collection,
    serverTimestamp,
    deleteDoc,
} from "firebase/firestore";
import { appendUserAvatar } from "./userDB";

const collectionName = "reportDB";

export const submitBug = async (report, user) => {
    await addDoc(collection(db, collectionName), {
        userName: user.displayName,
        email: user.email,
        userID: user.uid,
        report: report,
        type: "bug",
        timestamp: serverTimestamp(),
    });
};

export const submitFeedback = async (report, user) => {
    await addDoc(collection(db, collectionName), {
        userName: user.displayName,
        email: user.email,
        userID: user.uid,
        report: report,
        type: "feedback",
        timestamp: serverTimestamp(),
    });
};

export const fetchReports = async () => {
    try {
        const reportCollectionRef = collection(db, "reportDB");
        const data = await getDocs(reportCollectionRef);

        const reportData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));

        reportData.sort((a, b) => a?.timestamp - b?.timestamp);
        // // appends user photoURl
        return await appendUserAvatar(reportData);
    } catch (err) {
        console.error(err);
    }
};

export const deleteReport = async (report) => {
    const reportDocRef = doc(db, "reportDB", report.id);
    try {
        await deleteDoc(reportDocRef);
    } catch (error) {
        console.error("Error deleting:", error);
    }
};
