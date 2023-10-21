import { auth } from "@/database/firebase/firebaseApp";
import { sendMessage } from "@/database/firebase/firestore/direcMessageDB";
import { useState } from "react";

export default function BottomBar({ id }) {
    const [messageText, setMessageText] = useState("");
    const currentUser = auth.currentUser;

    const handleSend = async () => {
        sendMessage(messageText, currentUser.displayName, id);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            handleSend();
        }
    };

    return (
        <div className="form">
            <div className="bottombarContainer">
                <input
                    placeholder="Type a message"
                    autoComplete="off"
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                ></input>
                <button
                    onClick={() => {
                        handleSend();
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}
