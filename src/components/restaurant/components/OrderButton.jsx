import React from "react";
import ButtonSmall from "@/components/__shared__/ui/ButtonSmall";

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
                <ButtonSmall label={"Order"} action={openOrder} />
            )}
        </>
    );
};
