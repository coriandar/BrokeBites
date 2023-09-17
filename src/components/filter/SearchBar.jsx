import React, { useEffect } from "react";

export default function SearchBar({
    query,
    setQuery,
    setRestaurantList,
    restaurantMasterList,
    getFilteredList,
}) {
    useEffect(() => {
        // Filter the restaurant list when the query or restaurantMasterList changes
        setRestaurantList(getFilteredList(restaurantMasterList, query));
    }, [query]);

    return (
        <div className="w-full bg-slate-300 shadow-lg h-5% flex items-center pl-2 rounded-lg">
            <label>Search:</label>
            <input
                className="m-4 w-full rounded-sm"
                type="text "
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}
