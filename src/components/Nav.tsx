import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuthConsumer } from "@/context/AuthContextProvider";
import { auth } from "../components/firebase/FirebaseApp";

function Nav() {
    const { user } = UserAuthConsumer();

    function logoutHandler() {
        auth.signOut();
    }

    return (
        <nav className="bg-slate-300 flex justify-between h-20 w-full p-2 border-b-2">
            <ul className="flex items-center">
                <li className="p-2 cursor-pointer">
                    <Link href="/">BrokeBites</Link>
                </li>
                <li className="p-2 cursor-pointer">
                    <Link href="/about">About</Link>
                </li>
            </ul>

            {!user ? (
                <ul className="flex items-center">
                    <li className="p-2 cursor-pointer">
                        <Link href="/login">
                            <button className="bg-slate-200 px-5 py-2 rounded-md justify-end">
                                Login
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
                                {auth.currentUser?.displayName}{" "}
                            </span>
                        </li>
                    </ul>
                    <ul className="flex items-center">
                        <li className="p-2 cursor-pointer">
                            <Link href="/profile">Profile</Link>
                        </li>
                        <li className="p-2 cursor-pointer">
                            <button
                                className="bg-slate-200 px-5 py-2 rounded-md justify-end"
                                onClick={logoutHandler}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </>
            )}
        </nav>
    );
}

export default Nav;
