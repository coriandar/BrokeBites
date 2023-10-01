import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function NavImage() {
    return (
        <ul className="flex items-center">
            <li className="p-2 cursor-pointer">
                <Link href="/">
                    <Image
                        className="m-8 w-35%"
                        src="/logoCut.png"
                        alt="App Logo"
                        width={50}
                        height={50}
                        priority
                    />
                </Link>
            </li>
        </ul>
    );
}
