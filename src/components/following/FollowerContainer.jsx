import React, { useState, useEffect } from "react";
import FollowCard from "./FollowCard";
import { fetchFollowerList } from "@/database/firebase/firestore/userDB";
import { auth } from "@/database/firebase/firebaseApp";
import { Card } from "../ui/shadcn-ui/card";
import { ScrollArea } from "../ui/shadcn-ui/scroll-area";

export default function FollowerContainer() {
    const [following, setFollowing] = useState(null);

    useEffect(() => {
        (async () => {
            setFollowing(await fetchFollowerList(auth.currentUser?.uid));
        })();
    }, []);

    return (
        <Card className="flex h-full w-full flex-col items-center rounded-lg">
            <h3 className="text-lg font-bold">Follower List</h3>
            <ScrollArea className="h-full w-full rounded-md border">
                <ul>
                    {following ? (
                        following.map((follow) => (
                            <li key={`${follow.id}follower`}>
                                <FollowCard follow={follow} />
                            </li>
                        ))
                    ) : (
                        <p>loading...</p>
                    )}
                </ul>
            </ScrollArea>
        </Card>
    );
}
