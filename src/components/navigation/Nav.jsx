import React from "react";
import { auth } from "../firebase/FirebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import LoggedInBtnSet from "./LoggedInBtnSet";
import LoggedOutBtnSet from "./LoggedOutBtnSet";
import NavImage from "./NavImage";
import MapSelectSet from "./MapSelectSet";

export default function Nav() {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <div className="bg-slate-300"></div>;
    }

    return (
        <nav className="bg-slate-300 flex justify-between w-full h-full p-2 border-b-2">
            {user ? <MapSelectSet /> : <NavImage />}
            {user ? <LoggedInBtnSet /> : <LoggedOutBtnSet />}
        </nav>
    );
}
