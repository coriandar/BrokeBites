import { getAuth } from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

function FollowButton({ otherUser }) {
    const firestore = getFirestore();
    const auth = getAuth();
    const currentUserID = auth.currentUser.uid;
    const [isFollowing, setIsFollowing] = useState(false);

    console.log("Follow button current user: ", currentUserID);
    console.log("Follow button other user: ", otherUser);

    useEffect(() => {
        if (otherUser && currentUserID) {
            // Check if the current user is following the other user
            const userDocRef = doc(firestore, "userDB", currentUserID);

            getDoc(userDocRef).then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    const followings = data?.following || [];

                    // Check if the selectedRestaurant ID exists in the favourite array
                    const isCurrentlyFollowing = followings.includes(otherUser);

                    setIsFollowing(isCurrentlyFollowing);
                    console.log("isCurrentlyFollowing: ", isCurrentlyFollowing);
                }
            });
        }
    }, [otherUser, currentUserID]);

    // Function to follow a user
    const followUser = async () => {
        const userDocRef = doc(firestore, "userDB", currentUserID);

        try {
            await setDoc(
                userDocRef,
                { following: arrayUnion(otherUser) },
                { merge: true }
            );

            console.log(otherUser, " added to following");
            setIsFollowing(true);
            console.log(isFollowing);
        } catch (error) {
            console.error("Error adding to favorites:", error);
        }
    };

    // Function to unfollow a user
    const unfollowUser = async () => {
        const userDocRef = doc(firestore, "userDB", currentUserID);

        try {
            await setDoc(
                userDocRef,
                { following: arrayRemove(otherUser) },
                { merge: true }
            );

            console.log(otherUser, " removed from following");
            setIsFollowing(false);
            console.log(isFollowing);
        } catch (error) {
            console.error("Error removing from favorites:", error);
        }
    };

    return (
        <button
            className="font-light text-sm bg-slate-200 rounded-md p-1 shadow-lg m-1"
            onClick={isFollowing ? unfollowUser : followUser}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
}

export default FollowButton;
