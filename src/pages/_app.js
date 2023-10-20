import RootLayout from "@/components/ui/layout/RootLayout";
import "@/styles/globals.css";
import { auth } from "@/database/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthenticationContainer from "@/components/authentication/AuthenticationContainer";
import Loading from "@/components/__shared__/layout/Loading";

export default function App({ Component, pageProps }) {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return (
            <RootLayout>
                <Loading />;
            </RootLayout>
        );
    } else if (!user) {
        return (
            <RootLayout>
                <AuthenticationContainer />
            </RootLayout>
        );
    } else if (user) {
        return (
            <RootLayout>
                <Component {...pageProps} />
            </RootLayout>
        );
    }
}
