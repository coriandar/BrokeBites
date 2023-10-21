import { createNewChat } from "@/database/firebase/firestore/direcMessageDB";
import { useEffect, useRef, useState } from "react";
import { userExists } from "../logic/DMLogic";
import { WarningModal } from "./WarningModal";

export default function UserSearch({ chatMasterList, userMasterList }) {
    const [query, setQuery] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [searchBoxClicked, setSearchBoxClicked] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const inputRef = useRef(null);

    const handleSearch = async () => {
        console.log("Users in handleSearch", userMasterList);
        console.log("query: ", query);
        setSelectedUser(userExists(query, userMasterList));

        if (selectedUser) {
            console.log("Selected user: ", selectedUser);
            createNewChat(query, chatMasterList);
        } else {
            setShowWarning(true);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            console.log("Selected user in handleKeyDown: ", selectedUser);
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
