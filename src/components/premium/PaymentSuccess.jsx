import React, { useState } from "react";
import { setPremium } from "@/database/firebase/firestore/userDB";
import Link from "next/link";
import { Button } from "../ui/shadcn-ui/button";

export default function PaymentSuccess() {
    const [paymentStatus, setPaymentStatus] = useState(null); //hook for payment status
    const urlParams = new URLSearchParams(window.location.search); //const for url parameters
    const session_id = urlParams.get("session_id"); //const for session id

    //if session id exists, verify payment
    if (session_id) {
        //get secret key
        const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
        const stripe = require("stripe")(secretKey);
        //retrieve payment status from stripe
        stripe.checkout.sessions.retrieve(session_id, function (err, session) {
            if (err) {
                console.log(err);
                return;
            }
            if (session.payment_status === "paid") {
                setPaymentStatus("success");
                console.log("Payment was successful!");
                //payment successful, update user to premium
                setPremium();
            } else {
                setPaymentStatus("failed");
                console.log("Payment was unsuccessful");
                //payment unsuccessful, do not update user
            }
        });
    } else {
        //error loading session id
        setPaymentStatus("error");
        console.log("No session_id found in URL parameters.");
    }

    console.log("paymentStatus: ", paymentStatus);
    console.log(session_id);
    console.log(urlParams);

    //render payment status
    return (
        <div>
            {paymentStatus === "success" && (
                <div className="flex flex-col items-center justify-center">
                    <p>Payment was successful!</p>
                    <Link href="/profile">
                        <Button>Go to Profile</Button>
                    </Link>
                </div>
            )}
            {paymentStatus === "failed" && <p>Payment was not successful.</p>}
            {paymentStatus === "error" && (
                <p>There was an error verifying the payment status.</p>
            )}
        </div>
    );
}
