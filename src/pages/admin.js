import React from "react";
import AdminDashboard from "@/components/moderation/AdminDashboard";
import { checkAdmin } from "@/database/firebase/firestore/userDB";
import { useRouter } from "next/router";

export default function adminPage() {
    const router = useRouter();

    (async () => {
        try {
            const isAdmin = await checkAdmin();
            if (!isAdmin) router.replace("/");
        } catch (error) {
            console.error("Error checking admin status:", error);
        }
    })();

    return <AdminDashboard />;
}
