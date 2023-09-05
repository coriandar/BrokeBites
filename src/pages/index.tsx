import Image from "next/image";
import { Inter } from "next/font/google";
import InitMap from "../components/Map";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const router = useRouter();

    return (
        <main>
            <div>
                <center>
                    <button onClick={() => router.push("../SignIn")}>
                        Sign In
                    </button>

                    <button onClick={() => router.push("../SignUp")}>
                        Sign Up
                    </button>
                </center>
                <br></br>
                <br></br>

                <InitMap />
            </div>
        </main>
    );
}
