import { useRouter } from "next/router";
import InitList from "../components/RestaurantList";
import { Inter } from "next/font/google";
import InitMap from "../components/map/Map";
import { Auth } from "../components/Auth";

const inter = Inter({ subsets: ["latin"] });

export default function index() {
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
                <InitList />
            </div>
        </main>
    );
}
