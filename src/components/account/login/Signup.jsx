import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../database/firebase/firebaseApp";
import { useRouter } from "next/router";
import { uiConfigSignUp } from "@/database/firebase/auth/config/FirebaseAuthUISignup.config";
import StyledFirebaseAuth from "@/database/firebase/auth/StyledFirebaseAuth";
import Image from "next/image";
import Loading from "../../__shared__/layout/Loading";

export default function Signup() {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    if (loading) return <Loading />;
    else if (user) {
        router.replace("/"); // if user is already logged in
        return null;
    } else if (!user) {
        return (
            <div className="flex h-full flex-col items-center">
                <Image
                    className="m-8 w-52"
                    src="/logoCut.png"
                    alt="App Logo"
                    width={200}
                    height={200}
                    priority
                />

                <div className="relative w-80 bg-white">
                    <StyledFirebaseAuth
                        uiConfig={uiConfigSignUp}
                        firebaseAuth={auth}
                    />
                    <div className="absolute left-0 top-0 z-50 h-23% w-full bg-white">
                        <h1 className="m-8 flex justify-center text-xl font-medium">
                            Signup with Email
                        </h1>
                    </div>
                </div>
            </div>
        );
    }
}
