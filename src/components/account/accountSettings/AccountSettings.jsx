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
import FollowerContainer from "@/components/following/FollowerContainer";
import GetRecommendation from "@/components/recommendation/GetRecommendation";
import { Card } from "@/components/ui/shadcn-ui/card";
import { ScrollArea } from "@/components/ui/shadcn-ui/scroll-area";

export default function AccountSettings() {
    const [user, loading] = useAuthState(auth);
    const [isPremium, setIsPremium] = useState(false); //hook for premium status
    const router = useRouter();
    const photoURL = user?.photoURL;

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
            <div className="m-12 flex h-[700px] w-screen">
                <div className="m-4 flex h-full w-1/4">
                    <Card className="flex h-full w-full flex-col items-center justify-center rounded-lg">
                        <h3 className="text-lg font-bold">Following List</h3>
                        <ScrollArea className="flex h-full w-full flex-col rounded-md border">
                            <div className="flex flex-col items-center justify-center">
                                <Avatar maxW={"w-50%"} photoURL={photoURL} />
                                <div className="m-2">
                                    <UpdatePicture />
                                </div>

                                <div className="m-2">
                                    <UpdateEmail />
                                </div>

                                <div className="m-2">
                                    <UpdatePassword />
                                </div>

                                <div className="m-2">
                                    <SubmitFeedback />
                                </div>

                                <div className="m-2">
                                    <SubmitBug />
                                </div>

                                <div className="m-2">
                                    {isPremium ? (
                                        <UnsubscribeButton />
                                    ) : (
                                        <SubscribeButton />
                                    )}
                                </div>
                            </div>
                        </ScrollArea>
                    </Card>
                </div>
                <div className="m-4 flex h-full w-1/4">
                    {isPremium && <GetRecommendation />}
                </div>
                <div className="m-4 flex h-full w-1/4">
                    <FollowingContainer />
                </div>
                <div className="m-4 flex h-full w-1/4">
                    <FollowerContainer />
                </div>
            </div>
        );
    }
}
