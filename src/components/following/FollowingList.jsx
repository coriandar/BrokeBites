import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchFollowingList } from "@/database/firebase/firestore/userDB";
import { auth } from "@/database/firebase/firebaseApp";

export default function FollowingList() {
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
                            <div className="h-8 bg-slate-200 m-5 rounded-lg">
                                <Link href={`/profile/${follow.id}`}>
                                    <p className="flex items-center justify-center">
                                        {follow.displayName
                                            ? follow.displayName
                                            : "Anonymous"}
                                    </p>
                                </Link>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>loading...</p>
                )}
            </ul>{" "}
        </div>
    );
}
