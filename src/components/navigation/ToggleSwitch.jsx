import React from "react";

export default function ToggleSwitch({ label, state, setState }) {
    const handleToggle = () => {
        setState(!state);
    };

    return (
        <label className="relative flex items-center mr-5 cursor-pointer">
            <input
                type="checkbox"
                value=""
                checked={state}
                onChange={handleToggle}
                className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            <span className="ml-3">{label}</span>
        </label>
    );
}
