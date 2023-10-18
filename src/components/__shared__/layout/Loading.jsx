import React, { useState, useEffect } from "react";
import Image from "next/image";
import spinner from "../../__assets__/spinner.gif";
import { getJoke } from "../util/getJoke";

export default function Loading() {
    const [joke, setJoke] = useState(null);

    useEffect(() => {
        setJoke(getJoke());
    }, []);

    return (
        <div className="flex h-full flex-col items-center justify-center bg-slate-50 text-lg font-medium">
            <Image
                className="m-8"
                src="/logoCut.png"
                alt="App Logo"
                width={200}
                height={200}
                priority
            />
            {joke ? <p> {joke}</p> : <p>...</p>}
            <Image
                src={spinner}
                alt="Loading..."
                width={50}
                height={50}
                priority
            />
        </div>
    );
}
