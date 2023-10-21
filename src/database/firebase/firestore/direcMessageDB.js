import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebaseApp";
import { chatExists } from "@/components/directMessage/logic/DMLogic";

export const createNewChat = async (displayName, chats) => {
    const currentUser = auth.currentUser;

    if (
        !chatExists(displayName, chats, currentUser) &&
        displayName != currentUser.displayName
    ) {
        await addDoc(collection(db, "directMessageDB"), {
            users: [currentUser.displayName, displayName],
        });
    }
};

export const getAllChats = async () => {
    const querySnapshot = await getDocs(collection(db, "directMessageDB"));

    return querySnapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getAllUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "userDB"));

    return querySnapshot?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

export const sendMessage = async (messageText, senderName) => {
    const DMCollectionRef = collection(db, "directMessageDB");
};
