import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/FirebaseApp";
import { useRouter } from "next/router";
import Avatar from "./Avatar";
import Loading from "../loading/Loading";
import UpdatePicture from "./UpdatePicture";
import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";

function Profile() {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    if (loading) return <Loading />;
    else if (!user) {
        router.replace("/login");
        return null;
    } else if (user) {
        return (
            <div className="w-full h-full flex justify-center items-center bg-slate-100">
                <div className="flex flex-col bg-slate-300 items-center h-90% rounded-xl shadow-2xl">
                    <Avatar />
                    <UpdatePicture />
                    <UpdateEmail />
                    <UpdatePassword />
                </div>
            </div>
        );
    }
}

export default Profile;
