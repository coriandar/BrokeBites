import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "./StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firebaseConfig } from "@/config/firebaseApp";

firebase.initializeApp(firebaseConfig);

const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            fullLabel: "Login with Google",
            customParameters: {
                prompt: "select_account",
            },
        },
        // make custom login after
        // make custom signup after
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            fullLabel: "Login with Email",
            requireDisplayName: true,
        },
    ],
};

function Login() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged((user) => {
                setIsSignedIn(!!user);
            });
        return () => unregisterAuthObserver();
    }, []);

    if (!isSignedIn) {
        return (
            <div>
                <p>Sign In options</p>
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </div>
        );
    } else {
        return (
            <div>
                <p>Welcom {firebase.auth().currentUser?.displayName}</p>
                <a onClick={() => firebase.auth().signOut()}>Sign Out</a>
            </div>
        );
    }
}

export default Login;
