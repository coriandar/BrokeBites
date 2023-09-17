import React, { useState, useEffect } from "react";
import { getFilteredSearch } from "../firebase/FirebaseApp";

export default function SearchBar({ setRestaurantList, restaurantMasterList }) {
    const [query, setQuery] = useState("");

    useEffect(() => {
        // Filter the restaurant list when the query or restaurantMasterList changes
        setRestaurantList(getFilteredSearch(restaurantMasterList, query));
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
