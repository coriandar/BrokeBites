import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "./StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firebaseConfig } from "@/config/Firebase.config";
import { uiConfig } from "@/config/FirebaseAuthUI.config";

firebase.initializeApp(firebaseConfig);

const styledConfig = uiConfig(firebase);

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
                    uiConfig={styledConfig}
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
