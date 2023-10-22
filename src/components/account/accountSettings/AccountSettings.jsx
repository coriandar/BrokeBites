import { useState, useEffect } from "react";
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
import SubscribeButton from "@/components/premium/SubscribeButton";
import UnsubscribeButton from "@/components/premium/UnsubscribeButton";
import { checkPremiumStatus } from "@/database/firebase/firestore/userDB";

export default function AccountSettings() {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const photoURL = user?.photoURL;
    const [isPremium, setIsPremium] = useState(false); //hook for premium status
    //useEffect for loading premium related components
    useEffect(() => {
        if (!user) return; //if not logged in, return
        checkPremiumStatus().then((premium) => {
            setIsPremium(premium); // Update isPremium when the result is available
        });
    }, [user]);

    if (loading) return <Loading />;
    else if (!user) {
        router.replace("/login");
        return null;
    } else if (user) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-slate-100">
                <div className="flex h-90% flex-col items-center rounded-xl bg-slate-300 shadow-2xl">
                    <Avatar maxW={"w-50%"} photoURL={photoURL} />
                    <UpdatePicture />
                    <UpdateEmail />
                    <UpdatePassword />
                    <SubmitFeedback />
                    <SubmitBug />
                    {isPremium ? <UnsubscribeButton /> : <SubscribeButton />}
                </div>
                <div>
                    <FollowingContainer />
                </div>
            </div>
        );
    }
}
