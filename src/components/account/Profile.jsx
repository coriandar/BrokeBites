import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/FirebaseApp";
import { useRouter } from "next/router";
import Image from "next/image";
import Loading from "../loading/Loading";
import FavouriteList from "../bookmark/FavouriteList";

function Profile() {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    if (loading) return <Loading />;
    else if (!user) {
        router.replace("/login");
        return null;
    } else if (user) {
        return (
            <div>
                <div className="p-4">Profile Page</div>
                <FavouriteList />
            </div>
        );
    }
}

export default Profile;
