// import Layout from "@/components/__shared__/layout/RootLayout";
import RootLayout from "@/components/__shared__/layout/RootLayout";
import "@/styles/globals.css";
import { auth } from "@/database/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import AboutPage from "@/components/about/AboutPage";
// import Login from "@/components/account/login/Login";
import Signup from "@/components/account/login/Signup";
import { useRouter } from "next/router";
import Login from "@/components/authentication/components/Login";

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const path = router.pathname;

    if (!user && path.includes("about")) {
        return (
            <RootLayout>
                <AboutPage />
            </RootLayout>
        );
    } else if (!user && path.includes("signup")) {
        return (
            <RootLayout>
                <Signup />
            </RootLayout>
        );
    } else if (!user) {
        return (
            <RootLayout>
                <Login />
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
