import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/FirebaseApp";
import { useRouter } from "next/router";
import Image from "next/image";
import Loading from "../loading/Loading";
import Link from "next/link";

function Profile() {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    if (loading) return <Loading />;
    else if (!user) {
        router.replace("/login");
        return null;
    } else if (user) {
        return (
            <div>
                <div className="p-4">Profile Page</div>
                <li className="p-2 cursor-pointer">
                    <Link href="/savedBites">
                        <button className="bg-slate-200 px-4 py-1 rounded-md justify-end">
                            Saved Bites
                        </button>
                    </Link>
                </li>
                <li className="p-2 cursor-pointer">
                    <Link href="/toVisitBites">
                        <button className="bg-slate-200 px-4 py-1 rounded-md justify-end">
                            ToVisit Bites
                        </button>
                    </Link>
                </li>
            </div>
        );
    }
}

export default Profile;
