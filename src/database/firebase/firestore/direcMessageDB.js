import {
    updateDoc,
    collection,
    getDocs,
    serverTimestamp,
    addDoc,
    orderBy,
} from "firebase/firestore";
import { db } from "../firebaseApp";

export const fetchAllUsers = async () => {
    try {
        const userCollectionRef = collection(db, "userDB");
        const data = await getDocs(userCollectionRef);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data,
            id: doc.id,
        }));

        return filteredData;
    } catch (error) {
        console.error(error);
    }
};

export const sendMessage = async (conversationID, messageText, senderID) => {
    const conversationDocRef = doc(db, "directMessageDB", conversationID);
    const conversationDoc = await getDocs(conversationDocRef);

    if (!conversationDoc.exists()) {
        try {
            await addDoc(conversationDocRef, { latestMessage: messageText });
        } catch (error) {
            console.error("Error creating conversation document:", error);
            return;
        }
    }

    const messageRef = collection(conversationDocRef, "messages");
    try {
        await addDoc(messageRef, {
            messageText: messageText,
            senderID: senderID,
            timestamp: serverTimestamp(),
        });

        await updateDoc(conversationDocRef, { latestMessage: messageText });
    } catch (error) {
        console.error("Error sending the message:", error);
    }
};

export const getMessages = async (conversationID) => {
    const messageRef = collection(
        doc(db, "directMessageDB", conversationID, "messages"),
    );

    try {
        const querySnapshot = await getDocs(
            orderBy(messageRef, "timestamp", "asc"),
        );

        const messages = [];
        querySnapshot.forEach((doc) => {
            const messageData = doc.data();
            messages.push({
                id: doc.id,
                messageText: messageData.messageText,
                timestamp: messageData.timestamp,
                senderID: messageData.senderID,
            });
        });

        return messages;
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
};

export const searchUser = async (userDisplayName) => {
    const userMasterList = fetchAllUsers();

    if (!userDisplayName) {
        return userMasterList;
    }

    return userMasterList.filter((user) =>
        user.displayName.toLowerCase().includes(userDisplayName.toLowerCase()),
    );
};
