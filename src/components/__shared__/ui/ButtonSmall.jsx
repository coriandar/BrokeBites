import React from "react";

export default function ButtonSmall({ label, action }) {
    return (
        <button
            className="font-light text-sm bg-slate-200 rounded-md p-1 shadow-lg m-1"
            onClick={action}
        >
            {label}
        </button>
    );
}
