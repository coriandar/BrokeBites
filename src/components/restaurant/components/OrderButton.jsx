import React from "react";
import { Button } from "@/components/ui/shadcn-ui/button";
import { ButtonCircleIcon } from "@/components/ui/buttons/ButtonCircleIcon";
import { ShoppingCart } from "lucide-react";

export const OrderButton = ({ selected }) => {
    const openOrder = () => {
        let url = "";
        if (selected?.order[0]?.orderUrl) url = selected?.order[0]?.orderUrl;
        else url = selected?.order[0]?.url;
        window.open(url);
    };

    return (
        <>
            {selected?.order[0] && (
                // <Button
                //     variant={"secondary"}
                //     className={"mr-1 h-6 rounded-full"}
                //     onClick={openOrder}
                // >
                //     Order
                // </Button>
                <ButtonCircleIcon action={() => openOrder()}>
                    <ShoppingCart />
                </ButtonCircleIcon>
            )}
        </>
    );
};
