import React from "react";

export default function Details(restaurant) {
    return (
        <div id="SelectedrestaurantDetails">
            <h3>{restaurant.name}</h3>
            <p>{restaurant.website}</p>
        </div>
    );
}
