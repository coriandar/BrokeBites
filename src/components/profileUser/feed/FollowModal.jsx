import React from "react";

export default function FollowContainer({ followData, displayName }) {
    return (
        <div>
            <ul key={followData.id} className="w-full">
                {displayName} followed {followData.recipient}
            </ul>
        </div>
    );
}
