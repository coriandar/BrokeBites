<<<<<<< HEAD
import React from "react";

const InitList = ({ restaurantList, setRestaurantSelected }) => {
    const handleListItemClick = (restaurant) => {
        console.log(restaurant);
        setRestaurantSelected(restaurant);
    };

    return (
        <div>
            <ul id="restaurantList">
                {restaurantList.map((restaurant) => (
                    <li
                        key={restaurant.id}
                        onClick={() => handleListItemClick(restaurant)}
                    >
                        {restaurant.name}
                    </li>
                ))}
            </ul>
        </div>
=======
import React, { useState } from "react";

const InitList = ({ restaurantList, setRestaurantSelected }) => {
    const [active, setActive] = useState(null);

    const handleListItemClick = (restaurant) => {
        console.log(restaurant);
        setRestaurantSelected(restaurant);
        setActive(restaurant.id);
    };

    return (
        <ul id="restaurantList">
            {restaurantList.map((restaurant) => (
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
>>>>>>> 1108444f33c6552f103e21d442bb347992e0a168
    );
};

export default InitList;
