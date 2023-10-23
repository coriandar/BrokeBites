import React from "react";

export default function Layer({ children, position, transparent }) {
    let background = "bg-opacity-100";
    if (transparent) background = "dark:bg-opacity-0 bg-opacity-0";

    return (
        <div
            className={`absolute rounded-2xl bg-white dark:bg-black ${background} ${position}`}
        >
            {children}
        </div>
    );
}
