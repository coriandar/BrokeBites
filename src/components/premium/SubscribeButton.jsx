import React, { useState } from "react";
import StripeContainer from "./StripeContainer"; // Import the StripeContainer component

export default function SubscribeButton() {
    const [showItem, setShowItem] = useState(false);

    return (
        <div>
            {showItem ? (
                <StripeContainer />
            ) : (
                <button
                    className="m-4 w-40 rounded-md bg-slate-200 px-4 py-1"
                    onClick={() => setShowItem(true)}
                >
                    Subscribe
                </button>
            )}
        </div>
    );
}
