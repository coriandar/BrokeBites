import React from "react";
import Link from "next/link";
import DefaultBtn from "./DefaultBtn";

export default function LoggedOutBtnSet() {
    return (
        <ul className="flex items-center">
            <DefaultBtn />
            <li className="cursor-pointer p-2">
                <Link href="/login">
                    <button className="justify-end rounded-md bg-slate-200 px-4 py-1">
                        Login
                    </button>
                </Link>
            </li>
            <li className="cursor-pointer p-2">
                <Link href="/signup">
                    <button className="justify-end rounded-md bg-slate-200 px-4 py-1">
                        Signup
                    </button>
                </Link>
            </li>
        </ul>
    );
}
