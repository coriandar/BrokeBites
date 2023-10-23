import React from "react";
import { ButtonCircleIcon } from "@/components/ui/buttons/ButtonCircleIcon";
import { Filter } from "lucide-react";
import { TopTooltip } from "@/components/ui/tooltip/Tooltip";

export const FilterButton = ({ showOptions, setShowOptions }) => {
    return (
        <div className="group relative cursor-pointer py-2">
            <TopTooltip text={"Filter"} />
            <ButtonCircleIcon action={() => setShowOptions(!showOptions)}>
                <Filter className="h-[1.2rem] w-[1.2rem]" />
            </ButtonCircleIcon>
        </div>
    );
};
