import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "./firebase/FirebaseApp";

function Navbar() {
    const router = useRouter();
    const fbAuth = auth;

    function handleLogin() {
        router.push("/login");
    }

    function handleLogout() {
        fbAuth.signOut();
    }

    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const unregisterAuthObserver = fbAuth.onAuthStateChanged((user) => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver();
    }, []);

    const authContent = !isSignedIn ? (
        <button
            className="bg-slate-200 px-5 py-2 rounded-md justify-end"
            onClick={handleLogin}
        >
            Login
        </button>
    ) : (
        <div>
            <p>Welcome {fbAuth.currentUser?.displayName}</p>
            <button
                className="bg-slate-200 px-5 py-2 rounded-md justify-end"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );

    return (
        <nav className="flex items-center justify-center h-20">
            {authContent}
        </nav>
    );
}

export default Navbar;
