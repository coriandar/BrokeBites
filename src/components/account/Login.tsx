import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "../firebase/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { uiConfig } from "@/config/FirebaseAuthUI.config";
import { auth } from "../firebase/FirebaseApp";
import { useRouter } from "next/router";
import { UserAuthConsumer } from "@/context/AuthContextProvider";
import Image from "../../../node_modules/next/image";

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
            <div className="flex flex-col items-center h-full">
                <Image
                    className="m-8"
                    src="/logoCut.png"
                    alt="App Logo"
                    width={200}
                    height={200}
                    priority
                />
                <StyledFirebaseAuth
                    uiConfig={styleConfig}
                    firebaseAuth={auth}
                />
            </div>
        );
    } else {
        return <></>;
    }
}

export default Login;
