import React from "react";

export default function Layer({ children, position }) {
    return (
        <div
            className={`absolute rounded-2xl bg-slate-300 bg-opacity-90 p-6 ${position}`}
        >
            {children}
        </div>
    );
}
