<<<<<<< HEAD
export const uiConfig = (firebase) => {
    return {
        signInFlow: "popup",
        signInSuccessUrl: "/",
        signInOptions: [
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                fullLabel: "Login with Google",
                customParameters: {
                    prompt: "select_account",
                },
            },
            // make custom login after
            // make custom signup after
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                fullLabel: "Login with Email",
                requireDisplayName: true,
            },
        ],
    };
=======
import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";

export const uiConfigSignIn = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [
        // make custom login after
        {
            provider: GoogleAuthProvider.PROVIDER_ID,
            fullLabel: "Login with Google",
            customParameters: {
                prompt: "select_account",
            },
        },
        {
            provider: EmailAuthProvider.PROVIDER_ID,
            fullLabel: "Login with Email",
            requireDisplayName: true,
        },
    ],
>>>>>>> 1108444f33c6552f103e21d442bb347992e0a168
};
