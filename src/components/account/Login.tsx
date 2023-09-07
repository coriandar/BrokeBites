import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "./StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { uiConfig } from "@/config/FirebaseAuthUI.config";
import { auth } from "../firebase/FirebaseApp";

const fbAuth = auth;
const styleConfig = uiConfig(firebase);

function Login() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const unregisterAuthObserver = fbAuth.onAuthStateChanged((user) => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver();
    }, []);

    if (!isSignedIn) {
        return (
            <div>
                <p>Sign In options</p>
                <StyledFirebaseAuth
                    uiConfig={styleConfig}
                    firebaseAuth={fbAuth}
                />
            </div>
        );
    } else {
        return (
            <div>
                <p>Welcome {fbAuth.currentUser?.displayName}</p>
                <a onClick={() => fbAuth.signOut()}>Sign Out</a>
            </div>
        );
    }
}

export default Login;
