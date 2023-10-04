import React from "react";

export default function ReviewCard({ children }) {
    return (
        <li className="flex m-4 bg-slate-50 p-4 rounded-lg shadow-lg w-95%">
            {children}
        </li>
    );
}
