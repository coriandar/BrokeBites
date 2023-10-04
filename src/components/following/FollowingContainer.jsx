import React, { useState, useEffect } from "react";
import FollowingCard from "./FollowingCard";
import { fetchFollowingList } from "@/database/firebase/firestore/userDB";
import { auth } from "@/database/firebase/firebaseApp";

export default function FollowingContainer() {
    const [following, setFollowing] = useState(null);

    useEffect(() => {
        (async () => {
            setFollowing(await fetchFollowingList(auth.currentUser?.uid));
        })();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center m-8 bg-slate-300 w-full h-full rounded-lg">
            <h3 className="font-bold text-lg">Following List</h3>
            <ul>
                {following ? (
                    following.map((follow) => (
                        <li key={follow.id}>
                            <FollowingCard follow={follow} />
                        </li>
                    ))
                ) : (
                    <p>loading...</p>
                )}
            </ul>
        </div>
    );
}
