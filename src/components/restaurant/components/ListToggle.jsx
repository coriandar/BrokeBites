import React from "react";
import { ButtonCircleIcon } from "@/components/ui/buttons/ButtonCircleIcon";
import { List } from "lucide-react";

export const ListToggle = ({ showOptions, setShowOptions }) => {
    return (
        <ButtonCircleIcon action={() => setShowOptions(!showOptions)}>
            <List className="h-[1.2rem] w-[1.2rem]" />
        </ButtonCircleIcon>
    );
};
