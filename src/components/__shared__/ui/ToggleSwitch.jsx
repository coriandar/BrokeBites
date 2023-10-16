import React from "react";

export default function ToggleSwitch({ label, state, setState }) {
    const handleToggle = () => {
        setState(!state);
    };

    return (
        <label className="relative mr-5 flex cursor-pointer items-center">
            <input
                type="checkbox"
                value=""
                checked={state}
                onChange={handleToggle}
                className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full dark:bg-gray-700"></div>
            <span className="ml-3">{label}</span>
        </label>
    );
}
