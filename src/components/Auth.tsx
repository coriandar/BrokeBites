import { useState } from "react";
import { auth, googleProvider } from "../config/Firebase";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";

export const Auth = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const signUp = async () => {};

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
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
            <input
                placeholder="email"
                onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
                placeholder="password"
                onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button onClick={signIn}>Sign In</button>
            <button onClick={signInWithGoogle}>Sign In With Google</button>
            <button onClick={logout}>Log Out</button>
        </div>
    );
};
