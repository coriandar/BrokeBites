import { googleProvider } from "./Firebase.config";

export const uiConfig = (firebase: any) => {
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
};
