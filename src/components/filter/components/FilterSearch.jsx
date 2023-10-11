import React, { useState, useEffect } from "react";

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
        <div className="flex h-5% w-full items-center rounded-lg bg-slate-300 pl-2 shadow-lg">
            <label htmlFor="search">Search:</label>
            <input
                id="search"
                className="m-4 w-full rounded-sm"
                type="text "
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}
