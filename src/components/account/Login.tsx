import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "./StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { uiConfig } from "@/config/FirebaseAuthUI.config";
import { auth } from "../firebase/FirebaseApp";
import { useRouter } from "next/router";
import { UserAuthConsumer } from "@/context/AuthContextProvider";

function Login() {
    const styleConfig = uiConfig(firebase);
    const { user } = UserAuthConsumer();
    const router = useRouter();

    useEffect(() => {
        if (!!user === true) {
            router.replace("/profile"); // replace so doesn't go into history
            return;
        }
    }, [user]);

    if (!!user === false) {
        return (
            <div>
                <StyledFirebaseAuth
                    uiConfig={styleConfig}
                    firebaseAuth={auth}
                />
            </div>
        );
    }
}

export default Login;
