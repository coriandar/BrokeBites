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
    }, [query]);

    return (
        <div className="w-full bg-slate-300 shadow-lg h-5% flex items-center pl-2 rounded-lg">
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
