import React from "react";
import { ButtonCircleIcon } from "@/components/ui/buttons/ButtonCircleIcon";
import { ShoppingCart } from "lucide-react";
import { TopTooltip } from "@/components/ui/tooltip/Tooltip";

export const OrderButton = ({ selected }) => {
    const openOrder = () => {
        let url = "";
        if (selected?.order[0]?.orderUrl) url = selected?.order[0]?.orderUrl;
        else url = selected?.order[0]?.url;
        window.open(url);
    };

    return (
        <div className="group relative cursor-pointer py-2">
            <TopTooltip text={"Order"} />
            {selected?.order[0] && (
                <ButtonCircleIcon action={() => openOrder()}>
                    <ShoppingCart />
                </ButtonCircleIcon>
            )}
        </div>
    );
};
