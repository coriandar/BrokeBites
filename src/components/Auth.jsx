import { useState } from "react";
import { auth, googleProvider } from "./firebase/FirebaseApp";
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
    EmailAuthProvider,
    sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "next/router";
import { FirebaseError } from "firebase/app";

export function Auth() {
    const [signInEmail, setSignInEmail] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [newEmailAddress, setNewEmailAddress] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const router = useRouter();

    const signUp = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                signUpEmail,
                password
            );

            /*await sendEmailVerification(currentUser!).catch((error) =>
                console.log(error)
            );*/

            await updateProfile(auth.currentUser, {
                displayName: displayName,
            }).catch((error) => console.log(error));

            console.log(user);
            router.push("../Account");

            return user;
        } catch (error) {
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
                password
            );

            console.log(user);
            router.push("../Account");
        } catch (error) {
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
        } catch (error) {
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
        } catch (error) {
            if (error instanceof FirebaseError) {
                const errorCode = error.code;
                const errorMessage = error.message;
            }
        }
    };

    const updateEmailAddress = async () => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;

            /*verifyBeforeUpdateEmail(user!, newEmailAddress!).then(() => {
                // Confirmation after the email address update
            });*/

            await updateEmail(currentUser, newEmailAddress).catch((error) =>
                console.log(error)
            );
        } catch (error) {
            if (error instanceof FirebaseError) {
                const errorCode = error.code;
                const errorMessage = error.message;
            }
        }
    };

    const changePassword = async () => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;

            await updatePassword(currentUser, newPassword).catch((error) =>
                console.log(error)
            );
        } catch (error) {
            if (error instanceof FirebaseError) {
                const errorCode = error.code;
                const errorMessage = error.message;
            }
        }
    };

    // TO DO: Implement this method for changing password when user is logged in
    const reauthentication = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        const credential = currentUser?.email
            ? EmailAuthProvider.credential(currentUser.email, password)
            : null;

        await reauthenticateWithCredential(currentUser, credential)
            .catch((error) => console.log(error))
            .then(() => {
                changePassword;
            });
    };

    // TO DO: Implement this method for resetting password when user does not remember their password.
    const passwordReset = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser.email) {
            await sendPasswordResetEmail(auth, currentUser.email).catch(
                (error) => console.log(error)
            );
            console.log("Password reset email sent");
        }
    };

    return {
        setSignUpEmail,
        setSignInEmail,
        setPassword,
        setNewEmailAddress,
        setDisplayName,
        setNewPassword,
        signInWithGoogle,
        signUp,
        signIn,
        logout,
        updateEmailAddress,
        changePassword,
        reauthentication,
        passwordReset,
    };
}
