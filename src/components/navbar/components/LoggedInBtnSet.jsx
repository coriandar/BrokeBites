import React from "react";
import { auth } from "../../../database/firebase/firebaseApp";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import Link from "next/link";
import DefaultBtn from "./DefaultBtn";
import Avatar from "../../account/Avatar";

export default function LoggedInBtnSet() {
    const [user] = useAuthState(auth);
    const [signOut] = useSignOut(auth);
    const photoURL = user?.photoURL;

    async function signoutHandler() {
        const success = await signOut();
        if (success) alert("Signed out");
    }

    return (
        <>
            <ul className="flex items-center">
                <Avatar maxW={"w-8"} photoURL={photoURL} />
                <li className="cursor-pointer p-2">
                    <Link href={`/profile/${user.uid}`}>
                        <span className="font-bold">{user.displayName}</span>
                    </Link>
                </li>
            </ul>
            <ul className="flex items-center">
                <DefaultBtn />
                <li className="cursor-pointer p-2">
                    <Link href="/profile">Profile</Link>
                </li>
                <li className="cursor-pointer p-2">
                    <Link href="/directMessage">Direct Message</Link>
                </li>
                <li className="cursor-pointer p-2">
                    <button
                        className="justify-end rounded-md bg-slate-200 px-4 py-1"
                        onClick={signoutHandler}
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </>
    );
}
