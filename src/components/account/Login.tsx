import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import StyledFirebaseAuth from "../firebase/StyledFirebaseAuth";
import { auth } from "../firebase/FirebaseApp";
import "firebase/compat/auth";
import { uiConfig } from "@/config/FirebaseAuthUI.config";
import Image from "next/image";
import firebase from "firebase/compat/app";
import Reacta, { useEffect, useState } from "react";

import Loading from "../loading/Loading";

export default function Login() {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    const styleConfig = uiConfig(firebase);

    const [loadtime, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }, []);

    if (loadtime) return <Loading />;
    else if (user) {
        // if user is already logged in
        router.replace("/profile");
        return null;
    }

    return (
        <div className="flex flex-col items-center h-full">
            <Image
                className="m-8"
                src="/logoCut.png"
                alt="App Logo"
                width={200}
                height={200}
                priority
            />
            <StyledFirebaseAuth uiConfig={styleConfig} firebaseAuth={auth} />
        </div>
    );
}
