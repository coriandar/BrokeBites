import React from "react";

export default function ButtonClose({ action }) {
    return (
        <button
            onClick={action}
            className="absolute right-2 top-2 rounded-lg p-1 text-gray-400 hover:text-gray-600"
        >
            ✖
        </button>
    );
}
