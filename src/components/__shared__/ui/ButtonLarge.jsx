import React from "react";

export default function ButtonLarge({ label, action }) {
    return (
        <button
            className="justify-end rounded-md bg-slate-200 px-4 py-1"
            onClick={action}
        >
            {label}
        </button>
    );
}
