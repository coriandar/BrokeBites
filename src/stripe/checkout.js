//code for checkout
import { loadStripe } from "@stripe/stripe-js";

export async function checkout({ lineItems }) {
    let stripePromise = null;

    //get stripe function
    const getStripe = () => {
        //if stripePromise is null, load stripe
        if (!stripePromise) {
            stripePromise = loadStripe(
                process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
            );
        }
        return stripePromise;
    };

    //get stripe
    const stripe = await getStripe();

    //redirect to checkout
    const { error } = await stripe.redirectToCheckout({
        mode: "subscription",
        lineItems,
        successUrl: `${window.location.origin}/paymentSuccess?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: window.location.origin,
    });

    //log error
    if (error) {
        console.log(error.message);
    }
}
