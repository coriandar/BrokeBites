import React from "react";
import { auth } from "../../database/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import LoggedInBtnSet from "./components/LoggedInBtnSet";
import LoggedOutBtnSet from "./components/LoggedOutBtnSet";
import NavImage from "./components/NavImage";
import MapSelectSet from "./components/MapSelectSet";

export default function Navbar() {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <div className="bg-slate-300"></div>;
    }

    return (
        <nav className="flex h-full w-full justify-between border-b-2 bg-slate-300 p-2">
            {user ? <MapSelectSet /> : <NavImage />}
            {user ? <LoggedInBtnSet /> : <LoggedOutBtnSet />}
        </nav>
    );
}
