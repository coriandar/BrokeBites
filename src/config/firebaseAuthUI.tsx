import { googleProvider } from "./firebaseApp";

export const uiConfig = (firebase: any) => {
    return {
        signInFlow: "popup",
        signInSuccessfulUrl: "/",
        //tosUrl: "/terms-of-service",
        //privacyPolicyUrl: "/privacy-policy",
        signInOptions: [googleProvider],
        //signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    };
};
