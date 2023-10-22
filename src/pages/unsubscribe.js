//unsubscribe page
import React from "react";
import { checkPremiumStatus } from "@/database/firebase/firestore/userDB";

export default function Unsubscribed() {
    const isPremium = checkPremiumStatus();
    console.log(checkPremiumStatus.toString());

    return (
        <div>
            <h1>Successfuly Unsubscribed from Brokebites</h1>
        </div>
    );
}
