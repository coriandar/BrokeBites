import React, { useState } from "react";
import Link from "next/link";

export default function MapSelectSet() {
    const [activeButton, setActiveButton] = useState("All");

    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const changeColour = (buttonName) => {
        return activeButton == buttonName ? "bg-slate-400" : "bg-slate-200";
    };

    return (
        <ul className="flex items-center justify-start">
            <li className="p-2 cursor-pointer">
                <Link href="/">
                    <button
                        className={`px-4 py-1 rounded-s-md ${changeColour(
                            "All"
                        )}`}
                        onClick={() => handleClick("All")}
                    >
                        All Bites
                    </button>
                </Link>
                <Link href="/favouriteBites">
                    <button
                        className={`px-4 py-1 ${changeColour("Favourite")}`}
                        onClick={() => handleClick("Favourite")}
                    >
                        Favourite Bites
                    </button>
                </Link>
                <Link href="/toVisitBites">
                    <button
                        className={`px-4 py-1 ${changeColour("Visit")}`}
                        onClick={() => handleClick("Visit")}
                    >
                        ToVisit Bites
                    </button>
                </Link>
                <Link href="/visitedBites">
                    <button
                        className={`px-4 py-1 rounded-e-md ${changeColour(
                            "Visited"
                        )}`}
                        onClick={() => handleClick("Visited")}
                    >
                        Visited Bites
                    </button>
                </Link>
            </li>
        </ul>
    );
}
