// UserProfile.js
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { fetchUserSavedList } from "../savedBites/SavedBitesList";

export default function GetFollowerList() {
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const fetchFollowerList = async () => {
            const auth = getAuth();
            const currentUserId = auth.currentUser?.uid;

            const listName = "following";

            if (!currentUserId) return [];

            try {
                // gets list
                const followingID = await fetchUserSavedList(
                    currentUserId,
                    listName
                );

                // setFollowing(followingID);
                console.log(followingID);
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
                throw error;
            }
        };

        fetchFollowerList();
    }, []);

    return (
        <div className="m-8">
            <h2>Following List</h2>
            <ul>
                {/* {following.map((follow) => (
                    <li key={follow.id}>{follow.name}</li>
                ))} */}
            </ul>{" "}
        </div>
    );
}
