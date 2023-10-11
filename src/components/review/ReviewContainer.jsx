import React from "react";

export default function ReviewContainer({ reviewsData, reviewCardType }) {
    return (
        <div className="no-scrollbar mb-2 mt-2 flex h-75% overflow-y-auto">
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
        </div>
    );
}
