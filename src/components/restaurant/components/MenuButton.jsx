import React from "react";
import { Button } from "@/components/ui/shadcn-ui/button";
import { ButtonCircleIcon } from "@/components/ui/buttons/ButtonCircleIcon";
import { BookOpenText } from "lucide-react";

export const MenuButton = ({ selected }) => {
    const openMenu = () => {
        window.open(selected?.website);
    };
    return (
        <ButtonCircleIcon action={() => openMenu()}>
            <BookOpenText />
        </ButtonCircleIcon>
    );
};
