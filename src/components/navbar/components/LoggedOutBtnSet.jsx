import React from "react";
import Link from "next/link";
import DefaultBtn from "./DefaultBtn";

export default function LoggedOutBtnSet() {
    return (
        <ul className="flex items-center">
            <DefaultBtn />
            <li className="p-2 cursor-pointer">
                <Link href="/login">
                    <button className="bg-slate-200 px-4 py-1 rounded-md justify-end">
                        Login
                    </button>
                </Link>
            </li>
            <li className="p-2 cursor-pointer">
                <Link href="/signup">
                    <button className="bg-slate-200 px-4 py-1 rounded-md justify-end">
                        Signup
                    </button>
                </Link>
            </li>
        </ul>
    );
}
