import React, { useEffect, useState } from "react";
import ButtonSmall from "../__shared__/ui/ButtonSmall";
import { auth } from "@/database/firebase/firebaseApp";
import {
    followSelectedUser,
    unfollowSelectedUser,
    fetchUserList,
} from "@/database/firebase/firestore/userDB";

export default function FollowButton({ otherUser }) {
    const currentUserID = auth.currentUser.uid;
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if (otherUser && currentUserID) {
            checkIsFollowing();
        }
    }, [otherUser, currentUserID]);

    const checkIsFollowing = async () => {
        const followingList = await fetchUserList(currentUserID, "following");
        setIsFollowing(followingList.includes(otherUser));
    };

    const follow = async () => {
        await followSelectedUser(otherUser);
        setIsFollowing(true);
    };

    const unfollow = async () => {
        await unfollowSelectedUser(otherUser);
        setIsFollowing(false);
    };

    return (
        <ButtonSmall
            label={isFollowing ? "Unfollow" : "Follow"}
            action={isFollowing ? unfollow : follow}
        />
    );
}
