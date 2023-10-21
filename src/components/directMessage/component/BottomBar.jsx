import { auth } from "@/database/firebase/firebaseApp";
import { sendMessage } from "@/database/firebase/firestore/direcMessageDB";
import { useContext, useState } from "react";
import { SelectedChat } from "../logic/SelectedChatContext";

export default function BottomBar() {
    const [messageText, setMessageText] = useState("");
    const currentUser = auth.currentUser;
    const { dispatch } = useContext(SelectedChat);
    const { data } = useContext(SelectedChat);

    const handleSend = async () => {
        sendMessage(messageText, currentUser.displayName, data.selectedChat.id);

        dispatch({ type: "SET_MESSAGE", payload: messageText });

        setMessageText("");
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            handleSend();
            setMessageText("");
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
