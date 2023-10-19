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
import FollowingContainer from "@/components/following/FollowingContainer";

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
            <div className="flex h-full w-full items-center justify-center ">
                <div className="flex h-90% flex-col items-center rounded-xl shadow-2xl">
                    <Avatar maxW={"w-50%"} photoURL={photoURL} />
                    <UpdatePicture />
                    <UpdateEmail />
                    <UpdatePassword />
                    <SubmitFeedback />
                    <SubmitBug />
                </div>
                <div>
                    <FollowingContainer />
                </div>
            </div>
        );
    }
}
