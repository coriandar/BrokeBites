import RootLayout from "@/components/ui/layout/RootLayout";
import "@/styles/globals.css";
import { auth } from "@/database/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthenticationContainer from "@/components/authentication/AuthenticationContainer";
import Loading from "@/components/__shared__/layout/Loading";
import React from "react";

import BannerAd from "@/components/ads/BannerAd";
import { checkPremiumStatus } from "@/database/firebase/firestore/userDB";

export default function App({ Component, pageProps }) {
    const [user, loading] = useAuthState(auth);
    const [isPremium, setIsPremium] = React.useState(false);
    const [loadingCheck, setLoadingCheck] = React.useState(false);

    React.useEffect(() => {
        // Call the checkPremiumStatus function to check the user's premium status
        setLoadingCheck(true);
        checkPremiumStatus().then((premium) => {
            setIsPremium(premium);
            console.log("isPremium", isPremium);
            setLoadingCheck(false);
        });
    }, [user]);

    if (loadingCheck) {
        return (
            <RootLayout>
                <Loading />;
            </RootLayout>
        );
    } else {
        if (loading) {
            return (
                <RootLayout>
                    <Loading />;
                </RootLayout>
            );
        } else if (!user) {
            return (
                <RootLayout>
                    <AuthenticationContainer />
                </RootLayout>
            );
        } else if (user) {
            return (
                <RootLayout>
                    <BannerAd isPremium={isPremium}></BannerAd>
                    <Component {...pageProps} />
                </RootLayout>
            );
        }
    }
}
