import Layout from "@/components/__shared__/layout/Layout";
import "@/styles/globals.css";
import { auth } from "@/database/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import AboutPage from "@/components/about/AboutPage";
import Login from "@/components/account/login/Login";
import Signup from "@/components/account/login/Signup";
import { useRouter } from "next/router";
import paymentPage from "./paymentPage";

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const path = router.pathname;

    if (!user && path.includes("about")) {
        return (
            <Layout>
                <AboutPage />
            </Layout>
        );
    } else if (!user && path.includes("signup")) {
        return (
            <Layout>
                <Signup />
            </Layout>
        );
    } else if (!user) {
        return (
            <Layout>
                <Login />
            </Layout>
        );
    } else if (user) {
        return (
            <Layout>
                <Component {...pageProps} />
            </Layout>
        );
    }
}
