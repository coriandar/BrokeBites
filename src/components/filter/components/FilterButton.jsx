import React from "react";
import { ButtonCircleIcon } from "@/components/ui/buttons/ButtonCircleIcon";
import { Filter } from "lucide-react";

export const FilterButton = ({ showOptions, setShowOptions }) => {
    return (
        <ButtonCircleIcon action={() => setShowOptions(!showOptions)}>
            <Filter className="h-[1.2rem] w-[1.2rem]" />
        </ButtonCircleIcon>
    );
};
