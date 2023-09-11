import React, { useState, useEffect } from "react";
import Link from "next/link";
import { auth } from "../components/firebase/FirebaseApp";
import Image from "next/image";

function Nav() {
    function logoutHandler() {
        auth.signOut();
    }

    return (
        <nav className="bg-slate-300 flex justify-between w-full h-full p-2 border-b-2">
            <ul className="flex items-center">
                <li className="p-2 cursor-pointer">
                    <Link href="/">
                        <Image
                            className="m-8"
                            src="/logoCut.png"
                            alt="App Logo"
                            width={50}
                            height={50}
                            priority
                        />
                    </Link>
                </li>
                <li className="p-2 cursor-pointer">
                    <Link href="/">BrokeBites</Link>
                </li>
                <li className="p-2 cursor-pointer">
                    <Link href="/about">About</Link>
                </li>
            </ul>

            {/* {!user ? (
                <ul className="flex items-center">
                    <li className="p-2 cursor-pointer">
                        <Link href="/login">
                            <button className="bg-slate-200 px-4 py-1 rounded-md justify-end">
                                Login
                            </button>
                        </Link>
                    </li>
                    <li className="p-2 cursor-pointer">
                        <Link href="/signup">
                            <button className="bg-slate-200 px-4 py-1 rounded-md justify-end">
                                Signup
                            </button>
                        </Link>
                    </li>
                </ul>
            ) : (
                <>
                    <ul className="flex items-center">
                        <li className="p-2 cursor-pointer">
                            Welcome!{" "}
                            <span className="font-bold">
                                {auth.currentUser?.displayName}
                            </span>
                        </li>
                    </ul>
                    <ul className="flex items-center">
                        <li className="p-2 cursor-pointer">
                            <Link href="/profile">Profile</Link>
                        </li>
                        <li className="p-2 cursor-pointer">
                            <button
                                className="bg-slate-200 px-4 py-1 rounded-md justify-end"
                                onClick={logoutHandler}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </>
            )} */}
        </nav>
    );
}

export default Nav;
