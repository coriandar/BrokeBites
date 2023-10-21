import Avatar from "@/components/account/Avatar";
import { useContext, useState } from "react";
import { SelectedChat } from "../logic/SelectedChatContext";
import { auth } from "@/database/firebase/firebaseApp";
import { getUserName } from "../logic/DMLogic";

export default function TopBar() {
    const currentUser = auth.currentUser;
    const { data } = useContext(SelectedChat);
    const [otherUser, setOtherUser] = useState("");

    const getOtherUser = async () => {
        const otherUserName = getUserName(data.selectedChat.users, currentUser);
        setOtherUser(otherUserName);

        console.log("Other user in TopBar: ", otherUser);
    };

    return (
        <div className="topbarContainer">
            <p>{otherUser}</p>
            {/* <Avatar maxW={"w-[50px]"} photoURL={user.photoURL} /> */}
        </div>
    );
}
