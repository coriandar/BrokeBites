import Image from "next/image";
import { Inter } from "next/font/google";
import { Auth } from "../components/Auth";
import InitMap from "../components/Map";

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
