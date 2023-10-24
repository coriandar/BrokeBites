import React from "react";
import { Card } from "../ui/shadcn-ui/card";

export default function ReviewCard({ children }) {
    return <Card className="m-4 flex w-full p-4 shadow-lg">{children}</Card>;
}
