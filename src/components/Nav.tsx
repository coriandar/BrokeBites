import React, { useState, useEffect } from "react";
import Link from "next/link";

function Nav() {
    return (
        <nav className="bg-slate-300 flex items-center justify-between h-20 w-full p-2 border-b-2">
            <ul className="flex">
                <li className="p-2 cursor-pointer">
                    <Link href="/">BrokeBites</Link>
                </li>
                <li className="p-2 cursor-pointer">
                    <Link href="/about">About</Link>
                </li>
                <li className="p-2 cursor-pointer">
                    <Link href="/profile">Profile</Link>
                </li>
            </ul>
            <ul className="flex">
                <Link href="/login">
                    <button className="bg-slate-200 px-5 py-2 rounded-md justify-end">
                        Login
                    </button>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;
