import React from "react";

export default function ReviewContainer({ reviewsData, reviewCardType }) {
    return (
        <div className="flex h-75% mt-2 mb-2 overflow-y-auto no-scrollbar">
            {reviewsData.length > 0 ? (
                <div
                    id="review"
                    className="w-full flex flex-col justify-start items-center"
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
