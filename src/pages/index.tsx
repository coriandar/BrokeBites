import Image from "next/image";
import { Inter } from "next/font/google";
import InitMap from "../components/Map";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main>
            <div>
                <InitMap />
            </div>
        </main>
    );
}
