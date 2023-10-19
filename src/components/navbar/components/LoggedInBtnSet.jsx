import React from "react";
import { auth } from "../../../database/firebase/firebaseApp";
import { logout } from "@/database/firebase/firestore/userDB";
import Link from "next/link";
import DefaultBtn from "./DefaultBtn";
import Avatar from "../../account/Avatar";
import { useToast } from "@/components/ui/shadcn-ui/use-toast";

export default function LoggedInBtnSet() {
    const photoURL = auth.currentUser?.photoURL;
    const uid = auth.currentUser?.uid;
    const displayName = auth.currentUser?.displayName;
    const { toast } = useToast();

    async function signoutHandler() {
        const success = await logout();
        if (success) {
            toast({ description: "Logged out" });
        } else if (!success) {
            toast({
                variant: "destructive",
                description: "Error logging out.",
            });
        }
    }

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
