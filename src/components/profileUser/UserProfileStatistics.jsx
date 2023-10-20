import React from "react";

export default function UserProfileStatistics({ userProfile, userReviews }) {
    const countFollowing = () => userProfile?.following?.length || 0;
    const countFollowers = () => userProfile?.followers?.length || 0;
    const countReviews = () => userReviews?.length || 0;

    return (
        <div className="flex items-center justify-between">
            <div>Following:{countFollowing()}</div>
            <div>Followers:{countFollowers()}</div>
            <div>Reviews:{countReviews()}</div>
        </div>
    );
}
