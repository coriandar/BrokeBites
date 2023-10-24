import React from "react";
import { Button } from "@/components/ui/shadcn-ui/button";

export default function ButtonSmall({ label, action }) {
    return (
        <Button
            className="m-1 rounded-md p-1 text-sm font-light shadow-lg"
            onClick={action}
        >
            {label}
        </Button>
    );
}
