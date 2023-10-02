import React from "react";
import { auth } from "../firebase/FirebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Avatar from "./Avatar";
import Loading from "../loading/Loading";
import UpdatePicture from "./UpdatePicture";
import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";
import SubmitFeedback from "./SubmitFeedback";
import SubmitBug from "./SubmitBug";
import Link from "next/link";
import GetFollowerList from "./GetFollowerList";

export default function Profile() {
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
                    <Avatar maxW={"w-50%"} />
                    <UpdatePicture />
                    <UpdateEmail />
                    <UpdatePassword />
                    <SubmitFeedback />
                    <SubmitBug />
                </div>
                <div>
                    <GetFollowerList />
                </div>
            </div>
        );
    }
}
