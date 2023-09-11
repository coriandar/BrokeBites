import React, { useState, useEffect } from "react";
import Image from "next/image";
import jokes from "./jokes.json";
import spinner from "./spinner.gif";

function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex] || null;
}

export default function Loading() {
    const [joke, setJoke] = useState(null);

    useEffect(() => {
        const randJoke = getRandomItem(jokes);
        setJoke(randJoke);
    }, []);

    return (
        <div className="bg-slate-50 flex flex-col justify-center items-center h-full font-medium text-lg">
            <Image
                className="m-8"
                src="/logoCut.png"
                alt="App Logo"
                width={200}
                height={200}
                priority
            />
            {joke ? <p> {joke.joke}</p> : <p>...</p>}
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
