import {
    addDoc,
    collection,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseApp";

export const createNewChat = async (newChatData, dispatch) => {
    const docRef = await addDoc(collection(db, "directMessageDB"), newChatData);

    dispatch({
        type: "SET_SELECTED_CHAT",
        payload: { id: docRef.id },
    });
};

export const getAllChats = async () => {
    const querySnapshot = await getDocs(collection(db, "directMessageDB"));

    return querySnapshot?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

export const getAllUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "userDB"));

    return querySnapshot?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

export const sendMessage = async (messageText, sender, id) => {
    await addDoc(collection(db, "directMessageDB", id, "messages"), {
        messageText: messageText,
        sender: sender,
        timestamp: serverTimestamp(),
    });
};

export const getMessages = async (id) => {
    const querySnapshot = await getDocs(
        query(
            collection(db, "directMessageDB", id, "messages"),
            orderBy("timestamp"),
        ),
    );

    return querySnapshot?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};
