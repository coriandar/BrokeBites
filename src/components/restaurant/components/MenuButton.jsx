import React from "react";
import ButtonSmall from "@/components/__shared__/ui/ButtonSmall";

export const MenuButton = ({ selected }) => {
    const openMenu = () => {
        window.open(selected?.website);
    };
    return <ButtonSmall label={"Menu"} action={openMenu} />;
};
