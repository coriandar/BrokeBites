import React from "react";
import { ScrollArea } from "../ui/shadcn-ui/scroll-area";

export default function ReviewContainer({
    reviewsData,
    reviewCardType,
    emptyText,
}) {
    return (
        <ScrollArea className="h-full rounded-md border p-4">
            {reviewsData.length > 0 ? (
                <div className="flex w-full flex-col items-center justify-start">
                    {reviewsData.map((review) => reviewCardType({ review }))}
                </div>
            ) : (
                <div>{emptyText}</div>
            )}
        </ScrollArea>
    );
}
