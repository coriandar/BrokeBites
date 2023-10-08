import React from "react";

export default function ButtonLarge({ label, action }) {
    return (
        <button
            className="bg-slate-200 px-4 py-1 rounded-md justify-end"
            onClick={action}
        >
            {label}
        </button>
    );
}
