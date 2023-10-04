import React from "react";
import { auth } from "../../../database/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Avatar from "../Avatar";
import Loading from "../../__shared__/layout/Loading";
import UpdatePicture from "./components/UpdatePicture";
import UpdateEmail from "./components/UpdateEmail";
import UpdatePassword from "./components/UpdatePassword";
import SubmitFeedback from "./components/SubmitFeedback";
import SubmitBug from "./components/SubmitBug";
import FollowingList from "@/components/following/FollowingList";

export default function AccountSettings() {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const photoURL = user?.photoURL;

    if (loading) return <Loading />;
    else if (!user) {
        router.replace("/login");
        return null;
    } else if (user) {
        return (
            <div className="w-full h-full flex justify-center items-center bg-slate-100">
                <div className="flex flex-col bg-slate-300 items-center h-90% rounded-xl shadow-2xl">
                    <Avatar maxW={"w-50%"} photoURL={photoURL} />
                    <UpdatePicture />
                    <UpdateEmail />
                    <UpdatePassword />
                    <SubmitFeedback />
                    <SubmitBug />
                </div>
                <div>
                    <FollowingList />
                </div>
            </div>
        );
    }
}
