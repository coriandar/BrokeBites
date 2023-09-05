import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateEmail,
    updatePassword,
    reauthenticateWithCredential,
    verifyBeforeUpdateEmail,
    AuthCredential,
} from "firebase/auth";
import { error } from "console";
import { useRouter } from "next/router";

export function Auth() {
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");

    const router = useRouter();

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
            await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
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

            // Page after sign out
        } catch (err) {
            console.error(err);
        }
    };

    const updateEmailAddress = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            // Promp user to enter new email address. Possibily another function that returns string?
            let newEmailAddress: string;

            verifyBeforeUpdateEmail(user!, newEmailAddress!).then(() => {
                // Confirmation after the email address update
            });
        } catch (err) {
            console.error(err);
        }
    };

    const changePassword = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            const credential = promptForCredentials();
        } catch (err) {
            console.error(err);
        }
    };

    const reauthentication = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        const credential = promptForCredentials();

        reauthenticateWithCredential(user!, credential!)
            .then(() => {
                // User reauthenticated, redirect page
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // TODO: prompt the user to re-provide their sign in credentials.
    function promptForCredentials(): AuthCredential {
        let credential!: AuthCredential;

        return credential;
    }

    return {
        signUpEmail,
        setSignUpEmail,
        signUpPassword,
        setSignUpPassword,
        signInEmail,
        setSignInEmail,
        signInPassword,
        setSignInPassword,
        signInWithGoogle,
    };
}
