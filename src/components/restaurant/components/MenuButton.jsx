import React from "react";
import { ButtonCircleIcon } from "@/components/ui/buttons/ButtonCircleIcon";
import { BookOpenText } from "lucide-react";
import { TopTooltip } from "@/components/ui/tooltip/Tooltip";

export const MenuButton = ({ selected }) => {
    const openMenu = () => {
        window.open(selected?.website);
    };
    return (
        <div className="group relative cursor-pointer py-2">
            <TopTooltip text={"Menu"} />
            <ButtonCircleIcon action={() => openMenu()}>
                <BookOpenText />
            </ButtonCircleIcon>
        </div>
    );
};
