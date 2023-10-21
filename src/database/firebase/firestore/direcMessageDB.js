import {
    addDoc,
    collection,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseApp";

export const createNewChat = async (newChatData, dispatch) => {
    try {
        const docRef = await addDoc(
            collection(db, "directMessageDB"),
            newChatData,
        );
        const docSnapshot = await getDoc(docRef);
        const newChat = { ...docSnapshot.data() };

        dispatch({
            type: "SET_SELECTED_CHAT",
            payload: newChat,
        });
    } catch (error) {
        console.error("Error creating new chat:", error);
    }
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
