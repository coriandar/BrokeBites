import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { error } from "console";

export const Auth = () => {
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const signUp = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                signUpEmail,
                signUpPassword
            );
        } catch (err) {
            console.error(err);
        }
    };

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(
                auth,
                signInEmail,
                signInPassword
            );
        } catch (err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <button onClick={signUp}>Sign up</button>
            <input
                placeholder="Email"
                onChange={(e) => setSignUpEmail(e.target.value)}
            />
            <input
                placeholder="Password"
                type="Password"
                onChange={(e) => setSignUpPassword(e.target.value)}
            />

            <center>
                <input
                    placeholder="Email"
                    onChange={(e) => setSignInEmail(e.target.value)}
                />
                <input
                    placeholder="Password"
                    type="Password"
                    onChange={(e) => setSignInPassword(e.target.value)}
                />
                <button onClick={signIn}>Sign In</button>
                <br></br>
                <br></br>
                <button onClick={signInWithGoogle}>Sign In with Google</button>
            </center>
        </div>
    );
};
