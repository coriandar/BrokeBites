import { useContext, useEffect, useState } from "react";
import { SelectedChat } from "../logic/SelectedChatContext";
import { getMessages } from "@/database/firebase/firestore/direcMessageDB";
import { auth } from "@/database/firebase/firebaseApp";

export default function Messages() {
    const { data } = useContext(SelectedChat);
    const [messages, setMessages] = useState([]);
    const currentUser = auth.currentUser.displayName;

    console.log("CurrentUser in Messages: ", currentUser);

    useEffect(() => {
        displayMessages();
    }, [data]);

    const displayMessages = async () => {
        if (data && data.selectedChat) {
            const messages = await getMessages(data.selectedChat.id);
            setMessages(messages);
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000);
        const options = {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
        };
        return date.toLocaleString("en-NZ", options);
    };

    return (
        <div className="messageContainer">
            <ul className="messageList">
                {messages.map((message) => (
                    <li key={message.id} className="messageItem">
                        {console.log(message.sender)}
                        {message.sender === currentUser ? (
                            <div className="sentMessage">
                                {message.messageText}
                            </div>
                        ) : (
                            <div className="recievedMessage">
                                {message.messageText}
                            </div>
                        )}
                        <div className="timestamp">
                            {formatTimestamp(message.timestamp)}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
