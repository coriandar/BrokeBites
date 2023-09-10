import React, { useEffect, useState } from "react";
import { UserAuthConsumer } from "@/context/AuthContextProvider";
import Loading from "./loading/Loading";

function Secret() {
    const { user } = UserAuthConsumer();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setLoading(false);
        };
        checkAuth();
    }, [user]);

    return (
        <div className="p-4">
            {loading ? (
                <Loading />
            ) : user ? (
                <p>
                    Welcome, you are logged in to the profile page - a protected
                    route.
                </p>
            ) : (
                <p>
                    You must be logged in to view this page - protected route.
                </p>
            )}
        </div>
    );
}

export default Secret;
