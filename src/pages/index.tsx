import Image from "next/image";
import { Inter } from "next/font/google";
import InitMap from "../components/Map";
import { useRouter } from "next/router";
import Login from "@/components/account/Login";
const inter = Inter({ subsets: ["latin"] });

export default function index() {
    const router = useRouter();

    return (
        <main>
            <div>
                <Login />
                <InitMap />
            </div>
        </main>
    );
}
