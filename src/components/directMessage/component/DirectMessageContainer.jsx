import { auth } from "@/database/firebase/firebaseApp";
import UserSearch from "./UserSearch";
import { useContext, useEffect, useState } from "react";
import { getOtherDisplayName, getMessageList } from "../logic/DMLogic";
import { SelectedChat } from "../logic/SelectedChatContext";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import {
    getAllChats,
    getAllUsers,
} from "@/database/firebase/firestore/direcMessageDB";
import styles from "./DirectMessage.module.css";

export default function DirectMessageContainer() {
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

        console.log("Data in SideBar: ", data);

        fetchData();
        chatList();
    }, [data]);

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
        // <div className="flex h-[700px] w-screen bg-slate-500">
        //     <UserSearch
        //         chatMasterList={chatMasterList}
        //         userMasterList={userMasterList}
        //     />
        //     <div>
        //         <p>{chatList()}</p>
        //     </div>
        //     <div>
        //         {data.selectedChat === null ? null : (
        //             <>
        //                 <TopBar />
        //                 <Messages />
        //                 <SendMessage />
        //             </>
        //         )}
        //     </div>
        // </div>
        <div className="m-12 flex h-[700px] w-screen items-center justify-between">
            <div className="m-4 h-full w-1/3">
                <h3 className="text-lg font-bold">Flagged Reviews</h3>
            </div>
            <div className="m-4 h-full w-2/3">
                <h3 className="text-lg font-bold">Bug Reports</h3>
                <SendMessage />
            </div>
        </div>
    );
}
