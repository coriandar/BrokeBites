import React from "react";

export default function Modal({ open, onClose, children }) {
    return (
        <div
            onClick={onClose}
            className={`fixed w-screen inset-0 flex justify-center items-center transition-colours ${
                open ? "visible bg-black/20" : "invisible"
            }`}
        >
            {/* modal */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`w-50% h-50%
            bg-white rounded-xl shadow p-6 transition-all
            ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
            `}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                >
                    [x]
                </button>
                {/* pass into modal */}
                {children}
            </div>
        </div>
    );
}
