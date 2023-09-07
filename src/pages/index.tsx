import Image from "next/image";
import { Inter } from "next/font/google";
import InitMap from "../components/map/Map";
import { Auth } from "../components/Auth";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main>
            <div>
                <Auth></Auth>
                <InitMap />
            </div>
        </main>
    );
}
