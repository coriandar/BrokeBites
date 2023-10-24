//Stripe button used to take user to the payment page
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/shadcn-ui/button";

export default function SubscribeButton() {
    return (
        <Link href="/paymentPage">
            <Button>Subscribe to Premium</Button>
        </Link>
    );
}
