import React from "react";

export default function ReviewCard({ children }) {
    return (
        <li className="w-95% m-4 flex rounded-lg bg-slate-50 p-4 shadow-lg dark:bg-slate-500">
            {children}
        </li>
    );
}
