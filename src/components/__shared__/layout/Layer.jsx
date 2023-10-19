import React from "react";

export default function Layer({ children, position, transparent }) {
    let background = "bg-opacity-90";
    if (transparent) background = "bg-opacity-0";

    return (
        <div
            // className={`absolute rounded-2xl bg-slate-300 bg-opacity-90 p-6 ${position}`}
            // className={`absolute rounded-2xl bg-slate-300 ${background} p-6 ${position}`}
            className={`absolute rounded-2xl bg-slate-300 ${background} ${position}`}
        >
            {children}
        </div>
    );
}
