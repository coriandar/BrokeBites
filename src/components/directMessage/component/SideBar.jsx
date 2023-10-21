import Avatar from "@/components/account/Avatar";
import { auth } from "@/database/firebase/firebaseApp";
import UserSearch from "./UserSearch";
import { useContext, useEffect, useState } from "react";
import { getOtherDisplayName, getMessageList } from "../logic/DMLogic";
import { SelectedChat } from "../logic/SelectedChatContext";
import Messages from "./Messages";
import BottomBar from "./BottomBar";
import TopBar from "./TopBar";
import {
    getAllChats,
    getAllUsers,
} from "@/database/firebase/firestore/direcMessageDB";

export default function SideBar() {
    const currentUser = auth.currentUser;
    const { dispatch } = useContext(SelectedChat);
    const { data } = useContext(SelectedChat);

    const [chatMasterList, setChatMasterList] = useState([]);
    const [userMasterList, setUserMasterList] = useState([]);
    const [currentUserChatList, setCurrentUserChatList] = useState([]);

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

    const handleSelect = (chat) => {
        dispatch({ type: "SET_SELECTED_CHAT", payload: chat });
    };

    const chatList = () => {
        return chatMasterList
            ?.filter((chat) => chat.users.includes(currentUser.displayName))
            .map((chat) => (
                <li key={chat.id}>
                    <button onClick={() => handleSelect(chat)}>
                        {getOtherDisplayName(chat.users, currentUser)}
                    </button>
                </li>
            ));
    };

    return (
        <div className="sidebarContainer">
            <p>{currentUser.displayName}</p>
            <Avatar maxW={"w-[50px]"} photoURL={currentUser.photoURL} />
            <UserSearch
                chatMasterList={chatMasterList}
                userMasterList={userMasterList}
            />
            <p>{chatList()}</p>
            {data.selectedChat === null ? null : (
                <>
                    <TopBar />
                    <Messages />
                    <BottomBar />
                </>
            )}
        </div>
    );
}
