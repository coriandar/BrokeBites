import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth } from "../firebase/FirebaseApp";
import Image from "next/image";
import Loading from "../loading/Loading";

function Profile() {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    if (loading) return <Loading />;
    else if (!user) {
        router.replace("/login");
        return null;
    } else if (user) {
        return <div className="p-4">Profile Page</div>;
    }
}

export default Profile;
