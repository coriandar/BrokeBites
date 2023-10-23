import { auth } from "@/database/firebase/firebaseApp";
import UserSearch from "./UserSearch";
import React, { useContext, useEffect, useState } from "react";
import { getOtherDisplayName, getMessageList } from "../logic/DMLogic";
import { SelectedChat } from "../logic/SelectedChatContext";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import {
    getAllChats,
    getAllUsers,
} from "@/database/firebase/firestore/direcMessageDB";
import { ScrollArea } from "@/components/ui/shadcn-ui/scroll-area";
import { Card } from "@/components/ui/shadcn-ui/card";
import TopBar from "./TopBar";
import { Button } from "@/components/ui/shadcn-ui/button";

export default function DirectMessageContainer() {
    const currentUser = auth.currentUser;
    const { dispatch } = useContext(SelectedChat);
    const { data } = useContext(SelectedChat);
    const [selectedChat, setSelectedChat] = React.useState(null);

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
                    <Button
                        variant="ghost"
                        className={`flex w-full items-center justify-start`}
                        onClick={() => handleSelect(chat)}
                    >
                        {getOtherDisplayName(chat.users, currentUser)}
                    </Button>
                </li>
            ));
    };

    return (
        <div className="flex h-[700px] w-screen items-center justify-center">
            <div className="flex h-full w-60% items-center justify-center">
                <div className="m-2 flex h-full w-1/3 flex-col">
                    <h3 className="text-lg font-bold">Chats</h3>
                    <Card className="flex h-full flex-col justify-between p-4">
                        <UserSearch
                            chatMasterList={chatMasterList}
                            userMasterList={userMasterList}
                        />
                        <ScrollArea className="h-full rounded-md border">
                            <ul>{chatList()}</ul>
                        </ScrollArea>
                    </Card>
                </div>

                <div className="m-2 flex h-full w-2/3 flex-col">
                    <h3 className="text-lg font-bold">Messages</h3>
                    <Card className="flex h-full flex-col justify-between p-4">
                        <TopBar />
                        <ScrollArea className="h-full max-h-[550px] rounded-md border">
                            <div>
                                {data.selectedChat === null ? null : (
                                    <Messages />
                                )}
                            </div>
                        </ScrollArea>
                        <SendMessage />
                    </Card>
                </div>
            </div>
        </div>
    );
}
