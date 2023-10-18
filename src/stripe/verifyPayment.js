import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_SECRET_STRIPE_KEY);

async function verifyPayment(session_id, stripeInstance = stripe) {
    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status === "paid") {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return "error";
    }
}

export default verifyPayment;
