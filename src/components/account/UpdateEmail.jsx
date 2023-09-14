import Modal from "../modal/Modal";
import React, { useState } from "react";

export default function UpdateEmail() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex">
            <button
                className="bg-slate-200 m-4 px-4 py-1 rounded-md w-40"
                onClick={() => setOpen(true)}
            >
                Update email
            </button>

            <Modal
                open={open}
                maxW={"w-50%"}
                maxH={"h-50%"}
                onClose={() => setOpen(false)}
            >
                <div className="w-full h-full bg-slate-300 rounded-lg">
                    <h3 className="font-bold text-lg">Update email</h3>
                </div>
            </Modal>
        </div>
    );
}
