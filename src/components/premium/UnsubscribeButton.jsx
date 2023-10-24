import React from "react";
import Link from "next/link";
import { Button } from "../ui/shadcn-ui/button";

export default function UnsubscribeButton() {
    //button is a link to the unsubscribe page
    return (
        <Link href="/unsubscribe">
            <Button variant="outline">Unsubscribe from Premium</Button>
        </Link>
    );
}
