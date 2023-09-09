import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "./StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { uiConfig } from "@/config/FirebaseAuthUI.config";
import { auth } from "../firebase/FirebaseApp";
import { useRouter } from "next/router";

function Login() {
    const styleConfig = uiConfig(firebase);
    const router = useRouter();
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver();
    }, []);

    if (!isSignedIn) {
        return (
            <div>
                <StyledFirebaseAuth
                    uiConfig={styleConfig}
                    firebaseAuth={auth}
                />
            </div>
        );
    } else {
        router.push("/profile");
    }
}

export default Login;
