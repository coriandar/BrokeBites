import Image from "next/image";
import InitMap from "../components/Map";
import InitList from "../components/RestaurantList";
import { Inter } from "next/font/google";
import { Auth } from "../components/Auth";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main>
            <div>
                <Auth />
                <InitMap />
                <InitList />
            </div>
        </main>
    );
}
