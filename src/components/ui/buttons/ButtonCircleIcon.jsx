import React from "react";
import { Button } from "../button";

export const ButtonCircleIcon = ({ children, action }) => {
    return (
        <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full border-2 border-solid p-2 shadow-2xl"
            onClick={action}
        >
            {children}
        </Button>
    );
};
