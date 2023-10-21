import React from "react";

export const WarningModal = ({ setShowWarning }) => {
    const handleClose = () => {
        setShowWarning(false);
    };

    return (
        <div className="warning-modal">
            <div className="warning-content">
                <h2>User Not Found</h2>
                <p>The user you are looking for could not be found.</p>
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};
