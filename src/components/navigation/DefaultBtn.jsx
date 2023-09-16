import React from "react";
import Link from "next/link";

export default function DefaultBtn() {
    return (
        <>
            <li className="p-2 cursor-pointer">
                <Link href="/">Home</Link>
            </li>
            <li className="p-2 cursor-pointer">
                <Link href="/about">About</Link>
            </li>
        </>
    );
}
