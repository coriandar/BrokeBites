import React from "react";

export default function ButtonSmall({ label, action }) {
    return (
        <button
            className="m-1 rounded-md bg-slate-200 p-1 text-sm font-light shadow-lg"
            onClick={action}
        >
            {label}
        </button>
    );
}
