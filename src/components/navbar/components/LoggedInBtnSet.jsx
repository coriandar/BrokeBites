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
                    <AuthSignout />
                </li>
            </ul>
        </>
    );
}
