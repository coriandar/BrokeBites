import { createNewChat } from "@/database/firebase/firestore/direcMessageDB";
import { useContext, useEffect, useRef, useState } from "react";
import { chatExists, userExists } from "../logic/DMLogic";
import { WarningModal } from "./WarningModal";
import { SelectedChat } from "../logic/SelectedChatContext";
import { auth } from "@/database/firebase/firebaseApp";

export default function UserSearch({ chatMasterList, userMasterList }) {
    const [query, setQuery] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [searchBoxClicked, setSearchBoxClicked] = useState(false);
    const inputRef = useRef(null);
    const { dispatch } = useContext(SelectedChat);
    const currentUser = auth.currentUser;

    const handleSearch = async () => {
        console.log("Users in handleSearch", userMasterList);
        console.log("query: ", query);
        const selectedUser = userExists(query, userMasterList);

        if (selectedUser) {
            console.log("Selected user: ", selectedUser);
            searchForChat();
        } else {
            setShowWarning(true);
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
        <div className="search">
            <div className="searchForm"></div>
            <input
                type="text"
                placeholder="Find a BiteMate"
                onClick={() => setSearchBoxClicked(true)}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
            />
            <button onClick={() => handleSearch()}>Search</button>
            {showWarning && <WarningModal setShowWarning={setShowWarning} />}
        </div>
    );
}
