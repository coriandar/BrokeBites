//page for payments containing the stripe payment container
import React from "react";
import { checkout } from "../checkout";

function paymentPage() {
    //return a payment button
    return (
        <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
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
            BUY!
        </button>
    );
}

export default paymentPage;
