import React from "react";
import { auth } from "../../../database/firebase/firebaseApp";
import Link from "next/link";
import Avatar from "../../account/Avatar";
import { checkAdmin } from "@/database/firebase/firestore/userDB";
import { AuthSignout } from "@/components/authentication/components/AuthSignout";

export default function LoggedInBtnSet() {
    const photoURL = auth.currentUser?.photoURL;
    const uid = auth.currentUser?.uid;
    const displayName = auth.currentUser?.displayName;
    const [isAdmin, setIsAdmin] = React.useState(false);

    React.useEffect(() => {
        const fetchAdminStatus = async () => {
            try {
                setIsAdmin(await checkAdmin());
            } catch (error) {
                console.error("Error checking admin status:", error);
            }
        };
        fetchAdminStatus();
    }, []);

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
                <li className="cursor-pointer p-2">
                    <Link href="/">Home</Link>
                </li>
                <li className="cursor-pointer p-2">
                    <Link href="/about">About</Link>
                </li>
                {isAdmin && (
                    <li className="cursor-pointer p-2">
                        <Link href="/admin">Admin</Link>
                    </li>
                )}
                <li className="cursor-pointer p-2">
                    <Link href="/profile">Profile</Link>
                </li>
                <li className="cursor-pointer p-2">
                    <Link href="/directMessage">Direct Message</Link>
                </li>
                <li className="cursor-pointer p-2">
                    <AuthSignout />
                </li>
            </ul>
        </>
    );
}
