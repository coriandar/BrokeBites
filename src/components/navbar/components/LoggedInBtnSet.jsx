import React from "react";
import { auth } from "../../../database/firebase/firebaseApp";
import Link from "next/link";
import Avatar from "../../account/Avatar";
import { checkAdmin } from "@/database/firebase/firestore/userDB";
import { AuthSignout } from "@/components/authentication/components/AuthSignout";
import { Mail, UserCog2, Info, Home } from "lucide-react";
import { Button } from "@/components/ui/shadcn-ui/button";

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
                    <Link href="/">
                        <Button
                            size="icon"
                            title="Home"
                            className="h-[2rem] w-[2rem]"
                            variant="ghost"
                        >
                            <Home className="h-[1.2rem] w-[1.2rem]" />
                        </Button>
                    </Link>
                </li>
                <li className="cursor-pointer p-2">
                    <Link href="/about">
                        <Button
                            size="icon"
                            title="About"
                            className="h-[2rem] w-[2rem]"
                            variant="ghost"
                        >
                            <Info className="h-[1.2rem] w-[1.2rem]" />
                        </Button>
                    </Link>
                </li>
                <li className="cursor-pointer p-2">
                    <Link href="/profile">
                        <Button
                            size="icon"
                            title="Profile"
                            className="h-[2rem] w-[2rem]"
                            variant="ghost"
                        >
                            <UserCog2 className="h-[1.2rem] w-[1.2rem]" />
                        </Button>
                    </Link>
                </li>
                {isAdmin && (
                    <li className="cursor-pointer p-2">
                        <Link href="/admin">Admin</Link>
                    </li>
                )}
                <li className="cursor-pointer p-2">
                    <Link href="/directMessage">
                        <Button
                            size="icon"
                            title="Mail"
                            className="h-[2rem] w-[2rem]"
                        >
                            <Mail className="h-[1.2rem] w-[1.2rem]" />
                        </Button>
                    </Link>
                </li>
                <li className="cursor-pointer p-2">
                    <AuthSignout />
                </li>
            </ul>
        </>
    );
}
