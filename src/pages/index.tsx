import Dashboard from "../components/Dashboard";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";

import Login from "@/components/account/Login";
const inter = Inter({ subsets: ["latin"] });

export default function index() {
    const router = useRouter();

    return (
        <main>
            <div>
                <Login />
                <Dashboard />
            </div>
        </main>
    );
}
