import { useRouter } from "next/router";
import App from "@/components/App";

export default function index() {
    const router = useRouter();

    return (
        <main>
            <div>
                <App />
            </div>
        </main>
    );
}
