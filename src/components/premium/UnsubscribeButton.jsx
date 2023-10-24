import React from "react";
import Link from "next/link";

export default function UnsubscribeButton() {
    //button is a link to the unsubscribe page
    return (
        <Link href="/unsubscribe">
            <button className="m-4 w-40 rounded-md bg-slate-200 px-4 py-1">
                Unsubscribe from Premium
            </button>
        </Link>
    );
}
