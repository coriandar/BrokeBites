import { useEffect, useState } from "react";
import React from "react";
import verifyPayment from "../stripe/verifyPayment";

export default function paymentSuccess() {
    //hook for payment status
    const [paymentStatus, setPaymentStatus] = useState(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const sessionId = queryParams.get("session_id");

        if (sessionId) {
            verifyPayment(sessionId).then((data) => {
                setPaymentStatus(data);
            });
        }
    }, []);

    return (
        <div>
            {paymentStatus === "success" && <p>Payment was successful!</p>}
            {paymentStatus === "failed" && <p>Payment was not successful.</p>}
            {paymentStatus === "error" && (
                <p>There was an error verifying the payment status.</p>
            )}
        </div>
    );
}
