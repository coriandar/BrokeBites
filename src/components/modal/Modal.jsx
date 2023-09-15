import React from "react";

export default function Modal({ open, onClose, children, maxW, maxH }) {
    return (
        // background
        <div
            onClick={onClose}
            className={`fixed w-screen h-screen inset-0 flex justify-center items-center transition-colours ${
                open ? "visible bg-black/30" : "invisible"
            }`}
        >
            {/* modal */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`${maxW} ${maxH} 
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
