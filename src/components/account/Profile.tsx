import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { UserAuthConsumer } from "@/context/AuthContextProvider";

function Profile() {
    const { user } = UserAuthConsumer();
    const router = useRouter();

    useEffect(() => {
        if (!!user === false) {
            // !! convert user to true or false value
            router.replace("/login"); // replace so doesn't go into history
            return;
        }
    }, [user]);

    if (!!user === true) {
        return <div className="p-4">Profile Page</div>;
    }
}

export default Profile;
