import Avatar from "@/components/account/Avatar";
import { auth } from "@/database/firebase/firebaseApp";
import UserSearch from "./UserSearch";
import { useState } from "react";
import { getOtherDisplayName } from "../logic/DMLogic";
import { useRouter } from "next/router";

export default function SideBar({
    chatMasterList,
    userMasterList,
    currentUserChatList,
}) {
    const router = useRouter();
    const currentUser = auth.currentUser;
    const [displayNames, setDisplayNames] = useState([]);

    const redirect = (id) => {
        router.redirect(`/chat/${id}`);
    };

    const messageList = () => {
        return chatMasterList
            ?.filter((chat) => chat.users.includes(currentUser.displayName))
            .map((chat) => (
                <li>
                    <button onClick={() => redirect(chat.id)}>
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
