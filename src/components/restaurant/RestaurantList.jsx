import React, { useState, useEffect } from "react";

const InitList = ({
    restaurantList,
    setRestaurantSelected,
    setCenter,
    getFilteredRestaurants,
    setRestaurantList,
    restaurantMasterList,
    setMapZoom,
    query,
}) => {
    const [active, setActive] = useState(null);

    useEffect(() => {
        // Filter the restaurant list when the query or restaurantMasterList changes
        setRestaurantList(getFilteredRestaurants(restaurantMasterList, query));
    }, [
        query,
        restaurantMasterList,
        setRestaurantList,
        getFilteredRestaurants,
    ]);

    const handleListItemClick = (restaurant) => {
        console.log(restaurant);
        setRestaurantSelected(restaurant);
        // setActive(restaurant.id);
        setCenter({
            lat: restaurant.latitude,
            lng: restaurant.longitude,
        });
        setMapZoom(20);
    };

    //TODO: synchronise map and list selected

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
