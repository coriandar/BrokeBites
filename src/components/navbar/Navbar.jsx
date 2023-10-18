import React from "react";
import { auth } from "../../database/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import LoggedInBtnSet from "./components/LoggedInBtnSet";
import LoggedOutBtnSet from "./components/LoggedOutBtnSet";
import NavImage from "./components/NavImage";
import MapSelectSet from "./components/MapSelectSet";
import ThemeToggle from "../__shared__/theme/ThemeToggle";

export default function Navbar() {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <div className="bg-slate-300"></div>;
    }

    return (
        <nav className="fixed top-8 z-50 flex h-12 items-center justify-between rounded-full bg-slate-300 p-4">
            {user ? <MapSelectSet /> : <NavImage />}
            {user ? <LoggedInBtnSet /> : <LoggedOutBtnSet />}
            <ThemeToggle />
        </nav>
    );
}
