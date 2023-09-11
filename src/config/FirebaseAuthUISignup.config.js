import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";

export const uiConfigSignUp = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [
        // make custom signup after
        {
            provider: EmailAuthProvider.PROVIDER_ID,
            fullLabel: "Signup with Email",
            requireDisplayName: true,
        },
    ],
};
