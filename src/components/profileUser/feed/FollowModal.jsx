import React, { useState, useEffect } from "react";
import { fetchUser } from "@/database/firebase/firestore/userDB";

export default function FollowContainer({ followData, displayName }) {
    const [recipientDisplayName, setRecipientDisplayName] = useState(null);

    useEffect(() => {
        const fetchRecipientDisplayName = async () => {
            try {
                const user = await fetchUser(followData.recipient);
                if (user) {
                    setRecipientDisplayName(user.displayName);
                } else {
                    setRecipientDisplayName("Display Name Not Found");
                }
            } catch (error) {
                console.error(
                    "Error fetching recipient's display name:",
                    error,
                );
                setRecipientDisplayName("Display Name Error");
            }
        };

        fetchRecipientDisplayName();
    }, [followData.recipient]);

    return (
        <div>
            <ul key={followData.id} className="w-full">
                {displayName} followed {recipientDisplayName}
            </ul>
        </div>
    );
}
