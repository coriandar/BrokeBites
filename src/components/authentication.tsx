import { useState } from "react";
import { auth, googleProvider } from "@/config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";

export const Authentication = () => {
    const [email, setEmail] = useState("");
    const [Passowrd, setPassword] = useState("");

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, Passowrd);
        } catch (error) {
            console.error(error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error(error);
        }
    };

    const signOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <center>
                <input
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder="Passowrd"
                    type="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={signIn}>Sign In</button>
                <br></br>
                <br></br>
                <button onClick={signInWithGoogle}>Sign In with Google</button>
                <button>Sign Out</button>
            </center>
        </div>
    );
};
