import Layout from "@/components/__shared__/layout/Layout";
import "@/styles/globals.css";
import { auth } from "@/database/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import AboutPage from "@/components/about/AboutPage";
import Login from "@/components/account/login/Login";
import Signup from "@/components/account/login/Signup";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as gtag from "../lib/gtag";
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }) {
    const router = useRouter();
    //google analytics code
    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);
    const [user] = useAuthState(auth);
    const path = router.pathname;

    if (!user && path.includes("about")) {
        return (
            <>
                <Layout>
                    <AboutPage />
                </Layout>
            </>
        );
    } else if (!user && path.includes("signup")) {
        return (
            <>
                <Layout>
                    <Signup />
                </Layout>
            </>
        );
    } else if (!user) {
        return (
            <>
                <Layout>
                    <Login />
                </Layout>
            </>
        );
    } else if (user) {
        return (
            <>
                <Head>
                    <script
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2060929608189026"
                        crossorigin="anonymous"
                    ></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
                        }}
                    />
                </Head>
                {/* Global Site Tag (gtag.js) - Google Analytics */}
                <Script
                    strategy="afterInteractive"
                    src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
                />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </>
        );
    }
}
