import { useRouter } from "next/router";
import InitList from "../components/Restaurants/RestaurantList";
import { Inter } from "next/font/google";
import InitMap from "../components/map/Map";
import { Auth } from "../components/Auth";
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
