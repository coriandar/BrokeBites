import React from "react";
import { CheckUserDB } from "../account/UserDB";

const InitList = ({
    restaurantList,
    setRestaurantSelected,
    setCenter,
    setMapZoom,
    activeFilter,
    restaurantSelected,
}) => {
    const handleListItemClick = (restaurant) => {
        CheckUserDB();
        console.log(restaurant);
        setRestaurantSelected(restaurant);
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

    const printStar = (starRating) => {
        let star = "";
        const blank = 5 - starRating;
        for (let i = 0; i < starRating; i++) star += "★";
        for (let i = 0; i < blank; i++) star += "☆";
        return star;
    };

    const showSymbol = (restaurant) => {
        if (activeFilter.includes("filling")) {
            return restaurant.fillingFactor;
        } else if (activeFilter.includes("star")) {
            return printStar(restaurant.starRating);
        } else if (activeFilter.includes("cuisine")) {
            return restaurant?.cuisine;
        } else {
            return printPrice(restaurant.priceRating);
        }
    };

    //TODO: synchronise map and list selected

    return (
        <ul id="restaurantList">
            {restaurantList.map((restaurant) => (
                <li
                    key={restaurant.id}
                    onClick={() => handleListItemClick(restaurant)}
                >
                    <div
                        className={`flex justify-between m-2 p-4 rounded-lg shadow-lg hover:bg-slate-200 ${
                            restaurantSelected?.id === restaurant.id
                                ? "bg-slate-300 font-bold"
                                : "bg-white"
                        }`}
                    >
                        <p>{restaurant.name}</p>
                        <p className="font-light text-sm">
                            {showSymbol(restaurant)}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default InitList;
