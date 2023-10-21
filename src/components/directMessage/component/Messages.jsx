import { useContext, useState } from "react";
import { SelectedChat } from "../logic/SelectedChatContext";
import { getMessages } from "@/database/firebase/firestore/direcMessageDB";

export default function Messages() {
    const { data } = useContext(SelectedChat);
    const [messages, setMessages] = useState([]);

    console.log("SelectedChat context data: ", data?.selectedChat?.id);

    const displayMessages = () => {
        setMessages(getMessages(data.selectedChat.id));
        console.log("Messages in dispayMessages: ", messages);
    };

    return <div className="messageContainer">Messages go here</div>;
}
