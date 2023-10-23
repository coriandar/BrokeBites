import { auth } from "@/database/firebase/firebaseApp";
import { sendMessage } from "@/database/firebase/firestore/direcMessageDB";
import { useContext, useState } from "react";
import { SelectedChat } from "../logic/SelectedChatContext";
import { Input } from "@/components/ui/shadcn-ui/input";
import { Button } from "@/components/ui/shadcn-ui/button";
import { Send } from "lucide-react";

export default function SendMessage() {
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
        <>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                    type="text"
                    autoComplete="off"
                    placeholder="Type a message"
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    value={messageText}
                />
                <Button
                    onClick={() => {
                        handleSend();
                    }}
                    size="icon"
                >
                    <Send className="h-[1.2rem] w-[1.2rem] " />
                </Button>
            </div>
        </>
    );
}
