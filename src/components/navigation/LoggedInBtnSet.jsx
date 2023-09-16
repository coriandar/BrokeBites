import React from "react";
import { auth } from "../firebase/FirebaseApp";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import Link from "next/link";
import DefaultBtn from "./DefaultBtn";

export default function LoggedInBtnSet() {
    const [user] = useAuthState(auth);
    const [signOut] = useSignOut(auth);

    async function signoutHandler() {
        const success = await signOut();
        if (success) alert("Signed out");
    }

    return (
        <>
            <ul className="flex items-center">
                <li className="p-2 cursor-pointer">
                    <Link href="/">
                        Welcome!{" "}
                        <span className="font-bold">{user.displayName}</span>
                    </Link>
                </li>
            </ul>
            <ul className="flex items-center">
                <DefaultBtn />
                <li className="p-2 cursor-pointer">
                    <Link href="/profile">Profile</Link>
                </li>
                <li className="p-2 cursor-pointer">
                    <button
                        className="bg-slate-200 px-4 py-1 rounded-md justify-end"
                        onClick={signoutHandler}
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </>
    );
}
