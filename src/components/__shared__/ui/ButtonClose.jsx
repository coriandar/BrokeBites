import React from "react";

export default function ButtonClose({ action }) {
    return (
        <button
            onClick={action}
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 hover:text-gray-600"
        >
            ✖
        </button>
    );
}
