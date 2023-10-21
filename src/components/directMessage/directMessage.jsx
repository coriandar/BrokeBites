import { useEffect, useState } from "react";
import SideBar from "./component/SideBar";
import {
    getAllChats,
    getAllUsers,
} from "@/database/firebase/firestore/direcMessageDB";
import { getMessageList } from "./logic/DMLogic";
import { auth } from "@/database/firebase/firebaseApp";
import { SelectedChatProvider } from "./logic/SelectedChatContext";

export default function DirectMessage() {
    const [chatMasterList, setChatMasterList] = useState([]);
    const [userMasterList, setUserMasterList] = useState([]);
    const [currentUserChatList, setCurrentUserChatList] = useState([]);

    const currentUser = auth.currentUser;

    useEffect(() => {
        const fetchData = async () => {
            const messages = await getAllChats();
            setChatMasterList(messages);
            console.log("Chat master list in Direct Message: ", chatMasterList);

            const users = await getAllUsers();
            setUserMasterList(users);
            console.log("User master list in Direct Message: ", userMasterList);

            const messageList = await getMessageList(messages, currentUser);
            setCurrentUserChatList(messageList);
            console.log(
                "Current user chat list in Direct Message: ",
                currentUserChatList,
            );
        };

        fetchData();
    }, [currentUser]);

    return (
        <div>
            <SelectedChatProvider>
                <SideBar
                    chatMasterList={chatMasterList}
                    userMasterList={userMasterList}
                />
            </SelectedChatProvider>
        </div>
    );
}
