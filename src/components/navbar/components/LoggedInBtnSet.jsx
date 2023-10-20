import React from "react";
import { auth } from "../../../database/firebase/firebaseApp";
import Link from "next/link";
import DefaultBtn from "./DefaultBtn";
import Avatar from "../../account/Avatar";
import { AuthSignout } from "@/components/authentication/components/AuthSignout";

export default function LoggedInBtnSet() {
    const photoURL = auth.currentUser?.photoURL;
    const uid = auth.currentUser?.uid;
    const displayName = auth.currentUser?.displayName;

    return (
        <>
            <ul className="flex items-center">
                <Avatar maxW={"w-8"} photoURL={photoURL} />
                <li className="cursor-pointer p-2">
                    <Link href={`/profile/${uid}`}>
                        <span className="font-bold">{displayName}</span>
                    </Link>
                </li>
            </ul>
            <ul className="flex items-center">
                <DefaultBtn />
                <li className="cursor-pointer p-2">
                    <Link href="/profile">Profile</Link>
                </li>
                <li className="cursor-pointer p-2">
<<<<<<< HEAD
                    <Link href="/directMessage">Direct Message</Link>
                </li>
                <li className="cursor-pointer p-2">
                    <button
                        className="justify-end rounded-md bg-slate-200 px-4 py-1"
                        onClick={signoutHandler}
                    >
                        Logout
                    </button>
=======
                    <AuthSignout />
>>>>>>> 9acb710609179abcfbc4c3d9bf6dbaf9cabb1727
                </li>
            </ul>
        </>
    );
}
