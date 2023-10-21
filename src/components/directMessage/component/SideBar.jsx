import Avatar from "@/components/account/Avatar";
import { auth } from "@/database/firebase/firebaseApp";
import UserSearch from "./UserSearch";
import { useContext } from "react";
import { getOtherDisplayName } from "../logic/DMLogic";
import { SelectedChat } from "../logic/SelectedChatContext";

export default function SideBar({
    chatMasterList,
    userMasterList,
    currentUserChatList,
}) {
    const currentUser = auth.currentUser;
    const { dispatch } = useContext(SelectedChat);

    const handleSelect = (chat) => {
        dispatch({ type: "SET_SELECTED_CHAT", payload: chat });
    };

    const messageList = () => {
        return chatMasterList
            ?.filter((chat) => chat.users.includes(currentUser.displayName))
            .map((chat) => (
                <li>
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
            <p>{messageList()}</p>
        </div>
    );
}
