import Image from "next/image";
import { Inter } from "next/font/google";
import InitMap from "../components/Map";
import { Auth } from "../components/Auth";

const inter = Inter({ subsets: ["latin"] });
//<InitMap />

export default function Home() {
    return (
        <main>
            <div>
                <InitMap />
            </div>
        </main>
    );
}
