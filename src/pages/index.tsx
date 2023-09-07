import InitMap from "../components/Map";
import { useRouter } from "next/router";
import InitList from "../components/RestaurantList";
import { Inter } from "next/font/google";

import Login from "@/components/account/Login";
const inter = Inter({ subsets: ["latin"] });

export default function index() {
    const router = useRouter();

    return (
        <main>
            <div>
                <Login />
                <InitMap />
                <InitList />
            </div>
        </main>
    );
}
