import React from "react";

export default function ToggleSwitch() {
    return (
        <label className="h-8 w-16 relative flex cursor-pointer">
            <input type="checkbox" value="" className="peer" />
            <div
                className="rounded-full before:rounded-full bg-slate-500 absolute top-0 bottom-0 left-0 right-0 before:bg-white before:bottom-1 before:left-1 before:absolute before:h-6 before:w-6 before:transition-all peer-checked:before:translate-x-8 peer-checked:bg-green-500
                "
            ></div>
        </label>
    );
}
