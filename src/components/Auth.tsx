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
    sendEmailVerification,
    ActionCodeOperation,
    updateProfile,
} from "firebase/auth";
import { useRouter } from "next/router";
import { FirebaseError } from "firebase/app";

export function Auth() {
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [newEmailAddress, setNewEmailAddress] = useState("");

    const router = useRouter();

    const auth = getAuth();
    const currentUser = auth.currentUser;

    const signUp = async (): Promise<any> => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                signUpEmail,
                signUpPassword
            );

            /*await sendEmailVerification(currentUser!).catch((error) =>
                console.log(error)
            );*/

            await updateProfile(auth.currentUser!, {
                displayName: displayName,
            }).catch((error) => console.log(error));

            console.log(user);
            router.push("../Account");

            return user;
        } catch (error: any) {
            if (error instanceof FirebaseError) {
                const errorCode = error.code;
                const errorMessage = error.message;
            }
        }
    };

    const signIn = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                signInEmail,
                signInPassword
            );

            console.log(user);
            router.push("../Account");
        } catch (error: any) {
            if (error instanceof FirebaseError) {
                const errorCode = error.code;
                const errorMessage = error.message;
            }
        }
    };

    const signInWithGoogle = async () => {
        try {
            const user = await signInWithPopup(auth, googleProvider);

            console.log(user);
        } catch (error: any) {
            if (error instanceof FirebaseError) {
                const errorCode = error.code;
                const errorMessage = error.message;
            }
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);

            // Page after sign out
        } catch (error: any) {
            if (error instanceof FirebaseError) {
                const errorCode = error.code;
                const errorMessage = error.message;
            }
        }
    };

    const updateEmailAddress = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            /*verifyBeforeUpdateEmail(user!, newEmailAddress!).then(() => {
                // Confirmation after the email address update
            });*/

            await updateEmail(user!, newEmailAddress).catch((error) =>
                console.log(error)
            );
        } catch (error: any) {
            if (error instanceof FirebaseError) {
                const errorCode = error.code;
                const errorMessage = error.message;
            }
        }
    };

    // TO DO: Need to figure out the algorithm
    const changePassword = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            const credential = promptForCredentials();
        } catch (error: any) {
            if (error instanceof FirebaseError) {
                const errorCode = error.code;
                const errorMessage = error.message;
            }
        }
    };

    // TO DO: Need to figure out how to use this, what 'credential' contains
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
        signUp,
        signIn,
        logout,
        updateEmailAddress,
        changePassword,
        setDisplayName,
        setNewEmailAddress,
    };
}
