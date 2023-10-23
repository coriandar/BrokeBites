import React from "react";

export function TopTooltip({ text }) {
    return (
        <div className="w-${text.length * 10}px invisible absolute bottom-10 mb-3 rounded-md bg-white px-4 py-2 text-sm text-black group-hover:visible">
            {text}
        </div>
    );
}

export function BottomTooltip({ text }) {
    return (
        <div className="w-${text.length * 10}px invisible absolute top-12 mb-3 rounded-md bg-white px-4 py-2 text-sm text-black group-hover:visible">
            {text}
        </div>
    );
}
