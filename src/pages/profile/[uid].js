import React from "react";
import UserProfile from "@/components/userProfile/UserProfile";
import { useRouter } from "next/router";

export default function userProfilePage() {
    const router = useRouter();
    const { uid } = router.query;

    return <UserProfile uid={uid} />;
}
