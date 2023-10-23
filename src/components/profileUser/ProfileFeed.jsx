import React, { useEffect, useState } from "react";
import { fetchFeed } from "../../database/firebase/firestore/userFeedDB";
import FollowContainer from "./feed/FollowModal";
import FavoriteContainer from "./feed/FavoriteModal"; // Import the component for "favorite"
import ToVisitContainer from "./feed/ToVisitModal"; // Import the component for "toVisit"

export const ProfileFeed = ({ uid, displayName }) => {
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        async function initFeed() {
            try {
                const feedData = await fetchFeed(uid);
                if (feedData) {
                    console.log("User Feed Data:", feedData);
                    setFeed(feedData);
                } else {
                    console.log("User feed not found or does not exist.");
                }
            } catch (error) {
                console.error("Error fetching user feed data:", error);
            }
        }
        initFeed();
    }, [uid]);

    return (
        <div>
            {feed.map((followData) => {
                if (followData.postType === "follow") {
                    return (
                        <FollowContainer
                            key={followData.id}
                            followData={followData}
                            displayName={displayName}
                        />
                    );
                } else if (
                    followData.postType === "favorite" ||
                    followData.postType === "toVisit"
                ) {
                    return (
                        <FavoriteContainer
                            key={followData.id}
                            favoriteData={followData}
                            displayName={displayName}
                        />
                    );
                } else if (followData.postType === "review") {
                    return (
                        <ToVisitContainer
                            key={followData.id}
                            toVisitData={followData}
                            displayName={displayName}
                        />
                    );
                } else {
                    return <p key={followData.id}>No Feed</p>;
                }
            })}
        </div>
    );
};
