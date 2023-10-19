import { auth } from "@/database/firebase/firebaseApp";
import {
    createConversation,
    fetchAllUsers,
    searchUser,
} from "@/database/firebase/firestore/direcMessageDB";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";

export default function UserSearch() {
    const [query, setQuery] = useState("");
    const [userList, setUserList] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [searchBoxClicked, setSearchBoxClicked] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const inputRef = useRef(null);

    const currentUser = auth.currentUser;

    useEffect(() => {
        const getUsers = async () => {
            setUserList(await fetchAllUsers());
        };

        getUsers();
    }, []);

    useEffect(() => {
        if (query) {
            setSearchResult(searchUser(query.toLowerCase()));
            console.log("searchResult: ", searchResult);
        } else {
            setSearchResult(userList);
        }
    }, [query, userList]);

    useEffect(() => {
        if (selectedUser) {
            setSearchBoxClicked(false);

            console.log("Selected user after setting: ", selectedUser);

            const conversationID =
                currentUser.uid < selectedUser.id
                    ? currentUser.uid + selectedUser.id
                    : selectedUser.id + currentUser.uid;

            createConversation(conversationID);
        }
    }, [selectedUser]);

    const handleClickOutside = (e) => {
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            setSearchBoxClicked(false);
        }
    };

    const handleEscapeKey = (e) => {
        if (e.key === "Escape") {
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
            />
            {searchBoxClicked
                ? searchResult.map((user) => (
                      <div key={user.id} onClick={() => setSelectedUser(user)}>
                          {user.displayName}
                      </div>
                  ))
                : selectedUser && <Message selectedUser={selectedUser} />}
        </div>
    );
}
