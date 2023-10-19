import { auth } from "@/database/firebase/firebaseApp";
import { useState } from "react";
import { sendMessage } from "@/database/firebase/firestore/direcMessageDB";

export default function Message({ selectedUser }) {
    const [messageText, setMessageText] = useState("");

    const currentUser = auth.currentUser;

    const handleSend = async () => {
        const conversationID =
            currentUser.uid < selectedUser.id
                ? currentUser.uid + selectedUser.id
                : selectedUser.id + currentUser.uid;

        sendMessage(conversationID, messageText, currentUser.uid);
        setMessageText("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevents adding a new line
            handleSend();
        }
    };

    return (
        <div className="input">
            <input
                type="text"
                placeholder="Type a message..."
                onChange={(e) => setMessageText(e.target.value)}
                value={messageText}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}
