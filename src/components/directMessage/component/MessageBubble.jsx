import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/shadcn-ui/card";
import { formatTimestamp } from "@/util/dateFunctions";

export const MessageBubble = ({ message, sender }) => {
    return (
        <Card
            className={`m-4 w-[500px] rounded-lg ${
                sender ? "bg-primary text-primary-foreground" : ""
            }`}
        >
            <CardHeader>
                <CardDescription
                    className={`${sender ? "text-primary-foreground" : ""}`}
                >
                    {formatTimestamp(message?.timestamp)}
                </CardDescription>
            </CardHeader>

            <CardContent className={`flex overflow-auto`}>
                {message?.messageText}
            </CardContent>
        </Card>
    );
};
