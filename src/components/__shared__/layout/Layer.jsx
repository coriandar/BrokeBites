import React from "react";

export default function Layer({ children, position }) {
    return (
        <div
            className={`bg-slate-300 bg-opacity-90 absolute rounded-2xl p-6 ${position}`}
        >
            {children}
        </div>
    );
}
