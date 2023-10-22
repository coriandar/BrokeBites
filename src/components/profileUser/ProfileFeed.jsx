import React, { useEffect, useState } from "react";
import { fetchFeed } from "../../database/firebase/firestore/userFeedDB";
import FollowContainer from "./feed/FollowModal";

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
            {feed.map((followData) => (
                <FollowContainer
                    key={followData.id}
                    followData={followData}
                    displayName={displayName}
                />
            ))}
        </div>
    );
};
