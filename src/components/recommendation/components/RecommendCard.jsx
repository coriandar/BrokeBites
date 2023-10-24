import React from "react";
import Link from "next/link";

export default function RecommendCard({ restaurant }) {
    return (
        <div className="m-5 flex h-12 items-center justify-start rounded-lg">
            <Link href={`/restaurant/${restaurant?.id}`}>
                {restaurant?.name}
            </Link>
        </div>
    );
}
