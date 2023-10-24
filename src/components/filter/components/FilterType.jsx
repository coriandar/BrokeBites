import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/shadcn-ui/card";

export default function FilterType({
    setRestaurantList,
    restaurantMasterList,
    filterLogic,
    options,
}) {
    const [selected, setSelected] = useState("");
    const handleChange = (e) => setSelected(e.target.value);

    useEffect(() => {
        // Filter the restaurant list when the query or restaurantMasterList changes
        setRestaurantList(filterLogic(restaurantMasterList, selected));
    }, [selected, filterLogic, restaurantMasterList, setRestaurantList]);

    return (
        <Card className="flex h-5% w-full items-center justify-center rounded-lg pl-2 shadow-lg">
            <label for="cuisine">Type:</label>
            <select
                id="cuisine"
                name="cusine"
                className="m-4 w-full rounded-sm"
                value={selected}
                onChange={handleChange}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
        </Card>
    );
}
