import { auth } from "@/database/firebase/firebaseApp";
import { searchUser } from "@/database/firebase/firestore/direcMessageDB";
import { useEffect, useState } from "react";

export default function UserSearch() {
    const [query, setQuery] = useState("");
    const [userList, setUserList] = useState(null);
    const [user, setUser] = useState(null);

    const currentUser = auth.currentUser;

    useEffect(() => {
        setUserList(searchUser(query.toLowerCase()));
    }, [query, setUserList]);

    const handleSelect = async() => {
        const combinedID = 
    }

    return (
        <div className="flex h-5% w-full items-center rounded-lg bg-slate-300 pl-2 shadow-lg">
            <label htmlFor="search">Search:</label>
            <input
                id="search"
                className="m-4 w-full rounded-sm"
                type="text "
                onChange={(e) => setQuery(e.target.value)}
            />
            <li>{userList.map()}</li>
        </div>
    );
}
