import React from "react";
import ButtonClose from "../ui/ButtonClose";

export default function Modal({ open, onClose, children, maxW, maxH }) {
    return (
        <div
            onClick={onClose}
            className={`transition-colours fixed inset-0 flex h-screen w-screen items-center justify-center ${
                open ? "visible bg-black/30" : "invisible"
            }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`${maxW} ${maxH} 
            rounded-xl bg-white p-6 shadow transition-all
            ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
            `}
            >
                <ButtonClose action={onClose} />
                {children}
            </div>
        </div>
    );
}
