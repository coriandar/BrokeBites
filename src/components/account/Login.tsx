import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { uiConfigSignIn } from "@/config/FirebaseAuthUI.config";
import StyledFirebaseAuth from "../firebase/StyledFirebaseAuth";
import { auth } from "../firebase/FirebaseApp";
import Image from "next/image";
import Loading from "../loading/Loading";

export default function Login() {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const styleConfig = uiConfigSignIn();

    if (loading) return <Loading />;
    else if (user) router.replace("/"); // if user is already logged in
    else if (!user) {
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
    }
}
