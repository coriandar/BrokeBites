import Image from "next/image";
import { Inter } from "next/font/google";
import { Auth } from "../components/Auth";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main>
            <div>
                <Auth></Auth>
            </div>
        </main>
    );
}
