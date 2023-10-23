import React from "react";
import { ScrollArea } from "../ui/shadcn-ui/scroll-area";

export default function ReviewContainer({ reviewsData, reviewCardType }) {
    return (
        // <ScrollArea className="h-[500px] w-[350px] rounded-md border p-4">
        <ScrollArea className="h-full rounded-md border p-4">
            {/* <div 
            className="h-75% mb-2 mt-2 flex overflow-y-auto">
             */}
            {reviewsData.length > 0 ? (
                <div
                    id="review"
                    className="flex w-full flex-col items-center justify-start"
                >
                    {reviewsData.map((review) => (
                        <ul key={review.id} className="w-full">
                            {reviewCardType({ review })}
                        </ul>
                    ))}
                </div>
            ) : (
                <div>No reviews</div>
            )}
            {/* </div> */}
        </ScrollArea>
    );
}
