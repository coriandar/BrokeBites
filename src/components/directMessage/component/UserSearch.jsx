import { auth } from "@/database/firebase/firebaseApp";
import {
    createNewChat,
    getAllChats as getAllChats,
    getAllUsers,
} from "@/database/firebase/firestore/direcMessageDB";
import { useEffect, useRef, useState } from "react";
import { getMessageList, userExists } from "../logic/DMLogic";
import { WarningModal } from "../WarningModal";

export default function UserSearch() {
    const [query, setQuery] = useState("");
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState([]);
    const [chatList, setChatList] = useState([]);
    const [showWarning, setShowWarning] = useState(false);
    const [searchBoxClicked, setSearchBoxClicked] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const inputRef = useRef(null);

    const currentUser = auth.currentUser;

    const handleSearch = async () => {
        console.log("Users in handleSearch", users);
        console.log("query: ", query);
        setSelectedUser(userExists(query, users));

        if (selectedUser) {
            console.log("Selected user: ", selectedUser);
            createNewChat(query, chats);
        } else {
            setShowWarning(true);
        }
    };

    const handleKeyDown = (event) => {
        console.log("Selected user in handleKeyDown: ", selectedUser);
        if (event.key === "Enter" || event.keyCode === 13) {
            handleSearch();
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const messages = await getAllChats();
            setChats(messages);

            const users = await getAllUsers();
            setUsers(users);

            const messageList = await getMessageList(messages, currentUser);
            setChatList(messageList);
        };

        fetchData();
    }, []);

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
