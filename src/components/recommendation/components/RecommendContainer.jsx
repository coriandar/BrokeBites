import React from "react";
import { Card } from "@/components/ui/shadcn-ui/card";
import { Button } from "@/components/ui/shadcn-ui/button";
import Link from "next/link";

export default function RecommendContainer({ restaurants }) {
    return (
        <ul>
            {restaurants.length > 0 ? (
                restaurants.map((restaurant) => (
                    <Card
                        key={restaurant.id}
                        className="m-4 mt-4 h-20 shadow-lg"
                    >
                        <Link href={`/restaurant/${restaurant?.id}`}>
                            <Button variant="outline" className="h-full w-full">
                                {restaurant?.name}
                            </Button>
                        </Link>
                    </Card>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </ul>
    );
}
