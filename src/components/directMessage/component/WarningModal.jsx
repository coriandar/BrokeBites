import React from "react";
import Modal from "@/components/__shared__/layout/Modal";

export const WarningModal = ({ setShowWarning }) => {
    return (
        <Modal
            open={open}
            maxW={"w-1/3"}
            maxH={"h-20%"}
            onClose={() => setShowWarning(false)}
        >
            <div className="flex h-full flex-col items-center justify-center">
                <h2>User Not Found</h2>
                <p>The user you are looking for could not be found.</p>
            </div>
        </Modal>
    );
};
