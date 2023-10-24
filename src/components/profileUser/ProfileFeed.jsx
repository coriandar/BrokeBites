import React, { useEffect, useState } from "react";
import { fetchFeed } from "../../database/firebase/firestore/userFeedDB";
import FollowContainer from "./feed/FeedCardFollow";
import FavoriteContainer from "./feed/FeedCardFavourite";
import ReviewContainer from "./feed/FeedCardReview";
import { ScrollArea } from "../ui/shadcn-ui/scroll-area";

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
        <ScrollArea className="h-full rounded-md border p-4">
            {feed.map((post) => {
                if (post.postType === "follow") {
                    return (
                        <FollowContainer
                            key={post.id}
                            postData={post}
                            displayName={displayName}
                        />
                    );
                } else if (post.postType === "favourite") {
                    return (
                        <FavoriteContainer
                            key={post.id}
                            postData={post}
                            displayName={displayName}
                        />
                    );
                } else if (post.postType === "review") {
                    return (
                        <ReviewContainer
                            key={post.id}
                            postData={post}
                            displayName={displayName}
                        />
                    );
                } else {
                    return <p key={post.id}>No Post Type</p>;
                }
            })}
        </ScrollArea>
    );
};
