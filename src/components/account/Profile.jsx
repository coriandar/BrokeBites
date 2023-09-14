import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/FirebaseApp";
import { useRouter } from "next/router";
import Image from "next/image";
import Loading from "../loading/Loading";
import UpdatePicture from "./UpdatePicture";
import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";

function Profile() {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    if (loading) return <Loading />;
    else if (!user) {
        router.replace("/login");
        return null;
    } else if (user) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div className="flex flex-col bg-slate-300 items-center h-90% rounded-xl shadow-2xl">
                    <Image
                        className="m-8 w-90% bg-slate-700 rounded-lg"
                        src="/logoCut.png"
                        alt="App Logo"
                        width={200}
                        height={200}
                        priority
                    />
                    <UpdatePicture />
                    <UpdateEmail />
                    <UpdatePassword />
                </div>
            </div>
        );
    }
}

export default Profile;
