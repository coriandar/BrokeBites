// backend for stripe payments
const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_KEY_TEST); // Load your secret key from an environment variable
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

/**
 * handles payments with stripe
 * asynch function handles http post requests to the /payment route
 *
 * @param {number} amount - the amount to be paid
 * @param {} id - the payment  id of the user
 */
app.post("/payment", cors(), async (req, res) => {
    //get the payment amount and id from the request body
    let { amount, id } = req.body;
    try {
        //create a new payment intent
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "USD",
            description: "BrokeBites Premium",
            payment_method: id,
            confirm: true,
        });
        //if successfunpml
        console.log("Payment", payment);
        res.json({
            message: "Payment successful",
            success: true,
        });
    } catch (error) {
        //else payment error
        console.log("Error", error);
        res.json({
            message: "Payment failed",
            success: false,
        });
    }
});

app.listen(process.env.PORT || 4000, () => {
    const port = process.env.PORT || 4000;
    console.log(`Server is running on port ${port}`);
});
