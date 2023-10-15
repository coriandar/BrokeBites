//container for the payment form
import React from "react";
import { loadStripe } from "@stripe/stripe-js"; //load stripe payments
import { Elements } from "@stripe/react-stripe-js"; //elements for stripe payments
import PaymentForm from "./PaymentForm"; //import payment form

//public key for stripe
const PUBLIC_KEY =
    "pk_test_51O0Y14H0glciU1R3YkHoD5GhBC6KeVbK8byiLEMyy0ABm5RLGMR4KY6aI3U6K1mf9NJcADIbi04zjL0u8RRDGxLk006we65Xyd";
const stripeTestPormise = loadStripe(PUBLIC_KEY); //load stripe payments

//export container
export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPormise}>
            <PaymentForm />
        </Elements>
    );
}
