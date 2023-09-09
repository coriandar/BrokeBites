import React, { useEffect, useState } from "react";
import { auth } from "./firebase/FirebaseApp";

function Navbar() {
    const fbAuth = auth;

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
        <button className="bg-slate-200 px-5 py-2 rounded-md justify-end">
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

    return <>{authContent}</>;
}

export default Navbar;
