import React, { useState } from "react";

const InitList = ({
    restaurantList,
    setRestaurantSelected,
}: {
    restaurantList: any[];
    setRestaurantSelected: Function;
}) => {
    const [active, setActive] = useState(null);

    const handleListItemClick = (restaurant: any) => {
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
    );
};

export default InitList;
