import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../database/firebase/firebaseApp";
import { useRouter } from "next/router";
import { uiConfigSignUp } from "./config/FirebaseAuthUISignup.config";
import StyledFirebaseAuth from "../../../lib/StyledFirebaseAuth";
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
            <div className="flex flex-col items-center h-full">
                <Image
                    className="m-8 w-52"
                    src="/logoCut.png"
                    alt="App Logo"
                    width={200}
                    height={200}
                    priority
                />

                <div className="bg-white w-80 relative">
                    <StyledFirebaseAuth
                        uiConfig={uiConfigSignUp}
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
    }
}
