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
                <Link href="/savedBites">
                    <button
                        className={`px-4 py-1 ${changeColour("Saved")}`}
                        onClick={() => handleClick("Saved")}
                    >
                        Saved Bites
                    </button>
                </Link>
                <Link href="/toVisitBites">
                    <button
                        className={`px-4 py-1 rounded-e-md ${changeColour(
                            "Visit"
                        )}`}
                        onClick={() => handleClick("Visit")}
                    >
                        ToVisit Bites
                    </button>
                </Link>
            </li>
        </ul>
    );
}
