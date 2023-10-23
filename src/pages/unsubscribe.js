//unsubscribe page
import { useEffect, useState } from "react";
import {
    checkPremiumStatus,
    removePremium,
} from "@/database/firebase/firestore/userDB";
import Link from "next/link";

export default function Unsubscribed() {
    const [isPremium, setIsPremium] = useState(false); //hook for premium status
    useEffect(() => {
        checkPremiumStatus().then((premium) => {
            setIsPremium(premium);
        });
    }, []);

    // Handler for the "YES" button
    const handleYesButtonClick = () => {
        removePremium();
    };

    //prompt user if they want to unsubscribe
    return (
        <div>
            <h1>Cancel Subscription?</h1>
            <Link href="/unsubscribeSuccess" passHref>
                <button
                    className="m-4 w-40 rounded-md bg-slate-200 px-4 py-1"
                    onClick={handleYesButtonClick}
                >
                    YES
                </button>
            </Link>
            <Link href="/profile" passHref>
                <button className="m-4 w-40 rounded-md bg-slate-200 px-4 py-1">
                    NO
                </button>
            </Link>
        </div>
    );
}
