//successful unsubscribe page
import { useState, useEffect } from "react";
import { checkPremiumStatus } from "@/database/firebase/firestore/userDB";
import Link from "next/link";

export default function unsubSuccess() {
    const [isPremium, setIsPremium] = useState(false); //hook for premium status
    useEffect(() => {
        checkPremiumStatus().then((premium) => {
            setIsPremium(premium);
        });
    }, []);

    //double check if user is unsubscribed
    return (
        <div>
            {isPremium ? (
                <h1>Error unsubscribing</h1>
            ) : (
                <h1>Successfuly unsubscribed</h1>
            )}
            <Link href="/profile">
                <button className="m-4 w-40 rounded-md bg-slate-200 px-4 py-1">
                    Return
                </button>
            </Link>
        </div>
    );
}
