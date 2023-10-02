import React, { useState, useEffect } from "react";

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
    }, [selected]);

    return (
        <div className="w-full bg-slate-300 shadow-lg h-5% flex justify-center items-center pl-2 rounded-lg">
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
        </div>
    );
}
