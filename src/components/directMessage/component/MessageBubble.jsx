import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/shadcn-ui/card";
import { Button } from "@/components/ui/shadcn-ui/button";

const formatTimestamp = (timestamp) => {
    if (timestamp && timestamp.seconds) {
        const date = new Date(timestamp.seconds * 1000);
        const options = {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
        };
        return date.toLocaleString("en-NZ", options);
    }
};

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
