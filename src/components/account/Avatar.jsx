import React, { useState, useEffect } from "react";
import { auth } from "../../database/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import placeholder from "./placeholderAvatar.png";

export default function Avatar({ maxW }) {
    const [photoURL, setPhotoURL] = useState(placeholder);
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user?.photoURL) {
            setPhotoURL(user.photoURL);
        }
    }, [user, photoURL]);

    return (
        <div
            className={`${maxW} flex justify-center items=center m-8 bg-slate-500 rounded-lg`}
        >
            <Image
                className="w-full rounded-lg"
                src={photoURL}
                alt="Avatar"
                width={200}
                height={200}
                priority
            />
        </div>
    );
}
