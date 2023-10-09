// UserProfile.js
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { fetchUserSavedList } from "../savedBites/SavedBitesList";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Link from "next/link";

export default function GetFollowerList() {
    const [following, setFollowing] = useState(null);

    const fetchUserList = async (userID) => {
        const firestore = getFirestore();
        const userDocRef = doc(firestore, "userDB", userID);
        const userDocSnapshot = await getDoc(userDocRef);
        if (!userDocSnapshot.exists()) return null;

        const userData = {
            ...userDocSnapshot.data(),
            id: userID,
        };
        return userData;
    };

    useEffect(() => {
        const fetchFollowerList = async () => {
            const auth = getAuth();
            const currentUserId = auth.currentUser?.uid;

            if (!currentUserId) return [];

            try {
                const followingList = await fetchUserSavedList(
                    currentUserId,
                    "following"
                );
                const followingPromises = followingList.map(fetchUserList);
                const followingDataList = await Promise.all(followingPromises);
                setFollowing(followingDataList);
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
                return null;
            }
        };

        (async () => {
            await fetchFollowerList();
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
                                        {follow.displayName}
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
