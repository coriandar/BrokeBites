export const uiConfig = (firebase: any) => {
    return {
        signInFlow: "popup",
        signInSuccessUrl: "/",
        signInOptions: [
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                fullLabel: "Login with Email",
                requireDisplayName: true,
            },
        ],
    };
};
