// backend for stripe payments
const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")("process.env.STRIPE_SECRET_TEST");
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
            currency: "NZD",
            description: "BrokeBites premium",
            payment_method: id,
            confirm: true,
        });
        //if successful
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

//listen for http requests on port 4000 using express
app.listen(process.env.PORT || 4000, () => {
    console.log("Server running on port 4000");
});
