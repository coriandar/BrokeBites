import React from "react";
import { Button } from "@/components/ui/shadcn-ui/button";

export const MenuButton = ({ selected }) => {
    const openMenu = () => {
        window.open(selected?.website);
    };
    return (
        <Button
            variant={"secondary"}
            className={"mr-1 h-6 rounded-full"}
            onClick={openMenu}
        >
            Menu
        </Button>
    );
};
