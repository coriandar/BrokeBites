import React from "react";
import styles from "./WarningModal.module.css";

export const WarningModal = ({ setShowWarning }) => {
    const handleClose = () => {
        setShowWarning(false);
    };

    return (
        <div className={styles.warningModal}>
            <div className={styles.warningContent}>
                <h2>User Not Found</h2>
                <p>The user you are looking for could not be found.</p>
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};
