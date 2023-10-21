import Avatar from "@/components/account/Avatar";
import { auth } from "@/database/firebase/firebaseApp";
import UserSearch from "./UserSearch";
import { useContext } from "react";
import { getOtherDisplayName } from "../logic/DMLogic";
import { SelectedChat } from "../logic/SelectedChatContext";

export default function SideBar({ chatMasterList, userMasterList }) {
    const currentUser = auth.currentUser;
    const { dispatch } = useContext(SelectedChat);

    const handleSelect = (chat) => {
        dispatch({ type: "SET_SELECTED_CHAT", payload: chat.id });
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
        </div>
    );
}
