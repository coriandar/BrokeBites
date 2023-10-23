import React from "react";
import { Card } from "../ui/shadcn-ui/card";

export default function ReviewCard({ children }) {
    return <Card className="w-95% m-4 flex p-4 shadow-lg">{children}</Card>;
}
