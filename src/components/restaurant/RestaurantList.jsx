import React, { useState } from "react";

const InitList = ({
    restaurantList,
    setRestaurantSelected,
    setCenter,
    getFilteredRestaurants,
}) => {
    const [active, setActive] = useState(null);

    const handleListItemClick = (restaurant) => {
        console.log(restaurant);
        setRestaurantSelected(restaurant);
        setActive(restaurant.id);
        setCenter({
            lat: restaurant.latitude,
            lng: restaurant.longitude,
        });
    };

    const [query, setQuery] = useState("");
    const filteredRestaurants = getFilteredRestaurants(restaurantList, query);

    return (
        <div>
            <div>
                <label>Search</label>
                <input type="text" onChange={(e) => setQuery(e.target.value)} />
            </div>
            <ul id="restaurantList">
                {filteredRestaurants.map((restaurant) => (
                    <li
                        className={`${
                            active === restaurant.id ? "bg-slate-300" : ""
                        } 
                            hover:bg-slate-200`}
                        key={restaurant.id}
                        onClick={() => handleListItemClick(restaurant)}
                    >
                        {restaurant.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InitList;
