import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "../firebase/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { uiConfig } from "@/config/FirebaseAuthUISignup.config";
import { auth } from "../firebase/FirebaseApp";
import { useRouter } from "next/router";
import { UserAuthConsumer } from "@/context/AuthContextProvider";
import Image from "../../../node_modules/next/image";

function Signup() {
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
                    src="/logo.jpg"
                    alt="App Logo"
                    width={200}
                    height={200}
                    priority
                />

                <div className="bg-white w-80 relative">
                    <StyledFirebaseAuth
                        uiConfig={styleConfig}
                        firebaseAuth={auth}
                    />
                    <div className="h-23% w-full absolute top-0 left-0 z-50 bg-white">
                        <h1 className="m-8 flex justify-center font-medium text-xl">
                            Signup with Email
                        </h1>
                    </div>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}

export default Signup;
