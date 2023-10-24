import React from "react";
import { ButtonCircleIcon } from "@/components/ui/buttons/ButtonCircleIcon";
import { Settings } from "lucide-react";

export const MapCog = ({ showOptions, setShowOptions }) => {
    return (
        <ButtonCircleIcon action={() => setShowOptions(!showOptions)}>
            <Settings className="h-[1.2rem] w-[1.2rem]" />
        </ButtonCircleIcon>
    );
};
