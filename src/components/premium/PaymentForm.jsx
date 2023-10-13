//Payment form component handles user payments using stripe
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"; //import elements from stripe react
import axios from "axios"; //import axios for http requests

//card options css from stripe documentation
const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" },
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee",
        },
    },
};

//export payment form
export default function PaymentForm() {
    const [success, setSuccess] = useState(false); //success hook
    const stripe = useStripe(); //stripe const
    const elements = useElements(); //elements const

    //async function for submitting payments
    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent default for submission
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            //create payment method
            type: "card",
            card: elements.getElement(CardElement),
        });

        //error handling for payments
        if (!error) {
            try {
                const { id } = paymentMethod;
                const response = await axios.post(
                    "http://localhost:4000/payment",
                    {
                        amount: 0, //amount to be paid in cents
                        id, //id of payment method
                    },
                );

                if (response.data.success) {
                    console.log("successful payment"); //successful payment
                    setSuccess(true); //set success to true
                }
            } catch (error) {
                console.log(error); //log error
            }
        } else {
            console.log(error.message); //log error message
        }
    };

    //return the component
    return (
        <>
            {!success ? ( //if not successful
                <form onSubmit={handleSubmit}>
                    <fieldset className="FormGroup">
                        <div className="FormRow">
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                    </fieldset>
                    <button className="btn btn-primary" type="submit">
                        Pay
                    </button>
                </form>
            ) : (
                //show thank you message if payment is successful
                <div>
                    <h2>Thank you for subscribing to BrokeBytes!!</h2>
                </div>
            )}
        </>
    );
}
