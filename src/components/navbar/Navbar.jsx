import React from "react";
import { auth } from "../../database/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import LoggedInBtnSet from "./components/LoggedInBtnSet";
import LoggedOutBtnSet from "./components/LoggedOutBtnSet";
import NavImage from "./components/NavImage";
import MapSelectSet from "./components/MapSelectSet";
import ThemeToggle from "../ui/theme/ThemeToggle";

export default function Navbar() {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <div className="bg-slate-300"></div>;
    }

    return (
        <nav className="fixed right-8 top-8 z-50 flex h-12 items-center justify-between rounded-full border border-input bg-background p-4 text-accent-foreground">
            {user ? <MapSelectSet /> : <NavImage />}
            {user ? <LoggedInBtnSet /> : <LoggedOutBtnSet />}
            <ThemeToggle />
        </nav>
    );
}
