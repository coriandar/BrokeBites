import React from "react";
import Link from "next/link";

export default function DefaultBtn() {
    return (
        <>
            <li className="cursor-pointer p-2">
                <Link href="/">Home</Link>
            </li>
            <li className="cursor-pointer p-2">
                <Link href="/about">About</Link>
            </li>
        </>
    );
}
