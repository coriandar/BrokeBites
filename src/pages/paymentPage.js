//page for payments containing the stripe payment container
import React from "react";
import { checkout } from "../stripe/checkout";
import { Button } from "@/components/ui/shadcn-ui/button";

function paymentPage() {
    //return a payment button
    return (
        <Button
            className="h-[50%] w-[50%] rounded-2xl"
            onClick={() => {
                console.log("clicked");
                checkout({
                    lineItems: [
                        {
                            price: "price_1O2Pb3H0glciU1R3D3h3AJtD",
                            quantity: 1,
                        },
                    ],
                });
            }}
        >
            <span className="text-9xl">BUY!</span>
        </Button>
    );
}

export default paymentPage;
