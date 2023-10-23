import React, { useState, useEffect } from "react";
import { fetchUser } from "@/database/firebase/firestore/userDB";

export default function FollowContainer({ postData, displayName }) {
    const [recipientDisplayName, setRecipientDisplayName] = useState(null);

    useEffect(() => {
        const fetchRecipientDisplayName = async () => {
            try {
                const user = await fetchUser(postData.recipient);
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
    }, [postData.recipient]);

    return (
        <div>
            <ul key={postData.id} className="w-full">
                {displayName} followed {recipientDisplayName}
            </ul>
        </div>
    );
}
