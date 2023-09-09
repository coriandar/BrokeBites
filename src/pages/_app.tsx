import Layout from "@/components/Layout";
import { AuthContextProvider } from "@/context/AuthContextProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthContextProvider>
    );
}
