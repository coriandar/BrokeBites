import Dashboard from "../components/Dashboard";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { UserAuthContext } from "@/context/AuthContextProvider";

export default function index() {
    const { user } = UserAuthContext();

    return (
        <main className="bg-slate-500 p-4 flex-grow h-full">
            <h1>User: {user ? "logged in" : "logged out"}</h1>
            {/* <p>Dashboard Page</p> */}
            {/* <Dashboard /> */}
        </main>
        // <div className="flex-1 h-80">{<Dashboard />}</div>
        // <main
        //     className={`flex max-h-screen h-screen w-screen flex-col ${inter.className}`}
        // >
        //     <div className="flex-1 h-10">
        //         <Dashboard />
        //     </div>
        // </main>
    );
}
