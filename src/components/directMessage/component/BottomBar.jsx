import { auth } from "@/database/firebase/firebaseApp";
import { sendMessage } from "@/database/firebase/firestore/direcMessageDB";
import { useContext, useState } from "react";
import { SelectedChat } from "../logic/SelectedChatContext";

export default function BottomBar() {
    const [messageText, setMessageText] = useState("");
    const currentUser = auth.currentUser;
    const { data } = useContext(SelectedChat);

    console.log("Selected chat at BottomBar: ", data?.selectedChat?.id);

    const handleSend = async () => {
        sendMessage(
            messageText,
            currentUser.displayName,
            data.selectedChat.id.toString(),
        );
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
