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
    activeFilter,
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

    const printPrice = (priceRating) => {
        let price = "";
        for (let i = 0; i < priceRating; i++) {
            price += "$";
        }
        return price;
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
                    <div className="flex justify-between">
                        <p>{restaurant.name}</p>
                        <p className="font-light text-sm">
                            {activeFilter.includes("filling")
                                ? `[${restaurant.fillingFactor}]`
                                : printPrice(restaurant.priceRating)}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default InitList;
