import React, { useState, useEffect } from "react";
import { getAllRestaurants } from "../firebase/FirebaseApp";
import RestaurantCard from "./RestaurantCard";
import Slider from "react-slider";
import styles from "./RestaurantList.module.css";

const MIN = 1;
const MAX = 5;

//get search results
const getFilteredRestaurants = (items, query) => {
    if (!query) {
        return items;
    }
    const lowercaseQuery = query.toLowerCase(); // Convert the query to lowercase

    return items.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(lowercaseQuery)
    );
};

//get price rating results
const getFilteredPriceRating = (items, values) => {
    if (!values) {
        return items;
    }
    return items.filter(
        (restaurant) =>
            restaurant.priceRating >= values[0] &&
            restaurant.priceRating <= values[1]
    );
};

export default function RestaurantList() {
    const [query, setQuery] = useState(""); //query for search
    const [restaurantList, setRestaurantList] = useState([]); //list of restaurants
    const [sliderValues, setSliderValues] = useState([MIN, MAX]); // Values for slider

    //get restaurants from firebase
    useEffect(() => {
        // Fetch the restaurants and set the state when the component mounts
        const fetchRestaurants = async () => {
            try {
                const restaurants = await getAllRestaurants();
                setRestaurantList(restaurants);
            } catch (error) {
                // Handle any errors here
                console.error("Error fetching restaurants:", error);
            }
        };

        fetchRestaurants();
    }, []); // empty dependency array ensures this effect runs only once

    //get search queries
    const filteredRestaurants = getFilteredRestaurants(restaurantList, query);
    const filteredByPriceRating = getFilteredPriceRating(
        filteredRestaurants,
        sliderValues
    );

    //return restaurant list
    console.log(sliderValues);
    return (
        <div className={styles["restaurant-list"]}>
            <div className={styles.filters}>
                <div className={styles["search-box"]}>
                    <div className={styles["search-bar"]}>
                        <label>Search</label>
                        <input
                            type="text"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles["slider-box"]}>
                    <h3 className={styles.h3}>Price Rating</h3>
                    <div className={styles.values}>1 - 5</div>
                    <small className={styles["current-range"]}>
                        Current range: {sliderValues[0]} - {sliderValues[1]}
                    </small>

                    <Slider
                        className={styles["price-slider"]}
                        onChange={(newValues) => setSliderValues(newValues)}
                        value={sliderValues}
                        min={MIN}
                        max={MAX}
                    />
                </div>
            </div>
            <div className={styles["restaurant-container"]}>
                <ul className={styles["restaurant-ul"]}>
                    {filteredByPriceRating.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}
