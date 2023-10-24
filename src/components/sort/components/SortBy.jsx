import React, { useState } from "react";
import {
    ArrowUpDown,
    ArrowDownWideNarrow,
    ArrowUpNarrowWide,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/shadcn-ui/tabs";

export default function SortBy({
    restaurantMasterList,
    setRestaurantList,
    sortLogic,
    userGeo, // only used for sortby nearest
}) {
    const handleClick = (buttonName) => {
        sortRestaurants(buttonName);
    };

    // Function to sort the restaurant list based on the order parameter
    const sortRestaurants = (order) => {
        const sortedRestaurants = sortLogic(
            restaurantMasterList,
            order,
            userGeo, // for sort by neearest
        );
        setRestaurantList(sortedRestaurants);
    };

    return (
        <Tabs defaultValue="default">
            <TabsList className="w-full rounded-full">
                <TabsTrigger
                    value="default"
                    title="default"
                    className="w-full rounded-full"
                    onClick={() => handleClick("default")}
                >
                    <ArrowUpDown className="h-[1.2rem] w-[1.2rem]" />
                </TabsTrigger>
                <TabsTrigger
                    value="ascending"
                    title="ascending"
                    className="w-full rounded-full"
                    onClick={() => handleClick("ascending")}
                >
                    <ArrowUpNarrowWide className="h-[1.2rem] w-[1.2rem]" />
                </TabsTrigger>
                <TabsTrigger
                    value="descending"
                    title="descending"
                    className="w-full rounded-full"
                    onClick={() => handleClick("descending")}
                >
                    <ArrowDownWideNarrow className="h-[1.2rem] w-[1.2rem]" />
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
