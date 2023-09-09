import { NextRequest, NextResponse } from "next/server";
import { UserAuthConsumer } from "./context/AuthContextProvider";

export async function middleware(req: NextRequest) {
    const token = req.headers.get("token");
    //const {user} = UserAuthConsumer();
    const user = false;

    if (!user) {
        if (req.nextUrl.pathname.startsWith("/profile")) {
            const newUrl = new URL("/login", req.url);
            return NextResponse.redirect(newUrl);
        }
    }

    if (user) {
        if (req.nextUrl.pathname.startsWith("/login")) {
            const newUrl = new URL("/profile", req.url);
            return NextResponse.redirect(newUrl);
        }
    }
    
    return NextResponse.next();
}
