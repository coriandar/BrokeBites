import { useRouter } from "next/router";
import ComponentContainer from "@/components/ComponentContainer";

export default function index() {
    const router = useRouter();

    return (
        <main>
            <div>
                <ComponentContainer />
            </div>
        </main>
    );
}
