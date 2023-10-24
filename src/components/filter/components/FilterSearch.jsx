import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/shadcn-ui/input";
import { Card } from "@/components/ui/shadcn-ui/card";

export default function FilterSearch({
    setRestaurantList,
    restaurantMasterList,
    filterLogic,
}) {
    const [query, setQuery] = useState("");

    useEffect(() => {
        // Filter the restaurant list when the query or restaurantMasterList changes
        setRestaurantList(filterLogic(restaurantMasterList, query));
    }, [query, filterLogic, restaurantMasterList, setRestaurantList]);

    return (
        <Card className="flex h-[3rem] w-full items-center rounded-full pl-2 shadow-lg">
            <label htmlFor="search">
                <Search className="h-[1.2rem] w-[1.2rem]" />
            </label>
            <Input
                id="search"
                className="m-4 h-[2rem] w-full rounded-full"
                type="text "
                onChange={(e) => setQuery(e.target.value)}
            />
        </Card>
    );
}
