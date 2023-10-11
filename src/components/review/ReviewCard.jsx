import React from "react";

export default function ReviewCard({ children }) {
    return (
        <li className="m-4 flex w-95% rounded-lg bg-slate-50 p-4 shadow-lg">
            {children}
        </li>
    );
}
