import React, { useState, useEffect } from "react";
import FollowCard from "./FollowCard";
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
        <div className="m-8 flex h-full w-full flex-col items-center justify-center rounded-lg">
            <h3 className="text-lg font-bold">Following List</h3>
            <ul>
                {following ? (
                    following.map((follow) => (
                        <li key={`${follow.id}following`}>
                            <FollowCard follow={follow} />
                        </li>
                    ))
                ) : (
                    <p>loading...</p>
                )}
            </ul>
        </div>
    );
}
