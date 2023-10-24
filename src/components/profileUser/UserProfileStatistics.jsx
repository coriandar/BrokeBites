import React from "react";

export default function UserProfileStatistics({ userProfile, userReviews }) {
    const countFollowing = () => userProfile?.following?.length || 0;
    const countFollowers = () => userProfile?.followers?.length || 0;
    const countReviews = () => userReviews?.length || 0;

    return (
        <div className="flex items-center justify-between">
            <div className="m-2">Following: {countFollowing()}</div>
            <div className="m-2">Followers: {countFollowers()}</div>
            <div className="m-2">Reviews: {countReviews()}</div>
        </div>
    );
}
