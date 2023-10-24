//Stripe button used to take user to the payment page
import React, { useState } from "react";
import Link from "next/link";

export default function SubscribeButton() {
    return (
        <Link href="/paymentPage">
            <button className="m-4 w-40 rounded-md bg-slate-200 px-4 py-1">
                Subscribe to Premium
            </button>
        </Link>
    );
}
