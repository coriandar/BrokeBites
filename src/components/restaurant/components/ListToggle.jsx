import React from "react";
import { ButtonCircleIcon } from "@/components/ui/buttons/ButtonCircleIcon";
import { List } from "lucide-react";
import { TopTooltip } from "@/components/ui/tooltip/Tooltip";

export const ListToggle = ({ showOptions, setShowOptions }) => {
    return (
        <div className="group relative cursor-pointer py-2">
            <TopTooltip text={showOptions ? "HideList" : "ShowList"} />
            <ButtonCircleIcon action={() => setShowOptions(!showOptions)}>
                <List className="h-[1.2rem] w-[1.2rem]" />
            </ButtonCircleIcon>
        </div>
    );
};
