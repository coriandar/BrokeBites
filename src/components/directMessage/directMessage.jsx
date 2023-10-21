import React from "react";
import { useEffect, useState } from "react";
import BottomBar from "./component/BottomBar";
import Messages from "./component/Messages";
import SideBar from "./component/SideBar";
import TopBar from "./component/TopBar";
import {
    getAllChats,
    getAllUsers,
} from "@/database/firebase/firestore/direcMessageDB";
import { getMessageList } from "./logic/DMLogic";
import { auth } from "@/database/firebase/firebaseApp";

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
            <SideBar
                chatMasterList={chatMasterList}
                userMasterList={userMasterList}
                currentUserChatList={currentUserChatList}
            />
            <TopBar />
            <Messages />
            <BottomBar />
        </div>
    );
}
