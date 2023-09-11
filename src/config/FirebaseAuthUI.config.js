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
};
