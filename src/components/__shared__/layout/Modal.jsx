import React from "react";
import ButtonClose from "../ui/ButtonClose";

export default function Modal({ open, onClose, children, maxW, maxH }) {
    return (
        <div
            onClick={onClose}
            className={`fixed w-screen h-screen inset-0 flex justify-center items-center transition-colours ${
                open ? "visible bg-black/30" : "invisible"
            }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`${maxW} ${maxH} 
            bg-white rounded-xl shadow p-6 transition-all
            ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
            `}
            >
                <ButtonClose action={onClose} />
                {children}
            </div>
        </div>
    );
}
