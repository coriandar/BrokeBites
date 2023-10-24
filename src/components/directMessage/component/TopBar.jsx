import Avatar from "@/components/account/Avatar";
import { useContext, useEffect, useState } from "react";
import { SelectedChat } from "../logic/SelectedChatContext";
import { auth } from "@/database/firebase/firebaseApp";
import { getUserName } from "../logic/DMLogic";

export default function TopBar() {
    const currentUser = auth.currentUser;
    const { data } = useContext(SelectedChat);
    const [otherUser, setOtherUser] = useState("");

    console.log("data in TopBar: ", data);

    useEffect(() => {
        const userName = getUserName(data?.selectedChat?.users, currentUser);
        setOtherUser(userName);
    }, [data]);

    return (
        <div className="flex">
            {/* <Avatar maxW={"w-[50px]"} photoURL={user.photoURL} /> */}
            <p>{otherUser}</p>
        </div>
    );
}
