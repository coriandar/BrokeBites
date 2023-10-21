import { useContext, useState } from "react";
import { SelectedChat } from "../logic/SelectedChatContext";
import { getMessages } from "@/database/firebase/firestore/direcMessageDB";

export default function Messages() {
    const { data } = useContext(SelectedChat);
    const [messages, setMessages] = useState([]);

    console.log("SelectedChat context data: ", data);

    const displayMessages = async () => {
        //setMessages(getMessages(data.id));
        //console.log(messages);
    };

    return <div className="messageContainer"></div>;
}
