import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Icons } from "../../ui/icons/icons";
import { getJoke } from "../util/getJoke";

export default function Loading() {
    const [joke, setJoke] = useState(null);

    useEffect(() => {
        setJoke(getJoke());
    }, []);

    return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-slate-50 text-lg font-medium">
            <Image
                className="m-8"
                src="/logoCut.png"
                alt="App Logo"
                width={200}
                height={200}
                priority
            />
            {joke ? <p> {joke}</p> : <p>...</p>}
            <Icons.spinner className="h-7 w-7 animate-spin" />
        </div>
    );
}
