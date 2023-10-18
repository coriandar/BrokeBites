//page for payments containing the stripe payment container
import React from "react";
import { checkout } from "../stripe/checkout";
//testing premium methods
// import { setPremium } from "../database/firebase/firestore/userDB";
// import { removePremium } from "../database/firebase/firestore/userDB";

function paymentPage() {
    //return a payment button
    return (
        <>
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
            {/* Testing premium for users */}
            {/* <button
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                onClick={setPremium}
            >
                setPremium
            </button>
            <button
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                onClick={removePremium}
            >
                removePremium
            </button> */}
        </>
    );
}

export default paymentPage;
