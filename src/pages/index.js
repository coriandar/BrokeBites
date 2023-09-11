import { useRouter } from "next/router";
import SearchContainer from "@/components/search/SearchContainer";

export default function index() {
    const router = useRouter();

    return (
        <>
            <SearchContainer />
        </>
    );
}
