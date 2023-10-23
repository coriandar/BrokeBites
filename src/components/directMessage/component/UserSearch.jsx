import { createNewChat } from "@/database/firebase/firestore/direcMessageDB";
import { useContext, useEffect, useRef, useState } from "react";
import { chatExists, userExists } from "../logic/DMLogic";
import { WarningModal } from "./WarningModal";
import { SelectedChat } from "../logic/SelectedChatContext";
import { auth } from "@/database/firebase/firebaseApp";
import { Input } from "@/components/ui/shadcn-ui/input";
import { Button } from "@/components/ui/shadcn-ui/button";
import { MessageSquarePlus } from "lucide-react";
import { TopTooltip } from "@/components/ui/tooltip/Tooltip";

export default function UserSearch({ chatMasterList, userMasterList }) {
    const [query, setQuery] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [searchBoxClicked, setSearchBoxClicked] = useState(false);
    const inputRef = useRef(null);
    const { dispatch } = useContext(SelectedChat);
    const currentUser = auth.currentUser;

    const handleSearch = async () => {
        if (query.length > 0) {
            console.log("Users in handleSearch", userMasterList);
            console.log("query: ", query);
            const selectedUser = userExists(query, userMasterList);

            if (selectedUser) {
                console.log("Selected user: ", selectedUser);
                searchForChat();
            } else {
                setShowWarning(true);
            }
        }
    };

    const searchForChat = async () => {
        const chat = chatExists(query, chatMasterList, currentUser);

        if (!chat && query !== currentUser.displayName) {
            const newChatData = {
                users: [currentUser.displayName, query],
            };

            createNewChat(newChatData, dispatch);
        } else {
            dispatch({ type: "SET_SELECTED_CHAT", payload: chat });
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            handleSearch();
        }
    };

    const handleClickOutside = (e) => {
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            setSearchBoxClicked(false);
        }
    };

    const handleEscapeKey = (e) => {
        if (searchBoxClicked && e.key === "Escape") {
            setSearchBoxClicked(false);
        }
    };

    useEffect(() => {
        if (searchBoxClicked) {
            document.addEventListener("click", handleClickOutside);
            document.addEventListener("keydown", handleEscapeKey);
        } else {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [searchBoxClicked]);

    return (
        <div className="flex w-full items-center">
            <Input
                type="text"
                placeholder="Find a BiteMate"
                onClick={() => setSearchBoxClicked(true)}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
                className="mr-2"
            />

            <div className="group relative cursor-pointer py-2">
                <TopTooltip text={"New chat"} />
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleSearch()}
                >
                    <MessageSquarePlus className="h-[1.2rem] w-[1.2rem] " />
                </Button>
            </div>

            {showWarning && <WarningModal setShowWarning={setShowWarning} />}
        </div>
    );
}
